import { Server } from "socket.io";
import { IGame } from "types/game";
import { accuseCheating, endGame, endRound, endTrick, leaveGame, playAuction, playCard } from "utils/game_moves";
import { createGame } from "utils/game_moves";
import { getNextEmptySeat } from "utils/game_rules";

const state: { [key: string]: IGame } = {} // game_id -> game

const users: {
    [key: string]: {   // user_id -> game_id, seat
        room: string;
        seat: number,
    }
} = {}

export default function SocketHandler(_: any, res: any) {
    if (res.socket.server.io) {
        res.end()
        return
    }

    const io = new Server(res.socket.server);
    res.socket.server.io = io;

    io.of('/chat').on('connection', (socket) => {
        socket.on('message-sent', ({ messages, message }) => {
            socket.broadcast.emit('message-received', { messages, message });
        })
    })

    io.of('/game').on('connection', (socket) => {
        socket.on('create-game', ({ gameId, user }) => {
            state[gameId] = createGame(gameId)
            state[gameId].players[0] = user;

            users[user.uid] = {
                room: gameId,
                seat: 0,
            }

            socket.join(gameId)
        })

        socket.on('join-game', ({ gameId, user }) => {
            const room = io.of('/game').adapter.rooms.get(gameId);

            if (!room) {
                socket.emit('unknown-game');
                return
            }

            const players = state[gameId].players;

            if (players.find(p => p?.uid === user.uid)) {
                if (!room.has(socket.id)) {
                    socket.join(gameId)
                    socket.emit('already-joined');
                }
                return
            }

            const seat = getNextEmptySeat(players);

            if (seat === -1) {
                socket.emit('game-full');
                return
            }

            users[user.uid] = {
                room: gameId,
                seat: seat,
            }

            state[gameId].players[seat] = user;
            state[gameId].joined++

            socket.join(gameId)
            io.of('/game').to(gameId).emit('game-update', state[gameId])
        })

        socket.on('leave-game', ({ gameId, playerIndex }) => {
            const game = leaveGame(state[gameId], playerIndex)
            state[gameId] = game
            socket.leave(gameId)
            io.of('/game').to(gameId).emit('game-update', game)
        })

        socket.on('request-game-state', ({ gameId, uid }) => {
            console.log('request-game-state', gameId, uid)
            const user = users[uid]
            if (!user) {
                socket.emit('unknown-user')
                return
            }

            socket.emit('game-setup', { game: state[gameId], index: user.seat });
        })

        socket.on('play-auction', ({ gameId, playerTurn, playerIndex, bid }) => {
            if (playerIndex !== playerTurn) return

            playAuction(state[gameId], playerTurn, bid)
            io.of('/game').to(gameId).emit('game-update', state[gameId]);
        })

        socket.on('play-card', async ({ gameId, playerTurn, playerIndex, cardIndex, card, isCheating, scoreToWin }) => {
            if (playerIndex !== playerTurn) return

            const isTrickOver = playCard(state[gameId], playerTurn, cardIndex, card, isCheating)
            io.of('/game').to(gameId).emit('game-update', state[gameId]);

            if (!isTrickOver) return
            await new Promise(resolve => setTimeout(resolve, 1000))
            const isRoundOver = endTrick(state[gameId])
            io.of('/game').to(gameId).emit('game-update', state[gameId]);

            if (!isRoundOver) return
            const isGameOver = endRound(state[gameId], scoreToWin)
            io.of('/game').to(gameId).emit('game-update', state[gameId]);

            if (!isGameOver) return
            const outcome = endGame(state[gameId], scoreToWin)
            io.of('/game').to(gameId).emit('game-over', outcome);
        })

        socket.on('accuse-cheating', ({ gameId, playerIndex }) => {
            accuseCheating(state[gameId], playerIndex)
            io.of('/game').to(gameId).emit('game-update', state[gameId]);
        })
    })

    res.end()
}

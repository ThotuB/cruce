import Modal from "components/common/Modal"
import { GameContext } from "contexts/GameContext"
import { useUser } from "contexts/UserContext"
import Router from "next/router"
import { useEffect, useState } from "react"
import { leaveTable } from "services/table"
import { IGame, ITable, IUser } from "types/game"
import { gameSocket } from "utils/sockets"
import Auction from "./Auction"
import Buttons from "./Buttons"
import GameOver from "./GameOver"
import Hand from "./Hand"
import Player from "./Player"
import ScoreBoard from "./ScoreBoard"
import Table from "./Table"
import Trump from "./Trump"

interface GameProps {
    id: string;
    table: ITable;
}

export default function Game({ id, table }: GameProps) {
    const [state, setState] = useState<IGame>({} as IGame);
    const [playerIndex, setPlayerIndex] = useState(0);
    const [isLoading, setIsLoading] = useState(true);

    const [gameOver, setGameOver] = useState({
        isOver: false,
        outcome: "",
    });

    const { user } = useUser();

    useEffect(() => {
        initializeSocket()
        gameSocket.emit('request-game-state', {gameId: id, uid: user.uid});
    }, [])

    const initializeSocket = () => {
        gameSocket.on('connect', () => {
            // console.log('connected')
        })

        gameSocket.on('game-setup', ({game, index}) => {
            console.log('game-setup', game, index)
            setState(game);
            setPlayerIndex(index);
            setIsLoading(false);
        })

        gameSocket.on('game-update', game => {
            console.log('game-update', game)
            setState(game);
        })

        gameSocket.on('game-over', outcome => {
            console.log('game-over', outcome)
            const gameover = {
                isOver: true,
                outcome: '',
            }
            switch (outcome) {
                case 'draw':
                    gameover.outcome = 'draw'
                    break;
                case 'team1':
                    if (playerIndex === 0 || playerIndex === 2) gameover.outcome = 'win'
                    else gameover.outcome = 'lose'
                    break;
                case 'team2':
                    if (playerIndex === 0 || playerIndex === 2) gameover.outcome = 'lose'
                    else gameover.outcome = 'win'
                    break;
                default:
                    gameover.outcome = 'damn'
                    break;
            }
            console.log(gameover)
            setGameOver(gameover);
        })

        gameSocket.on('kick', () => {
            handleExit()
        })

        gameSocket.on('game-unknown', _ => {
            console.log('game-unknown' )
            Router.push("/")
        })

        gameSocket.on('game-full', _ => {
            console.log('game-full')
            Router.push("/")
        })

        gameSocket.on('unknown-user', _ => {
            console.log('unknown-user')
            Router.push("/")
        })

        gameSocket.on('already-joined', _ => {
            console.log('already-joined')
        })
    }

    const handleContinue = () => {
        setGameOver({ isOver: false, outcome: "" })
    }

    const handleExit = () => {
        gameSocket.emit('leave-game', {gameId: id, playerIndex});
        Router.push("/")
        leaveTable(id, state.joined);
    }

    return (
        <div className="relative w-full h-full">
            {gameOver.isOver && (
                <Modal 
                    onClose={handleContinue}
                >
                    <GameOver 
                        outcome={gameOver.outcome} 
                        onContinue={handleContinue}
                        onExit={handleExit}    
                    />
                </Modal>
            )}
            {isLoading || 
                <GameContext.Provider value={{game: state, table: table, id: id}}>
                    <div className="absolute h-full w-full flex items-center justify-center">
                        <div className="relative h-3/4 aspect-square bg-dark-2 rounded-full">
                            <Player position={-playerIndex+0} index={0} isJoined={state.players[0] !== null}/>
                            <Player position={-playerIndex+1} index={1} isJoined={state.players[1] !== null}/>
                            <Player position={-playerIndex+2} index={2} isJoined={state.players[2] !== null}/>
                            <Player position={-playerIndex+3} index={3} isJoined={state.players[3] !== null}/>
                            <Table playerIndex={playerIndex} openingPlayer={state.round.openingPlayer} cards={state.round.playedCards} />
                            <Trump trump={state.round.trump} />
                        </div>
                    </div>
                    <Auction 
                        bidMax={state.round.auction.value}
                        playerIndex={playerIndex}
                        trick={state.round.trick}
                        isVisible={playerIndex === state.round.playerTurn && state.round.trick === 0}
                    />
                    <Hand 
                        playerIndex={playerIndex}
                    />
                    <ScoreBoard 
                        players={state.players}
                        playerIndex={playerIndex}
                        team1Points={state.round.team1Points} 
                        team1Score={state.team1Score} 
                        team2Points={state.round.team2Points} 
                        team2Score={state.team2Score}
                    />
                    <Buttons playerIndex={playerIndex} isCheatMode={table.cheating} joined={state.joined} id={id} onExit={handleExit} />
                </GameContext.Provider>
            } 
        </div>
    )
}
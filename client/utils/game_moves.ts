import { ICard, IGame } from "types/game"
import {
    calculatePairBonus,
    calculateTeamPoints,
    calculateTeamScores,
    shuffleCards,
} from "./game_rules"

export function createGame(id: string): IGame {
    const cards = shuffleCards()

    return {
        gameId: id,
        team1Score: 0,
        team2Score: 0,
        joined: 1,
        players: [null, null, null, null],
        round: {
            trick: 0,
            turn: 0,
            playerTurn: 0,
            openingPlayer: 0,
            playerCards: cards,
            playedCards: [],
            auction: {
                bids: [0, 0, 0, 0],
                value: 0,
                winningTeam: 0,
            },
            trump: "",
            team1Points: 0,
            team2Points: 0,
            team1Cheated: false,
            team2Cheated: false,
        },
        numRound: 0,
    }
}

export function playAuction(state: IGame, playerTurn: number, bid: number) {
    const round = state.round

    const newBids = [...round.auction.bids]
    newBids[playerTurn] = bid
    const maxBid = Math.max(...newBids)

    round.auction.bids = newBids
    round.auction.value = maxBid

    if (round.turn < 3) {
        round.playerTurn = (playerTurn + 1) % 4
        round.turn++
    } else {
        const openingPlayer = newBids.indexOf(maxBid)
        const winningTeam = openingPlayer === 0 || openingPlayer === 2 ? 1 : 2

        round.trick = 1
        round.playerTurn = openingPlayer
        round.openingPlayer = openingPlayer
        round.turn = 0
        round.auction.winningTeam = winningTeam
    }
}

export function playCard(
    state: IGame,
    playerTurn: number,
    cardIndex: number,
    card: ICard,
    isCheating: boolean,
) {
    const round = state.round

    const [team1Bonus, team2Bonus] = calculatePairBonus(
        card,
        round.playerCards[playerTurn],
        round.trick,
        round.turn,
        playerTurn,
        round.trump,
    )
    const team1Cheated = isCheating && (playerTurn === 0 || playerTurn === 2)
    const team2Cheated = isCheating && (playerTurn === 1 || playerTurn === 3)

    round.playerTurn = (playerTurn + 1) % 4
    if (round.turn === 0 && round.trick === 1) round.trump = card.suit
    if (team1Cheated) round.team1Cheated = true
    if (team2Cheated) round.team2Cheated = true
    round.playedCards.push(card)
    round.playerCards[playerTurn].splice(cardIndex, 1)
    round.team1Points += team1Bonus
    round.team2Points += team2Bonus
    round.turn++
    if (round.turn === 4) round.playerTurn = -1

    return round.turn === 4
}

export function endTrick(state: IGame) {
    const round = state.round

    const [team1Bonus, team2Bonus, winningPlayer] = calculateTeamPoints(
        round.playedCards,
        round.openingPlayer,
        round.trump,
    )

    round.turn = 0
    round.trick++
    round.team1Points += team1Bonus
    round.team2Points += team2Bonus
    round.playerTurn = winningPlayer
    round.openingPlayer = winningPlayer
    round.playedCards = []

    return round.trick === 7
}

export function endRound(state: IGame, scoreToWin: number) {
    const round = state.round

    const [team1Score, team2Score] = calculateTeamScores(
        round.team1Points,
        round.team2Points,
        round.auction.winningTeam,
        round.auction.value,
    )

    const cards = shuffleCards()

    state.numRound++
    state.team1Score += team1Score
    state.team2Score += team2Score
    state.round = {
        trick: 0,
        turn: 0,
        playerTurn: state.numRound % 4,
        openingPlayer: state.numRound % 4,
        trump: "",
        team1Cheated: false,
        team2Cheated: false,
        playerCards: cards,
        playedCards: [],
        team1Points: 0,
        team2Points: 0,
        auction: {
            bids: [0, 0, 0, 0],
            value: 0,
            winningTeam: 0,
        },
    }

    return state.team1Score >= scoreToWin || state.team2Score >= scoreToWin
}

export function endGame(state: IGame, scoreToWin: number) {
    if (state.team1Score >= scoreToWin && state.team1Score >= scoreToWin) {
        return "draw"
    }
    if (state.team1Score >= scoreToWin) {
        return "team1"
    }
    return "team2"
}

export function accuseCheating(state: IGame, playerIndex: number) {
    const round = state.round

    const team1Claim = playerIndex === 0 || playerIndex === 2
    const team2Claim = playerIndex === 1 || playerIndex === 3

    let isReset = false

    if (team1Claim) {
        if (round.team2Cheated) {
            state.team2Score -= 3
            isReset = true
        } else {
            state.team1Score -= 3
        }
    } else {
        if (round.team1Cheated) {
            state.team1Score -= 3
            isReset = true
        } else {
            state.team2Score -= 3
        }
    }

    if (!isReset) return

    const cards = shuffleCards()

    state.numRound++
    state.round = {
        trick: 0,
        turn: 0,
        playerTurn: state.numRound % 4,
        openingPlayer: state.numRound % 4,
        trump: "",
        team1Cheated: false,
        team2Cheated: false,
        playerCards: cards,
        playedCards: [],
        team1Points: 0,
        team2Points: 0,
        auction: {
            bids: [0, 0, 0, 0],
            value: 0,
            winningTeam: 0,
        },
    }
}

export function leaveGame(state: IGame, playerIndex: number) {
    const game = createGame(state.gameId)

    const players = state.players
    players[playerIndex] = null
    const joined = state.joined - 1

    game.players = players
    game.joined = joined

    return game
}

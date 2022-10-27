import axios from "axios";
import { SITE_URL } from "constants/site_contants";
import { User } from "firebase/auth";
import { ICard, IGame } from "types/game";
import { shuffleCards } from "utils/game_rules";

export async function getGameState(id: string) {
    const url = `/api/game/${id}`;

    return await axios.get(url);
}

export async function createNewGame(id: string, user: User) {
    const url = `/api/game`;

    const cards = shuffleCards();

    const game: IGame = {
        gameId: id,
        team1Score: 0,
        team2Score: 0,
        joined: 1,
        players: [
            {
                uid: user.uid,
                name: user.displayName,
                photo: user.photoURL,
            }
        ],
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
            trump: '',
            team1Points: 0,
            team2Points: 0,
            team1Cheated: false,
            team2Cheated: false
        },
        numRound: 0
    }

    return await axios.post(url, game)
}

export async function playAuction(id: string, playerTurn: number, bid: number, bids: number[], turn: number) {
    const url = `/api/game/${id}/auction`;

    const data = {
        playerTurn,
        bid,
        bids,
        turn
    }

    return await axios.put(url, data);
}

export async function playCard(
    id: string,  
    card: ICard, 
    trick: number, 
    turn: number, 
    playerTurn: number,
    team1Bonus: number, 
    team2Bonus: number, 
    team1Cheated: boolean, 
    team2Cheated: boolean,
    openingPlayer: number
) {
    const url = `/api/game/${id}/play`;

    const data = {
        id,  
        card, 
        trick, 
        turn, 
        playerTurn,
        team1Bonus, 
        team2Bonus, 
        team1Cheated, 
        team2Cheated,
        openingPlayer
    }

    return await axios.put(url, data);
}

export async function endTrick(id: string, team1Bonus: number, team2Bonus: number, openingPlayer: number) {
    const url = `/api/game/${id}/end-trick`;

    const data = {
        team1Bonus,
        team2Bonus,
        openingPlayer
    }

    return await axios.put(url, data);
}

export async function endRound(id: string, numRound: number, team1Score: number, team2Score: number) {
    const url = `/api/game/${id}/end-round`;

    const data = {
        team1Score,
        team2Score,
        numRound
    }

    return await axios.put(url, data);
}
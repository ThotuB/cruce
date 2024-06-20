export interface ITable {
    id: string
    gameMode: number
    name: string
    joined: number
    time: number
    points: number
    password: string
    cheating: boolean
    bigger: boolean
}

export interface IMessage {
    uid: string
    name: string
    message: string
    time: string
    image?: string
}

export interface IUser {
    uid: string
    name: string | null
    photo: string | null
}

export interface ICard {
    suit: string
    value: number
}

export interface IGame {
    gameId: string
    team1Score: number
    team2Score: number
    joined: number
    players: (IUser | null)[]
    round: IGameRound
    numRound: number
}

export interface IGameRound {
    trick: number
    turn: number
    playerTurn: number
    openingPlayer: number
    playerCards: ICard[][]
    playedCards: ICard[]
    auction: {
        bids: number[]
        value: number
        winningTeam: number
    }
    trump: string
    team1Points: number
    team2Points: number
    team1Cheated: boolean
    team2Cheated: boolean
}

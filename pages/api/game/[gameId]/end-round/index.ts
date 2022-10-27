import { NextApiRequest, NextApiResponse } from 'next'
import { shuffleCards } from 'utils/game_rules'
import { connectToMongo } from 'utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { gameId } = req.query
        const { numRound, team1Score, team2Score } = req.body
        
        const { collection, client } = await connectToMongo('game')

        const cards = shuffleCards();

        const result = await collection.updateOne({
                gameId: gameId,
            }, {
                $set: {
                    'round.trick': 0,
                    'round.turn': 0,
                    'round.playerTurn': (numRound + 1) % 4,
                    'round.openingPlayer': (numRound + 1) % 4,
                    'round.trump': '',
                    'round.team1Cheated': false,
                    'round.team2Cheated': false,
                    'round.playerCards:': cards,
                    'round.auction': {
                        bids: [0, 0, 0, 0],
                        value: 0,
                        winningTeam: 0,
                    },
                    'round.team1Points': 0,
                    'round.team2Points': 0,
                },
                $inc: {
                    'numRound': 1,
                    'team1Score': team1Score,
                    'team2Score': team2Score,
                }
            })

        client.close()

        if (!result) {
            res.status(404)
            return
        }

        res.status(200).json({
            message: "Table updated!"
        })
    }
}
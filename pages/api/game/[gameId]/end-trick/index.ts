import { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongo } from 'utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { gameId } = req.query
        const { openingPlayer } = req.body

        console.log(openingPlayer)
        
        const { collection, client } = await connectToMongo('game')

        const result = await collection.updateOne({
                gameId: gameId,
            }, {
                $set: {
                    'round.turn': 0,
                    'round.playerTurn': openingPlayer,
                    'round.openingPlayer': openingPlayer,
                    'round.playedCards': []
                },
                $inc: {
                    'round.trick': 1,
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
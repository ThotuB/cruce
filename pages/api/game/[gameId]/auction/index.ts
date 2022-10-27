import { NextApiRequest, NextApiResponse } from 'next'
import { connectToMongo } from 'utils/mongodb'

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { gameId } = req.query
        const { playerTurn, bid, bids, turn } = req.body
        
        const { collection, client } = await connectToMongo('game')

        const newBids = [...bids]
        newBids[playerTurn] = bid
        const maxBid = Math.max(...newBids)
        const openingPlayer = newBids.indexOf(maxBid)
        const winningTeam = (openingPlayer === 0 || openingPlayer === 2) ? 1 : 2

        const result = (turn + 1 < 4)
            ? await collection.updateOne({
                    gameId: gameId,
                }, {
                    $set: {
                        'round.playerTurn': (playerTurn + 1) % 4,
                        'round.auction.bids': newBids,
                        'round.auction.value': maxBid,
                    },
                    $inc: {
                        'round.turn': 1,
                    }
                })
            : await collection.updateOne({
                gameId: gameId,
            }, {
                $set: {
                    'round.trick': 1,
                    'round.turn': 0,
                    'round.playerTurn': openingPlayer,
                    'round.openingPlayer': openingPlayer,
                    'round.auction.bids': newBids,
                    'round.auction.value': maxBid,
                    'round.auction.winningTeam': winningTeam
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
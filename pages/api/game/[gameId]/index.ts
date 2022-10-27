import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { gameId } = req.query;

        const { collection, client } = await connectToMongo('game');

        const result = await collection.findOne({ gameId: gameId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }
        
        res.status(200).json(result)
    }

    if (req.method === 'DELETE') {
        const { gameId } = req.query;

        const { collection, client } = await connectToMongo('game');

        const result = await collection.deleteOne({ gameId: gameId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            message: 'Table deleted successfully'
        })
    }
}

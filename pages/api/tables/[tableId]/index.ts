import { table } from 'console';
import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { tableId } = req.query;

        const { collection, client } = await connectToMongo('tables');
        
        const result = await collection.findOne({ id: tableId });

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json(result)
    }

    if (req.method === 'DELETE') {
        const { tableId } = req.query;

        const { collection, client } = await connectToMongo('tables');

        const result = await collection.deleteOne({ id: tableId });

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

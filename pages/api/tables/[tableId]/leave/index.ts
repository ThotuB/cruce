import { table } from 'console';
import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'PUT') {
        const { tableId } = req.query;

        const { collection, client } = await connectToMongo('tables');

        const result = await collection.updateOne(
            {
                id: tableId
            }, {
                $inc: {
                    joined : -1
                }
            }
        )

        client.close()

        if (!result) {
            res.status(404);
            return;
        }

        res.status(200).json({
            message: "Table updated!"
        })
    }
}

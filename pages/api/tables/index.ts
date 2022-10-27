import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'GET') {
        const { collection, client } = await connectToMongo('tables');

        const result = await collection.find({}).toArray();

        client.close()

        res.status(200).json(result.map(table => ({
            id: table.id,
            gameMode: table.gameMode,
            name: table.name,
            joined: table.joined,
            time: table.time,
            points: table.points,
            password: table.password,
            cheating: table.cheating,
            bigger: table.bigger
        })))
    }

    if (req.method === 'POST') {
        const data = req.body;

        const { collection, client } = await connectToMongo('tables');

        const result = await collection.insertOne(data)

        client.close()

        res.status(201).json({
            message: "Table Created"
        })
    }
}

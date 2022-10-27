import { MongoClient, ObjectId } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if (req.method === 'POST') {
        const data = req.body;
    
        const { collection, client } = await connectToMongo('game');
    
        const result = await collection.insertOne(data)
    
        client.close()
    
        res.status(201).json({
            message: "Game Created"
        })
    }
}



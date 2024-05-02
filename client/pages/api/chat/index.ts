import { MongoClient } from 'mongodb';
import { NextApiRequest, NextApiResponse } from 'next';
import { connectToMongo } from 'utils/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    // if (req.method === 'GET') {
    //     
    //     const { collection, client } = await connectToMongo('chat');
    //
    //     const result = await collection.find({}).toArray();
    //
    //     client.close()
    //
    //     res.status(200).json(result)
    // }
    //
    // if (req.method === 'POST') {
    //     const data = req.body;
    //
    //     const { collection, client } = await connectToMongo('chat');
    //
    //     const result = await collection.insertOne(data)
    //
    //     client.close()
    //
    //     res.status(201).json({
    //         message: "Message Created"
    //     })
    // }
}

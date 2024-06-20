import { MongoClient } from "mongodb"

export async function connectToMongo(collectionName: string) {
    const client = await MongoClient.connect(
        "mongodb+srv://admin:WF0qDFsvY6ux716Q@thotu.lmwwa.mongodb.net/cruce?retryWrites=true&w=majority",
    )

    const db = client.db()
    const collection = db.collection(collectionName)

    return {
        collection,
        client,
    }
}

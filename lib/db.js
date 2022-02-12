import { MongoClient } from 'mongodb'

const dbUrl = `mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASSWORD}@cluster0.6lgiz.mongodb.net/auth?retryWrites=true&w=majority`

export const connectToDatabase = async () => {
    const client = await MongoClient.connect(dbUrl)

    return client
}
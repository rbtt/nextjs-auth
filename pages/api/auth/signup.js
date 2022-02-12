import { connectToDatabase } from "../../../lib/db"
import { getSession } from "next-auth/react"
import { hashPassword, verifyPassword } from "../../../lib/auth"


const handler = async (req, res) => {
    if (req.method === 'POST') {
        const { email, password } = req.body
        const hashedPassword = await hashPassword(password)

        if (!email, !email.includes('@') || !password || password.trim().length < 7) {
            res.status(422).json({
                message: 'Invalid input - password length should be 7 or more characters'
            })
            return
        }

        const client = await connectToDatabase()
        const db = client.db()

        const existingUser = await db.collection('users').findOne({ email })

        if (existingUser) {
            res.status(422).json({ message: `User with email '${email}' already exist.` })
            client.close()
            return
        }

        const result = await db.collection('users').insertOne({ email, password: hashedPassword })

        res.status(201).json({ message: `Successfully created user. ID: ${result.insertedId}` })
        client.close()
    }

}

export default handler
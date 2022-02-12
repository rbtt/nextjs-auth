import { getSession } from "next-auth/react"
import { connectToDatabase } from '../../../lib/db'
import { hashPassword, verifyPassword } from "../../../lib/auth"

const handler = async (req, res) => {
    if (req.method !== 'PUT') {
        res.status(400).json({message: 'Nothing to see here.'})
        return
    }
    
    const session = await getSession({ req })
    if (!session) {
        res.status(401).json({ message: 'You must be logged in to do that' })
        return
    }

    const { newPass, oldPass } = req.body
    const newHashedPass = await hashPassword(newPass)

    const email = session.user.email

    const client = await connectToDatabase()
    const collection = client.db().collection('users')

    const userFromDb = await collection.findOne({ email })

    if (newPass === oldPass || newPass.trim().length < 7) {
        res.status(400).json({ message: 'Invalid Credentials' })
        client.close()
        return
    }

    if (!await verifyPassword(oldPass, userFromDb.password)) {
        res.status(403).json({ message: 'Wrong Credentials' })
        client.close()
        return
    }

    if (await verifyPassword(oldPass, userFromDb.password)) {
        const response = await collection.updateOne({ email }, { $set: { password: newHashedPass } })
        console.log(response)
        res.status(200).json({ message: 'Successfully Changed Password' })
        client.close()
    }

    client.close()
}
export default handler
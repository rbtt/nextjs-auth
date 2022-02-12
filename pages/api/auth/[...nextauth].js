import NextAuth from 'next-auth'
import CredentialsProvider from "next-auth/providers/credentials";
import { connectToDatabase } from '../../../lib/db'
import { verifyPassword } from '../../../lib/auth'

export default NextAuth({
  session: {
    jwt: true
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        console.log(credentials)
        const client = await connectToDatabase()

        const usersCollection = client.db().collection('users')

        const user = await usersCollection.findOne({ email: credentials.email })

        if (!user) {
          client.close()
          throw new Error('No User Found.')
        }

        const isValid = await verifyPassword(credentials.password, user.password)

        if (!isValid) {
          client.close()
          throw new Error('Invalid Username / Password')
        }

        client.close()

        return { email: user.email } // email added to JWT        
      }
    })
  ],
  secret: 'Orgca2obC5cokrEPbwOHWuP+bOV8QzcG6DmdAiSazKY='
})
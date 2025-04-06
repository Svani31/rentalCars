import NextAuth from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import prisma from "../../../utils/prismadb/prismadb"
import {compare} from "bcrypt";


const handler = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. 'Sign in with...')
            name: 'Credentials',
            // The credentials is used to generate a suitable form on the sign in page.
            // You can specify whatever fields you are expecting to be submitted.
            // e.g. domain, username, password, 2FA token, etc.
            // You can pass any HTML attribute to the <input> tag through the object.
            credentials: {
                name: { label: "Username", type: "text", placeholder: "jsmith" },
                email: { label: "Password", type: "password" },
                password:{ label: "Password", type: "password" },
            },
            // eslint-disable-next-line @typescript-eslint/no-unused-vars
            async authorize(credentials, req) {
                // You need to provide your own logic here that takes the credentials
                // submitted and returns either a object representing a user or value
                // that is false/null if the credentials are invalid.
                // e.g. return { id: 1, name: 'J Smith', email: 'jsmith@example.com' }
                // You can also use the `req` object to obtain additional parameters
                // (i.e., the request IP address)

                //   Check User Credentials

                try{
                    if(!credentials.email || !credentials.password){
                        throw new Error("Name or Password is Wrong")
                    }
                //     find User By email

                    const user = await prisma.user.findUnique({
                        where: {
                            email: credentials.email,
                        }
                    })
                //     compare hashed password with credential passowrd

                    const hashedPassword = await compare(credentials.password, user.password)

                    if(!hashedPassword){
                        throw new Error("Passwords don't match")
                    }

                    return{
                        id: user.id,
                        name: user.name,
                        email: user.email,
                    }


                }catch (error){
                    throw error
                }


            }
        })
    ],
    callbacks: {
        async session({ session, token, user }) {
            // Send properties to the client, like an access_token and user id from a provider.
            session.accessToken = token.accessToken
            session.user.id = token.id
            console.log(session,"this is user Session to")
            return session
        }
    },
    pages: {
        signIn: '/',
    },
    secret:"dfgsdfg345124",
    session:{
        strategy:"jwt"
    }
})

export { handler as GET, handler as POST }
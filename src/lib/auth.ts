import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter"
import prisma from "../../src/lib/prisma";
import type { Adapter } from "next-auth/adapters";
// import EmailProvider from "next-auth/providers/email";
// import sendVerificationEmail from "../actions/sendVerificationEmail";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
    adapter: PrismaAdapter(prisma) as Adapter,
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID as string,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
        }),
        // EmailProvider({
        //     server: {
        //         host: process.env.EMAIL_SERVER_HOST,
        //         port: process.env.EMAIL_SERVER_PORT,
        //         auth: {
        //             user: process.env.EMAIL_SERVER_USER,
        //             pass: process.env.EMAIL_SERVER_PASSWORD
        //         }
        //     },
        //     from: process.env.EMAIL_FROM,
        //     sendVerificationRequest({
        //         identifier: email,
        //         url,
        //         provider: { server, from },
        //     }) {
        //         return sendVerificationEmail(
        //             url,
        //             process.env.EMAIL_SERVER_HOST,
        //             email
        //         );
        //     },
        // }),
        // CredentialsProvider({
        //     name: "Credentials",
        //     credentials: {
        //         username: { label: "Username", type: "text", placeholder: "jsmith" },
        //         password: { label: "Password", type: "password" }
        //     },
        //     async authorize(credentials, req) {
        //         const user = { id: "1", name: "J Smith", email: "jsmith@example.com" }
        //         if (user) {
        //             return user
        //         } else {
        //             return null
        //         }
        //     }
        // })
    ],
    secret: process.env.NEXTAUTH_SECRET,
    session: {
        strategy: 'jwt'
    },
} satisfies NextAuthOptions;
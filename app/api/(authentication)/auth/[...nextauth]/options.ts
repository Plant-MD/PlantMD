import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import dbConnect from "@/lib/dbConnect";
import UserModel from "@/models/User";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID!
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET!

export const authOptions: NextAuthOptions = {
    debug: true,
    session: {
        strategy: "jwt",
    },
    providers: [
        GoogleProvider({
            clientId: GOOGLE_CLIENT_ID,
            clientSecret: GOOGLE_CLIENT_SECRET,
            authorization: {
                params: {
                    prompt: "consent",
                    access_type: "offline",
                    response_type: "code"
                }
            }
        })
    ],
    pages: {
        signIn: '/',
        error: '/',
    },
    callbacks: {
        async signIn({ account, profile }) {
            await dbConnect();

            if (!profile?.email) {
                throw new Error("No Profile");
            }

            const username = profile.email.split('@')[0].toLowerCase().replace(/[^a-z0-9]/g, '');

            await UserModel.findOneAndUpdate(

                { email: profile.email },
                {
                    $setOnInsert: {
                        email: profile.email,
                        username: username // Only if inserting
                    },
                    $set: {
                        name: profile.name
                    }
                },
                {
                    new: true,
                    upsert: true
                }
            );

            return true
        },

        async jwt({ token, user }) {
            await dbConnect();

            // Only on first sign in
            if (user?.email) {
                const dbUser = await UserModel.findOne({ email: user.email });
                token._id = dbUser?._id?.toString();
                token.username = dbUser?.username;
                token.email = dbUser?.email;
            }

            return token;
        },

        async session({ session, token }) {
            if (token) {
                session.user._id = token._id;
                session.user.username = token.username;
                session.user.email = token.email;
            }
            return session;
        },

    },
};
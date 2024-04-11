import { NextRequest, NextResponse } from "next/server"
import NextAuth from "next-auth"
import CredentialsProvider from 'next-auth/providers/credentials';
import SpotifyProvider from "next-auth/providers/spotify";

const handler = NextAuth({
  providers: [
      SpotifyProvider({
        clientId: process.env.SPOTIFY_ID,
        clientSecret: process.env.SPOTIFY_SECRET,
        authorization: { params: { scope: ['user-modify-playback-state', 'user-read-currently-playing'].join(",") }},
      })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, account }) {
      // Persist the OAuth access_token to the token right after signin
      if (account) {
        token.accessToken = account.access_token
      }
      return token
    },
    async session({ session, token, user }) {
      session.accessToken = token.accessToken;
      return session;
    }
  }
})

export { handler as GET, handler as POST }


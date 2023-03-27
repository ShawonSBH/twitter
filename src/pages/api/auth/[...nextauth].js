import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { POST } from "@/utils/reqMethods";

export const authOptions = {
  session: {
    strategy: "jwt",
  },
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
    CredentialsProvider({
      id: "credentials",
      name: "Credentials",
      credentials: {},
      async authorize(credentials, req) {
        const res = await fetch("http://localhost:3000/api/users/login", {
          method: POST,
          body: JSON.stringify(credentials),
          headers: { "Content-Type": "application/json" },
        });
        const response = await res.json();
        if (response.success) {
          return response.user;
        } else {
          return null;
        }
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, params }) {
      session.user.id = token.id;
      session.user.name = token.name;
      session.user.username = token.username;
      session.user.email = token.email;
      session.user.profilePicture = token.profilePicture;
      // session.user.isComplete = token.isComplete;
      // session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user._id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.profilePicture = user.profilePicture;
        // token.isComplete = user?.isComplete || false;
        // token.accessToken = user?.accessToken || "";
      }
      if (account) {
        // token.accessToken = account.access_token;
      }
      return token;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

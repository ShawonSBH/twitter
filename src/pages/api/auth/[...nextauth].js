import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";
import CredentialsProvider from "next-auth/providers/credentials";
import { POST } from "@/utils/reqMethods";
import connectMongo from "@/utils/db";
import Users from "@/models/Users";

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
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        const user = await Users.findOne({ email: token.email });
        console.log(user);
        token.id = user._id;
        token.name = user.name;
        token.username = user.username;
        token.email = user.email;
        token.profilePicture = user.profilePicture;
      }
      return token;
    },
    async signIn({ user, account }) {
      await connectMongo();
      const { email, name, image } = user;
      const existingUser = await Users.findOne({ email });
      //console.log(existingUser);
      if (existingUser) {
        return true;
      }
      const newUser = await Users.create({
        name,
        username: user.email.split("@")[0],
        email,
        profilePicture: image,
      });
      return true;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);

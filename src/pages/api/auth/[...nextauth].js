import NextAuth from "next-auth/next";
import GithubProvider from "next-auth/providers/github";

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
      authorize(credentials, req) {
        const { email, password } = credentials;

        if (email !== "next-auth@gmail.com" || password !== "123459876") {
          throw new Error("invalid credentials");
        }

        return {
          id: "1234",
          name: "John Doe",
          email: "john@gmail.com",
          role: "admin",
          isComplete: "false",
          accessToken: "kffsgsgs.jgsjgbsjg.jksgkjg",
        };
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  callbacks: {
    async session({ session, token, params }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.isComplete = token.isComplete;
      session.user.accessToken = token.accessToken;
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.id = user.id;
        token.role = user?.role || "user";
        token.isComplete = user?.isComplete || false;
        token.accessToken = user?.accessToken || "";
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

// lib/auth-options.ts
import Credentials from "next-auth/providers/credentials";
import bcrypt      from "bcryptjs";
import { prisma }  from "./prisma";

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",          // be explicit
    maxAge:   30 * 24 * 60 * 60
  },

  providers: [
    Credentials({
      name: "Email & password",
      credentials: {
        email:    { label: "Email",    type: "email"    },
        password: { label: "Password", type: "password" }
      },
      async authorize(creds) {
        if (!creds?.email || !creds?.password)
          throw new Error("Missing credentials");

        const user = await prisma.user.findUnique({
          where: { email: creds.email.toLowerCase() }
        });
        if (!user) throw new Error("Invalid email or password");

        const ok = await bcrypt.compare(creds.password, user.password);
        if (!ok)  throw new Error("Invalid email or password");

        // Anything returned here shows up in `user` param of jwt() callback
        return { id: user.id, email: user.email };
      }
    })
  ],

  callbacks: {
    /** Runs on every JWT update (login & each request) */
    async jwt({ token, user }) {
      // 1st time (on login)
      if (user) return { ...token, id: user.id, email: user.email };

      // Subsequent requests – check DB row still exists
      if (token?.id) {
        const exists = await prisma.user.findUnique({
          where: { id: token.id }, select: { id: true }
        });
        if (!exists) return {};       // 🔒 invalidate
      }
      return token;
    },

    /** Shapes the object returned by `useSession()` */
    async session({ session, token }) {
      if (!token?.id) return null;    // unauthenticated
      session.user = { id: token.id, email: token.email };
      return session;
    }
  },

  // Optional: prevent Vercel preview “trust host” warnings
  trustHost: true
};

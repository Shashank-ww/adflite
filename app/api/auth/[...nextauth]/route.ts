import NextAuth, {
  type NextAuthOptions,
} from "next-auth";

import GoogleProvider from "next-auth/providers/google";

import { PrismaAdapter } from "@auth/prisma-adapter";

import { prisma } from "@/lib/prisma";

export const authOptions: NextAuthOptions =
  {
    adapter: PrismaAdapter(prisma),

    providers: [
      GoogleProvider({
        clientId:
          process.env
            .GOOGLE_CLIENT_ID!,

        clientSecret:
          process.env
            .GOOGLE_CLIENT_SECRET!,

            allowDangerousEmailAccountLinking: true,
            
      }),
    ],

    secret: process.env.NEXTAUTH_SECRET,

    session: {
      strategy: "jwt",
    },

    callbacks: {
      async signIn({ user }) {
        if (!user.email) {
          return false;
        }

        const existingUser =
          await prisma.user.findUnique({
            where: {
              email: user.email,
            },
          });

        // CREATE USER IF MISSING
        if (!existingUser) {
          await prisma.user.create({
            data: {
              email: user.email,

              name:
                user.name || "",

              image:
                user.image || "",

              skills: [],

              languages: [],
            },
          });
        }

        return true;
      },

      async jwt({
        token,
        user,
      }) {
        if (user?.id) {
          token.id = user.id;
        }

        if (
          !token.id &&
          token.sub
        ) {
          token.id = token.sub;
        }

        // GET USER
        const dbUser =
          await prisma.user.findUnique({
            where: {
              email:
                token.email!,
            },
          });

        if (dbUser) {
          token.id = dbUser.id;

          token.onboarded =
            !!dbUser.headline;
        }

        return token;
      },

      async session({
        session,
        token,
      }) {
        if (session.user) {
          session.user.id =
            token.id as string;

          session.user.onboarded =
            token.onboarded as boolean;
        }

        return session;
      },
    },
  };

const handler =
  NextAuth(authOptions);

export {
  handler as GET,
  handler as POST,
};
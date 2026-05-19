// /lib/auth.ts

import type {
  NextAuthOptions,
} from "next-auth";

import GoogleProvider
from "next-auth/providers/google";

import { PrismaAdapter }
from "@auth/prisma-adapter";

import { prisma }
from "@/lib/prisma";

export const authOptions:
NextAuthOptions = {

  adapter:
    PrismaAdapter(prisma),

  providers: [

    GoogleProvider({

      clientId:
        process.env
          .GOOGLE_CLIENT_ID!,

      clientSecret:
        process.env
          .GOOGLE_CLIENT_SECRET!,

      /**
       * Safe for Google-only auth.
       * Will reconsider once adding other credentials/github/etc.
       */

      allowDangerousEmailAccountLinking:
        true,

    }),

  ],

  secret:
    process.env
      .NEXTAUTH_SECRET,

  session: {
    strategy: "jwt",
  },

  pages: {
    signIn: "/login",
  },

  callbacks: {

    async jwt({
      token,
      user,
    }) {

      /**
       * Initial login
       */

      if (user?.id) {
        token.id = user.id;
      }

      /**
       * Prevent repeated DB hits
       */

      if (
        token.onboarded !==
        undefined
      ) {
        return token;
      }

      /**
       * Fetch lightweight profile
       */

      try {

        const dbUser =
          await prisma.user.findUnique({

            where: {
              email:
                token.email!,
            },

            select: {
              id: true,
              headline: true,
            },

          });

        if (dbUser) {

          token.id =
            dbUser.id;

          token.onboarded =
            !!dbUser.headline;

        }

      } catch (error) {

        console.error(
          "JWT callback error:",
          error
        );

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

  events: {

    /**
     * Runs AFTER adapter
     * creates the user safely
     */

    async createUser({
      user,
    }) {

      try {

        await prisma.user.update({

          where: {
            id: user.id,
          },

          data: {

            skills: [],

            languages: [],

          },

        });

      } catch (error) {

        console.error(
          "Create user event error:",
          error
        );

      }

    },

  },

};
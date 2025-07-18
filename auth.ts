import prisma from "@/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHub from "next-auth/providers/github";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  callbacks: {
    authorized: async ({ auth }) => {
      return !!auth;
    }
  },
  providers: [GitHub],
});

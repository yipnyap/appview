import NextAuth, { NextAuthOptions } from "next-auth";

export const authOptions: NextAuthOptions = {
  // adapter: PrismaAdapter(prisma),
  providers: [],
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };

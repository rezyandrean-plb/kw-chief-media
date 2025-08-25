import { NextAuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export const authOptions: NextAuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      // Allow KW Singapore realtors and Property Lim Brothers users
      const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
      const isAllowedDomain = allowedDomains.some(domain => user.email?.endsWith(domain));
      
      if (user.email && isAllowedDomain) {
        return true;
      }
      
      // Allow admin users
      if (user.email === 'isabelle@chiefmedia.sg') {
        return true;
      }
      
      // Allow vendor users (vendors will be managed through admin dashboard)
      // For now, we'll allow any email that's not explicitly blocked
      // In production, this should be validated against a vendor database
      return true;
    },
    async jwt({ token, user, account }) {
      if (account && user) {
        // Set user role based on email domain
        let role = 'client';
        const allowedDomains = ['@kwsingapore.com', '@propertylimbrothers.com'];
        const isAllowedDomain = allowedDomains.some(domain => user.email?.endsWith(domain));
        
        if (isAllowedDomain) {
          role = 'realtor';
        } else if (user.email === 'isabelle@chiefmedia.sg') {
          role = 'admin';
        } else {
          // Check if user is a vendor (this would typically query a database)
          // For now, we'll assume any non-realtor, non-admin user is a vendor
          role = 'vendor';
        }
        
        token.role = role;
        token.id = user.id;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        session.user.role = token.role as string;
      }
      return session;
    },
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  session: {
    strategy: "jwt",
  },
  secret: process.env.NEXTAUTH_SECRET,
};

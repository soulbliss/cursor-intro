import {
  AUTH_SECRET,
  GOOGLE_CLIENT_ID,
  GOOGLE_CLIENT_SECRET,
} from '@/config/env';
import { db } from '@/db/index';
import { DrizzleAdapter } from '@auth/drizzle-adapter';
import { NextAuthOptions } from 'next-auth';
import { Adapter } from 'next-auth/adapters';
import GoogleProvider from 'next-auth/providers/google';

export const authOptions: NextAuthOptions = {
  adapter: DrizzleAdapter(db) as Adapter,
  secret: AUTH_SECRET,
  pages: {
    error: '/login',
  },
  theme: {
    colorScheme: 'light',
    logo: '/favicon.ico',
    buttonText: '#ffffff',
    brandColor: '#000000',
  },
  providers: [
    GoogleProvider({
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
    }),
  ],


};

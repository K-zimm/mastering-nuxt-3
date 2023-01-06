import { NuxtAuthHandler } from '#auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../trpc/prisma';
import GoogleProvider from 'next-auth/providers/google';
// import EmailProvider from 'next-auth/providers/email';

const { private: configs } = useRuntimeConfig();

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: configs.googleClientId,
      clientSecret: configs.googleClientSecret
    })
    // TODO: Add email provider
    // EmailProvider.default({
    //   server: {
    //     host: configs.emailServerHost,
    //     port: configs.emailServerPort,
    //     auth: {
    //       user: configs.emailServerUser,
    //       pass: configs.emailServerPassword
    //     }
    //   },
    //   from: 'noreply@inkbook.com'
    // })
  ],
  pages: {
    signIn: '/auth/login'
  }
});

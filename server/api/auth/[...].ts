import { NuxtAuthHandler } from '#auth';
import GoogleProvider from 'next-auth/providers/google';

const { private: configs } = useRuntimeConfig();

export default NuxtAuthHandler({
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: configs.googleClientId,
      clientSecret: configs.googleClientSecret
    })
  ],
  pages: {
    signIn: '/auth/login'
  }
});

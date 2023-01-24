import { NuxtAuthHandler } from '#auth';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '../../trpc/prisma';
import GoogleProvider from 'next-auth/providers/google';
import CredentialsProvider from 'next-auth/providers/credentials';
// import EmailProvider from 'next-auth/providers/email';

const { private: configs } = useRuntimeConfig();

export default NuxtAuthHandler({
  adapter: PrismaAdapter(prisma),
  secret: configs.authSecret,
  providers: [
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    GoogleProvider.default({
      clientId: configs.googleClientId,
      clientSecret: configs.googleClientSecret
    })
    // @ts-ignore Import is exported on .default during SSR, so we need to call it this way. May be fixed via Vite at some point
    // CredentialsProvider.default({
    //   // The name to display on the sign in form (e.g. "Sign in with...")
    //   name: 'Credentials',
    //   // `credentials` is used to generate a form on the sign in page.
    //   // You can specify which fields should be submitted, by adding keys to the `credentials` object.
    //   // e.g. domain, username, password, 2FA token, etc.
    //   // You can pass any HTML attribute to the <input> tag through the object.
    //   credentials: {
    //     username: { label: 'Username', type: 'text', placeholder: 'email' },
    //     password: { label: 'Password', type: 'password' }
    //   },
    //   async authorize(credentials, req) {
    //     try {
    //       let foundUser = await prisma.users.findUnique({ where: {email: credentials.username}});
    //       if (!foundUser) {
    //         res.status(401).json({
    //           success: false,
    //           message: 'Email Not Found'
    //         });
    //       } else {
    //         if (foundUser.comparePassword(req.body.password)) {
    //           const token = jwt.sign(foundUser.toJSON(), process.env.SECRET, {
    //             expiresIn: 604800
    //           });
    //           res.json({ success: true, token });
    //         } else {
    //           res.status(401).json({
    //             success: false,
    //             message: 'Wrong Password'
    //           });
    //         }
    //       }
    //     } catch (error) {
    //       res.status(500).json({
    //         success: false,
    //         message: error.message
    //       });
    //     }
    //   }
    // })
  ],
  pages: {
    signIn: '/auth/login'
  }
});

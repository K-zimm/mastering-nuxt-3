import { z } from 'zod';
import { publicProcedure, router } from '../trpc';
import { prisma } from '../prisma';

export const appRouter = router({
  hello: publicProcedure
    .input(
      z.object({
        text: z.string().nullish()
      })
    )
    .query(({ input }) => {
      return {
        greeting: `hello ${input?.text ?? 'world'}`
      };
    }),
  listUsers: publicProcedure.query(async () => {
    const users = await prisma.users.findMany();
    return users;
  })
});
// export type definition of API
export type AppRouter = typeof appRouter;

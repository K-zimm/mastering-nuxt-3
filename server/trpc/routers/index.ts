import { router } from '../trpc';

import { customerRouter } from './customer';

export const appRouter = router({
  customer: customerRouter
});
// export type definition of API
export type AppRouter = typeof appRouter;

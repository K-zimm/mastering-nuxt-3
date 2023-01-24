import { router, protectedProcedure } from '../trpc';
import { prisma } from '../prisma';
import { z } from 'zod';

const CustomerSchema = z.object({
  firstName: z.string(),
  lastName: z.string(),
  phone: z.string()
});

export const customerRouter = router({
  list: protectedProcedure.query(async ({ ctx }) => {
    const customers = await prisma.customer.findMany();
    return customers;
  }),
  add: protectedProcedure.input(CustomerSchema).mutation(async (req) => {
    const customer = await prisma.customer.create({
      data: req.input
    });
    return customer;
  })
});

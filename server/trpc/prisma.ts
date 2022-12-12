import { PrismaClient } from '@prisma/client';

const config = useRuntimeConfig();

export const prisma: PrismaClient = new PrismaClient({
  log: config.public.dev ? ['query', 'error', 'warn'] : ['error']
});

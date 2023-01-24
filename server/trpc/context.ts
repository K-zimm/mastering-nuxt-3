import { inferAsyncReturnType } from '@trpc/server';
import { getServerSession } from '#auth';
import type { H3Event } from 'h3';

export type Context = inferAsyncReturnType<typeof createContext>;

export async function createContext(event: H3Event) {
  const session = await getServerSession(event);
  async function getUserFromSession() {
    if (session) {
      const user = await session.user;
      return user;
    }
    return null;
  }
  const user = getUserFromSession();

  return {
    user
  };
}

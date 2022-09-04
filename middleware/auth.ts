import { useApi } from '~~/composables/useApi';

interface userResponse {
  success: boolean;
  user: {
    email: string;
    name: string;
  };
}

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useCookie('authorization');

  if (!auth.value) {
    if (to.path !== '/auth/login') return '/auth/login';
  } else {
    await useApi('/auth/user').then((res: userResponse) => {
      if (res.success) {
        useState('user', () => res.user);
        return true;
      }
      return '/auth/login';
    });
  }
});

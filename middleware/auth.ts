import { useApi } from '~~/composables/useApi';
import { useAuthStore } from '~/stores/auth';

interface userResponse {
  success: boolean;
  user: {
    _id: string;
    email: string;
    imageUrl: string;
    name: string;
  };
}

export default defineNuxtRouteMiddleware(async (to) => {
  const auth = useCookie('authorization');
  const { $pinia } = useNuxtApp();
  const authStore = useAuthStore($pinia);

  if (!auth.value) {
    if (to.path !== '/auth/login') return '/auth/login';
  } else {
    if (!authStore.user) {
      await useApi('/auth/user').then((res: userResponse) => {
        if (res.success) {
          authStore.user = res.user;
          return true;
        }
        return '/auth/login';
      });
    }
  }
});

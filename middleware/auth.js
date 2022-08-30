export default defineNuxtRouteMiddleware(async (to) => {
  const config = useRuntimeConfig();
  const auth = useCookie('authorization');
  console.log('cookie', auth.value);

  if (!auth.value) {
    if (to.path !== '/auth/login') return '/auth/login';
  } else {
    console.log('base', config);
    const data = await $fetch(`${apiBase.value}/api/auth/user`, {
      method: 'GET'
    });
    if (data.success) {
      const user = $ref(data.user);
      console.log(user);
    }
    console.log(data.message);
    return '/auth/login';
  }
});

export const useApi = async (route: string) => {
  const apiBase = useRuntimeConfig().public.apiBase;
  const auth = useCookie('authorization');

  return $fetch(`${apiBase}/api${route}`, {
    method: 'GET',
    headers: {
      authorization: `Bearer ${auth.value}`
    }
  });
};

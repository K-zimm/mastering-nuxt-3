<script setup lang="ts">
interface LoginResponse {
  success: boolean;
  token: string;
}

const apiBase = useRuntimeConfig().public.apiBase;

const email = $ref('');
const password = $ref('');

let errors = $ref([]);

const { getProviders, signIn } = useSession();

const providers = await getProviders();

// const login = async () => {
//   errors = [];
//   await $fetch(`${apiBase}/api/auth/login`, {
//     method: 'POST',
//     body: { email, password }
//   })
//     .then((response: LoginResponse) => {
//       if (response.success) {
//         const cookie = useCookie('authorization');
//         cookie.value = response.token;
//         navigateTo('/');
//       }
//     })
//     .catch((err) => {
//       errors.push(err.response._data);
//     });
// };

// const forgotPass = async () => {
//   await $fetch(`${apiBase}/api/auth/forgotPass`, {
//     method: 'POST',
//     body: { email }
//   })
//     .then((response: LoginResponse) => {
//       if (response.success) {
//         const cookie = useCookie('resetToken');
//         cookie.value = response.token;
//         navigateTo('/auth/pass-reset');
//       }
//     })
//     .catch((err) => {
//       errors.push(err.response._data);
//     });
// };
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign in to your account</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email address </label>
            <div class="mt-1">
              <input
                v-model="email"
                id="email"
                name="email"
                type="email"
                autocomplete="email"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @keyup.enter="login"
              />
            </div>
          </div>

          <div>
            <label for="password" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input
                v-model="password"
                id="password"
                name="password"
                type="password"
                autocomplete="current-password"
                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                @keyup.enter="login"
              />
            </div>
          </div>

          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <input
                id="remember-me"
                name="remember-me"
                type="checkbox"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
            </div>

            <div class="text-sm">
              <div class="font-medium text-indigo-600 hover:text-indigo-500" @click="forgotPass">
                Forgot your password?
              </div>
            </div>
          </div>

          <div>
            <div
              class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              @click="login"
            >
              Sign in
            </div>
          </div>
        </form>
        <div class="mt-6">
          <div class="relative">
            <div class="absolute inset-0 flex items-center">
              <div class="w-full border-t border-gray-300" />
            </div>
            <div class="relative flex justify-center text-sm">
              <span class="bg-white px-2 text-gray-500">Or continue with</span>
            </div>
          </div>

          <div class="mt-6 grid grid-cols-3 gap-3">
            <div v-for="provider of providers">
              <a
                href="#"
                class="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white py-2 px-4 text-sm font-medium text-gray-500 shadow-sm hover:bg-gray-50"
                @click="signIn(provider?.id, { callbackUrl: '/' })"
              >
                <span class="sr-only">Sign in with {{ provider?.name }}</span>
                <font-awesome-icon :icon="['fab', `fa-${provider?.name.toLowerCase()}`]" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div v-for="error in errors">{{ error.message }}</div>
    </div>
  </div>
</template>

<style scoped></style>

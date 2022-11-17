<script setup lang="ts">
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

interface resetResponse {
  success: boolean;
}

definePageMeta({
  layout: 'auth'
});

const apiBase = useRuntimeConfig().public.apiBase;
const auth = useCookie('resetToken');
let authQuery;

if (!auth.value) {
  const route = useRoute();
  authQuery = route.query.token;
  console.log('noAuth', authQuery);
}

const validationSchema = toFormValidator(
  zod
    .object({
      password: zod.string().nonempty('Password is required').min(8, { message: 'Password must be 8 characters long' }),
      confirm: zod.string().nonempty('Confirm Password')
    })
    .refine((data) => data.password === data.confirm, {
      message: "Passwords don't match",
      path: ['confirm']
    })
);
const { handleSubmit, errors } = useForm({
  validationSchema
});
const { value: password } = useField('password', null, { validateOnValueUpdate: false });
const { value: confirm } = useField('confirm', null, { validateOnValueUpdate: false });

let serverErrors = $ref([]);

const resetPass = handleSubmit(async (values) => {
  serverErrors = [];
  await $fetch(`${apiBase}/api/auth/resetPass`, {
    method: 'POST',
    body: values,
    headers: {
      authorization: `Bearer ${auth.value || authQuery}`
    }
  })
    .then((response: resetResponse) => {
      if (response.success) {
        navigateTo('/auth/login');
      }
    })
    .catch((err) => {
      serverErrors.push(err.response._data);
    });
});
</script>

<template>
  <div class="min-h-full flex flex-col justify-center py-12 sm:px-6 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-md">
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Reset Password</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-6">
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700"> Password </label>
            <div class="mt-1">
              <input name="password" v-model="password" type="password" class="input__text" />
              <transition name="slide-up">
                <span v-if="errors.password">{{ errors.password }}</span>
              </transition>
            </div>
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700"> Confirm Password </label>
            <div class="mt-1">
              <input name="password" v-model="confirm" type="password" class="input__text" />
              <transition name="slide-up">
                <span v-if="errors.confirm">{{ errors.confirm }}</span>
              </transition>
            </div>
          </div>
          <div
            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 cursor-pointer hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            @click="resetPass"
          >
            Save Password
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

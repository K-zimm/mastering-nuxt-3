<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

interface signupResponse {
  success: boolean;
  token: string;
}

definePageMeta({
  layout: 'auth'
});

const apiBase = useRuntimeConfig().public.apiBase;

const validationSchema = toFormValidator(
  zod
    .object({
      firstName: zod.string().nonempty('First Name is required'),
      lastName: zod.string().nonempty('Last Name is required'),
      email: zod.string().nonempty('Email is required').email({ message: 'Must be a valid email' }),
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
const { value: firstName } = useField('firstName', null, { validateOnValueUpdate: false });
const { value: lastName } = useField('lastName', null, { validateOnValueUpdate: false });
const { value: email } = useField('email', null, { validateOnValueUpdate: false });
const { value: password } = useField('password', null, { validateOnValueUpdate: false });
const { value: confirm } = useField('confirm', null, { validateOnValueUpdate: false });

let serverErrors = $ref([]);
const onSubmit = handleSubmit(async (values) => {
  serverErrors = [];
  await $fetch(`${apiBase}/api/auth/signup`, {
    method: 'POST',
    body: values
  })
    .then((response: signupResponse) => {
      if (response.success) {
        const cookie = useCookie('authorization');
        cookie.value = response.token;
        navigateTo('/');
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
      <h2 class="mt-6 text-center text-3xl tracking-tight font-bold text-gray-900">Sign up</h2>
    </div>

    <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
      <div class="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
        <form class="space-y-3" @submit="onSubmit">
          <div>
            <label for="email" class="block text-sm font-medium text-gray-700"> Email </label>
            <div class="mt-1">
              <input name="email" v-model="email" type="text" class="input__text" />
              <transition name="slide-up"
                ><div v-if="errors.email">{{ errors.email }}</div>
              </transition>
            </div>
          </div>
          <div>
            <label for="firstName" class="block text-sm font-medium text-gray-700"> First Name </label>
            <div class="mt-1">
              <input name="firstName" v-model="firstName" type="text" class="input__text" />
              <transition name="slide-up">
                <span v-if="errors.firstName">{{ errors.firstName }}</span>
              </transition>
            </div>
          </div>
          <div>
            <label for="lastName" class="block text-sm font-medium text-gray-700"> Last Name </label>
            <div class="mt-1">
              <input name="lastName" v-model="lastName" type="text" class="input__text" />
              <transition name="slide-up">
                <span v-if="errors.lastName">{{ errors.lastName }}</span>
              </transition>
            </div>
          </div>
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
            <label for="lastName" class="block text-sm font-medium text-gray-700">Confirm Password </label>
            <div class="mt-1">
              <input name="password" v-model="confirm" type="password" class="input__text" />
              <transition name="slide-up">
                <span v-if="errors.confirm">{{ errors.confirm }}</span>
              </transition>
            </div>
          </div>
          <button>Submit</button>
        </form>
      </div>
    </div>
  </div>
</template>

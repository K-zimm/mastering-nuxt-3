<template>
  <form @submit="onSubmit">
    <input name="email" v-model="email" type="email" />
    <span>{{ errors.email }}</span>
    <input name="password" v-model="password" type="password" />
    <span>{{ errors.password }}</span>
    <button>Submit</button>
  </form>
</template>
<script lang="ts" setup>
import { useField, useForm } from 'vee-validate';
import { toFormValidator } from '@vee-validate/zod';
import * as zod from 'zod';

definePageMeta({
  layout: 'auth'
});

const validationSchema = toFormValidator(
  zod.object({
    email: zod.string().nonempty('This is required').email({ message: 'Must be a valid email' }),
    password: zod.string().nonempty('This is required').min(8, { message: 'Too short' })
  })
);
const { handleSubmit, errors } = useForm({
  validationSchema
});
const { value: email } = useField('email', null, { validateOnValueUpdate: false });
const { value: password } = useField('password', null, { validateOnValueUpdate: false });
const onSubmit = handleSubmit((values) => {
  alert(JSON.stringify(values, null, 2));
});
</script>

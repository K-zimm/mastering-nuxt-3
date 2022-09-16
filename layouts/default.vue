<template>
  <div>
    <div class="flex space-x-4">
      <div>{{ user?.name }}</div>
      <div class="px-4 py-1 rounded-lg shadow-sm bg-gray-200 text-lg cursor-pointer" @click="logout">Logout</div>
    </div>
    <div class="flex">
      <div>Side bar</div>
      <slot />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useAuthStore } from '@/stores/auth';
definePageMeta({
  middleware: ['auth']
  // or middleware: 'auth'
});
const user = useAuthStore().user;

const logout = () => {
  const auth = useCookie('authorization');
  auth.value = null;
  navigateTo('/auth/login');
};
</script>

<style scoped></style>

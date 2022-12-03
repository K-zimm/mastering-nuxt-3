import { defineStore } from 'pinia';

type User = {
  _id: string;
  email: string;
  imageUrl: string;
  name: string;
} | null;

export const useAuthStore = defineStore('auth', () => {
  const user: User = ref(null);
  return { user };
});

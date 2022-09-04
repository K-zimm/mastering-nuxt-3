import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss'],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://localhost:4000/graphql',
      apiBase: ''
    }
  },
  experimental: {
    reactivityTransform: true
  },
  build: {
    analyze: true
  }
});

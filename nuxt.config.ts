import { defineNuxtConfig } from 'nuxt';

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/styles/main.scss'],
  modules: ['nuxt-graphql-client', '@nuxtjs/tailwindcss', '@pinia/nuxt'],
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
    analyze: true,
    transpile: [
      '@headlessui/vue',
      '@fortawesome/vue-fontawesome',
      '@fortawesome/fontawesome-svg-core',
      '@fortawesome/free-solid-svg-icons'
    ]
  }
});

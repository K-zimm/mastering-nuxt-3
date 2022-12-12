// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  typescript: {
    shim: false
  },
  css: ['@fortawesome/fontawesome-svg-core/styles.css', '@/assets/styles/main.scss'],
  modules: ['@nuxtjs/tailwindcss', '@pinia/nuxt', '@sidebase/nuxt-auth'],
  runtimeConfig: {
    public: {
      GQL_HOST: 'http://localhost:4000/graphql',
      apiBase: '',
      dev: process.env.NODE_ENV !== 'production'
    },
    private: { databaseUrl: '', googleClientId: '', googleClientSecret: '' }
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
  },
  auth: {
    enableGlobalAppMiddleware: true
  }
});

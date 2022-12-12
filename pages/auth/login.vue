<script setup lang="ts">
definePageMeta({
  layout: 'auth',
  auth: false
});

const { $client } = useNuxtApp();

const { getProviders, signIn } = useSession();

const providers = await getProviders();

const data = await $client.listUsers.query();

// let username = $ref('');
// let password = $ref('');
</script>

<template>
  <div>
    <div>
      <div v-for="user of data">
        <div>{{ user.email }}</div>
      </div>
    </div>
    <AuthLoginForm />
    <div>
      <div v-for="provider of providers">
        <button @click="signIn(provider?.id)">Sign in with {{ provider?.name }}</button>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

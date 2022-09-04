<template>
  <div>
    <h1>Inkbook</h1>
  </div>
</template>

<script setup lang="ts">
definePageMeta({
  middleware: ['auth']
  // or middleware: 'auth'
});

const user = useState('user');
</script>

<style scoped></style>

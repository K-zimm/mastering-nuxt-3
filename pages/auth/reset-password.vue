<script setup lang="ts">
const apiBase = useRuntimeConfig().public.apiBase;
const auth = useCookie('resetToken');

return $fetch(`${apiBase}/api/`, {
  method: 'GET',
  headers: {
    authorization: `Bearer ${auth.value}`
  }
});
</script>

<template>
  <div></div>
</template>

<style scoped></style>

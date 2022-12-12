<template>
  <div>
    <slot />
  </div>
</template>

<script setup lang="ts">
definePageMeta({ auth: false });
</script>

<style scoped></style>

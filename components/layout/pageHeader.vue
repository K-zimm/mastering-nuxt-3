<script setup lang="ts">
interface action {
  link: string;
  label: string;
  icon: string;
  action: () => void;
}

const props = defineProps({
  title: {
    type: String,
    default: ''
  },
  actions: {
    type: Array<action>,
    default: []
  }
});
</script>
<template>
  <div class="flex justify-between">
    <h1>{{ props.title }}</h1>
    <div class="flex">
      <div v-for="action of actions" @click="action.action">
        <font-awesome-icon :icon="['fas', `${action.icon}`]" />{{ action.label }}
      </div>
    </div>
  </div>
</template>

<style scoped></style>

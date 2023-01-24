<script setup lang="ts">
const { $client } = useNuxtApp();

const customers = await $client.customer.list.query();

const form = reactive({
  firstName: '',
  lastName: '',
  phone: ''
});

const addCustomer = async () => {
  const customer = await $client.customer.add.mutate(form);
  console.log('customer created', customer);
};
</script>

<template>
  <div>
    <h1>Customers</h1>
    <li v-for="customer in customers" :key="customer.id">{{ customer.firstName }} {{ customer.lastName }}</li>
    <form @submit.prevent="addCustomer">
      <input v-model="form.firstName" type="text" placeholder="First name" />
      <input v-model="form.lastName" type="text" placeholder="Last name" />
      <input v-model="form.phone" type="text" placeholder="Phone" />
      <button type="submit">Add customer</button>
    </form>
  </div>
</template>

<style scoped></style>

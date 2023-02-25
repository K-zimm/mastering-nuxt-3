<script setup lang="ts">
type customer = {
  firstName: string;
  lastName: string;
  phone: string;
};

const { $client } = useNuxtApp();

const customers = await $client.customer.list.query();

const { formatPhone } = useformatter;

const form = reactive({
  firstName: '',
  lastName: '',
  phone: ''
});

let selectedCustomer = $ref(null as unknown as customer);
let customerModalOpen = $ref(false);

const openCustomerModal = () => {
  customerModalOpen = !customerModalOpen;
};

const selectCustomer = (customer: customer) => {
  selectedCustomer = customer;
};

const addCustomer = async () => {
  try {
    const customer = await $client.customer.add.mutate(form);
    console.log('customer created', customer);
  } catch (error: any) {
    console.log(error?.message ?? error);
  }
};
</script>

<template>
  <div>
    <LayoutPageHeader
      title="Customers"
      :actions="[
        {
          label: 'Create',
          link: '/customers=',
          icon: 'plus',
          action: openCustomerModal
        }
      ]"
    />
    <div class="flex space-x-4 h-full px-4 py-3">
      <ul role="list" class="divide-y divide-gray-200 bg-white py-4 px-6 rounded-xl">
        <li
          v-for="customer in customers"
          :key="customer.id"
          class="flex py-4 cursor-pointer"
          @click="selectCustomer(customer as customer)"
        >
          <img v-if="customer.image" class="h-14 w-14 rounded-full" :src="customer.image" alt="" />
          <div v-else class="h-14 w-14 rounded-full bg-gray-200 flex justify-center items-center">
            <font-awesome-icon :icon="['fas', 'user']" class="text-2xl text-gray-600" />
          </div>
          <div class="ml-3 flex flex-col justify-between py-1">
            <p class="font-bold text-gray-800">{{ customer.firstName }} {{ customer.lastName }}</p>
            <p v-if="customer.phone" class="text-sm text-gray-500">{{ formatPhone(customer.phone) }}</p>
          </div>
        </li>
      </ul>
      <div class="bg-white p-4 rounded-xl flex-1 shadow-lg">
        <transition name="slide-up">
          <form v-if="customerModalOpen" class="flex flex-col" @submit.prevent="addCustomer">
            <input v-model="form.firstName" type="text" placeholder="First name" />
            <input v-model="form.lastName" type="text" placeholder="Last name" />
            <input v-model="form.phone" type="text" placeholder="Phone" />
            <button type="submit">Add customer</button>
          </form>
          <div v-else-if="selectedCustomer">
            <h2>{{ selectedCustomer.firstName }} {{ selectedCustomer.lastName }}</h2>
          </div>
          <div v-else>Dashboard!</div>
        </transition>
      </div>
    </div>
  </div>
</template>

<style scoped></style>

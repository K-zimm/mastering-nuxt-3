<template>
  <div>
    <h2>Starlink Launches</h2>

    <div v-for="message of data?.messages" :key="message.id">
      <div>{{ message.user }}</div>
      <div>{{ message.datetime }}</div>
      <div>{{ message.content }}</div>
    </div>
  </div>
</template>

<script lang="ts" setup>
let { data, error } = useAsyncData('test', () => GqlMessages());

onMounted(async () => {
  const url = new URL('http://localhost:4000/graphql');
  url.searchParams.append(
    'query',
    `
    subscription Messages {
      messages {
        id
      }
    }
  `
  );

  const eventsource = new EventSource(url.toString(), {
    withCredentials: true // This is required for cookies
  });

  eventsource.onmessage = (event) => {
    const newMessages = JSON.parse(event.data);
    data = newMessages;
  };
});
</script>

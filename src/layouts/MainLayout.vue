<template>
  <q-layout view="hHh lpR fFf">

    <q-page-container>
      <router-view/>
    </q-page-container>

    <assistant-chat />

  </q-layout>
</template>

<script>
import { ref } from 'vue';
import AssistantChat from 'components/AssistantChat.vue'

export default {
  components: { AssistantChat },
  setup() {
    const year = ref(new Date().getFullYear());

    return {
      year,
    };
  },
};
</script>

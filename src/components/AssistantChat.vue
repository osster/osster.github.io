<template>
  <div>
    AssistantChat {{ messagesCount }}
    <q-scroll-area
        v-if="messages"
        class="flex column reverse"
        style="height: 300px;"
        ref="scrollAreaRef"
    >
      <q-chat-message
          v-for="(msg, i) in messages"
          :key="i"
          :text="[msg.content]"
          text-html
          :name="msg.role"
          :sent="msg.role === 'user'"
      />
    </q-scroll-area>
    <q-input filled v-model="message" label="Message" :disable="loading" />
    <q-btn @click="onSend" :disable="loading">
      <q-spinner
          v-if="loading"
          class="q-ml-sm"
          color="primary"
      />
      <span v-else>Send</span>
    </q-btn>
  </div>
</template>

<script>
import { defineComponent, ref, computed, watch } from 'vue';
import { useChatStore } from 'stores/chat-store';
// import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'AssistantChat',
  setup () {
    const store = useChatStore();
    const messages = computed(() => store.messageList);
    const messagesCount = computed(() => store.messagesCount);
    const sendMessage = async (msg) => await store.send(msg);
    const loadMessages = async () => await store.loadMessages();
    const message = ref('');
    const loading = ref(false);
    const scrollAreaRef = ref(null);

    watch(messagesCount, (n) => {
      // this.scrollBottom();
      scrollAreaRef.value?.setScrollPercentage('vertical', 1.0);
      console.log('messagesCount', n, scrollAreaRef.value?.getScrollPercentage());
      // scrollAreaRef.value.setScrollPosition('vertical', scrollAreaRef.value.scrollHeight);
    });
    return {
      message,
      loading,
      scrollAreaRef,
      store,
      messages,
      messagesCount,
      sendMessage,
      loadMessages,
    }
  },
  mounted () {
    this.loadMessages();
  },
  methods: {
    async onSend () {
      this.loading = true;
      this.sendMessage(this.message)
        .then(() => {
          this.$forceUpdate();
        })
        .finally(() => {
          this.loading = false;
        });
      this.message = '';
    },
    async onUpdate () {
      this.loading = true;
      await this.loadMessages();
      this.loading = false;
      this.scrollAreaRef.value.setScrollPercentage('vertical', 1.0);
      this.$forceUpdate();
    }
  }
});
</script>

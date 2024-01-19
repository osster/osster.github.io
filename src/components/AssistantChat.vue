<template>
  <div>
    <q-card
        v-if="state"
        class="my-card"
        style="position: fixed; right: 20px; bottom: 20px;"
        :style="!$q.platform.is.mobile ? 'width: 300px;' : 'width: calc(100vw - 40px);'"
    >
      <q-card-section class="bg-cyan-8 text-white">
        <div class="row">
          <div class="col">
            <div class="text-h6">{{ $t('chat.label') }}</div>
            <div class="text-subtitle2">
              {{ $t('chat.messagesCount', { count: messagesCount }) }}
            </div>
          </div>
          <div class="col-auto">
            <q-btn dense flat @click="() => { state = false }">
              <q-icon name="close"/>
            </q-btn>
          </div>
        </div>
      </q-card-section>

      <q-separator />

      <div
          ref="scrollTargetRef"
          class="scroll q-px-md"
          style="max-height: 400px"
      >
        <q-infinite-scroll
            @load="onLoad"
            :scroll-target="scrollTargetRef"
            :offset="250"
            reverse
            ref="scrollList"
        >
          <q-chat-message
              v-for="(msg, i) in messages"
              :key="i"
              :text="[msg.content]"
              text-html
              :name="msg.role === 'user' ? 'You' : 'Assistant'"
              :sent="msg.role === 'user'"
          />
          <template v-slot:loading>
            <div class="row justify-center q-my-md">
              <q-spinner-dots color="primary" />
            </div>
          </template>
        </q-infinite-scroll>
      </div>

      <q-card-actions style="max-height: 160px;">

        <q-input
            outlined
            bottom-slots
            autogrow
            counter
            dense
            borderless
            v-model="message"
            type="textarea"
            maxlength="100"
            class="col-12"
        >

          <template v-slot:append>
            <q-icon v-if="message !== ''" name="close" @click="message = ''" class="cursor-pointer" />
          </template>

          <template v-slot:hint>
            {{ $t('chat.messageLength') }}
          </template>

          <template v-slot:after>
            <q-spinner
                v-if="loading"
                class="q-ml-sm"
                color="primary"
            />
            <q-btn v-else @click="onSend" round dense flat icon="send" />
          </template>
        </q-input>
      </q-card-actions>
    </q-card>
    <q-btn
        v-else
        round
        class="animate__animated animate__infinite animate__pulse"
        style="position: fixed; right: 20px; bottom: 20px;"
        color="cyan"
        size="lg"
        @click="() => { state = true }"
    >
      <q-icon name="chat_bubble" />
    </q-btn>
  </div>
</template>

<script>
import 'animate.css';
import { defineComponent, ref, computed, watch } from 'vue';
import { useChatStore } from 'stores/chat-store';
// import { storeToRefs } from 'pinia';

export default defineComponent({
  name: 'AssistantChat',
  setup () {
    const state = ref(false)
    const store = useChatStore();
    const messages = computed(() => store.messageList);
    const messagesTotal = computed(() => store.messagesTotal);
    const messagesCount = computed(() => store.messagesCount);
    const attachMessage = async (msg) => await store.attachMessage(msg);
    const sendMessage = async (msg) => await store.send(msg);
    const loadMessages = async () => await store.loadMessages();
    const message = ref('');
    const loading = ref(false);
    const scrollTargetRef = ref(null)
    const scrollList = ref(null)

    return {
      state,
      message,
      loading,
      scrollTargetRef,
      scrollList,
      store,
      messages,
      messagesCount,
      messagesTotal,
      attachMessage,
      sendMessage,
      loadMessages,
    }
  },
  mounted () {
    watch(this.messagesCount, (n) => {
      this.scrollDown();
    });

    this.loadMessages();
    this.$forceUpdate();
    this.$nextTick(() => {
      this.scrollDown();
      // this.scrollList.stop();
    })
    setInterval(() => {
      this.loadMessages();
    }, 300000)
  },
  methods: {
    async onSend () {
      this.attachMessage(this.message);
      this.$forceUpdate();
      this.scrollDown();
      this.$nextTick(() => {
        this.loading = true;
        this.sendMessage(this.message)
            .then(() => {
              this.$forceUpdate();
            })
            .finally(() => {
              this.loading = false;
              this.scrollDown();
            });
        this.message = '';
      })
    },
    async onUpdate () {
      this.loading = true;
      await this.loadMessages();
      this.loading = false;
      this.$forceUpdate();
    },
    async onLoad (index, done) {
      done();
    },
    scrollDown () {
      this.$nextTick(() => {
        const scroll = document.querySelector('.scroll');
        if (scroll) {
          scroll.scrollTop = scroll.scrollHeight
        }
      });
    }
  }
});
</script>


<style>
textarea.q-field__native  {
  max-height: 120px;
}
</style>

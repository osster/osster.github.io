import { defineStore } from 'pinia';
import { chatApi } from 'boot/axios';

function nl2br (str, is_xhtml) {
  if (typeof str === 'undefined' || str === null) {
    return '';
  }
  var breakTag = (is_xhtml || typeof is_xhtml === 'undefined') ? '<br />' : '<br>';
  return (str + '').replace(/([^>\r\n]?)(\r\n|\n\r|\r|\n)/g, '$1' + breakTag + '$2');
}

export const useChatStore = defineStore('chat', {
  state: () => ({
    messages: []
  }),
  getters: {
    messagesCount: (state) => state.messages.length,
    messageList: (state) => state.messages,
  },
  actions: {
    async send(message) {
      const _this = this;
      _this.messages.push({
        role: 'user',
        content: message
      });
      await chatApi.get(`chat?q=${message}`).then((responce) => {
        _this.messages = responce.data.map((m) => {
          m.content = nl2br(m?.content[0]?.text?.value);
          return m;
        }).reverse()
      })
    },
    async loadMessages() {
      const _this = this;
      await chatApi.get('history').then((responce) => {
        _this.messages = responce.data.map((m) => {
          m.content = nl2br(m?.content[0]?.text?.value);
          return m;
        }).reverse()
      })
    },
  },
});

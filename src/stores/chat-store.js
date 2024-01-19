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
    total: 0,
    messages: []
  }),
  getters: {
    messagesTotal: (state) => state.total,
    messagesCount: (state) => state.messages.length,
    messageList: (state) => state.messages,
  },
  actions: {
    attachMessage(message) {
      const _this = this;
      _this.messages.push({
        role: 'user',
        content: message
      });
    },
    async send(message) {
      const _this = this;
      await chatApi.post(`chat?q=${message}`, {}, {
        withCredentials: true,
        crossDomain: true
      }).then((responce) => {
        _this.total = responce.data.total;
        _this.messages = responce.data.messages.map((m) => {
          m.content = nl2br(m?.content[0]?.text?.value);
          return m;
        }).reverse();
      })
    },
    async loadMessages() {
      const _this = this;
      await chatApi.post('history', {}, {
        withCredentials: true,
        crossDomain: true,
      }).then((responce) => {
        // document.cookie = "connect.sid=" + (responce.data?.sId || "") + "; path=/";
        _this.total = responce.data.total;
        _this.messages = responce.data.messages.map((m) => {
          m.content = nl2br(m?.content[0]?.text?.value);
          return m;
        }).reverse();
      })
    },
  },
});

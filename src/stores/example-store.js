import { defineStore } from 'pinia';

// eslint-disable-next-line import/prefer-default-export
export const useCounterStore = defineStore('counter', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    doubleCount: (state) => state.counter * 2,
  },
  actions: {
    increment() {
      // eslint-disable-next-line no-plusplus
      this.counter++;
    },
  },
});

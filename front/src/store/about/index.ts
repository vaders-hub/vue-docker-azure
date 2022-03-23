import { defineStore } from 'pinia'

export const useMainStore = defineStore({
  id: 'aboutStore',
  state: () => ({
    items: [],
  }),
  actions: {},
})

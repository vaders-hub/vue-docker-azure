import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: () => ({
    items: [],
  }),
  actions: {},
})

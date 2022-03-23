import { defineStore } from 'pinia'

export type RootState = {
  layout: ''
  members: []
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    layout: 'Default',
    loadingPage: false,
    loadingData: false,
    members: [],
  }),
  actions: {
    changeLayout(layoutTo) {
      this.layout = layoutTo
    },
    changeLoadingpageStatus(status) {
      this.loadingPage = status
    },
    changeLoadingdataStatus(status) {
      // if (!this.loadingData) return
      this.loadingData = status
    },
    async login() {
      try {
        const memInfo = { memid: '', mempw: '' }
        const users = await this.api({ method: 'get', url: '/api/member', params: memInfo })
        if (users) return true
      } catch (e) {
        console.warn(e)
      }
    },
  },
  getters: {
    doubleCount: (state) => state.members.length * 2,
  },
})

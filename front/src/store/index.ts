import { inject } from 'vue'
import { defineStore } from 'pinia'

export type RootState = {
  layout: ''
  members: Record<string, unknown>
}

export const useMainStore = defineStore({
  id: 'mainStore',
  state: () => ({
    layout: 'Default',
    loadingData: false,
    loadingPage: false,
    members: {},
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
    async login(payload) {
      try {
        const user = await this.api({
          method: 'post',
          url: '/api/member',
          data: payload,
        })
        if (user.data.token) {
          this.api.defaults.headers['x-access-token'] = user.data.token
        }
      } catch (e) {
        console.warn(e)
      }
    },
    async logout(payload) {
      try {
        this.api.defaults.headers['x-access-token'] = ''
        this.sto.reset()
      } catch (e) {
        console.warn(e)
      }
    },
    showDialog() {
      console.log('show timeout dialog')
    },
  },
  getters: {
    doubleCount: (state) => state.members,
  },
})

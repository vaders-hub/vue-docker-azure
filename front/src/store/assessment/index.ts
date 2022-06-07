import { defineStore } from 'pinia'

export const useAssessmentStore = defineStore({
  id: 'assessmentStore',
  state: (): any => ({
    data: {},
  }),
  actions: {
    async loadData(payload, selYear) {
      try {
        const user = await this.api({
          method: 'post',
          url: '/api/member',
          data: payload,
        })
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: (): any => ({
    tableData: [],
  }),
  actions: {
    async loadTableData(payload) {
      try {
        const data = await this.api({
          method: 'get',
          url: '/api/data/table',
          data: payload,
        })
        if (data) {
          this.tableData = this.tableData.concat(data.data.people)
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: (): any => ({
    dataSet: {
      table: [],
      line: [],
    },
    tableData: [],
  }),
  actions: {
    async loadData(payload) {
      try {
        const data = await this.api({
          method: 'get',
          url: `/api/data/${payload}`,
        })
        if (data) {
          this.dataSet[payload] = this.dataSet[payload].concat(data.data.rows)
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

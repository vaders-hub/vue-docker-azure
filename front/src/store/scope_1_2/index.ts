import { defineStore } from 'pinia'

export const useScope_1_2_store = defineStore({
  id: 'scope_1_2_store',
  state: (): any => ({
    dataSet: {
      table: [],
      scope_1_2_data: [],
      emitBySite_data: [],
    },
    tableData: [],
  }),

  actions: {
    async loadData(payload, sch_year, sch_month) {
      try {
        const scope_1_2_data = [
            {
              item: '2021년',
              scope1: 780,
              scope2: 520,
            },
            {
              item: '1월',
              scope1: 580,
              scope2: 390,
            },
            {
              item: '2월',
              scope1: 220,
              scope2: 770,
            },
            {
              item: '3월',
              scope1: 320,
              scope2: 570,
            },
            {
              item: '4월',
              scope1: 620,
              scope2: 370,
            },
            {
              item: '5월',
              scope1: 820,
              scope2: 870,
            },
            {
              item: '6월',
              scope1: 730,
              scope2: 760,
            },
            {
              item: '7월',
              scope1: 620,
              scope2: 770,
            },
            {
              item: '8월',
              scope1: 320,
              scope2: 670,
            },
            {
              item: '9월',
              scope1: 520,
              scope2: 670,
            },
            {
              item: '10월',
              scope1: 620,
              scope2: 770,
            },
            {
              item: '11월',
              scope1: 820,
              scope2: 570,
            },
            {
              item: '12월',
              scope1: 1120,
              scope2: 370,
            },
          ],
          emitBySite_data = [
            {
              Country: 'A',
              Import: 500,
            },
            {
              Country: 'A-1',
              Export: 100,
            },
            {
              Country: 'A-2',
              Export: 200,
            },
            {
              Country: 'A-3',
              Export: 200,
            },
            {
              Country: 'B',
              Import: 400,
            },
            {
              Country: 'B-1',
              Export: 100,
            },
            {
              Country: 'B-2',
              Export: 200,
            },
            {
              Country: 'B-3',
              Export: 100,
              col: 'blue',
            },
            {
              Country: 'C',
              Import: 200,
            },
            {
              Country: 'C-1',
              Export: 100,
            },
            {
              Country: 'C-2',
              Export: 100,
            },
          ]

        if (payload) {
          if (this.dataSet[payload].length < eval(payload).length) {
            this.dataSet[payload] = this.dataSet[payload].concat(eval(payload))
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

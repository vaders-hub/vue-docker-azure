import { defineStore } from 'pinia'

export const useDashboardStore = defineStore({
  id: 'dashboardStore',
  state: (): any => ({
    dataSet: {
      table: [],
      line: [],
      scope_1_2_data: [],
      scope_3_data: [],
      site_data: [],
      cate_data: [],
    },
    tableData: [],
  }),
  actions: {
    async loadData(payload) {
      try {
        let lineData
        if (`${payload}` == 'line') {
          lineData = await this.api({
            method: 'get',
            url: `/api/data/${payload}`,
          })
        }

        const scope_1_2_data = [
          {
            baseDt: '1월',
            scope1: 459.5,
            scope2: 236.7,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '2월',
            scope1: 569.2,
            scope2: 195.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '3월',
            scope1: 594.0,
            scope2: 217.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '4월',
            scope1: 630.8,
            scope2: 277.6,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '5월',
            scope1: 452.4,
            scope2: 183.8,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '6월',
            scope1: 484.5,
            scope2: 266.1,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '7월',
            scope1: 389.5,
            scope2: 218.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '8월',
            scope1: 476.1,
            scope2: 171.2,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '9월',
            scope1: 552.0,
            scope2: 261.2,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '10월',
            scope1: 543.3,
            scope2: 190.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '11월',
            scope1: 427.5,
            scope2: 160.0,
            netZeroVAl: 130.0,
          },
          {
            baseDt: '12월',
            scope1: 566.0,
            scope2: 267.0,
            netZeroVAl: 130.0,
          },
        ]

        const scope_3_data = [
          {
            baseDt: '1월',
            scope3: 1057.410132,
            netZeroVal: 130.0,
          },
          {
            baseDt: '2월',
            scope3: 921.743786,
            netZeroVal: 130.0,
          },
          {
            baseDt: '3월',
            scope3: 1319.546022,
            netZeroVal: 130.0,
          },
          {
            baseDt: '4월',
            scope3: 1144.053421,
            netZeroVal: 130.0,
          },
          {
            baseDt: '5월',
            scope3: 1371.912624,
            netZeroVal: 130.0,
          },
          {
            baseDt: '6월',
            scope3: 1004.750643,
            netZeroVal: 130.0,
          },
          {
            baseDt: '7월',
            scope3: 1239.149112,
            netZeroVal: 130.0,
          },
          {
            baseDt: '8월',
            scope3: 1376.402513,
            netZeroVal: 130.0,
          },
          {
            baseDt: '9월',
            scope3: 1440.778482,
            netZeroVal: 130.0,
          },
          {
            baseDt: '10월',
            scope3: 1360.943782,
            netZeroVal: 130.0,
          },
          {
            baseDt: '11월',
            scope3: 1295.595282,
            netZeroVal: 130.0,
          },
          {
            baseDt: '12월',
            scope3: 1113.027712,
            netZeroVal: 130.0,
          },
        ]

        const site_data = [
          {
            baseDt: '2021/05',
            item: 'KNC',
            value: 171.55981,
          },
          {
            baseDt: '2021/05',
            item: 'SKGCJ',
            value: 182.434371,
          },
          {
            baseDt: '2021/05',
            item: 'SKGCNB',
            value: 107.297586,
          },
          {
            baseDt: '2021/05',
            item: 'SKGCSH',
            value: 2185.081308,
          },
          {
            baseDt: '2021/05',
            item: 'SKGCSP',
            value: 732.313321,
          },
          {
            baseDt: '2021/05',
            item: 'SKPA',
            value: 11.316608,
          },
          {
            baseDt: '2021/05',
            item: 'SKPE',
            value: 76.485133,
          },
          {
            baseDt: '2021/05',
            item: 'UAC',
            value: 75.081412,
          },
        ]

        const cate_data = [
          {
            baseDt: '2021/05',
            item: 'CAT1',
            value: 5130.249986,
          },
          {
            baseDt: '2021/05',
            item: 'CAT2',
            value: 982.976431,
          },
          {
            baseDt: '2021/05',
            item: 'CAT3',
            value: 8501.634246,
          },
          {
            baseDt: '2021/05',
            item: 'CAT4',
            value: 384.898058,
          },
          {
            baseDt: '2021/05',
            item: 'CAT5',
            value: 227.55479,
          },
        ]

        if (payload) {
          if (payload == 'line') {
            this.dataSet[payload] = this.dataSet[payload].concat(lineData.data.rows)
            console.log(this.dataSet[payload])
          }
          if (payload == 'scope_1_2_data') {
            this.dataSet[payload] = this.dataSet[payload].concat(scope_1_2_data)
          }
          if (payload == 'scope_3_data') {
            this.dataSet[payload] = this.dataSet[payload].concat(scope_3_data)
          }
          if (payload == 'site_data') {
            this.dataSet[payload] = this.dataSet[payload].concat(site_data)
          }
          if (payload == 'cate_data') {
            this.dataSet[payload] = this.dataSet[payload].concat(cate_data)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

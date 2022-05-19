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
        if(`${payload}` == "line") {
          lineData = await this.api({
            method: 'get',
            url: `/api/data/${payload}`,
          }) 
        }

        const scope_1_2_data = [
          {
            baseDt: "1월",
            clas1: "1000",
            scope1: 459.5,
            scope2: 236.7
          },
          {
            baseDt: "2월",
            clas1: "1000",
            scope1: 569.2,
            scope2: 195.1
          },
          {
            baseDt: "3월",
            clas1: "1000",
            scope1: 594.0,
            scope2: 217.1
          },
          {
            baseDt: "4월",
            clas1: "1000",
            scope1: 630.8,
            scope2: 277.6
          },
          {
            baseDt: "5월",
            clas1: "1000",
            scope1: 452.4,
            scope2: 183.8
          },
          {
            baseDt: "6월",
            clas1: "1000",
            scope1: 484.5,
            scope2: 266.1
          },
          {
            baseDt: "7월",
            clas1: "1000",
            scope1: 389.5,
            scope2: 218.0
          },
          {
            baseDt: "8월",
            clas1: "1000",
            scope1: 476.1,
            scope2: 171.2
          },
          {
            baseDt: "9월",
            clas1: "1000",
            scope1: 552.0,
            scope2: 261.2
          },
          {
            baseDt: "10월",
            clas1: "1000",
            scope1: 543.3,
            scope2: 190.0
          },
          {
            baseDt: "11월",
            clas1: "1000",
            scope1: 427.5,
            scope2: 160.0
          },
          {
            baseDt: "12월",
            clas1: "1000",
            scope1: 566.0,
            scope2: 267.0
          },
        ]

        const scope_3_data = [
          {
            baseDt: "1월",
            clas1: "1000",
            value: 1057.410132,
            netZeroVal: 130.0
          },
          {
            baseDt: "2월",
            clas1: "1000",
            value: 921.743786,
            netZeroVal: 130.0
          },
          {
            baseDt: "3월",
            clas1: "1000",
            value: 1319.546022,
            netZeroVal: 130.0
          },
          {
            baseDt: "4월",
            clas1: "1000",
            value: 1144.053421,
            netZeroVal: 130.0
          },
          {
            baseDt: "5월",
            clas1: "1000",
            value: 1371.912624,
            netZeroVal: 130.0
          },
          {
            baseDt: "6월",
            clas1: "1000",
            value: 1004.750643,
            netZeroVal: 130.0
          },
          {
            baseDt: "7월",
            clas1: "1000",
            value: 1239.149112,
            netZeroVal: 130.0
          },
          {
            baseDt: "8월",
            clas1: "1000",
            value: 1376.402513,
            netZeroVal: 130.0
          },
          {
            baseDt: "9월",
            clas1: "1000",
            value: 1440.778482,
            netZeroVal: 130.0
          },
          {
            baseDt: "10월",
            clas1: "1000",
            value: 1360.943782,
            netZeroVal: 130.0
          },
          {
            baseDt: "11월",
            clas1: "1000",
            value: 1295.595282,
            netZeroVal: 130.0
          },
          {
            baseDt: "12월",
            clas1: "1000",
            value: 1113.027712,
            netZeroVal: 130.0
          },
        ]

        const site_data = [
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C221",
            "CompNm": "KNC",
            "Val": 171.55981
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C232",
            "CompNm": "SKGCJ",
            "Val": 182.434371
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C847",
            "CompNm": "SKGCNB",
            "Val": 107.297586
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C916",
            "CompNm": "SKGCSH",
            "Val": 2185.081308
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C115",
            "CompNm": "SKGCSP",
            "Val": 732.313321
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C326",
            "CompNm": "SKPA",
            "Val": 11.316608
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C218",
            "CompNm": "SKPE",
            "Val": 76.485133
          },
          {
            "Year": "2021",
            "Kind": "SC3",
            "CompId": "C310",
            "CompNm": "UAC",
            "Val": 75.081412
          }
        ]

        const cate_data = [
          {
            "Year": "2021",
            "Category": "CAT1",
            "Val": 5130.249986
          },
          {
            "Year": "2021",
            "Category": "CAT2",
            "Val": 982.976431
          },
          {
            "Year": "2021",
            "Category": "CAT3",
            "Val": 8501.634246
          },
          {
            "Year": "2021",
            "Category": "CAT4",
            "Val": 384.898058
          },
          {
            "Year": "2021",
            "Category": "CAT5",
            "Val": 227.55479
          }
        ]
        
        if(payload) {
          if (payload == "line") {
            this.dataSet[payload] = this.dataSet[payload].concat(lineData.data.rows)
          }
          if (payload == "scope_1_2_data") {
            this.dataSet[payload] = this.dataSet[payload].concat(scope_1_2_data)
          }
          if (payload == "scope_3_data") {
            this.dataSet[payload] = this.dataSet[payload].concat(scope_3_data)
          }
          if (payload == "site_data") {
            this.dataSet[payload] = this.dataSet[payload].concat(site_data)
          }
          if (payload == "cate_data") {
            this.dataSet[payload] = this.dataSet[payload].concat(cate_data)
          }
        }
      } catch (e) {
        console.warn(e)
      }
    },
  },
})

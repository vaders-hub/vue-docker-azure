import type { SessionTimeout } from '@/interface/common'

export const sesssionTimeOut: SessionTimeout = {
  limit: 10000,
  intvObj: 0,
  tick: () => {
    sesssionTimeOut.intvObj = setInterval(() => {
      sesssionTimeOut.limit--
      console.log('tick', sesssionTimeOut.limit)
    }, 1000)
  },
  clear: () => {
    clearInterval(sesssionTimeOut.intvObj)
  },
}

export default {
  install: (app, option) => {
    app.provide('sessionTimeout', sesssionTimeOut)
  },
}

import { useMainStore } from '@/store/index'

import type { SessionTimeout } from '@/interface/common'

export const sesssionTimeOut: SessionTimeout = (() => {
  const limit = 600
  let intvObj
  const start = function (this: SessionTimeout) {
    this.reset()
    this.intvObj = setInterval(() => {
      this.limit > 0 ? this.limit-- : this.reset()
    }, 1000)
  }
  const reset = function (this: SessionTimeout) {
    const mainStore = useMainStore()

    this.limit = 600
    clearInterval(this.intvObj)
    // mainStore.showDialog()
  }

  return {
    limit,
    intvObj,
    start,
    reset,
  }
})()

export default {
  install: (app, option) => {
    app.provide('sessionTimeout', sesssionTimeOut)
  },
}

import { sesssionTimeOut as st } from './timer'

import type { InputEvents } from '@/interface/common'

export const inputEvents: InputEvents = (() => {
  const events = ['mousemove', 'keydown']
  const initDetection = function (this: InputEvents) {
    if (!st.intvObj) {
      st.start()
    }
    for (const e of events) {
      document.addEventListener(e, (e) => {
        st.start()
      })
    }
  }
  return { initDetection }
})()

export default {
  install: (app, option) => {
    app.provide('inputEvents', inputEvents)
  },
}

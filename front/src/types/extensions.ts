import 'pinia'
import type { SessionTimeout } from '@/interface/common'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    api: import('axios').AxiosInstance
    sto: SessionTimeout
  }
}

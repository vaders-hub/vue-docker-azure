import 'pinia'
declare module 'pinia' {
  export interface PiniaCustomProperties {
    api: import('axios').AxiosInstance
  }
}

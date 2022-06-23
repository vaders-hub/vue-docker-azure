import axios from 'axios'

declare module 'axios' {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  export interface AxiosResponse<T = any> extends Promise<T> {}
}

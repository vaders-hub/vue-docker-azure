import axios from 'axios'
import type { AxiosInstance } from 'axios'

const instance: AxiosInstance = axios.create({
  headers: {
    'Content-Type': 'application/json',
  },
})

export { axios }
export default instance

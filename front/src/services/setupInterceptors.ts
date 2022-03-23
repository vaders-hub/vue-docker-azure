import axiosInstance from './api'
import { useMainStore } from '@/store/index'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(true)
      config.timeout = 10000
      return config
    },
    (error) => {
      return Promise.reject(error)
    },
  )
  axiosInstance.interceptors.response.use(
    (res) => {
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(false)
      return res.data
    },
    async (err) => {
      const mainStore = useMainStore()
      const errStatus = err.response.status

      mainStore.changeLoadingdataStatus(false)
      switch (errStatus) {
        case 404:
          break
        case 500:
          break
        default:
      }
      const originalConfig = err.config
      return Promise.reject(err)
    },
  )
}

export default setup

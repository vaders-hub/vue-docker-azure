import axiosInstance from './api'
import { useMainStore } from '@/store/index'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config) => {
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(true)
      config.timeout = 5000
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

      return res
    },
    async (err) => {
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(false)

      if (err.response) {
        if (err.response.status) {
          const errStatus = err.response.status

          switch (errStatus) {
            case 404:
              break
            case 500:
              break
            default:
          }
        }
      }

      const originalConfig = err.config
      return Promise.reject(err)
    },
  )
}

export default setup

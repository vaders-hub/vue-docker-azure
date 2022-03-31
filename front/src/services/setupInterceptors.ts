import axiosInstance from './apiInstance'
import { useMainStore } from '@/store/index'

import type { AxiosRequestConfig } from 'axios'

const setup = (store) => {
  axiosInstance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      config.timeout = 2000
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(true)
      const token = 'temp' // TokenService.getLocalAccessToken();
      if (token) {
        config.headers = {
          'x-access-token': token,
          // Authorization: 'Bearer ' + token
        }
      }
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
      const originalConfig = err.config
      const mainStore = useMainStore()
      mainStore.changeLoadingdataStatus(false)

      if (originalConfig.url !== '/api/auth/signin' && err.response) {
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

        if (err.response.status === 401 && !originalConfig._retry) {
          originalConfig._retry = true
          try {
            const rs = await axiosInstance.post('/auth/refreshtoken', {
              refreshToken: 'temp', // TokenService.getLocalRefreshToken(),
            })
            const { accessToken } = rs.data
            store.dispatch('auth/refreshToken', accessToken)
            // TokenService.updateLocalAccessToken(accessToken)
            return axiosInstance(originalConfig)
          } catch (_error) {
            return Promise.reject(_error)
          }
        }
      }
      return Promise.reject(err)
    },
  )
}

export default setup

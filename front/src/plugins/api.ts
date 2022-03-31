import apiInstance from '@/services/apiInstance'

export const handleApi = (opt) => {
  const { method } = opt
  apiInstance(opt)
}

const commonService = {
  login: (payload) => handleApi({ method: 'post', url: '/api/member', data: payload }),
}

export default {
  install: (app, options) => {
    app.provide('api', handleApi)
    app.provide('apiService', commonService)
  },
}

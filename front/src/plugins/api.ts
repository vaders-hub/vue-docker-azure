import apiInstance from '@/services/apiInstance'

const commonService = {
  login: (payload) => apiInstance({ method: 'post', url: '/api/member', data: payload }),
}

export default {
  install: (app, options) => {
    app.provide('api', apiInstance)
    app.provide('apiService', commonService)
  },
}

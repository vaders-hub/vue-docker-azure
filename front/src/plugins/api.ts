import apiInstance from '@/services/apiInstance'

const commonService = {
  login: async (payload) => {
    try {
      const result = await apiInstance({ method: 'post', url: '/api/member', data: payload })
      if (result) return result
    } catch (e) {
      console.warn(e)
    }
  },
}

export default {
  install: (app, options) => {
    app.provide('api', apiInstance)
    app.provide('apiService', commonService)
  },
}

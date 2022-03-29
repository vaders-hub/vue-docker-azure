import apiInstance from '@/services/apiInstance'

export const handleApi = (opt) => {
  console.log('handle api', apiInstance.get('/api/member'))
}

export default {
  install: (app, options) => {
    app.provide('api', handleApi)
  },
}

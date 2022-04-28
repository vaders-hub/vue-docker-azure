import apiInstance from '@/utils/apiInstance'
import { commonService } from '@/services/common'

export default {
  install: (app, options) => {
    app.provide('api', apiInstance)
    app.provide('apiService', commonService)
  },
}

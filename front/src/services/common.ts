import apiInstance from '@/utils/apiInstance'

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

export { commonService }

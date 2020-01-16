import axios from 'axios'
export default {
  login: async (params) => {
    let result = null
    try {
      result = await axios.post('user_system/account/login', params, {})
    } catch (error) {
      console.error(error)
    }
    return result
  },
  regist: async (params) => {
    let result = null
    try {
      result = await axios.post('user_system/account/regist', params, {})
    } catch (error) {
      console.error(error)
    }
    return result
  },
  resetPassword: async (params) => {
    let result = null
    try {
      result = await axios.post('user_system/account/reset_password', params, {})
    } catch (error) {
      console.error(error)
    }
    return result
  },
  resetPasswordConfirm: async (params) => {
    let result = null
    try {
      result = await axios.post('user_system/account/reset_password_confirm', params, {})
    } catch (error) {
      console.error(error)
    }
    return result
  },
}

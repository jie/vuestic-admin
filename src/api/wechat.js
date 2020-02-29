import axios from 'axios'
const sessionKey = process.env.VUE_APP_SESSIONID_KEY

export default {
  getApps: async (params) => {
    let result = null
    let sessionid = localStorage.getItem(sessionKey)
    try {
      result = await axios.post('/open_wechat/api/app/get', params, {
        headers: {
          sessionid: sessionid
        }
      })
    } catch (error) {
      console.error(error)
    }
    return result
  },
  deleteApp: async (params) => {
    let result = null
    let sessionid = localStorage.getItem(sessionKey)
    try {
      result = await axios.post('/open_wechat/api/app/delete', params, {
        headers: {
          sessionid: sessionid
        }
      })
    } catch (error) {
      console.error(error)
    }
    return result
  },
  applyApp: async (params) => {
    let result = null
    let sessionid = localStorage.getItem(sessionKey)
    try {
      result = await axios.post('/open_wechat/api/app/apply', params, {
        headers: {
          sessionid: sessionid
        }
      })
    } catch (error) {
      console.error(error)
    }
    return result
  },
  saveApp: async (params) => {
    let result = null
    let sessionid = localStorage.getItem(sessionKey)
    try {
      result = await axios.post('/open_wechat/api/app/save', params, {
        headers: {
          sessionid: sessionid
        }
      })
    } catch (error) {
      console.error(error)
    }
    return result
  }
}

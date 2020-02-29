// import Vue from 'vue'
import accountAPI from '@/api/account'
const sessionKey = process.env.VUE_APP_SESSIONID_KEY
// initial state
const state = {
  sessionid: null,
  isLoading: false,
  errMsg: null
}

// getters
const getters = {}

// actions
const actions = {
  login: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await accountAPI.login(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', { errMsg: 'system_error' })
      return result
    }
    if (result.data.code === '0' && result.data.data.sessionid) {
      commit('setSessionid', {
        sessionid: result.data.data.sessionid
      })
    } else {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },
  regist: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await accountAPI.regist(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', { errMsg: 'system_error' })
      return result
    }
    if (result.data.code !== '0') {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },
  clearError: async ({
    commit,
    state
  }, params) => {
    commit('setError', {
      errMsg: ''
    })
  }
}

// mutationsg
const mutations = {
  setSessionid (state, payload) {
    state.sessionid = payload.sessionid
    localStorage.setItem(sessionKey, payload.sessionid)
  },
  setError (state, payload) {
    state.errMsg = payload.errMsg
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}

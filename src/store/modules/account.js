// import Vue from 'vue'
import accountAPI from '@/api/account'

// initial state
const state = {
  sessionid: null,
  isLoading: false,
  errMsg: '',
}

// getters
const getters = {}

// actions
const actions = {
  login: async ({
    commit,
    state,
  }, params) => {
    commit('setLoading', true)
    let result = await accountAPI.login(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code === '0') {
      commit('setSessionid', {
        sessoinid: result.data.data.sessionid,
      })
    } else {
      commit('setError', {
        errMsg: result.data.message,
      })
    }
    return result
  },
  regist: async ({
    commit,
    state,
  }, params) => {
    commit('setLoading', true)
    let result = await accountAPI.regist(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code !== '0') {
      commit('setError', {
        errMsg: result.data.message,
      })
    }
    return result
  },
  clearError: async () => {
    commit('setError', {
      errMsg: result.data.message,
    })
  },
}

// mutationsg
const mutations = {
  setSessionid (state, payload) {
    state.sessionid = payload.sessionid
  },
  setError (state, payload) {
    console.log('setError:', payload)
    state.errMsg = payload.errMsg
  },
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

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
    accountAPI.login(params,
      async (response) => {
        console.log('state:', state)
        commit('setLoading', false)

        if (response.data.code === '0') {
          commit('setSessionid', {
            sessoinid: response.data.data.sessionid,
          })
        } else {
          commit('requestErr', response.data.message)
        }
      },
      async (err) => {
        console.log('accountLoginError:', err)
        commit('setLoading', false)
        commit('requestErr', err)
      }
    )
  },
}

// mutationsg
const mutations = {
  setSessionid (state, payload) {
    state.sessionid = payload.sessionid
  },
  requestErr (state, err, expireSec = 3) {
    state.errMsg = err
    setTimeout(() => {
      state.errMsg = ''
    }, expireSec * 1000)
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

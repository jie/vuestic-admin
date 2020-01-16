import Vue from 'vue'
import accountAPI from '@/api/account'

// initial state
const state = {
  sessionid: null,
  loading: false,
  errMsg: '',
}

// getters
const getters = {}

// actions
const actions = {
  login: ({
    commit,
    state,
  }, params) => {
    commit('startLoading')
    accountAPI.login(params,
      async (response) => {
        console.log('state:', state)
        commit('stopLoading')

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
        commit('stopLoading')
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
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}

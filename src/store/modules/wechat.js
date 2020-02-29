// import Vue from 'vue'
import wechatAPI from '@/api/wechat'

// initial state
const state = {
  entities: [],
  entity: null,
  isLoading: false,
  errMsg: ''
}

// getters
const getters = {

}

// actions
const actions = {
  getApps: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await wechatAPI.getApps(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code === '0') {
      commit('setEntities', {
        entities: result.data.data.entities
      })
    } else {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },

  getApp: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await wechatAPI.getApps(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code === '0') {
      commit('setEntity', {
        entity: result.data.data.entities[0]
      })
    } else {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },

  saveApp: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await wechatAPI.saveApp(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code === '0') {
      commit('setEntities', {
        entities: result.data.data.entities
      })
    } else {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },
  applyApp: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await wechatAPI.applyApp(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code === '0') {
      commit('setEntities', {
        entities: result.data.data.entities
      })
    } else {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },
  deleteApp: async ({
    commit,
    state
  }, params) => {
    commit('setLoading', true)
    let result = await wechatAPI.deleteApp(params)
    commit('setLoading', false)
    if (!result) {
      commit('setError', 'system_error')
    }
    if (result.data.code !== '0') {
      commit('setError', {
        errMsg: result.data.message
      })
    }
    return result
  },

  clearError: async ({ commit, state }, params) => {
    commit('setError', {
      errMsg: null
    })
  }
}

// mutationsg
const mutations = {
  setEntities (state, payload) {
    state.entities = payload.entities
  },
  setEntity (state, payload) {
    state.entity = payload.entity
  },
  setError (state, payload) {
    console.log('setError:', payload)
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

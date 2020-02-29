const sessionKey = process.env.VUE_APP_SESSIONID_KEY

const state = {
  sidebar: {
    opened: false
  },
  config: {
    palette: {
      primary: '#4ae387',
      danger: '#e34a4a',
      info: '#4ab2e3',
      success: '#db76df',
      warning: '#f7cc36',
      white: '#fff',
      black: '#000',
      fontColor: '#34495e',
      transparent: 'transparent',
      lighterGray: '#ddd'
    }
  },
  isLoading: true,
  sessionid: null
}

const mutations = {
  setLoading (state, isLoading) {
    state.isLoading = isLoading
  },
  setSessionid (state, payload) {
    state.sessionid = payload.sessionid
  }
}

const actions = {
  getSession: ({
    commit,
    state
  }, params) => {
    let sessionid = localStorage.getItem(sessionKey)
    if (sessionid) {
      commit('setSessionid', {
        sessionid: sessionid
      })
    }
    return sessionid
  }
}

const getters = {
  sessionid: state => {
    return localStorage.getItem(sessionKey)
  }
}

export default {
  state,
  getters,
  mutations,
  actions
}

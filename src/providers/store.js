import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    error: {
      network: false
    }
  },
  mutations: {
    setNetworkError (state, error = true) {
      state.error.network = error
    }
  }
})

export default store

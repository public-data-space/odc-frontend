import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    info:null
  },
  mutations: {
    change(state, newInfo){
      state.info = newInfo
    }
  },
  actions: {

  }
})

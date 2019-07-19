import Vue from 'vue'
import Vuex from 'vuex'
import Toasted from 'vue-toasted'
Vue.use(Toasted)
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    status:null,
    text:null,
  },
  mutations: {
    update(state, newInfo){
      state.status = newInfo.status
      state.text = newInfo.text
    },
    delete(state){
      state.status = null
      state.text = null
    }
  },
  getters:{
    getStatus: state =>  {
      return state.status
    },
    getText: state => {
      return state.text
    }
  },
  actions: {
    update(context, newInfo){
      context.commit('update', newInfo)
      if (context.getters.getStatus == 'success'){
        Vue.toasted.success(context.getters.getText, {"position": "top-center","duration": "1500"})
      }
      else if(context.getters.getStatus == 'info'){
        Vue.toasted.info(context.getters.getText, {"position": "top-center","duration": "1500"})      
      }          
      else if(context.getters.getStatus == 'error'){
        Vue.toasted.error(context.getters.getText, {"position": "top-center","duration": "1500"})
      }
    }
  }
})

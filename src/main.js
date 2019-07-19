import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'

Vue.config.productionTip = false

import "@/assets/stylesheets/main.css"
import "@/assets/stylesheets/darkly.bootstrap.css"

import router from './router'
import store from './store'

router.afterEach((to, from) => {
  store.commit('delete');
})

new Vue({
  router,
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

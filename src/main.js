import Vue from 'vue'
import axios from './plugins/axios'
import App from './App.vue'
import vueNcform from '@ncform/ncform';
import Element from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import ncformStdComps from '@ncform/ncform-theme-elementui';
import Vuetify from "vuetify";
import "vuetify/dist/vuetify.css";
import 'material-design-icons-iconfont/dist/material-design-icons.css' // Ensure you are using css-loader

Vue.use(Vuetify);

Vue.config.productionTip = false

import "@/assets/stylesheets/main.css"
import "@/assets/stylesheets/darkly.bootstrap.css"

import router from './router'
import store from './store'
Vue.config.devtools = true;
router.afterEach((to, from) => {
  store.commit('delete');
})
Vue.use(Element);

Vue.use(vueNcform, { extComponents: ncformStdComps, /*lang: 'zh-cn'*/ });
window.$http = Vue.prototype.$http = axios;
new Vue({
  router,
  vuetify : new Vuetify({

    icons: {
      iconfont: 'md',
    }
  }),
  store,
  axios,
  render: h => h(App)
}).$mount('#app')

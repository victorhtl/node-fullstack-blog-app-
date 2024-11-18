import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap.js'
import './config/msgs.js'
import './config/axios.js'
import store from './config/store.js'
import router from './config/router.js'

Vue.config.productionTip = false

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
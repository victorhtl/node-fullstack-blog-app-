import 'font-awesome/css/font-awesome.css'
import Vue from 'vue'

import App from './App'

import './config/bootstrap.js'
import './config/msgs.js'
import store from './config/store.js'
import router from './config/router.js'

Vue.config.productionTip = false

// TEMPORARIO
require('axios').defaults.headers.common['Authorization'] = 'bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpZCI6ODYsIm5hbWUiOiJIZW5yaXF1ZSIsImVtYWlsIjoiaGVucmlxdWVAZW1haWwuY29tIiwiYWRtaW4iOnRydWUsImlhdCI6MTcyODkyODM4OCwiZXhwIjoxNzI5MTg3NTg4fQ.gzgvZjOfeRl3m-xTXDloek-37eTnO-ZCNBREVSTUYCY'

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')
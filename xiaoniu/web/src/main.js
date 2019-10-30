// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import store from './store'
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

import router from './router'
import footer from '@/components/footer'
import header from '@/components/header'
import header2 from '@/components/header2'
Vue.use(MintUI)
Vue.component("my-footer",footer)
Vue.component("my-header",header)
Vue.component("my-header2",header2)
Vue.config.productionTip = false

import axios from 'axios'
axios.defaults.baseURL = "http://127.0.0.1:3000"
Vue.prototype.$http = axios

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

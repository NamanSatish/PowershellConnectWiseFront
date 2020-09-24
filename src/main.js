import Vue from 'vue'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import VueTerminal from 'vue-terminal-ui'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import axios from 'axios'
import VueAxios from 'vue-axios'

import moment from './plugins/moment.js';
Vue.use(moment);


import App from './App.vue'
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use(VueTerminal)
Vue.use(VueAxios, axios)
Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')

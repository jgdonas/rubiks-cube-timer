import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import Vue from 'vue'
import App from './App.vue'
import BootstrapVue from 'bootstrap-vue'
import Store from './../store/index' //vuex

Vue.use(BootstrapVue);

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

Vue.config.productionTip = false

new Vue({
  store:Store,
  beforeCreate(){
    this.$store.commit('initStore');
  },
  render: h => h(App)
}).$mount('#app')

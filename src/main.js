import './../node_modules/bootstrap/dist/css/bootstrap.min.css'
import './../node_modules/mdbvue/build/css/mdb.css'
import Vue from 'vue'
import App from './App.vue'
import Store from './../store/index' //vuex

Vue.config.productionTip = false

new Vue({
  store:Store,
  beforeCreate(){
    this.$store.commit('initStore');
  },
  render: h => h(App)
}).$mount('#app')

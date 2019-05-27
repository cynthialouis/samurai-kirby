import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
 debug: true,
 connection: 'http://192.168.1.19:3000',
 vuex: {
     store,
     actionPrefix: 'SOCKET_',
     mutationPrefix: 'SOCKET_'
 }
}))

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

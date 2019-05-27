import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'

Vue.config.productionTip = false

Vue.use(new VueSocketIO({
 debug: true,
 connection: process.env.VUE_APP_SERVER_URL,
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

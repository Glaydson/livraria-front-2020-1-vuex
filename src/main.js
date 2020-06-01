import Vue from 'vue'
import App from './App.vue'


import "@/assets/global.css"
import moment from 'moment'
import router from './router'

Vue.config.productionTip = false

Vue.filter('formatDate', function(value) {
  if (value) {
    moment.locale('pt-BR');
    const data = moment(value);
    return moment(data).format('LL')
  }
})

Vue.filter('upperCase', function(value) {
  if (value) {
    return value.toUpperCase();
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')

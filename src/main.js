import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select';

import "@/assets/global.css"
import moment from 'moment'

Vue.config.productionTip = false


Vue.filter('formatDate', function(value) {
  if (value) {
    moment.locale('pt-BR');
    const data = moment(value);
    return moment(data).format('LL')
  }
})

Vue.component('v-select', vSelect);

new Vue({
  render: h => h(App),
}).$mount('#app')

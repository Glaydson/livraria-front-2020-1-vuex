import Vue from 'vue'
import App from './App.vue'
import vSelect from 'vue-select';
import VueToastr from '@deveodk/vue-toastr';
//import '@deveodk/vue-toastr/dist/vue-toaster.css';

import "@/assets/global.css"
import moment from 'moment'
import 'toastify-js/src/toastify.css';

Vue.config.productionTip = false
Vue.use(VueToastr, {
  defaultPosition: 'toast-bottom-left',
  defaultType: 'info',
  defaultTimeout: 1000
})


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

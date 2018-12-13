import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import io from 'socket.io-client'

import { library } from '@fortawesome/fontawesome-svg-core'
import * as icon from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

Vue.config.devtools = true;
Vue.config.productionTip = true;

io;

library.add(
    icon.faEllipsisV,
    icon.faEye,
    icon.faEyeSlash
);

Vue.component('font-awesome-icon', FontAwesomeIcon);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app');

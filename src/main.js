import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios'
import BootstrapVue from 'bootstrap-vue/dist/bootstrap-vue.esm';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import 'bootstrap/dist/css/bootstrap.css';
import { Tools } from './mixins/Tools.js';
import FlashMessage from '@smartweb/vue-flash-message';

//Flash messages (display flash alerts)
Vue.use(FlashMessage);

//Additional tools (avatar,...)
Vue.mixin(Tools);

//Bootstrap
Vue.use(BootstrapVue);

//Axios
Vue.prototype.$api = axios.create({
  baseURL: 'https://allweb.fun/coop/api',
  params: {},
  headers: { 'Authorization': "dc5c6d99039c10d00e00dcdef8a5552efe14b147" }
});

//Attach token to parametres
Vue.prototype.$api.interceptors.request.use(function (config) {
  if (store.state.token) {
    config.params.token = store.state.token;
  }
  return config;
});

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')

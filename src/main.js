import Vue from 'vue';
import Vuetify from 'vuetify';
import VueMeta from 'vue-meta';
import {
  sync,
} from 'vuex-router-sync';

import * as VueGoogleMaps from 'vue2-google-maps';
import App from './App.vue';
import router from './routes';
import store from './store';
import 'material-design-icons-iconfont/dist/material-design-icons.css';
import './registerServiceWorker';
import '../node_modules/vuetify/dist/vuetify.min.css';
import './assets/styles/main.scss';

Vue.config.productionTip = false;

Vue.use(Vuetify);
Vue.use(VueMeta);
Vue.use(VueGoogleMaps, {
  load: {
    key: 'AIzaSyC2mYZwQJqujtjlSZpy6M0KKG_PSCq2fcY',
    libraries: 'places',
  },
});
sync(store, router);

new Vue({
  render: (h) => h(App),
  router,
  store,
  vuetify: new Vuetify(),
}).$mount('#app');

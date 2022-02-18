import Vue from 'vue';
import Vuex from 'vuex';
import createPersistedState from 'vuex-persistedstate';

import getters from './getters';
import actions from './actions';
import mutations from './mutations';

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [
    createPersistedState(),
  ],
  state: {
    user: {
      loggedIn: false,
      token: null,
      isAdmin: false,
    },
  },
  getters,
  actions,
  mutations,
});

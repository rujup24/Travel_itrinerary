import Vue from 'vue';
import Router from 'vue-router';
import Login from '../components/Login.vue';
import SignUp from '../components/SignUp.vue';
import Planner from '../components/Planner.vue';
import DisplayIternary from '../components/DisplayIternary.vue';

Vue.use(Router);

export default new Router({
  // base: '',
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/SignUp',
      name: 'SignUp',
      component: SignUp,
    },
    {
      path: '/Planner',
      name: 'Planner',
      component: Planner,
      props: true,
    },
    {
      path: '/DisplayIternary',
      name: 'DisplayIternary',
      component: DisplayIternary,
      props: true,
    },
    { path: '*', redirect: '/login' },
  ],
});

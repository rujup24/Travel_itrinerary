<template>
  <div id="app">
    <!-- <v-app> -->
      <!-- <app-header /> -->
        <router-view />
      <!-- <app-footer /> -->
    <!-- </v-app> -->
  </div>
</template>
<script>
// import AppHeader from './components/AppHeader.vue';
// import Footer from './components/common/Footer.vue';

export default {
  name: 'App',
  metaInfo: {
    title: 'Home',
    titleTemplate: '%s | Vue Express Seed',
  },
  components: {
    // 'app-header': AppHeader,
    // 'app-footer': Footer,
  },
};
</script>
<style lang="scss">
</style>

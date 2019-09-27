<template>
  <div id="app">
    <Level></Level>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
  components: {
    Level: () => import('./Level/index.vue')
  }
}
</script>

<style lang="sass" src="@/assets/sass/index.sass"></style>

<template>
  <div class="level-item">
    <router-link :to="route">
      {{text}}
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'LevelRouteItem',
  props: {
    route: {},
    text: String
  }
}
</script>

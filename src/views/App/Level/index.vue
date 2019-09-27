<template>
  <div id="level">
    <nav class="level is-mobile is-unselectable">
      <div class="level-left">
        <router-link id="logo" to="/" tag="a">
          WCS 管理平台
        </router-link>

        <div style="width: 1.5rem"></div>

        <LevelRouteItem
          route="/dashboard"
          text="系统监控"
        ></LevelRouteItem>
        <LevelRouteItem
          route="/systems"
          text="设备管理"
        ></LevelRouteItem>
      </div>

    </nav>
  </div>
</template>

<script>
import LevelRouteItem from './LevelRouteItem'

export default {
  name: 'Level',
  components: {
    LevelRouteItem,
  },
  computed: {

  }
}
</script>

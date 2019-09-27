<template>
  <div
    v-if="!isLoading"
    class="container is-flex is-flex-column is-vcentered"
    style="width: 720px"
  >
    <div style="height: 1rem"></div>
    <SystemItem
      v-for="system in systems" :key="system.id"
      :system="system"
      @refresh="getDataSource"
    ></SystemItem>
    <div style="height: 1rem"></div>
    <router-link
      @click="$router.push({name: 'connection create'})"
      class="button is-info"
      style="width: 120px"
      to="/systems/create"
    >
      <span class="icon">
        <i class="iconfont icon-plus-bold"></i>
      </span>
      <span>
        新的设备
      </span>
    </router-link>
    <div style="margin-bottom: 1rem"></div>
    <router-view @refresh="getDataSource"></router-view>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import SystemItem from './SystemItem'

export default {
  name: 'Systems',
  components: {
    SystemItem
  },
  data: () => ({
    systems: [],
    isLoading: false,
  }),
  methods: {
    getDataSource () {
      this.isLoading = true
      axios.post('/hoisters/list')
        .then(response => this.systems = response.data)
        .finally(() => this.isLoading = false)
    }
  },
  created () {
    this.getDataSource()
  }
}
</script>

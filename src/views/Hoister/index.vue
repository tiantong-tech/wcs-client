<template>
  <div class="page-settings" v-if="!isLoading">
    <div style="height: 1.5rem"></div>
    <div class="columns">
      <div
        class="column is-narrow"
        style="width: 240px;"
      >
        <div class="menu is-unselectable">
          <ul class="menu-list">
            <li>
              <router-link :to="path">
                基础配置
              </router-link>
            </li>
            <li>
              <router-link :to="path + '/states'">
                设备状态
              </router-link>
            </li>
            <li>
              <router-link :to="path + '/commands'">
                指令设置
              </router-link>
            </li>
          </ul>
        </div>
      </div>
      <div
        class="column"
        style="padding-left: 2rem; padding-right: 2rem"
      >
        <nav class="breadcrumb is-medium" style="margin-bottom: 0">
          <ul>
            <li>
              <router-link to="/systems">设备列表</router-link>
            </li>
            <li class="is-active">
              <a>
                设备信息
              </a>
            </li>
          </ul>
        </nav>
        <hr>
        <router-view
          :hoister="hoister"
          @refresh="getDataSource"
        >
        </router-view>
        <div style="height: 2rem"></div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'SystemDetail',
  props: {
    hoister_id: {}
  },
  data: () => ({
    hoister: {},
    isLoading: true,
  }),
  computed: {
    path: vm => '/systems/hoisters/' + vm.hoister_id
  },
  methods: {
    getDataSource () {
      const params = { hoister_id: this.hoister_id}
      this.isLoading = true
      axios.post('hoisters/detail', params)
        .then(response => {
          this.hoister = response.data
        })
        .finally(() => this.isLoading = false)
    }
  },
  created () {
    this.getDataSource()
  }
}
</script>

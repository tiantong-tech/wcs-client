<template>
  <a
    @click="handleItemClick"
    @mouseout="isHovered = false"
    @mouseover="isHovered = true"
    class="system-item"
    v-active="false"
  >
    <span
      class="icon is-medium"
      :class="{ 'has-text-info': isHovered }">
      <i class="iconfont icon-hoister"></i>
    </span>

    <p style="flex: 2; margin-left: 0.75rem">
      <span v-if="system.name">
        {{system.name}}
      </span>
      <i v-else>[ 未命名 ]</i>
    </p>
    <div>
      <a
        @click.stop="handlePlayClick"
        class="button is-setting"
      >
        <span class="icon">
          <i v-if="system.is_running" class="iconfont icon-stop"></i>
          <i v-else class="iconfont icon-play"></i>
        </span>
      </a>
      <a
        @click.stop="handleDestroyClick"
        class="button is-setting"
      >
        <span class="icon">
          <i class="iconfont icon-close-bold"></i>
        </span>
      </a>
    </div>
  </a>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'ConnectionItem',
  props: {
    system: Object,
    // connectionId: {}
  },
  data () {
    return {
      isHovered: false,
    }
  },
  computed: {
    // isActive () {
    //   return this.connection.id == this.connectionId
    // }
  },
  methods: {
    handlePlayClick () {
      const params = {
        hoister_id: this.system.id
      }
      if (this.system.is_running) {
        this.$confirm({
          title: '操作',
          content:  '停止设备后台程序',
          handler: () => axios.post('hoisters/stop', params)
            .then(() => { this.system.is_running = false })
        })
      } else {
        this.$confirm({
          title: '操作',
          content: '启动设备后台程序',
          handler: () => axios.post('hoisters/run', params)
            .then(() => this.system.is_running = true)
        })
      }
    },
    handleDestroyClick () {
      this.$confirm({
        type: 'danger',
        title: '警告',
        content: '删除设备后将无法恢复',
        confirmText: '删除',
        handler: () => axios.post('/hoisters/delete', { hoister_id: this.system.id })
          .then(() => {
            this.$emit('refresh')
            this.$message('设备已删除')
          })
      })
    },
    async handleItemClick () {
      this.isHovered = false
      this.$router.push(`/systems/hoisters/${this.system.id}`)
    },
  }
}
</script>

<template>
  <div :class="`message is-${type}`">
    <template v-if="type">
      <span :class="'icon has-text-' + type">
        <i :class="'iconfont icon-' + type" style="font-size: 1.75rem"></i>
      </span>
      <span style="width: 1rem"></span>
    </template>
    <span>{{text}}</span>
    <span class="is-flex-auto"></span>
    <span class="is-flex is-vcentered">
      <button @click="close" class="delete"></button>
    </span>
  </div>
</template>

<script>
export default {
  name: 'AppNotificationItem',
  props: {
    type: {
      type: String,
      default: 'info'
    },
    duration: {
      type: Number,
      default: 3333
    },
    text: {
      type: String,
      default: '数据已更新'
    }
  },
  methods: {
    close () {
      this.$emit('close')
    }
  },
  created () {
    if (this.duration) {
      setTimeout(() => this.close(), this.duration)
    }
  }
}
</script>

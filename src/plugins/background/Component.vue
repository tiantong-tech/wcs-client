<template>
  <div
    v-show="isShow"
    @click="handleClick"
    class="background"
    :style="{ 'z-index': zIndex }"
  ></div>
</template>

<script>
export default {
  name: 'Background',
  data: () => ({
    isShow: false,
    zIndex: 99999,
    onClick: () => {},
    closeOnClick: true,
  }),
  methods: {
    open (zIndex = 99999) {
      this.isShow = true
      this.zIndex = zIndex
    },
    close () {
      this.isShow = false
    },
    handleClick () {
      this.onClick(this)
      this.closeOnClick && this.close()
    }
  }
}
</script>

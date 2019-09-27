<template>
  <td
    v-if="isShow"
    class="is-editable"
    style="max-width: 60px;"
  >
    <div
      class="background"
      @click="handleClose"
    ></div>
    <div class="input-container">
      <input
        v-focus
        v-model.trim="inputValue"
        @keypress.enter="handleClose"
        style="text-align: center"
        type="text" class="input is-info"
      >
    </div>
  </td>
  <td
    v-else
    @click="handleOpen"
    class="is-clickable is-hoverable"
  >
    {{value}}
  </td>
</template>

<script>
export default {
  name: 'FloorCell',
  props: {
    value: {}
  },
  data: () => ({
    inputValue: '',
    isShow: false,
  }),
  methods: {
    handleOpen () {
      this.isShow = true
      this.$parent.isHovered = false
    },
    handleClose () {
      this.$emit('input', this.inputValue)
      this.isShow = false
    }
  },
  watch: {
    value: {
      immediate: true,
      handler (val) {
        this.inputValue = val
      }
    }
  }
}
</script>

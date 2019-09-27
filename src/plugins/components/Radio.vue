<template>
  <span @click="handleClick">
    <span
      :class="spanClass"
      style="cursor: pointer"
      :style="spanStyle"
    >
      <i
        :class="iconClass"
        :style="iconStyle"
      ></i>
    </span>
    <span class="is-unselectable" style="cursor: pointer">
      <slot></slot>
    </span>
  </span>
</template>

<script>
export default {
  props: {
    value: {},
    fontSize: {},
    disabled: Boolean
  },
  computed: {
    spanClass () {
      let color = 'info'

      if (this.disabled) color = 'grey-lighter'
      else if (!this.value) color = 'grey-light'

      return [
        'icon',
        'has-text-' + color
      ]
    },
    spanStyle () {
      const style = {}

      if (this.fontSize) {
        style.width = style.height = this.fontSize
      }

      return style
    },
    iconClass () {
      return 'iconfont icon-radio-' + (this.value ? 'checked' : 'unchecked')
    },
    iconStyle () {
      const result = {}
      if (this.fontSize) {
        result['font-size'] = this.fontSize
      }

      return result
    }
  },
  methods: {
    handleClick () {
      if (!this.disabled) {
        this.$emit('input', this.value)
      }

      this.$emit('click')
    }
  }
}
</script>

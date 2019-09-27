<template>
  <label
    :class="labelClass"
    :style="labelStyle"
    @click="handleClick"
  >
    <span
      :class="spanClass"
      :style="spanStyle"
    >
      <i
        :class="'iconfont icon-checkbox-' + iconName"
        :style="iconStyle"
      />
    </span>
    <span class="is-unselectable" style="cursor: pointer">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  props: {
    size: String,
    inline: Boolean,
    fontSize: String,
    disabled: Boolean,
    value: [Boolean, String]
  },
  computed: {
    iconName () {
      switch (this.value) {
        case true:
          return 'checked'
        case false:
          return 'unchecked'
        case 'minus':
          return 'minus'
      }

      return false
    },
    labelClass () {
      return [
        'checkbox',
        this.disabled && 'has-text-grey-light'
      ]
    },
    labelStyle () {
      return {
        display: this.inline ? 'inline' : 'block',
        'margin-left': '-0.25rem'
      }
    },
    spanClass () {
      let color = 'info'

      if (this.disabled) color = 'grey-lighter'
      else if (this.value === false) color = 'grey-light'

      return [
        'icon',
        'is-' + this.size,
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
        this.$emit('input', Boolean(!this.value))
      }

      this.$emit('click')
    }
  }
}
</script>

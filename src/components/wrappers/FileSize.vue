<template>
  <component :is="tag">
    {{trans(value)}}
  </component>
</template>

<script>
const units = ['bit', 'kb', 'mb', 'gb']

export default {
  name: 'FileSize',
  props: {
    value: {},
    tag: {
      type: String,
      default: 'span'
    }
  },
  methods: {
    trans () {
      let i, value = Number(this.value)

      for (i = 0; i < 3; i++) {
        if (value / 1024 < 1) {
          break
        } else {
          value /= 1024
        }
      }

      return value.toFixed(1) + ' ' + units[i]
    }
  }
}
</script>

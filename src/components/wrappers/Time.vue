<template>
  <component :is="tag">
    {{value ? value.substr(0, 10) : $props.default}}
  </component>
</template>

<script>
export default {
  name: 'TimeWrapper',
  props: {
    tag: {
      type: String,
      default: 'span'
    },
    default: {
      default: '无'
    },
    value: String
  }
}
</script>

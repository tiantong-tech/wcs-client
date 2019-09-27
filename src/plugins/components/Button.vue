<template>
  <component
    :is="tag"
    class="button"
    v-bind="$attrs"
    v-class:is-loading="isLoading"
    @click="!disabled && $emit('click')"
    :disabled="disabled"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'Button',
  props: {
    tag: {
      type: String,
      default: 'a'
    },
    isLoading: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    }
  }
}
</script>

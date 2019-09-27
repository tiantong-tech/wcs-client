<template>
  <section class="field has-addons">
    <p
      v-for="option in options" :key="getOptionValue(option)"
      class="control"
    >
      <a
        class="button"
        v-style:width="width"
        @click="$emit('input', getOptionValue(option))"
        v-class:is-focused="value === getOptionValue(option)"
      >
        <span>{{getOptionText(option)}}</span>
      </a>
    </p>
  </section>
</template>

<script>
export default {
  name: 'SelectableButtons',
  props: {
    value: [String, Number, Boolean],
    options: Array,
    width: {
      type: String,
      default: 'auto'
    }
  },
  methods: {
    getOptionValue (option) {
      return typeof option === 'object'
        ? option.value
        : option
    },
    getOptionText (option) {
      return typeof option === 'object'
        ? option.text
        : option
    }
  }
}
</script>

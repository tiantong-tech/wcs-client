<template>
  <textarea
    :rows="rows"
    v-bind="$attrs"
    class="textarea"
    @input="handleInput"
  ></textarea>
</template>

<script>
export default {
  name: 'Textarea',
  props: {
    rows: {
      default: 4
    }
  },
  methods: {
    asyncRows () {
      const rows = this.$el.value.split(/\r*\n/).length
      if (rows > this.rows) {
        this.$el.rows = rows
      }
    },
    handleInput (event) {
      this.asyncRows()
      this.$emit('input', event.target.value)
    }
  },
  mounted () {
    this.asyncRows()
  }
}
</script>

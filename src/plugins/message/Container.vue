<template>
  <div class="app-messages is-flex is-flex-column is-vcentered">
    <Message
      v-for="item in items" :key="item.id"
      @close="remove(item.id)"
      v-bind="item"
    ></Message>
  </div>
</template>

<script>
import Message from './Message'

export default {
  name: 'AppMessages',
  components: {
    Message
  },
  data () {
    return {
      count: 1,
      items: []
    }
  },
  methods: {
    async add ({ type, text, handler, duration = 3000 }) {
      if (handler) {
        await handler()
      }
      this.items.push({ text, type, duration, id: this.count++ })
    },
    remove (id) {
      const index = this.items.findIndex(item => item.id === id)
      if (index !== -1) {
        this.items.splice(index, 1)
      }
    }
  }
}
</script>

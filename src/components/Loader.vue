<template>
  <VueLoading
    v-show="isDelayEnd"
    type="spin"
    :style="style"
  />
</template>

<script>
import { VueLoading } from 'vue-loading-template'

export default {
  name: 'Loader',
  components: {
    VueLoading
  },
  props: {
    color: {
      default: '#118fe4'
    },
    size: {
      default: '4rem'
    },
    delay: {
      type: [Number, String]
    },
    marginTop: {
      type: String,
      default: '10rem'
    }
  },
  data () {
    return {
      isDelayEnd: false
    }
  },
  computed: {
    style () {
      return {
        'fill': this.color,
        'width': this.size,
        'height': this.size,
        'padding-top': this.marginTop
      }
    }
  },
  methods: {
    handleDelay () {
      const delay = parseInt(this.delay)
      if (isNaN(delay)) {
        this.isDelayEnd = true
      } else {
        setTimeout(() => this.isDelayEnd = true, delay)
      }
    }
  },
  mounted () {
    this.handleDelay()
  }
}
</script>

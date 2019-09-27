<template>
  <div v-active="isShow" class="modal confirmation">
    <div class="modal-background"/>
    <div
      class="modal-card"
      v-style:width="width"
      style="min-width: 320px"
    >
      <div class="box">
        <div class="box-head">
          <p class="box-title">
            {{title}}
          </p>
        </div>
        <div class="box-body">
          {{content}}
        </div>
        <div class="box-footer is-flex" style="flex-flow: row-reverse">
          <a
            :class="`button is-${type}`"
            @click="handleConfirm"
          >{{confirmText}}</a>
          <a class="button" @click="handleClose">取消</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ModalCard',
  model: {
    prop: 'show',
    event: 'close'
  },
  data () {
    return {
      width: '',
      isShow: false,
      isLoading: false,

      type: 'info',
      title: '',
      content: '',
      confirmText: '',
      handler: false,
      beforeClose: false,
    }
  },
  methods: {
    // handleEscape () {
    //   console.log(1000)
    //   this.handleClose() 
    // },
    async handleClose () {
      try {
        this.beforeClose && await this.beforeClose()
      } finally {
        this.isShow = false
      }
    },
    async handleConfirm () {
      if (this.handler) {
        try {
          this.isLoading = true
          const result = await this.handler()
          if (result !== false) {
            this.isShow = false
          }
        } finally {
          this.isLoading = false
        }
      } else {
        this.handleClose()
        this.$emit('confirm')
      }
    },
    open ({
      type = 'info',
      title,
      handler,
      content,
      beforeClose,
      width = 'auto',
      confirmText = '确认',
    }) {
      this.type = type
      this.width = width
      this.title = title
      this.content = content
      this.handler = handler
      this.beforeClose = beforeClose
      this.confirmText = confirmText
      this.isShow = true
    }
  }
}
</script>

<template>
  <div class="modal is-active">
    <div class="background"></div>
    <div class="modal-card" style="width: 420px">
    <header class="modal-card-head">
      <p class="modal-card-title">添加设备</p>
    </header>
    <section class="modal-card-body">
      <div class="field">
        <label class="label">设备类型</label>
        <input type="text" class="input" readonly value="提升机">
      </div>
      <div class="field">
        <label class="label">设备名称</label>
        <input
          v-model="params.name"
          type="text" class="input"
        >
      </div>
    </section>
    <footer class="modal-card-foot">
      <button
        class="button is-success"
        @click="handleSubmit"
      >提交</button>
      <button
        class="button"
        @click="handleClose"
      >取消</button>
    </footer>
    </div>
  </div>
</template>

<script>
import axios from '@/providers/axios'

export default {
  name: 'SystemCreate',
  data: () => ({
    params: {
      name: ''
    }
  }),
  methods: {
    handleClose () {
      this.$router.push('/systems/')
    },
    handleSubmit () {
      this.$wait(() => {
        return axios.post('/hoisters/create', this.params)
          .then(() => {
            this.handleClose()
            this.$message('设备已添加')
            this.$emit('refresh')
          })
      })
    }
  }
}
</script>

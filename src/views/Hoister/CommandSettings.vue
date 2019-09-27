<template>
  <div>
    <div class="content">
      <p class="title is-4">去向任务</p>
      <p>
        通过将去向任务的值写入软元件，直接操作设备。
      </p>
    </div>
    <div class="field" style="width: 280px">
      <label class="label">软元件寄存器</label>
      <div class="control">
        <input
          v-model="params.dispatch_address"
          type="text" class="input"
        >
      </div>
    </div>
    <Button
      class="is-info is-save"
      :disabled="!isChanged"
      @click="handleSave"
    >保存</Button>
  </div>
</template>

<script>
import dataEditor from '@/utils/data-editor'

export default {
  name: 'CommandSettings',
  props: {
    hoister: {}
  },
  data: () => ({
    params: {
      dispatch_address: ''
    },
  }),
  computed: {
    changes: vm => dataEditor.getChanges(vm.params, vm.hoister),
    isChanged: vm => dataEditor.isChanged(vm.changes)
  },
  methods: {
    handleSave () {
      const hoister = {
        id: this.hoister.id,
        data: this.changes
      }

      return dataEditor.save('/hoisters/update', { hoister })
        .then(() => {
          dataEditor.push(this.changes, this.hoister)
        })
    }
  },
  created () {
    dataEditor.pull(this.params, this.hoister)
  }
}
</script>

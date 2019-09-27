<template>
  <div>
    <p class="title">设备名称</p>
    <div class="field">
      <div class="control">
        <input type="text" class="input" v-model="params.name">
      </div>
    </div>

    <hr>

    <div class="content">
      <p class="title">
        PLC 设置
      </p>
      <p>
        由于 PLC 连接不支持并发，因此需要两个端口，以处理更不同类型的业务。
      </p>
      <p>
        任务端口用于处理周期性、高频率、信息量较大的任务、比如心跳写入、数据采集等。<br/>
        这类任务具需要有执行间隔，并且不依赖事务保障。
      </p>
      <p>
        指令端口基于 订阅/发布 的消息处理模型，无主动延时，用于处理实时性要求高、依赖事务保障的任务。
      </p>
    </div>

    <div class="is-flex" style="margin-bottom: -0.75rem">
      <div class="field">
        <label class="label">主机地址</label>
        <div class="control">
          <input type="text" class="input" v-model="params.plc_host">
        </div>
      </div>
      <div style="width: 0.5rem"></div>
      <div
        class="field"
        style="min-width: 80px; width: 80px"
      >
        <label class="label">任务端口</label>
        <div class="control">
          <input type="text" class="input" v-model="params.plc_task_port">
        </div>
      </div>
      <div style="width: 0.5rem"></div>
      <div class="field">
        <label class="label">指令端口</label>
        <div class="control is-flex">
          <input
            type="text" class="input"
             v-model="params.plc_command_port"
            style="width: 80px; margin-right: 0.5rem"
          >
          <a class="button is-success">
            连接测试
          </a>
        </div>
      </div>
    </div>
    <hr>
    <div class="content">
      <p class="is-size-5 has-text-weight-bold">
        心跳设置
      </p>
      <p>
        心跳连接通过设定的间隔向 PLC 写入时间信息，设备根据该时间的变化自行判断是否处于 WCS 系统的连接下。
      </p>
      <p>
        如果将心跳间隔设为 0，则关闭心跳功能。
      </p>
    </div>

    <div class="is-flex" style="margin-bottom: -0.75rem">
      <div class="field">
        <label class="label">软元件寄存器</label>
        <div class="control">
          <input
            v-model="params.heartbeat_address"
            type="text" class="input"
          >
        </div>
      </div>
      <span style="width: 0.5rem"></span>
      <div class="field">
        <label class="label">间隔</label>
        <div class="control">
          <input
            v-model="params.heartbeat_interval"
            type="text" class="input" style="width: 80px"
          >
        </div>
      </div>
    </div>
    <hr>
    <Button
      @click="handleSave"
      :disabled="!isChanged"
      class="is-info is-save"
    >保存</Button>
  </div>
</template>

<script>
import dataEditor from '@/utils/data-editor'

export default {
  name: 'HoisterProfile',
  props: {
    hoister: {}
  },
  data: () => ({
    type: '提升机',
    params: {
      name: 0,
      plc_host: 0,
      plc_task_port: 0,
      plc_command_port: 0,
      heartbeat_address: 0,
      heartbeat_interval: 0,
    }
  }),
  computed: {
    changes:  vm => dataEditor.getChanges(vm.params, vm.hoister),
    isChanged:  vm => dataEditor.isChanged(vm.changes),
  },
  methods: {
    handleSave () {
      const hoister = {
        id: this.hoister.id,
        data: this.changes
      }

      return dataEditor.save('/hoisters/update', { hoister })
        .then(() => {
          this.$emit('refresh')
        })
    }
  },
  created () {
    dataEditor.pull(this.params, this.hoister)
  },
  beforeRouteLeave: dataEditor.closeConfirm(),
}
</script>

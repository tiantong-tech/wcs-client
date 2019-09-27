<template>
  <div>
    <div class="content">
      <p class="title is-5">
        楼层设置
      </p>
      <p>
        管理设备楼层的定义，用<strong> 层 </strong>是值楼层的实际层数，key 为该层在软元件寄存器中实际存储的值。
      </p>
      <p>
        每个楼层至多拥有两个出入口：D1 和 D2，每个门分别拥有：自动、有货和报警这三种状态。
      </p>
      <p>
        如果软元件地址被设置为 0，数据采集器会跳过与之对应的状态采集。
      </p>
    </div>
    <table class="table is-fullwidth is-nowrap is-centered is-vcentered has-border-bottom">
      <thead>
        <th class="is-centered" colspan="2">
          <Button
            class="button is-light"
            :disabled="isAddingFloor"
            @click="handleFloorCreate"
          >添加楼层</Button>
        </th>
        <th class="is-centered" colspan="6" style="padding-bottom: 0">软元件寄存器</th>
        <th></th>
      </thead>
      <thead>
        <th style="width: 60px">key</th>
        <th style="width: 60px">层</th>
        <th>D1 - 自动</th>
        <th>D1 - 有货</th>
        <th>D1 - 报警</th>
        <th>D2 - 自动</th>
        <th>D2 - 有货</th>
        <th>D2 - 报警</th>
        <th></th>
      </thead>
      <tbody>
        <FloorSettings
          v-for="(floor, key) in params.floors" :key="floor.id"
          :floor="floor"
          :id="hoister.floors[key].id"
          @deleted="handleFloorDelete(key)"
        >
        </FloorSettings>
        <tr v-if="!params.floors.length">
          <td
            colspan="9"
            style="font-size: 1.125rem; height: 2.875rem"
          >
            没有楼层信息
          </td>
        </tr>
      </tbody>
    </table>
    <div style="height: 2rem"></div>
    <div class="content">
      <p class="title is-5">
        运行状态
      </p>
      <p>
        与设备运行相关的一系列状态，用整数 0，1，2 表示，用于监控数据采集和下发任务前的确认
      </p>
      <p>
        0：设备维护中，无法处理运行指令
      </p>
      <p>
        1：设备待命中，可接受并执行运行指令
      </p>
      <p>
        2：设备使用中，暂时无法执行运行指令
      </p>
    </div>
    <div class="field">
      <label class="label">软元件寄存器</label>
      <div class="control">
        <input
          v-model="params.hoister.running_state_address"
          type="text" class="input"
        >
      </div>
    </div>
    <hr>
    <div class="content">
      <p class="title is-5">
        升降台位置
      </p>
      <p>
        设备升降台所处的楼层，软元件中的值为整数 key = 0, 1, 2, ... 与楼层定义中的 key 相对应。
      </p>
      <p>
        展示时，将根据 key 找到对应的楼层定义，
        所以当该软元件存储一个约定以外的值时，升降台位置将处于未知状态。
      </p>
    </div>
    <div class="field">
      <label class="label">软元件寄存器</label>
      <div class="control">
        <input
          v-model="params.hoister.lift_position_address"
          type="text" class="input"
        >
      </div>
    </div>
    <hr>
    <Button
      class="is-info is-save"
      @click="handleSave"
      :disabled="!isChanged.hoister && !isChanged.floors"
    >保存</Button>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import dataEditor from '@/utils/data-editor'
import FloorSettings from './FloorSettings'

export default {
  name: 'StateSettings',
  components: {
    FloorSettings
  },
  props: {
    hoister: {}
  },
  data: () => ({
    params: {
      hoister: {
        running_state_address: '',
        lift_position_address: '',
      },
      floors: [],
    },
    floorKeys: [
      'key', 'floor',
      'door1_auto_address', 'door1_alarm_address', 'door1_block_address',
      'door2_auto_address', 'door2_alarm_address', 'door2_block_address',
    ],
    isAddingFloor: false
  }),
  computed: {
    /**
     * @param {changes} hoister
     * @param {map<changes>} floor
     */
    changes () {
      const { hoister, floors } = this.params

      return {
        hoister: dataEditor.getChanges(this.params.hoister, this.hoister),
        floors: floors.map((floor, key) => dataEditor.getChanges(floor, this.hoister.floors[key]))
      }
    },
    isChanged () {
      const { hoister, floors } = this.changes

      return {
        hoister: dataEditor.isChanged(hoister),
        floors: floors.some(changes => dataEditor.isChanged(changes))
      }
    }
  },
  methods: {
    handleFloorCreate () {
      const params = {
        hoister_id: this.hoister.id
      }

      this.$confirm({
        title: '提示',
        content: '该操作将直接添加一条楼层信息',
        handler: () => axios.post('/hoisters/floors/create', params)
          .then(response => {
            const floor = response.data.data
            this.hoister.floors.push(floor)
            this.params.floors.push(dataEditor.pull({}, floor, this.floorKeys))
            this.$message('楼层已添加')
          })
      })
    },
    handleFloorDelete (key) {
      this.params.floors.splice(key, 1)
      this.hoister.floors.splice(key, 1)
    },
    handleSave () {
      let hoister = {}, floors = {}

      if (this.isChanged.hoister) {
        hoister = {
          id: this.hoister.id,
          data: this.changes.hoister
        }
      }
      if (this.isChanged.floors) {
        this.changes.floors.forEach((changes, key) => {
          if (dataEditor.isChanged(changes)) {
            floors[this.hoister.floors[key].id] = changes
          }
        })
      }

      return dataEditor.save('hoisters/update', { hoister, floors })
        .then(() => {
          this.$emit('refresh')
        })
    },
  },
  created () {
    dataEditor.pull(this.params.hoister, this.hoister)
    this.params.floors = []
    this.hoister.floors.forEach((floor, key) => {
      this.$set(this.params.floors, key, dataEditor.pull({}, floor, this.floorKeys))
    })
  },
  beforeRouteLeave: dataEditor.closeConfirm()
}
</script>

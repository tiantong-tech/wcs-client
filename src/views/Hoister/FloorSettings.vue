<template>
  <tr
    @mouseover="isHovered = true"
    @mouseleave="isHovered = false"
    style="height: 2.875rem"
  >
    <FloorCell v-model="floor.key"></FloorCell>
    <FloorCell v-model="floor.floor"></FloorCell>
    <FloorCell v-model="floor.door1_auto_address"></FloorCell>
    <FloorCell v-model="floor.door1_block_address"></FloorCell>
    <FloorCell v-model="floor.door1_alarm_address"></FloorCell>
    <FloorCell v-model="floor.door2_auto_address"></FloorCell>
    <FloorCell v-model="floor.door2_block_address"></FloorCell>
    <FloorCell v-model="floor.door2_alarm_address"></FloorCell>
    <td style="width: 80px">
      <a
        @click="handleDelete"
      >删除</a>
    </td>
  </tr>
</template>

<script>
import axios from '@/providers/axios'
import FloorCell from './FloorCell'

export default {
  name: 'StateSettingsFloorItem',
  components: {
    FloorCell
  },
  props: {
    id: {},
    floor: {}, 
  },
  data: () => ({
    isHovered: false,
  }),
  methods: {
    handleDelete () {
      this.$confirm({
        title: '警告',
        content: '楼层信息删除后将无法恢复',
        handler: () => axios.post('hoisters/floors/delete', { floor_id: this.id })
          .then(() => {
            this.$emit('deleted')
            this.$message('楼层已删除')
          })
      })
    }
  },
}
</script>

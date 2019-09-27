<template>
  <div style="overflow: auto; padding: 1rem">
    <table class="table is-nowrap">
      <thead>
        <th v-for="hoister in hoisters" :key="hoister.id">
          {{hoister.name}}
        </th>
      </thead>
      <tbody>
        <tr></tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from '@/providers/axios'
import dataSet from '@/utils/data-set'

export default {
  name: 'Dashboard',
  data: () => ({
    dataSource: {
      floors: { list: [], entities: {} },
      hoisters: { list: [], entities: {} }
    }
  }),
  computed: {
    hoisters () {
      return dataSet.map(this.dataSource.hoisters)
    },
    floors () {
      return dataSet.map(this.dataSource.floors)
    }
  },
  created () {
    axios.post('/hoisters/list/all')
      .then(response => {
        dataSet.clear(this.dataSource.floors)
        this.dataSource.hoisters = dataSet.from(
          response.data, item => {
            dataSet.push(this.dataSource.floors, item.floors)
            return [item.id, item]
          }
        )
      })
  }
}
</script>

<template>
  <nav v-if="lastPage > 1" class="pagination is-centered">
    <ul class="pagination-list">
      <li>
        <a
          @click="change(page - 1)"
          class="pagination-link"
          :disabled="page === 1"
        >
          上一页
        </a>
      </li>
      <li v-for="(i, index) in pages" :key="index">
        <span
          v-if="i === 0"
          class="pagination-ellipsis"
        >&hellip;</span>
        <a
          v-else
          @click="change(i)"
          class="pagination-link"
          :class="i === page ? 'is-current' : 'has-background-white'"
        >{{i}}</a>
      </li>
      <li>
        <a
          @click="change(page + 1)"
          class="pagination-link"
          :disabled="page === lastPage"
        >
          下一页
        </a>
      </li>
    </ul>
  </nav>
</template>

<script>
export default {
  name: 'Pagination',
  props: {
    page: {},
    pageSize: {},
    total: {}
  },
  computed: {
    lastPage () {
      return Math.ceil(this.total / this.pageSize)
    },
    pages () {
      const N = 9
      const P = this.page
      const L = this.lastPage
      const No = L < N
      const HasLeft = P >= N / 2
      const HasRight = L - P >= N / 2 - 1

      if (No) {
        return [...new Array(L).keys()].map(i => i + 1)
      } else if (HasLeft && HasRight) {
        return [1, 0, P - 2, P - 1, P, P + 1, P + 2, 0, L]
      } else if (HasLeft && !HasRight) {
        return [1, 0, L - 6, L - 5, L - 4, L - 3, L - 2, L - 1, L]
      } else if (!HasLeft && HasRight) {
        return [1, 2, 3, 4, 5, 6, 7, 0, L]
      }
    }
  },
  methods: {
    change (page) {
      if (page !== this.page && page >= 1 && page <= this.lastPage) {
        this.$emit('change', page)
      }
    }
  }
}
</script>

import axios from '@/providers/axios'

/**
 * 为没有 id 的数据自动分配一个 uuid
 */
const state = {
  id: 0,
  hasId: true
}

const getData = () => ({
  url: '',
  list: [],
  data: {},
  meta: {
    page: 0,
    page_size: 0,
    total: 0
  },
  params: {
    page: 1,
    page_size: 15,
    search: ''
  },
  isLoading: false,
})

const computed = {
  item () {
    const id = this.$route.params.id

    return id && this.data[id]
  },
  items () {
    return this.list.map(id => this.data[id])
  },
  isAllSelected () {
    return this.items.every(item => item.$selected) && this.items.length
  },
  isNoneSelected () {
    return !this.items.some(item => item.$selected)
  },
  selectedStatus () {
    if (this.isAllSelected) return true
    else if (this.isNoneSelected) return false
    else return 'minus'
  },
  selectedIds () {
    return this.items.filter(item => item.$selected)
      .map(item => item.id)
  }
}

const methods = {
  getDataSource () {
    const handleBefore = () => {
      this.list = []
      this.data = {}
      this.isLoading = true
    }
    const handleThen = response => {
      const { page, page_size, total, data } = response.data
      this.meta.page = page
      this.meta.pageSize = page_size
      this.meta.total = total
      if (data[0] && !data[0].id) {
        state.hasId = false
      }
      data.forEach(item => {
        item.$selected = false
        state.hasId || (item.id = state.id++)
        this.list.push(item.id)
        this.$set(this.data, item.id, item)
      })
    }
    const handleCatch = error => {
      throw error
    }
    const handleFinally = () => {
      this.isLoading = false
    }

    handleBefore()
    axios.post(this.url, this.params)
      .then(handleThen)
      .catch(handleCatch)
      .finally(handleFinally)
  },
  initialize ({ url = '', params = {}, hasId = true }) {
    this.url = url
    state.hasId = hasId
    Object.keys(params).forEach(
      key => this.$set(this.params, key, params[key])
    )
    this.getDataSource()
  },
  refresh () {
    this.getDataSource()
  },
  search () {
    this.params.page = 1
    this.getDataSource()
  },
  changePage (page) {
    this.params.page = page
    this.getDataSource()
  },
  changePageSize (pageSize) {
    this.params.page_size = pageSize
    this.getDataSource()
  },
  handleSelect (id) {
    this.data[id].$selected = !this.data[id].$selected
  },
  handleSelectAll () {
    const value = !this.selectedStatus

    this.items.forEach(item => item.$selected = value)
  }
}

export default {
  data: getData,
  computed,
  methods,
}

import Container from './Container'

export default {
  install (Vue) {
    const vm = new (Vue.extend(Container))
    vm.$mount('#messages')
    
    Vue.prototype.$message = (text, duration) => {
      let params = text

      if (typeof text === 'string') {
        params = { text, duration }
      }

      vm.add(params)
    }
  }
}

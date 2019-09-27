import Component from './Component'

export default {
  install (Vue) {
    const vm = new (Vue.extend(Component))
    vm.$mount('#confirmation')    

    Vue.prototype.$confirm = vm.open
  }
}

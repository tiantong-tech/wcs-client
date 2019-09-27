import Component from './Component'

export default {
  install (Vue) {
    const vm = new (Vue.extend(Component))
    vm.$mount('#background')
    Vue.prototype.$background = {
      open: vm.open,
      close: vm.close,
      get onClick () {
        return vm.onClick
      },
      set onClick (cb) {
        vm.onClick = cb
      }
    }
  }
}

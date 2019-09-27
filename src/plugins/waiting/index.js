import Vue from 'vue'
import Component from './Component'

const vm = new (Vue.extend(Component))
vm.$mount('#waiting')

export default {
  install (Vue) {
    Vue.prototype.$wait = vm.wait
  }
}

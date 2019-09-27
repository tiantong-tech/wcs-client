import Vue from 'vue'
import App from './views/App/index.vue'
import router from './providers/router'
import store from './providers/store'
import directives from './providers/directives'
import components from './plugins/components'
import clickoutside from './directives/clickoutside'
import waiting from './plugins/waiting'
import message from './plugins/message'
import background from './plugins/background'
import confirmation from './plugins/confirmation'

Vue.config.productionTip = false

Vue.use(components)
Vue.use(directives)
Vue.use(waiting)
Vue.use(message)
Vue.use(background)
Vue.use(confirmation)
Vue.directive('clickoutside', clickoutside)

new Vue({
  store,
  router,
  render: h => h(App)
}).$mount('#app')

import Vue from 'vue'
import App from './App.vue'
import VueApollo from 'vue-apollo'
import apolloClient from './apolloClient'

Vue.use(VueApollo)
Vue.config.productionTip = false
const apolloProvider = new VueApollo({
  defaultClient: apolloClient,
})

new Vue({
  render: h => h(App),
  apolloProvider,
}).$mount('#app')

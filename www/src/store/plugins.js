import vue from 'vue'
import VueTimeago from 'vue-timeago'
import router from './router'
import store from './store'
import './plugins'

Vue.use(VueTimeago, {
  name: 'timeago', // component name, `timeago` by default
  locale: 'en-US',
  locales: {
    // you will need json-loader in webpack 1
    'en-US': require('vue-timeago/locales/en-US.json')
  }
})
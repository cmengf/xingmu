// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import ElementUI from 'element-ui'
import store from './store/index'
import  axios from 'axios'
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios
import 'element-ui/lib/theme-chalk/index.css'
import './assets/animate.css'
import VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
Vue.config.productionTip = false
Vue.use(ElementUI)
/* eslint-disable no-new */
import echarts from 'echarts'
Vue.prototype.$echarts = echarts
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})

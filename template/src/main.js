import 'babel-polyfill'
import Vue from "vue";
import Animation from "./Animation.vue";
import router from "./router";
import store from "./store";
import axios from "./common/axios";
import Element from "element-ui";
import echarts from 'echarts'
/* import 'element-ui/lib/theme-chalk/index.css'; */
import './assets/css/admin.css'
import './assets/iconfont/iconfont.css'
import './assets/iconfont/iconfont.css'
import './assets/theme/index.css'

Vue.prototype.$http = axios
Vue.prototype.$echarts = echarts 

Vue.axios = axios
Vue.http = axios;
Vue.use(Element);


new Vue({
  store,
  router,
  el: "#root",
  render: h => h(Animation)
})

import Vue from "vue";
import VueRouter from "vue-router";
import routes from "./routes";
import { sync } from "vuex-router-sync";
import store from "../store";

import config from "../config";
//加载路由中间件
Vue.use(VueRouter)

//定义路由
const router = new VueRouter({
  routes: routes,
  //mode: 'history'
})

sync(store, router)

const { state } = store

router.beforeEach((to, from, next) => {
  next()

})


export default router

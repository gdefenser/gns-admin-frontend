import axios from "axios";
import { getBaseUrl } from "../common/utils";
import store from "../store/index";

import * as cookie from "./cookie"
import lizStore from "../store"

// axios 配置
axios.defaults.timeout = 10000;
axios.defaults.auth


//POST传参序列化
axios.interceptors.request.use((config) => {
  return config;
}, (error) => {
  return Promise.reject(error);
});

/* //返回状态判断
axios.interceptors.response.use(function (response) {

  return response
}, function (error) {
  // Do something with response error  
  return Promise.reject(error)
})
 */

export default axios

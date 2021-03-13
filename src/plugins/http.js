import axios from "axios";
export default {
  install: function(Vue, options) {
    axios.defaults.baseURL = "http://127.0.0.1:8888/api/private/v1/";
    axios.interceptors.request.use(
      value => {
        // 这里可以做一些添加token的操作
        return value;
      },
      error => {
        console.log("ajax 请求出错:", error);
      }
    );
    axios.interceptors.response.use(
      res => {
        return res.data;
      },
      error => {
        console.log("ajax 返回出错:", error);
      }
    );
    // 4. 添加实例方法
    Vue.prototype.$http = axios;
  }
};

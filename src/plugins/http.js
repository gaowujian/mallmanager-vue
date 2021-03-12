import axios from "axios";
export default {
  install: function(Vue, options) {
    // 4. 添加实例方法
    Vue.prototype.$http = axios;
  }
};

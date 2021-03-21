// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";
import router from "./router";

import Antd from "ant-design-vue";
import "ant-design-vue/dist/antd.less";
import "@/assets/style/reset.css";
import http from "@/plugins/http";
import { format } from "date-fns";
import MyBread from "@/components/MyBread";
Vue.config.productionTip = false;

// 全局的时间过滤器
Vue.filter("fmtDate", function(v) {
  return format(v, "yyyy-MM-dd");
});
Vue.use(Antd);
Vue.use(http);
// 全局定义公共组件
Vue.component(MyBread.name, MyBread);

/* eslint-disable no-new */
new Vue({
  el: "#app",
  router,
  components: { App },
  template: "<App/>"
});

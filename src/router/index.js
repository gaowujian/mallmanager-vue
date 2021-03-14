import Vue from "vue";
import Router from "vue-router";

import Login from "@/components/login/Login.vue";
import Home from "@/components/home/Home.vue";
import Users from "@/components/users/Users.vue";

Vue.use(Router);
export default new Router({
  routes: [
    {
      path: "/login",
      name: "login",
      component: Login
    },
    {
      path: "/",
      name: "home",
      component: Home,
      children: [
        {
          name: "user-management",
          path: "users",
          component: Users
        }
      ]
    }
  ]
});

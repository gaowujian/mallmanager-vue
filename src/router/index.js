import Vue from "vue";
import Router from "vue-router";

import Login from "@/pages/login/Login.vue";
import Home from "@/pages/home/Home.vue";
import Users from "@/pages/users/Users.vue";
import Permissions from "@/pages/permissions/Permissions.vue";

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
          name: "users",
          path: "users",
          component: Users
        },
        {
          name: "permissions",
          path: "permissions",
          component: Permissions
        }
      ]
    }
  ]
});

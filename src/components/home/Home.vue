<template>
  <a-layout class="home-container">
    <a-layout-header class="home-header">
      <a-row>
        <a-col :span="4"> img </a-col>
        <a-col :span="18" class="middle">
          <h3>后台管理系统</h3>
        </a-col>
        <a-col :span="2">
          <a-button type="link" @click="handleLogout"> 退出 </a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="home-sider">
        <a-menu
          :open-keys="openKeys"
          mode="inline"
          @openChange="onOpenChange"
          @click="handleItemClick"
        >
          <a-sub-menu key="user-management">
            <span slot="title">
              <a-icon type="appstore" /><span>用户管理</span>
            </span>
            <a-menu-item key="users">
              <div>
                <a-icon type="tag" />
                <router-link to="/users">用户列表</router-link>
              </div>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="permission-management">
            <span slot="title">
              <a-icon type="appstore" /><span>权限管理</span>
            </span>
            <a-menu-item key="role-list">
              <div>
                <a-icon type="tag" />
                <router-link to="roles">角色列表</router-link>
              </div>
            </a-menu-item>
            <a-menu-item key="permission-list">
              <div>
                <a-icon type="tag" />
                <router-link to="permissions">权限列表</router-link>
              </div>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="product-management">
            <span slot="title">
              <a-icon type="appstore" /><span>商品管理</span>
            </span>
            <a-menu-item key="product-list">
              <div>
                <a-icon type="tag" />
                <router-link to="/products">商品列表</router-link>
              </div>
            </a-menu-item>
            <a-menu-item key="category-params">
              <div>
                <a-icon type="tag" />
                <router-link to="/params">分类参数</router-link>
              </div>
            </a-menu-item>
            <a-menu-item key="product-category">
              <div>
                <a-icon type="tag" />
                <router-link to="/product-categories">商品分类</router-link>
              </div>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="order-management">
            <span slot="title">
              <a-icon type="appstore" /><span>订单管理</span>
            </span>
            <a-menu-item key="order-list">
              <div>
                <a-icon type="tag" />
                <router-link to="/order-list">订单列表</router-link>
              </div>
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="data-statistics">
            <span slot="title">
              <a-icon type="appstore" /><span>数据统计</span>
            </span>
            <a-menu-item key="data-list">
              <div>
                <a-icon type="tag" />
                <router-link to="/users">数据列表</router-link>
              </div>
            </a-menu-item>
          </a-sub-menu>
        </a-menu>
      </a-layout-sider>
      <a-layout-content class="home-content">
        <router-view></router-view>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script>
export default {
  name: "home",
  data: function() {
    return {
      rootSubmenuKeys: [
        "user-management",
        "permission-management",
        "product-management",
        "order-management",
        "data-statistics"
      ],
      openKeys: []
    };
  },
  beforeCreate: function() {
    // 一个简单的权限校验
    const token = localStorage.getItem("token");
    if (!token) {
      this.$router.push({ name: "login" });
    }
  },

  methods: {
    onOpenChange(openKeys) {
      const latestOpenKey = openKeys.find(
        key => this.openKeys.indexOf(key) === -1
      );
      if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
        this.openKeys = openKeys;
      } else {
        this.openKeys = latestOpenKey ? [latestOpenKey] : [];
      }
      console.log("this.openKeys[0]:", this.openKeys[0]);
    },
    handleLogout() {
      // 清除缓存，提示和路由跳转
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
    },
    handleItemClick({ key }) {
      // !fix 修复路由跳转的问题
      // console.log("this.$router:", this.$router);
      if (this.$route.path !== `/${key}`) {
        this.$router.push({
          name: key
        });
      }
    }
  }
};
</script >

<style lang="less" scoped>
.home-container {
  height: 100%;
}

.home-header {
  background: #95a5a6;
  .middle {
    text-align: center;
  }
  .ant-btn-link {
    color: #000;
    &:hover {
      color: lighten(#000, 40%);
    }
  }
}
.home-sider {
  background: #fff;
}
.home-content {
  background: #ecf0f1;
}

.ant-menu-item {
  a {
    color: rgba(0, 0, 0, 0.65);
  }
  .router-link-exact-active {
    color: rgb(253, 65, 84);
  }
}
</style>

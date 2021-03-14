<template>
  <a-layout class="home-container">
    <a-layout-header class="home-header">
      <a-row>
        <a-col :span="4">
          img
        </a-col>
        <a-col :span="18" class="middle">
          <h3>后台管理系统</h3>
        </a-col>
        <a-col :span="2">
          <a-button type="link" @click="handleLogout">
            退出
          </a-button>
        </a-col>
      </a-row>
    </a-layout-header>
    <a-layout>
      <a-layout-sider class="home-sider">
        <a-menu :open-keys="openKeys" mode="inline" @openChange="onOpenChange">
          <a-sub-menu key="user-management">
            <span slot="title">
              <a-icon type="appstore" /><span>用户管理</span>
            </span>
            <a-menu-item key="user-list">
              <a-icon type="tag" /> 用户列表
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="permission-management">
            <span slot="title">
              <a-icon type="appstore" /><span>权限管理</span>
            </span>
            <a-menu-item key="role-list">
              <a-icon type="tag" /> 角色列表
            </a-menu-item>
            <a-menu-item key="permission-list">
              <a-icon type="tag" /> 权限列表
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="product-management">
            <span slot="title">
              <a-icon type="appstore" /><span>商品管理</span>
            </span>
            <a-menu-item key="product-list">
              <a-icon type="tag" /> 商品列表
            </a-menu-item>
            <a-menu-item key="category-params">
              <a-icon type="tag" /> 分类参数
            </a-menu-item>
            <a-menu-item key="product-category">
              <a-icon type="tag" /> 商品分类
            </a-menu-item>
          </a-sub-menu>
          <a-sub-menu key="order-management">
            <span slot="title">
              <a-icon type="appstore" /><span>订单管理</span>
            </span>
            <a-menu-item key="order-list">
              <a-icon type="tag" /> 订单列表
            </a-menu-item>

          </a-sub-menu>
          <a-sub-menu key="data-statistics">
            <span slot="title">
              <a-icon type="appstore" /><span>数据统计</span>
            </span>
            <a-menu-item key="data-list">
              <a-icon type="tag" /> 数据列表
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
    },
    handleLogout() {
      // 清除缓存，提示和路由跳转
      localStorage.clear();
      this.$message.success("退出成功");
      this.$router.push({ name: "login" });
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
</style>

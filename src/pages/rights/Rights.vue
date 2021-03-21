<template>
  <div class="rights-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="right-content">
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
      </a-space>
    </a-card>
  </div>
</template>

<script>

export default {
  data() {
    return {
      rightType: "list"
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getPermissionList() {
      const rights = await this.$http.get("/rights/${this.}");
    }
  }

};
</script>

<style>
.rights-container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  margin: 30px;
  background: lightgray;
}
.rights-content {
  width: 100%;
  overflow: auto;
}
.rights-table {
  overflow-x: auto;
}
</style>

<template>
  <div class="permissions-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="permission-content">
        <my-bread level1="权限管理" level2="权限列表"></my-bread>
      </a-space>
    </a-card>
  </div>
</template>

<script>

export default {
  data() {
    return {

    };
  }

};
</script>

<style>
.permissions-container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  margin: 30px;
  background: lightgray;
}
</style>

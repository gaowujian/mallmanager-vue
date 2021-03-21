<template>
  <a-breadcrumb>
    <a-breadcrumb-item>首页</a-breadcrumb-item>
    <a-breadcrumb-item>{{ level1 }}</a-breadcrumb-item>
    <a-breadcrumb-item>{{ level2 }}</a-breadcrumb-item>
  </a-breadcrumb>
</template>

<script>
export default {
  name: "my-bread",
  props: {
    level1: {
      type: String,
      default: ""
    },
    level2: {
      type: String,
      default: ""
    }
  }
};
</script>

<style>
</style>

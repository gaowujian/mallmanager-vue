<template>
  <div class="login-container">
    <a-form layout="vertical" class="login-form">
      <h2>用户登录</h2>
      <a-form-item label="用户名">
        <a-input placeholder="请输入用户名" />
      </a-form-item>
      <a-form-item label="密码">
        <a-input placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block>
          登录
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      labelPosition: "top",
      formLabelAlign: {
        username: "",
        password: ""
      }
    };
  }
};
</script>

<style lang="less">
.login-container {
  height: 100%;
  background: #324152;
  display: flex;
  justify-content: center;
  align-items: center;
  .login-form {
    width: 400px;
    background: #fff;
    border-radius: 5px;
    padding: 30px;
  }
  .login-btn {
    width: 100%;
  }
}
</style>

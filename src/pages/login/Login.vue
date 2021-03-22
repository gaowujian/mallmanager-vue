<template>
  <div class="login-container">
    <a-form
      layout="vertical"
      :form="form"
      class="login-form"
      @submit.prevent="handleSubmit"
    >
      <h2>用户登录</h2>
      <a-form-item label="用户名">
        <a-input
          placeholder="请输入用户名"
          v-decorator="[
            'username',
            { rules: [{ required: true, message: '请输入你的用户名' }] }
          ]"
        >
          <a-icon
            slot="prefix"
            type="user"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input
          placeholder="请输入密码"
          v-decorator="[
            'password',
            { rules: [{ required: true, message: '请输入密码' }] }
          ]"
          type="password"
        >
          <a-icon
            slot="prefix"
            type="lock"
            style="color: rgba(0, 0, 0, 0.25)"
          />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block html-type="submit"> 登录 </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
export default {
  data: function() {
    return {
      form: this.$form.createForm(this)
    };
  },
  mounted: function() {},
  methods: {
    handleSubmit: function(e) {
      const vm = this;
      this.form.validateFields(async function(err, values) {
        if (err) {
          return this.$message.error(`表单数据:${JSON.stringify(err)}`);
        }
        const res = await vm.$http.post("/login", values);
        const {
          data: { token },
          meta: { msg, status }
        } = res;
        if (status === 200) {
          // 跳转路由，成功提示和缓存token
          vm.$router.push({ name: "home" });
          vm.$message.success("登录成功");
          localStorage.setItem("token", token);
        } else {
          vm.$message.error(msg);
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
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
}
</style>

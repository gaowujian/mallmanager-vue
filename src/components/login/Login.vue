<template>
  <div class="login-container">
    <a-form layout="vertical" :form="form" class="login-form" @submit.prevent="handleSubmit">
      <h2>用户登录</h2>
      <a-form-item label="用户名">
        <a-input placeholder="请输入用户名" v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入你的用户名' }] },
        ]">
          <a-icon slot="prefix" type="user" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item label="密码">
        <a-input placeholder="请输入密码" v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码' }] },
        ]" type="password">
          <a-icon slot="prefix" type="lock" style="color:rgba(0,0,0,.25)" />
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-button type="primary" block html-type="submit">
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
      form: this.$form.createForm(this)
    };
  },
  mounted: function() {

  },
  methods: {
    handleSubmit: function(e) {
      this.form.validateFields((err, values) => {
        if (err) {
          this.$message({
            message: err,
            type: "danger"
          });
          return;
        }
        this.$http.post("/login", values).then(res => {
          const {data, meta: {msg, status}} = res;
          if (status === 200) {
            this.$router.push({name: "home"});
            this.$message.success("登录成功");
            console.log("data:", data);
          } else {
            this.$message.error(msg);
          }
        });
      });
    }
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

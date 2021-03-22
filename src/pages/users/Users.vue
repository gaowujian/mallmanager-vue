<template>
  <div class="users-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="user-content">
        <!-- 面包屑 -->
        <my-bread level1="用户管理" level2="用户列表"></my-bread>
        <!-- 搜索框 -->
        <a-space>
          <a-input-search
            placeholder="请输入要搜索的内容"
            enter-button
            @search="handleSearch"
            allow-clear
          />
          <a-button @click="showUserAddForm">添加用户</a-button>
        </a-space>
        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="userList"
          class="user-table"
          :rowKey="(record) => record.id"
          :pagination="pagination"
          @change="change"
        >
          <span slot="order" slot-scope="text, record, index">
            {{ index }}
          </span>
          <span slot="create_time" slot-scope="text, record">
            <!-- 过滤器进行格式化 -->
            {{ record.create_time | fmtDate }}
          </span>
          <div slot="mg_state" slot-scope="text, record">
            <a-switch
              :default-checked="record.mg_state"
              @change="(checked) => handleSwitchChange(checked, record)"
            />
          </div>
          <div slot="actions" slot-scope="text, record">
            <a-space>
              <a-button
                type="primary"
                shape="circle"
                icon="edit"
                @click="showEditUserDialog(record)"
              />
              <a-button
                type="default"
                shape="circle"
                icon="check"
                @click="showSetUserRoleDialog(record)"
              />
              <a-button
                type="danger"
                shape="circle"
                icon="delete"
                @click="showDeleteConfirm(record)"
              />
            </a-space>
          </div>
        </a-table>
      </a-space>
    </a-card>
    <!-- 添加用户的dialog -->
    <a-modal
      title="添加用户"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
      okText="确定"
      cancelText="取消"
    >
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input
            v-decorator="[
              'username',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入用户名!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input-password
            v-decorator="[
              'password',
              {
                rules: [
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                ],
              },
            ]"
          />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input v-decorator="['email']" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="电话">
          <a-input v-decorator="['mobile']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 编辑用户信息的dialog -->
    <a-modal
      title="修改用户"
      :visible="editUserVisible"
      @ok="handleEditUserOk"
      @cancel="handleEditUserCancel"
    >
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input v-decorator="['username']" :disabled="true" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="邮箱">
          <a-input v-decorator="['email']" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="电话">
          <a-input v-decorator="['mobile']" />
        </a-form-item>
      </a-form>
    </a-modal>
    <!-- 分配角色的对话框 -->
    <a-modal
      title="分配角色"
      :visible="setUserRoleVisible"
      @ok="handleSetUserRoleOk"
      @cancel="handleSetUserRoleCancel"
    >
      <a-form :form="form">
        <a-form-item v-bind="formItemLayout" label="用户名">
          <a-input v-decorator="['username']" :disabled="true" />
        </a-form-item>
        <a-form-item v-bind="formItemLayout" label="角色">
          <a-select :value="userRole.id" @change="handleRoleChange">
            <a-select-option value="-1" disabled> 请选择 </a-select-option>
            <a-select-option
              v-for="role in roleOptions"
              :value="role.id"
              :key="role.id"
            >
              {{ role.roleName }}{{ role.id }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
const columns = [
  {
    dataIndex: "num",
    key: "num",
    title: "#",
    scopedSlots: {
      customRender: "order"
    }
  },
  {
    title: "姓名",
    dataIndex: "username",
    key: "username"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "电话",
    dataIndex: "mobile",
    key: "mobile"
  },
  {
    title: "创建时间",
    dataIndex: "create_time",
    key: "create_time",
    scopedSlots: {
      customRender: "create_time"
    }
  },
  {
    title: "用户状态",
    dataIndex: "mg_state",
    key: "mg_state",
    scopedSlots: {
      customRender: "mg_state"
    }
  },
  {
    title: "操作",
    dataIndex: "actions",
    key: "actions",
    scopedSlots: {
      customRender: "actions"
    }
  }
];

export default {
  data() {
    return {
      userList: [],
      columns,
      query: "",
      visible: false,
      editUserVisible: false,
      pagination: {
        current: 1,
        pageSize: 2,
        total: -1,
        showSizeChanger: true,
        pageSizeOptions: ["1", "2", "3", "4"],
        showTotal: total => `Total ${total} items`
      },
      form: this.$form.createForm(this),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      },
      setUserRoleVisible: false,
      roleOptions: [], // 所有的可选角色
      userRole: {
        id: "请选择",
        roleName: "请选择"
      }, // 当前的用户角色
      currentUserId: -1 // 记录当前被操作的用户id
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    change(pagination) {
      // !这里传入的pagination已经自动转化成合理的current和pagesize
      // console.log("pagination:", pagination);
      this.pagination = { ...pagination };
      this.getUserList();
    },
    async getUserList() {
      const res = await this.$http.get("/users", {
        params: {
          query: this.query,
          pagenum: this.pagination.current,
          pagesize: this.pagination.pageSize
        }
      });
      const {
        data,
        meta: { msg, status }
      } = res;
      if (status === 200) {
        this.userList = data.users;
        // 数据增删之后，total可能会有新值需要每次更新
        this.pagination.total = data.total;
        // this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    async handleSwitchChange(checked, record) {
      // ! 修改的操作应该是修改一条数据之后，然后发送api，告知服务器修改该条数据，
      // ! 然后重新getUserList获取最新状态,而不是直接操作data的list
      // this.userList[index].mg_state = checked;

      const {
        meta: { msg, status }
      } = await this.$http.put(`/users/${record.id}/state/${checked}`);
      if (status === 200) {
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
        // 如果状态更新有误,那么重新刷新页面，保证页面数据的正确性
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      }
    },
    handleSearch(value, e) {
      this.query = value;
      this.getUserList();
    },
    showUserAddForm() {
      this.visible = true;
    },
    handleOk() {
      // ! 这一块和handleSubmit的逻辑是一样，我们要先验证表单内的值，然后再做操作
      this.form.validateFields(async function(err, values) {
        if (!err) {
          const {
            meta: { msg, status }
          } = await this.$http.post("/users", values);
          // 提示成功，关闭弹出框，清除表单数据，更新数据(调用getUserList)
          if (status === 201) {
            this.$message.success(msg);
            this.getUserList();
            this.form.resetFields();
            this.visible = false;
          } else {
            this.$message.error(msg);
          }
        }
      });
    },
    handleCancel() {
      // 取消的时候也需要清除表单数据
      this.form.resetFields();
      this.visible = false;
    },

    showDeleteConfirm(record) {
      const vm = this;
      this.$confirm({
        title: "删除用户",
        content: `你确定要删除用户${record.username}吗?`,
        okText: "确定",
        okType: "danger",
        cancelText: "取消",
        async onOk() {
          const {
            meta: { msg, status }
          } = await vm.$http.delete(`/users/${record.id}`);
          if (status === 200) {
            // 删除成功提示，返回第一页，更新数据
            vm.$message.success(msg);
            vm.pagination.current = 1;
            vm.getUserList();
          } else {
            vm.$message.error(msg);
          }
        },
        onCancel() {
          // console.log("取消");
        }
      });
    },
    showEditUserDialog({ username, email, mobile, id }) {
      // 先弹出用户编辑的dialog
      this.editUserVisible = true;
      // 绑定点击用户的数据到form上
      // ! 放到nexttick中因为担心form上还没有绑定field,所以直接调用setFieldsValue有问题
      // ! 如果我们先添加过user, 那么form上绑定的field不会为空，但是直接点击编辑就可能会空
      this.$nextTick(() => {
        this.form.setFieldsValue({ username, email, mobile });
        this.currentUserId = id;
      });
    },
    async handleEditUserOk() {
      // 获取userId  可以在某一时候给data添加属性，也可以通过form.getFieldValue()进行获取
      // 这里采用第一种方式，因为antd vue对于setFieldsValue有严格限制，必须要先绑定才能设置
      const {
        meta: { msg, status }
      } = await this.$http.put(
        `/users/${this.currentUserId}`,
        this.form.getFieldsValue()
      );
      // 提示成功，关闭弹出框，清除表单数据，更新数据(调用getUserList)
      if (status === 200) {
        this.$message.success(msg);
        this.editUserVisible = false;
        this.getUserList();
        this.form.resetFields();
      } else {
        this.$message.error(msg);
      }
    },
    handleEditUserCancel() {
      this.editUserVisible = false;
    },

    async showSetUserRoleDialog({ username, id }) {
      this.setUserRoleVisible = true;
      // 复刻用户的信息
      this.$nextTick(() => {
        this.form.setFieldsValue({ username });
      });
      // 记录当前被点击的人
      this.currentUserId = id;

      // 获取全部的角色信息
      const {
        data,
        meta: { status, msg }
      } = await this.$http.get("/roles");
      if (status === 200) {
        // this.$message.success(msg);
        this.roleOptions = data;
      } else {
        this.$message.error(msg);
      }

      // 请求用户的角色信息
      // console.log("user id:", id);
      const {
        data: adata,
        meta: { status: astatus, msg: amsg }
      } = await this.$http.get(`/users/${this.currentUserId}`);
      if (astatus === 200) {
        this.$message.success(amsg);
        // console.log("adata:", adata);
        const role = this.roleOptions.find(option => option.id === adata.rid);
        // 如果分配了角色，那么角色会被初始选中
        if (role) {
          this.userRole = role;
        }
      } else {
        this.$message.error(amsg);
      }
    },
    async handleSetUserRoleOk() {
      const id = this.currentUserId;
      const {
        meta: { status, msg }
      } = await this.$http.put(`/users/${id}/role`, {
        rid: this.userRole.id
      });
      if (status === 200) {
        this.setUserRoleVisible = false;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handleSetUserRoleCancel() {
      this.setUserRoleVisible = false;
      // 重置角色
      this.userRole = {
        id: "-1",
        roleName: "请选择"
      };
    },
    handleRoleChange(value) {
      this.userRole = this.roleOptions.find(option => option.id === value);
    }
  }
};
</script>

<style lang="less" scoped>
.users-container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  margin: 30px;
  background: lightgray;
}
.user-content {
  width: 100%;
  overflow: auto;
}
.user-table {
  overflow-x: auto;
}
</style>

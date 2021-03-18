<template>
  <div class="users-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="user-content">
        <!-- 面包屑 -->
        <a-breadcrumb>
          <a-breadcrumb-item>首页</a-breadcrumb-item>
          <a-breadcrumb-item>用户管理</a-breadcrumb-item>
          <a-breadcrumb-item>用户列表</a-breadcrumb-item>
        </a-breadcrumb>
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
          <div slot="mg_state" slot-scope="text, record, index">
            <a-switch
              :defaultChecked="record.mg_state"
              @change="(checked) => handleSwitchChange(checked, index)"
            />
          </div>
          <div slot="actions">
            <a-space>
              <a-button type="primary" shape="circle" icon="edit" />
              <a-button type="default" shape="circle" icon="check" />
              <a-button type="danger" shape="circle" icon="delete" />
            </a-space>
          </div>
        </a-table>
      </a-space>
    </a-card>
    <a-modal
      title="添加用户"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
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
          <a-input v-decorator="['phone']" />
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
      pagination: {
        current: 1,
        pageSize: 2,
        total: -1,
        showSizeChanger: true,
        pageSizeOptions: ["1", "2", "3", "4"],
        showTotal: total => `Total ${total} items`

      },
      form: this.$form.createForm(this, { name: "userAdd" }),
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 4 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 20 }
        }
      }
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    change(pagination) {
      // 这里传入的pagination已经自动转化成合理的current和pagesize
      // console.log("pagination:", pagination);
      this.pagination = {...pagination};
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
      const {data, meta: {msg, status}} = res;
      if (status === 200) {
        this.userList = data.users;
        this.pagination.total = data.total;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handleSwitchChange(checked, index) {
      this.userList[index].mg_state = checked;
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
      this.form.validateFields(async(err, values) => {
        if (!err) {
          const {meta: {msg, status}} = await this.$http.post("/users", values);
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

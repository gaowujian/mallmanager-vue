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
            @search="onSearch"
          />
          <a-button>添加用户</a-button>
        </a-space>
        <!-- 表格 -->
        <a-table
          :columns="columns"
          :data-source="userList"
          class="user-table"
          :rowKey="(record) => record.id"
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
        </a-table>
        <!-- 分页 -->
      </a-space>
    </a-card>
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
    key: "actions"
  }
];

export default {
  data() {
    return {
      userList: [],
      columns,
      pagenum: 1,
      pagesize: 10,
      total: -1
    };
  },
  created() {
    this.getUserList();
  },
  methods: {
    onSearch() {},
    async getUserList() {
      const res = await this.$http.get("/users", {
        params: {
          query: "",
          pagenum: this.pagenum,
          pagesize: this.pagesize
        }
      });
      const {data, meta: {msg, status}} = res;
      if (status === 200) {
        this.userList = data.users;
        this.total = data.total;
        this.$message.success(msg);
      } else {
        this.$message.error(msg);
      }
    },
    handleSwitchChange(checked, index) {
      this.userList[index].mg_state = checked;
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
}
</style>

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
          <a-input-search placeholder="请输入要搜索的内容" enter-button @search="onSearch" />
          <a-button>添加用户</a-button>
        </a-space>
        <!-- 表格 -->
        <a-table :columns="columns" :data-source="data" class="user-table">
          <a slot="name" slot-scope="text">{{ text }}</a>
          <span slot="customTitle">
            #
          </span>
          <span slot="tags" slot-scope="tags">
            <a-tag v-for="tag in tags" :key="tag" :color="tag === 'loser' ? 'volcano' : tag.length > 5 ? 'geekblue' : 'green'">
              {{ tag.toUpperCase() }}
            </a-tag>
          </span>
          <span slot="action" slot-scope="text, record">
            <a>Invite 一 {{ record.name }}</a>
            <a-divider type="vertical" />
            <a>Delete</a>
            <a-divider type="vertical" />
            <a class="ant-dropdown-link"> More actions
              <a-icon type="down" />
            </a>
          </span>
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
    slots: { title: "customTitle" },
    scopedSlots: { customRender: "num" }
  },
  {
    title: "姓名",
    dataIndex: "name",
    key: "name"
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email"
  },
  {
    title: "电话",
    dataIndex: "phone",
    key: "phone"
  },
  {
    title: "创建时间",
    dataIndex: "createTime",
    key: "createTime"
  },
  {
    title: "用户状态",
    dataIndex: "status",
    key: "status"
  },
  {
    title: "操作",
    dataIndex: "actions",
    key: "actions"
  }
];

const data = [
  {
    key: "1",
    num: "1",
    name: "John Brown",
    email: 32
  },
  {
    key: "2",
    num: "2",
    name: "Jim Green",
    email: 42
  },
  {
    key: "3",
    num: "3",
    name: "Joe Black",
    email: 32
  }
];
export default {
  data() {
    return {
      data,
      columns
    };
  },
  methods: {
    onSearch() {}
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

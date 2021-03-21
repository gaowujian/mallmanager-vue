<template>
  <div class="roles-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="roles-content">
        <my-bread level1="权限管理" level2="角色列表"></my-bread>
        <a-button>添加角色</a-button>
        <a-table
          :columns="columns"
          :data-source="roleList"
          :rowKey="(record) => record.id"
          :pagination="false"
          :scroll="{ y: 300 }"
        >
          <span slot="order" slot-scope="text, record, index">
            {{ index }}
          </span>

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
  </div>
</template>

<script>
const columns = [
  {
    key: "order",
    title: "#",
    scopedSlots: {
      customRender: "order"
    }
  },
  {
    title: "角色名称",
    dataIndex: "roleName",
    key: "roleName"
  },
  {
    title: "角色描述",
    dataIndex: "roleDesc",
    key: "roleDesc"
  },

  {
    title: "操作",
    key: "actions",
    scopedSlots: {
      customRender: "actions"
    }
  }
];
export default {
  data() {
    return {
      roleList: [],
      columns
    };
  },
  created() {
    this.getRoleList();
  },
  methods: {
    async getRoleList() {
      const {data, meta: {status, msg}} = await this.$http.get("/roles");
      if (status === 200) {
        // ! 为了过滤掉children属性，否则会出现拓展框
        const roleList = data.map(item => {
          return {id: item.id, roleDesc: item.roleDesc, roleName: item.roleName};
        });
        this.roleList = roleList;
      } else {
        this.$message.error(msg);
      }
    }
  }

};
</script>

<style>
.roles-container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  margin: 30px;
  background: lightgray;
}
.roles-content {
  width: 100%;
  overflow: auto;
}
</style>

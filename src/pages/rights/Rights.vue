<template>
  <div class="rights-container">
    <a-card :bordered="false">
      <a-space direction="vertical" class="rights-content">
        <my-bread level1="权限管理" level2="权限列表"></my-bread>

        <a-table
          :columns="columns"
          :data-source="rightList"
          :rowKey="(record) => record.id"
          :pagination="false"
          :scroll="{ y: 400 }"
        >
          <span slot="order" slot-scope="text, record, index">
            {{ index }}
          </span>

          <span slot="level" slot-scope="text">
            <span v-if="text == 0">一级</span>
            <span v-if="text == 1">二级</span>
            <span v-if="text == 2">三级</span>
          </span>
        </a-table>
      </a-space>
    </a-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      rightType: "list",
      rightList: [],
      columns: [
        {
          dataIndex: "num",
          key: "num",
          title: "#",
          scopedSlots: {
            customRender: "order"
          }
        },
        {
          dataIndex: "authName",
          key: "authName",
          title: "权限名称"
        },
        {
          dataIndex: "path",
          key: "path",
          title: "路径"
        },
        {
          dataIndex: "level",
          key: "level",
          title: "层级",
          scopedSlots: {
            customRender: "level"
          }
        }
      ]
    };
  },
  created() {
    this.getRightList();
  },
  methods: {
    async getRightList() {
      const {data, meta: {status, msg}} = await this.$http.get(`/rights/${this.rightType}`);
      if (status === 200) {
        this.rightList = data;
      } else {
        this.$message.error(msg);
      }
    }
  }

};
</script>

<style>
.rights-container {
  width: calc(100% - 60px);
  height: calc(100% - 60px);
  margin: 30px;
  background: lightgray;
}
.rights-content {
  width: 100%;
  overflow: auto;
}

.rights-table {
  overflow-x: auto;
}
</style>

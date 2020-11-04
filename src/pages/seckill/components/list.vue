<template>
  <div>
    <el-table
      :data="list"
      style="width: 50%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="title" label="活动名称" sortable width="180">
      </el-table-column>
     <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="success" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="warning" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="danger" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import{reqSeckDelete} from '../../../uitls/request'
import {successAlert} from '../../../uitls/alert'
export default {
  computed: {
    ...mapGetters({
      list: "seckill/list",
    }),
  },
  components: {},

  data() {
    return {
      
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "seckill/reqListAction",
    }),
    //编辑按钮
    edit(id){
      this.$emit('edit',id)
    },
     del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起请求删除数据
          reqSeckDelete(id).then((res) => {
            if (res.data.code === 200) {
                this.reqListAction();
              successAlert("删除成功");
            }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
  },

  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>
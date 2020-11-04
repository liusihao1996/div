<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="id" label="角色编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="rolename" label="角色名称" sortable width="180">
      </el-table-column>
      <!-- 状态按钮 -->
      <el-table-column prop="address" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <!-- 删除和编辑按钮 -->
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="info" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";

import {reqManagedel} from '../../../uitls/request'

export default {
    props:['list'],
  components: {},
  data() {
    return {
    //   list: [],
    };
  },

  methods: {
    //编辑按钮
    edit(id) {
      this.$emit("edit", id);
    },
    //删除按钮
     del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //发起请求删除数据
         reqManagedel(id).then(res=>{
              if(res.data.code===200){
                  alert(res.data.msg)
                  this.$emit("add")
              }
          })
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    }
  },


  mounted() {
    // axios({
    //   url: "/api/api/rolelist",
    //   method: "get",
    // }).then((res) => {
    //   this.list = res.data.list;
    // });
  },
};
</script>
<style scoped>
</style>
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
      <el-table-column prop="id" label="编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="title" label="轮播图标题" sortable width="180">
      </el-table-column>
      <!-- 图片 -->
      <el-table-column prop="catename" label="图片" sortable width="180" >
        <template slot-scope="scope">
          <img  :src="$imgPre + scope.row.img" alt="#" />
        </template>
      </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)"
            >编辑</el-button
          >
          <el-button type="info" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      
    </el-table>
  </div>
</template>
<script>
import{reqbannerDelete} from '../../../uitls/request'
import {mapGetters,mapActions} from 'vuex'
import { successAlert, errorAlert } from "../../../uitls/alert";
export default {
  computed: {
    ...mapGetters({
      list:'banner/list'
    })
  },
  components: {},

  data() {
    return {
      // list:[],
    };
  },

  methods: {
    ...mapActions({
      reqListAction:'banner/reqListAction'
    }),

    //编辑
    edit(id){
      this.$emit('edit',id)
    },

    //删除
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起请求删除数据
          reqbannerDelete(id).then((res) => {
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
    this.reqListAction()
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>
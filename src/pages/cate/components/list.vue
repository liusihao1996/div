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
      <el-table-column prop="id" label="分类编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="catename" label="分类名称" sortable width="180">
      </el-table-column>
      <!-- 图片 -->
      <el-table-column prop="catename" label="图片" sortable width="180" >
        <template slot-scope="scope">
          <img v-if=" scope.row.img!=='null'" :src="$imgPre + scope.row.img" alt="#" />
        </template>
      </el-table-column>

      <!-- 状态 -->
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1"
            >启用</el-button
          >
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>

      <!-- 删除编辑按钮 -->
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
import { mapGetters, mapActions } from "vuex";
import { reqCateDelete } from "../../../uitls/request";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },

  components: {},

  data() {
    return {
     
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    //删除按钮
    del(id) {
      this.$confirm("你确定要删除吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          //发起请求删除数据
          reqCateDelete(id).then((res) => {
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
    //编辑
    edit(id){
        this.$emit('edit',id)
    }
  },

  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
img {
  width: 100px;
  height: 100px;
}
</style>
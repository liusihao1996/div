<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }">
      <el-table-column prop="id" label="规格编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="specsname" label="规格名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="attrs" label="规格属性"> </el-table-column>
      <el-table-column label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.id)">编辑</el-button>
          <el-button type="info" @click="del(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!-- 页码
    @current-change="changePage"
     -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      :total="total"
      @current-change="changePage">
    </el-pagination>
  </div>
  
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqSpecsDel} from '../../../uitls/request'
export default {
  computed: {
    ...mapGetters({//页码和总数放到了状态层，用就取出来
      list: "spec/list",
      total: "spec/total",//总数
      size: "spec/size",//一页几条
    }),
  },
  components: {},

  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction",//请求总数
      changePageAction:'spec/changePageAction',//点击跳转页码
    }),
    //删除
    del(id){
      reqSpecsDel(id).then(res=>{
        this.reqListAction()
        this.reqTotalAction()
      })
    },
    //编辑按钮
    edit(id){
      this.$emit('edit',id)
    },
    //点击修改页码
    changePage(page){
      this.changePageAction(page)
      this.reqListAction();//点击下一页后刷新页面,显示新点击的页面
    }
  },




  mounted() {
    this.reqListAction();
    this.reqTotalAction()//一进来页面就请求总数
  },
};
</script>
<style scoped>
</style>
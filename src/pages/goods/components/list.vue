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
      <el-table-column prop="first_cateid" label="商品编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="goodsname" label="商品名称" sortable width="180">
      </el-table-column>
      <el-table-column prop="price" label="商品价格"> </el-table-column>

      <el-table-column prop="market_price" label="市场价格">
        <template slot-scope="scope">
          <span>{{scope.row.market_price}}</span>
        </template>
      </el-table-column>
      <!-- 图片 -->
      <el-table-column prop="catename" label="图片" sortable width="180" >
        <template slot-scope="scope">
          <img  :src="$imgPre+scope.row.img" alt="#" />
        </template>
      </el-table-column>
      <!-- 新品 -->
      <el-table-column prop="isnew" label="是否新品">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.isnew==1'>是</el-button>
          <el-button  type='info' v-else>否</el-button>
        </template> 
      </el-table-column>
      <!-- 热卖 -->
      <el-table-column prop="ishot" label="是否热卖">
        <template slot-scope="scope">
          <el-button type='primary' v-if='scope.row.ishot==1'>是</el-button>
          <el-button  type='info' v-else>否</el-button>
        </template>
      </el-table-column>
          <!-- 状态 -->
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
      @current-change="changePage"
      :page-size="size"
      :total="total">
    </el-pagination> 
  </div>
</template>
<script>
import { mapGetters, mapActions } from "vuex";
import {reqGoodDelete} from '../../../uitls/request'
import {successAlert} from '../../../uitls/alert'
export default {
  computed: {
    ...mapGetters({
      //goods的状态层
      list: "goods/list",
      total: "goods/total",//数据总数
      size: "goods/size",//一页显示几条数据
    }),
  },
  components: {},

  data() {
    return {
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "goods/reqListAction", //列表
      reqTotalAction: "goods/reqTotalAction", //获取总数
      changePageAction: "goods/changePageAction", //修改页码
    }),
    //编辑按钮
    edit(id) {
      this.$emit("edit", id);
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
          reqGoodDelete(id).then((res) => {
            if (res.data.code === 200) {
              this.reqTotalAction()//删除后重新请求总数
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
    //点击修改页码
    changePage(page){
      this.changePageAction(page)//点击显示第几页
      this.reqListAction()//点击第二页后立即刷新list
    }
  },

  mounted() {
    this.reqListAction();
    this.reqTotalAction()//总数
  },
};
</script>
<style scoped>
img{
  width: 100px;
  height: 100px;
}
</style>
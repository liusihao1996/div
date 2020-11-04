<template>
  <div>
    <el-button type="primary" @click="wuillAll">添加</el-button>
    <v-list :list="list" @edit="willUpdate($event)" @init="getList"></v-list>
    <v-add :info="info" @add="getList" ref="add" @init="getList"></v-add>

    <!-- 分页按钮 -->
    <el-pagination
      layout="prev, pager, next"
      :page-size="size"
      @current-change="changePage"
      :total="total"
    >
    </el-pagination>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";

import { reqManageuserlist, reqManageusercount } from "../../uitls/request";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isShow: false,
        title: "",
      },
      list: [],
      //总数
      total: 0,
      //一页的数量
      size: 2,
      //页码
      page: 1,
    };
  },
  methods: {
    wuillAll() {
      this.info = {
        isShow: true,
        title: "添加菜单",
      },
      this.$refs.add.empty()
    },
    //一进来就发请求
    getInit() {
      reqManageuserlist({ page:this.page,size:this.size}).then((res) => {
        let list=res.data.list?res.data.list:[]
        if(list.length===0&&this.page>1){
            this.page--
            this.getInit();
            return;
          }
        this.list = res.data.list;
      });
    },
    //管理员总数
    getList() {
      reqManageusercount().then((res) => {
        this.total=res.data.list[0].total
      });
      this.getInit()
    },
    changePage(page) {
      this.page = page;
      //重新获取list
      this.getInit();
    },
    willUpdate(uid) {
      // this.info.isShow = true,
      this.$refs.add.getOne(uid),
       this.info = {
        isShow: true,
        title: "编辑菜单",
      }
    },
  },

  mounted() {
    this.getList(); //管理元总数
  },
};
</script>
<style scoped>
</style>
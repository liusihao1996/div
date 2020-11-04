<template>
  <div>
    <el-button type="primary" @click="willAdd"> 添加 </el-button>

    <!-- 列表 -->
    <v-list :list='list' @edit='wilUpd($event)' @init='geiInit'></v-list>
    <!-- 弹窗 -->
    <v-add :info="info" :list='list' @init='geiInit' ref='add'></v-add>
  </div>
</template>
<script>
import axios from "axios";

import vList from "./components/list";
import vAdd from "./components/add";
import {reqMenuupgeiInit} from '../../uitls/request'
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      //需要传递一个json数据才能让子组件直接修改父组件的isShow
      info: {
        isShow: false,
        title:'添加菜单1'
      },
      //列表数据
      list:[]
    };
  },
  methods: {
      //添加按钮
    willAdd() {
      this.info.isShow = true;
      this.$refs.add.empty()
    },
    //一进来就获取list数据
    geiInit(){
      reqMenuupgeiInit().then(res=>{
          this.list=res.data.list
      })
    },
    wilUpd(id){
        this.info.isShow = true;
        this.info.title = '编辑菜单';
        //获取一条数据的请求
       this.$refs.add.getOne(id)
    }
  },
  mounted() {
      this.geiInit()
  },
};
</script>
<style scoped>
</style>
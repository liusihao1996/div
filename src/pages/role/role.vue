<template>
  <div>
    <el-button type="primary" @click="willAdd">添加</el-button>

    <v-list @edit="wilUpd($event)" :list='list' @add='geiInit'></v-list>

    <v-add :info="info" ref="add" @add='geiInit'></v-add>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import vList from "./components/list";
import vAdd from "./components/add";

import {reqManagegeiInit} from '../../uitls/request'
// import { reqMenuupgeiInit } from "../../uitls/request";

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
      list:[]
    };
  },
  methods: {
    //添加按钮
    willAdd() {
      this.info = {
        isShow: true,
        title: "菜单添加",
      };
       this.$refs.add.empty()
    },
    //编辑按钮
    wilUpd(id) {
      (this.info = {
        isShow: true,
        title: "编辑",
      }),
        this.$refs.add.getOne(id);
    },
    //一进来就获取
    geiInit() {
      reqManagegeiInit().then((res) => {
        this.list = res.data.list;
      });
    },
  },
  mounted() {
    // reqMenuupgeiInit().then((res) => {
    //   this.list = res.data.list;
    // });
    this.geiInit()
  },
};
</script>
<style scoped>
</style>
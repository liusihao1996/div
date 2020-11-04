<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="菜单名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="上级菜单" label-width="120px">
          <el-select
            v-model="form.pid"
            placeholder="请选择活动区域"
            @change="changePid"
          >
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.title"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单类型" label-width="120px">
          <el-radio v-model="form.type" :label="1" disabled>目录</el-radio>
          <el-radio v-model="form.type" :label="2" disabled>菜单</el-radio>
        </el-form-item>

        <el-form-item
          label="菜单图标"
          label-width="120px"
          v-if="form.type == 1"
        >
          <el-select v-model="form.icon" placeholder="请选择活动区域">
            <el-option v-for="item in icons" :key="item" :value="item">
              <i :class="item"></i>
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="菜单地址" label-width="120px" v-else>
          <el-select v-model="form.url" placeholder="请选择活动区域">
            <el-option
              v-for="item in indexRouter"
              :key="item.path"
              :label="item.name"
              :value="item.path"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单1'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { indexRouter } from "../../../router/index";
import { successAlert, errorAlert } from "../../../uitls/alert";
import { reqMenuAdd, reqMenuDeta, reqMenuupdate } from "../../../uitls/request";
import axios from "axios";
import qs from "qs";

export default {
  props: ["info", "list"],
  components: {},
  data() {
    return {
      form: {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      },
      //图标的选择
      icons: [
        "el-icon-setting",
        "el-icon-user",
        "el-icon-upload",
        "el-icon-help",
      ],
      //url地址的集合
      indexRouter: indexRouter,
    };
  },
  methods: {
    //用于重置弹窗内容
    empty() {
      this.form = {
        pid: "",
        title: "",
        icon: "",
        type: "",
        url: "",
        status: 1,
      };
    },
    //add弹框里的取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //上级菜单发生修改
    changePid() {
      //顶级菜单应该是目录。否者是菜单
      if (this.form.pid == 0) {
        this.form.type = 1;
      } else {
        this.form.type = 2;
      }
    },
    add() {
      reqMenuAdd(this.form).then((res) => {
        console.log(this.form);
        if (res.data.code == 200) {
          //弹框消失
          this.info.isShow = false;
          //重置弹框内容
          this.empty();
          //弹出成功
          successAlert(res.data.msg);
          //立即刷新
          this.$emit("init");
        } else {
          errorAlert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqMenuDeta(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
      });
    },
    //修改add弹窗内容
    update() {
      reqMenuupdate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.empty();
          this.$emit("init");
          alert(res.data.msg);
        } else {
          alert(res.data.msg);
        }
      });
    },
  },
  mounted() {},
};
</script>
<style scoped>
</style>
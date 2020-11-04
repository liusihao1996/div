<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow">
      <el-form :model="form">
        <el-form-item label="所属角色" label-width="120px">
          <el-select v-model="form.roleid" placeholder="请选择活动区域">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in roleList"
              :key="item.id"
              :label="item.rolename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="用户名" label-width="120px">
          <el-input v-model="form.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 状态按钮 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>
      <!-- 取消和添加确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isShow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import axios from "axios";
import qs from "qs";
import {
  reqManagegeiInit,
  reqManageuserinfo,
  reqManageuseredit,
} from "../../../uitls/request";
export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      },
      roleList: [],
    };
  },
  methods: {
    //用于清空
    empty() {
      this.form = {
        roleid: "",
        username: "",
        password: "",
        status: 1,
      };
    },
    //添加按钮
    add() {
      this.info.isShow = false;
      axios({
        url: "/api/api/useradd",
        method: "post",
        data: qs.stringify(this.form),
      }).then((res) => {
        if (res.data.code == 200) {
          // console.log(res);
          this.empty(); //用于清空
          this.$emit("add"); //添加完立即刷新页面
          alert(res.data.msg);
        } else {
          alert(res.data.msg);
        }
      });
    },
    getOne(uid) {
      reqManageuserinfo(uid).then((res) => {
        this.form = res.data.list;
        this.form.password = "";
        console.log(res);
      });
    },
    update() {
      reqManageuseredit(this.form).then((res) => {
        if (res.data.code == 200) {
          this.empty();//用于清空
          this.info.isShow = false;//让弹窗消失
          this.$emit('init')
        }
      });
    },
  },

  mounted() {
    reqManagegeiInit().then((res) => {
      this.roleList = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>
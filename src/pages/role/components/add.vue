<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isShow" @opened="opened">
      <el-form :model="form">
        <el-form-item label="角色名称" label-width="120px">
          <el-input v-model="form.rolename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 树形控件 -->
        <el-form-item label="角色权限" label-width="120px">
          <el-tree
            :data="list"
            v-model="form.menus"
            show-checkbox
            ref="tree"
            node-key="id"
            :props="{ children: 'children', label: 'title' }"
          >
          </el-tree>
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
      <!-- 取消确定按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '菜单添加'"
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
import { reqMenuupgeiInit, reqManagebtnAdd,reqManagegetOne,reqManageupdate} from "../../../uitls/request";

export default {
  props: ["info"],
  components: {},
  data() {
    return {
      form: {
        rolename: "",
        menus: "",
        status: 1,
      },
      //存储获取到菜单管理列表信息
      list: [],
    };
  },
  methods: {
    //用于重置
    empty() {
      this.form = {
        rolename: "",
        menus: "",
        status: 1,
      };
    },
    opened(){
      if(this.info.title == '菜单添加'){
         this.$refs.tree.setCheckedKeys([]);
      }
    },
    //取消按钮
    cancel() {
      this.info.isShow = false;
    },
    //添加按钮
    add() {
      //后台需要的是字符串类型的数组,JSON.stringify转一下
      //this.$refs.tree.getCheckedKeys()树形控件自带的方法获取menus的值
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqManagebtnAdd(this.form).then((res) => {
        if (res.data.code === 200) {
          this.info.isShow = false; //弹窗消失
          this.empty(); //重置数据
          this.$emit("add"); //刷新list
        } else {
          alert(res.data.msg);
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqManagegetOne(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.$refs.tree.setCheckedKeys(JSON.parse(this.form.menus));
      });
    },
    //修改数据后的修改按钮
    update() {
      this.form.menus = JSON.stringify(this.$refs.tree.getCheckedKeys());
      reqManageupdate(this.form).then((res) => {
        if (res.data.code == 200) {
          this.cancel();
          this.$emit("add");
        }
      });
    },
  },
  mounted() {
    reqMenuupgeiInit().then((res) => {
      this.list = res.data.list;
    });
  },
};
</script>
<style scoped>
</style>
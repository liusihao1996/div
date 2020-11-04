<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="上级分类" label-width="120px">
          <el-select v-model="form.pid" placeholder="请选择活动区域">
            <el-option label="顶级分类" :value="0"></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="分类名称" label-width="120px">
          <el-input v-model="form.catename" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 图片 -->
        <el-form-item label="图片" label-width="120px" v-if="form.pid">
          <div class="box">
            <h3>+</h3>
            <img v-if="imgUrl" :src="imgUrl" alt="" />
            <input
              v-if="info.isshow"
              type="file"
              class="ipt"
              @change="changeFile"
            />
          </div>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <!-- 确定取消按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添加1</el-button
        >
        <el-button type="primary" @click="update" v-else>修改1</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { successAlert, errorAlert } from "../../../uitls/alert"; //成功弹窗
import { reqCateAdd, reqCateInfo, reqCateDit } from "../../../uitls/request"; //数据请求接口
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      },
      imgUrl: "",
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
    empty() {
      this.form = {
        pid: "",
        catename: "",
        img: null,
        status: 1,
      };
      this.imgUrl = "";
    },
    //添加按钮
    add() {
      this.info.isshow = false; //弹窗消失
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqCateAdd(data).then((res) => {
        if (res.data.code == 200) {
          this.reqListAction();
          successAlert("成功");
          this.empty(); //清空弹窗
        } else {
          errorAlert("失败");
        }
      });
    },

    //图片添加
    changeFile(e) {
      let file = e.target.files[0];
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },
    //获取一条数据
    getOne(id) {
      this.info.isshow = true;
      reqCateInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },
    //修改按钮
    update() {
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }

      reqCateDit(data).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false; //弹窗消失
          this.reqListAction(); //立即刷新
          this.empty(); //清空弹窗
          successAlert("修改成功");
        } else {
          errorAlert("修改失败");
        }
      });
    },
  },

  mounted() {},
};
</script>
<style scoped>
.box {
  width: 100px;
  height: 100px;
  border: 1px dotted #999;
  position: relative;
}
.box h3 {
  line-height: 100px;
  text-align: center;
  z-index: 2;
}
.box input {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 1;
}
img {
  width: 100px;
  height: 100px;
  position: absolute;
  top: 0;
  left: 0;
}
</style>
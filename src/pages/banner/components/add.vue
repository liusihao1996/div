<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="标题" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="图片" label-width="120px">
          <div class="box">
            <h3>+</h3>
            <img :src="imgUrl" alt="" />
            <!-- 由于很难置空input上的文件，所以直接将input 卸载 -->
            <input type="file" class="ipt" @change="changeFile" />
            <h3>+</h3>
            <img :src="imgUrl" alt="" />
            <!-- 由于很难置空input上的文件，所以直接将input 卸载 -->
            <input type="file" class="ipt" @change="changeFile" />
          </div>
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
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添加1</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {
  reqBannerAdd,
  reqBannerList,
  reqBannerInfo,
  reqBannerEdit,
} from "../../../uitls/request";
import { mapActions, mapGetters } from "vuex";
import { successAlert, errorAlert } from "../../../uitls/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "banner/list",
    }),
  },
  components: {},

  data() {
    return {
      form: {
        title: "",
        img: null,
        status: 1,
      },
      imgUrl: "", //存储图片
    };
  },

  methods: {
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      },
      this.imgUrl= ""
    },
    ...mapActions({
      reqListAction: "banner/reqListAction",
    }),
    empty() {
      this.form = {
        title: "",
        img: null,
        status: 1,
      };
      this.imgUrl = ""; //存储图片
    },

    //添加按钮
    //轮播图做到了添加图片并刷新页面
    add() {
      this.info.isshow = false;
      //上传文件或图片必须用new FormData();
      let data = new FormData();
      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      reqBannerAdd(data).then((res) => {
        console.log(res);
        this.reqListAction();
        this.empty();
      });
    },
    //图片
    changeFile(e) {
      let file = e.target.files[0];
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
    },

    //轮播图一条数据
    getBannerInfo(id) {
      reqBannerInfo(id).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        this.imgUrl = this.$imgPre + this.form.img;
      });
    },

    //修改按钮
    update() {
      //

      let data = new FormData();

      for (let i in this.form) {
        data.append(i, this.form[i]);
      }
      //这里填data不是this.form了,已经把form循环添加给data了
      reqBannerEdit(data).then((res) => {
        if (res.data.code == 200) {
          this.info.isshow = false;
          this.reqListAction();
          successAlert(res.data.msg);
        } else {
          errorAlert(res.data.msg);
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
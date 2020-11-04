<template>
  <div>
    <!-- @opened="open" -->
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="一级分类" label-width="120px">
          <el-select v-model="form.first_cateid" @change="changFirst()">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in list"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in twoList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品名称" label-width="120px">
          <el-input v-model="form.goodsname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="价格" label-width="120px">
          <el-input v-model="form.price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="市场价格" label-width="120px">
          <el-input v-model="form.market_price" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 添加图片框 @change="changeFile" -->
        <el-form-item label="图片" label-width="120px">
          <div class="box">
            <h3>+</h3>
            <img :src="imgUrl" alt="" />
            <input type="file" class="ipt" @change="changeFile" />
          </div>
        </el-form-item>

        <el-form-item label="商品规格" label-width="120px">
          <el-select v-model="form.specsid" @change="changList()">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in getList"
              :key="item.id"
              :label="item.specsname"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="商品属性" label-width="120px">
          <el-select v-model="form.specsattr" multiple>
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in twochangList"
              :key="item"
              :label="item"
              :value="item"
            ></el-option>
          </el-select>
        </el-form-item>

        <el-form-item label="是否新品" label-width="120px">
          <el-radio v-model="form.isnew" :label="1">是</el-radio>
          <el-radio v-model="form.isnew" :label="2">否</el-radio>
        </el-form-item>
        <el-form-item label="是否热卖" label-width="120px">
          <el-radio v-model="form.ishot" :label="1">是</el-radio>
          <el-radio v-model="form.ishot" :label="2">否</el-radio>
        </el-form-item>

        <el-form-item label="状态" label-width="120px">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
        <!-- 富文本 -->
        <el-form-item label="商品描述" label-width="120px">
          <textarea v-model="form.description" cols="30" rows="10"></textarea>
        </el-form-item>
      </el-form>
      <!-- 修改按钮 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单'"
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import E from "wangeditor";
import { mapGetters, mapActions } from "vuex";
import {
  reqCateList,
  reqSpecsList,
  reqGoodsAdd,
  reqListAction,
  reqGoodsInfo,
  reqGoodseDit,
} from "../../../uitls/request";
import { successAlert, errorAlert } from "../../../uitls/alert";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "cate/list",
      getList: "spec/list", //商品规格内容
    }),
  },
  components: {},
  data() {
    return {
      form: {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: null, //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: "", //是否新品     1-是 2-否
        ishot: "", //是否热卖推荐 1-是 2-否
        status: 1, //状态1正常2禁用
      },
      imgUrl: "", //存储图片地址
      attrArr: [{ val: "" }],
      twoList: [], //一级分类的二级联动
      twochangList: [], //存储商品规格的二级联动
    };
  },

  methods: {
    //用于清空
    empy() {
      this.form = {
        first_cateid: "", //一级分类编号
        second_cateid: "", //二级分类编号
        goodsname: "", //商品名称
        price: "", //商品价格
        market_price: "", //市场价格
        img: null, //商品图片（文件）
        description: "", //商品描述
        specsid: "", //商品规格编号
        specsattr: [], //商品规格属性
        isnew: "", //是否新品     1-是 2-否
        ishot: "", //是否热卖推荐 1-是 2-否
        status: 1, //状态1正常2禁用
      };
      (this.imgUrl = ""), //存储图片地址
        (this.attrArr = [{ val: "" }]),
        (this.twoList = []), //一级分类的二级联动
        (this.twochangList = []); //存储商
    },
    ...mapActions({
      reqListAction: "cate/reqListAction",
      //商品规格内容
      getListAction: "spec/reqListAction",
      reqTotalAction: "goods/reqTotalAction", //获取总数
      reqGoodsAction: "goods/reqListAction",
    }),
    //验证每条数据都得填写
    checked() {
      return new Promise((resolve, reject) => {
        if (this.form.first_cateid === "") {
          errorAlert("一级分类不能为空");
          return;
        }
        if (this.form.second_cateid === "") {
          errorAlert("二级分类不能为空");
          return;
        }
        if (this.form.goodsname === "") {
          errorAlert("商品名称不能为空");
          return;
        }
        if (this.form.price === "") {
          errorAlert("价格不能为空");
          return;
        }
        if (this.form.market_price === "") {
          errorAlert("市场价格不能为空");
          return;
        }
        if (this.form.specsid === "") {
          errorAlert("商品规格不能为空");
          return;
        }
        if (this.form.specsattr === []) {
          errorAlert("商品属性不能为空");
          return;
        }
        if (this.form.description === "") {
          errorAlert("商品描述不能为空");
          return;
        }
        resolve();
      });
    },
    //添加按钮
    add() {
      this.checked().then(() => {
        let obj = {
          //拷贝原有值，操作拷贝后的值还不会改变原有值
          ...this.form,
        };
        obj.specsattr = JSON.stringify(obj.specsattr);

        //上传文件或图片就必用new FormData();
        let data = new FormData();
        for (let i in obj) {
          data.append(i, obj[i]);
        }

        reqGoodsAdd(data).then((res) => {
          if (res.data.code == 200) {
            this.info.isshow = false; //弹窗消失
            this.reqTotalAction();
            this.reqGoodsAction(); //立即刷新列表
            this.empy(); //清空弹窗内容
            successAlert(res.data.msg);
          } else {
            errorAlert(res.data.msg);
          }
        });
      });
    },

    //一级分类的二级联动
    changFirst() {
      //重新选择一级的时清空二级内容
      this.form.second_cateid = "";
      //根据一级内容的id获取附属二级的内容
      this.getSecondList();
    },
    //封装一级分类的二级联动
    getSecondList() {
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.reqListAction();
        this.twoList = res.data.list;
      });
    },

    //商品规格的二级联动
    changList() {
      this.form.specsattr = [];
      this.getattr();
    },
    //封装商品规格的二级联动
    getattr() {
      let obj = this.getList.find((item) => item.id == this.form.specsid);
      this.twochangList = obj.attrs;
    },
    //上传图片
    changeFile(e) {
      //e.target.files[0]可以获取到图片详情
      let file = e.target.files[0];
      //将文件file转为一个地址
      this.imgUrl = URL.createObjectURL(file);
      this.form.img = file;
      console.log(e.target);
      // this.form.img = this.imgUrl;
      //不允许图片内存超过2M
      if (file.size > 2 * 1024 * 1024) {
        alert("图片忒大了");
        return;
      }
      //判读图片类型
      // let arr=['jpg','png','gif','jpe']
      // if(!arr.includes(file.name.slice(file.name.lastIndexOf('.')))){
      //   alert('图片类型不对')
      //   return
      // }

      //URL.createObjectURL(file)把图片详情转换为一个地址，并赋值给一个变量
      // this.imgUrl = URL.createObjectURL(file);
      //把带有图片地址的变量赋值给this.form.img
    },

    //修改按钮
    update() {
      this.checked().then(() => {
        this.info.isshow = false; //弹窗消失

        let obj = {
          //拷贝原有值，操作拷贝后的值还不会改变原有值
          ...this.form,
        };
        obj.specsattr = JSON.stringify(obj.specsattr);

        //上传文件或图片就必用new FormData();
        let data = new FormData();
        for (let i in obj) {
          data.append(i, obj[i]);
        }

        reqGoodseDit(data).then((res) => {
          if (res.data.code == 200) {
            this.info.isshow = false; //弹窗消失
            this.reqGoodsAction(); //立即刷新
            successAlert("修改成功");
          } else {
            errorAlert("修改失败");
          }
        });
      });
    },

    //获取一条数据
    getInfo(id) {
      reqGoodsInfo({ id: id }).then((res) => {
        this.form = res.data.list;
        this.form.id = id;
        // console.log(JSON.stringify(res.data.list.specsattr));
        this.getSecondList(); //点检编辑重新请求二级联动的内容
        this.imgUrl = this.form.img; //把图片地址重新赋值给imgUrl
        this.specsattr = this.getattr(); //点检编辑重新请求商品属性的内容
        this.form.specsattr = JSON.parse(this.form.specsattr); //this.form.specsattr转为字符串
      });
    },
    // 富文本
    // open(){
    //   const editor = new E('#div')
    //   editor.create()
    // }
  },

  mounted() {
    this.reqListAction();
    //传值为了区分有的页面需要分页，有的不需要
    this.getListAction(true);
  },
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
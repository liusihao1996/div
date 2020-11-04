<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="活动名称" label-width="120px">
          <el-input v-model="form.title" autocomplete="off"></el-input>
        </el-form-item>
        <!-- 活动期限 
        :picker-options="pickerOptions"
        -->
        <el-form-item label="活动期限" label-width="120px">
          <el-date-picker
            v-model="value1"
            value-format="timestamp"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            @change="change"
          >
          </el-date-picker>
        </el-form-item>
        <!-- 一级分类 -->
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
        <!-- 二级分类 -->
        <el-form-item label="二级分类" label-width="120px">
          <el-select v-model="form.second_cateid" @change="changTwo()">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in twoList"
              :key="item.id"
              :label="item.catename"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
        <!-- 商品 -->
        <el-form-item label="商品" label-width="120px">
          <el-select v-model="form.goodsid">
            <el-option label="--请选择--" value="" disabled></el-option>
            <el-option
              v-for="item in DogList"
              :key="item.id"
              :label="item.goodsname"
              :value="item.id"
            ></el-option>
          </el-select>
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
import { successAlert, errorAlert } from "../../../uitls/alert";
import { mapGetters, mapActions } from "vuex";
import { reqSeckAdd, reqCateList, reqGoodsList,reqSeckInfo,reqSeckEdit} from "../../../uitls/request";
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
        title: "", //限时秒杀名称
        begintime: null, //开始时间
        endtime: null, //结束时间
        first_cateid: "", //商品一级分类编号
        second_cateid: "", //商品二级分类编号
        goodsid: "", //商品编号
        status: 1,
      },
      value1:[],
      twoList: [], //一级分类的二级联动
      DogList: [], //二级分类的二级联动
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
      reqListseckill: "seckill/reqListAction",
    }),
    //添加按钮
    add() {
      this.info.isshow = false;
      reqSeckAdd(this.form).then((res) => {
          if(res.data.code==200){
            this.info.isshow=false
            this.reqListseckill()
            successAlert(res.data.msg)
          }else{
              errorAlert(res.data.msg)
          }
      });
    },

    //修改按钮
    update() {
      this.info.isshow = false;
      reqSeckEdit(this.form).then(res=>{
          if(res.data.code==200){
            this.info.isshow=false
            this.reqListseckill()
            successAlert(res.data.msg)
          }else{
              errorAlert(res.data.msg)
          }
      })
    },

    //一级分类的点击事件
    changFirst() {
        this.getSecondList()
    },
    //封装一级分类
    getSecondList(){
      reqCateList({ pid: this.form.first_cateid }).then((res) => {
        this.twoList = res.data.list;
      });
    },
    //二级分类的点击事件
    changTwo() {
        this.getattr()
    },
    //封装二级分类
    getattr(){
      reqGoodsList({
        fid: this.form.first_cateid,
        sid: this.form.second_cateid,
      }).then((res) => {
        this.DogList = res.data.list;
      });
    },
    //时间的点击事件
    change(){
      this.form.begintime=this.value1[0]//起始事件
      this.form.endtime=this.value1[1]//结束事件
    },
    //获取一条数据
    getOne(id){
      reqSeckInfo(id).then(res=>{
        var data1=new Date(res.data.list.begintime*1)
        var data2=new Date(res.data.list.endtime*1)
        this.value1=[data1,data2]

        this.form=res.data.list
        this.form.id=id
        this.getSecondList()
        this.getattr()
      })
    }
  },

  mounted() {
    this.reqListAction();
  },
};
</script>
<style scoped>
</style>
<template>
  <div>
    <el-dialog :title="info.title" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="规格名称" label-width="120px">
          <el-input v-model="form.specsname" autocomplete="off"></el-input>
        </el-form-item>

        <!-- 新增属性 -->
        <el-form-item
          label="规格属性"
          label-width="120px"
          v-for="(item, index) in attrArr"
          :key="index"
        >
          <div class="line">
            <div class="ipt-box">
              <el-input v-model="item.val" autocomplete="off"></el-input>
            </div>
            <el-button type="primary" v-if="index == 0" @click="arrAdd"
              >新增规格属性</el-button
            >
            <el-button type="primary" v-else @click="arrDel(index)"
              >删除</el-button
            >
          </div>
        </el-form-item>

        <!-- 状态 -->
        <el-form-item label="状态" label-width="width">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="2"
          ></el-switch>
        </el-form-item>
      </el-form>

      <!-- 删除和确定 -->
      <div slot="footer" class="dialog-footer">
        <el-button @click="info.isshow = false">取 消</el-button>
        <el-button type="primary" @click="add" v-if="info.title == '添加菜单1'"
          >1添加</el-button>
        <el-button type="primary" @click="update" v-else>1修改</el-button
        >
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { reqSpecsAdd, reqSpecsInfo,reqSpecsEdit} from "../../../uitls/request"; //接口
import { successAlert, errorAlert } from "../../../uitls/alert"; //成功弹窗
import { mapActions, mapGetters } from "vuex";
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list: "spec/list",
    }),
  },
  components: {},
  data() {
    return {
      form: {
        specsname: "",
        attrs: [],
        status: 1,
      },
      //新增属性的值
      attrArr: [{ val: "" }],
    };
  },

  methods: {
    ...mapActions({
      reqListAction: "spec/reqListAction",
      reqTotalAction: "spec/reqTotalAction"
    }),

    //点击新增规格属性按钮在attrArr添加一条{val:''}
    arrAdd() {
      this.attrArr.push({ val: "" }); //push.()在数组尾部添加
    },

    //删除按钮
    arrDel(index) {
      this.attrArr.splice(index, 1); //splice(起始下标,删除位数)
    },

    //重置
    empty() {
      (this.form = {
        specsname: "",
        attrs: "[]",
        status: 1,
      }),
        //规格属性值
        (this.attrArr = [{ val: "" }]);
    },

    //弹窗里的添加按钮
    add() {
      //新增属性存在attrArr里了，但是后台要是的字符串类型的数组，先JSON.stringify转完在赋值给attrs
      this.form.attrs = JSON.stringify(this.attrArr.map((item) => item.val));
      reqSpecsAdd(this.form).then((res) => {
        console.log(res);
        if (res.data.code == 200) {
          successAlert("成功");
          this.info.isshow = false; //弹窗消失
          this.empty(); //重置数据
          this.reqListAction(); //刷新页面
          this.reqTotalAction()//添加完成后，求情数据总数
          
        } else {
          errorAlert("失败");
        }
      });
    },
    //获取一条数据
    getOne(id) {
      reqSpecsInfo(id).then((res) => {
        this.form = res.data.list[0];
        this.attrArr=JSON.parse(this.form.attrs).map(item=>({val:item}))
      });
    },
    //修改
    update(){
      this.form.attrs=JSON.stringify(this.attrArr.map(item=>item.val))

      reqSpecsEdit(this.form).then(res=>{
        if(res.data.code==200){
          this.info.isshow = false; //弹窗消失
          // this.empty(); //重置数据
          this.reqListAction(); //刷新页面
            successAlert('修改成功')
        }else{
          errorAlert('修改失败')
        }
      })
    }
  },

  mounted() {},
};
</script>
<style scoped>
.line {
  /* 弹性盒子 */
  display: flex;
}
.ipt-box {
  flex: 1;
}
</style>
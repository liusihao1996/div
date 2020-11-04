<template>
  <div>
    <el-dialog title="收货地址" :visible.sync="info.isshow">
      <el-form :model="form">
        <el-form-item label="手机号" label-width="120px">
          <el-input v-model="form.phone" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="昵称" label-width="120px">
          <el-input v-model="form.nickname" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" label-width="120px">
          <el-input v-model="form.password" autocomplete="off" type='password'></el-input>
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
          >添加</el-button
        >
        <el-button type="primary" @click="update" v-else>修改1</el-button>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import {reqMemberInfo,reqMemberEdit} from '../../../uitls/request'
import {successAlert,errorAlert} from '../../../uitls/alert'
import {mapGetters,mapActions} from 'vuex'
export default {
  props: ["info"],
  computed: {
    ...mapGetters({
      list:'member/list'
    })
  },
  components: {},

  data() {
    return {
      form:{
          uid:'',
          phone:'',
          nickname:'',
          password:'',
          status:''
      }
    };
  },

  methods: {
     ...mapActions({
      reqListAction:'member/reqListAction'
    }),
    //添加按钮
    add() {
      this.info.isshow = false;
    },
    //修改按钮
    update() {
      // this.info.isshow = false;
      reqMemberEdit(this.form).then(res=>{
          if(this.form.password==''){
            alert('密码不能为空')
            return
          }

          if(res.data.code==200){
            this.info.isshow=false
            this.reqListAction()
            successAlert(res.data.msg)
          }else{
            errorAlert(res.data.msg)
          }
      })
    },
    //会员一条数据
    MemberInfo(uid){
        reqMemberInfo(uid).then(res=>{
          this.form=res.data.list
        })
    }
  },

  mounted() {},
};
</script>
<style scoped>
</style>
<template>
  <div class="login">
        <div class="con">
          <h3>登录</h3>
          <el-input placeholder="请输入用户名" v-model="form.username"></el-input>
          <el-input placeholder="请输入密码" v-model="form.password"></el-input>
          <div class="btn">
            <el-button @click="login">登录</el-button>
          </div>
        </div>
  </div>
</template>
<script>
import {reqUserLogin}from '../../uitls/request'
import {mapActions} from 'vuex'
export default {
  components: {},
  data() {
    return {
      form:{
        username:'',
        password:''
      }
    };
  },
  methods: {
    ...mapActions(['changeUserInfoActions']),
    login(){
      reqUserLogin(this.form).then(res=>{
        console.log(res);
        if(res.data.code==200){
          //本地存储 优点：刷新后还在。 缺点：取值不好取
          //vuex  优点：取值好取  缺点：刷新后数据没了
          // localStorage.setItem('userInfo',JSON.stringify(res.data.list))
          this.changeUserInfoActions(res.data.list)
           this.$router.push('/')
        }
       
      })
      
    }
  },
  mounted() {},
};
</script>
<style scoped>
.login{
  width: 1px 0vw;
  height: 100vh;
  background-color: yellowgreen;
  position: relative;
}
.con {
  background-color: pink;
  border-radius: 10px;
  padding: 20px;
  width: 400px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
}
</style>
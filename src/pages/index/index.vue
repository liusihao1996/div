<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <!-- 自定义导航 -->
        <el-menu
          default-active="0"
          class="el-menu-vertical-demo"
         
          background-color="#000"
          text-color="#fff"
          active-text-color="#ffd04b"
          :unique-opened="true"
          router
        >
          <el-menu-item index="/">
            <i class="el-icon-menu"></i>
            <span slot="title">首页</span>
          </el-menu-item>

          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>系统设置</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/menu">菜单管理</el-menu-item>
              <el-menu-item index="/role">角色管理</el-menu-item>
              <el-menu-item index="/manage">管理员管理</el-menu-item>
            </el-menu-item-group>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>商城管理</span>
            </template>
            <el-menu-item-group>
              <el-menu-item index="/cate">商品分类</el-menu-item>
              <el-menu-item index="/specs">商铺规格</el-menu-item>
              <el-menu-item index="/goods">商品管理</el-menu-item>
              <el-menu-item index="/member">会员管理</el-menu-item>
              <el-menu-item index="/banner">轮播图管理</el-menu-item>
              <el-menu-item index="/seckill">秒杀活动</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <span>{{userInfo.username}}</span>
          <el-button type="primary" @click="logOut">用户</el-button>
        </el-header>
        <el-main>
          <!-- 面包屑导航 -->
          <el-breadcrumb separator="/" v-if="$route.name">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item><a href="/">{{ $route.name }}</a></el-breadcrumb-item>
          </el-breadcrumb>

          <!-- 二级路由出口 -->
          <router-view></router-view>
        </el-main>
      </el-container>
    </el-container>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed:{
    ...mapGetters({
      userInfo:'userInfo'
    })
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions(['changeUserInfoActions']),
    logOut(){
      this.changeUserInfoActions({})
      this.$router.push('/login')
    }
  },
  mounted() {

  },
};
</script>
<style scoped>
.el-aside {
  background-color: #000;
  height: 100vh;
}
.el-header {
  background-color: #ccc;
  width: 100vw;
}
span{
  font-size: 20px;

}
</style>
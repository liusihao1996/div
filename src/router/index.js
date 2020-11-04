import Vue from 'vue'
import Router from 'vue-router'
import store from '../store/index'
Vue.use(Router)
export const indexRouter=[
  {
    path:'menu',
    component:()=>import('../pages/menu/menu'),
    name:'菜单管理'
  },
  {
    path:'role',
    component:()=>import('../pages/role/role'),
    name:'角色管理'
  },
  {
    path:'manage',
    component:()=>import('../pages/manage/manage'),
    name:'管理员管理'
  },
  {
    path:'cate',
    component:()=>import('../pages/cate/cate'),
    name:'商品分类'
  },
  {
    path:'specs',
    component:()=>import('../pages/specs/specs'),
    name:'商铺规格'
  },
  {
    path:'goods',
    component:()=>import('../pages/goods/goods'),
    name:'商品管理'
  },
  {
    path:'banner',
    component:()=>import('../pages/banner/banner'),
    name:'轮播图管理'
  },
  {
    path:'member',
    component:()=>import('../pages/member/member'),
    name:'会员管理'
  },
  {
    path:'seckill',
    component:()=>import('../pages/seckill/seckill'),
    name:'秒杀活动'
  }
]

let router =  new Router({
  routes: [
    {
      path:'/login',
      component:()=>import('../pages/login/login')
    },
    {
      path:'/',
      component:()=>import('../pages/index/index'),
      children:[
        {
          path:'',//二级路由重定向
          component:()=>import('../pages/home/home')
        },
        ...indexRouter
      ]
    }
  ]
})
export default router



//登录拦截
router.beforeEach((to,from,next)=>{
  //如果前往的是login就允许登录
  if(to.path==='/login'){
    next()
    return
  }
  //如果不是前往login，判断是否登录
  let userInfo=store.state.userInfo
  //如果登录了就过去
  if(userInfo.username){
    next()
    return
  }
  //如果没登录就登录
  next('/login')
})
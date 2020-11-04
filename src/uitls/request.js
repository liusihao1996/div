
import axios from 'axios'
import qs from "qs";

import Vue from 'vue'
Vue.prototype.$imgPre="http://localhost:3000"

let api = '/api'

///////菜单管理///////
//菜单添加
export const reqMenuAdd = (form) => {
  return axios({
    url: api+"/api/menuadd",
    method: "post",
    data: qs.stringify(form),
  })
}
//菜单获取（一条）
export const reqMenuDeta = (id) => {
  return axios({
    url: api+'/api/menuinfo',
    method: "get",
    params: {
      id: id
    }
  })
}
//菜单修改
export const reqMenuupdate = (form) => {
  return axios({
    url: api+'/api/menuedit',
    method: 'post',
    data: qs.stringify(form)
  })
}
//菜单删除
export const reqMenuupDel = (id) => {
  return axios({
    url: api+'/api/menudelete',
    method: 'post',
    data: qs.stringify({
      id: id
    })
  })
}
//菜单列表
export const reqMenuupgeiInit = () => {
  return axios({
    url: api+'/api/menulist',
    method: 'get',
    params: {
      istree: true
    }
  })
}



/////角色管理/////
//角色列表
export const reqManagegeiInit = (form) => {
  return axios({
    url: api+"/api/rolelist",
    method: "get",
  })
}
//角色删除
export const reqManagedel = (id) => {
  return axios({
    url: api+'/api/roledelete',
    method: 'post',
    data: qs.stringify({ id: id })
  })
}
//角色添加
export const reqManagebtnAdd = (form) => {
  return axios({
    url: api+"/api/roleadd",
    method: "post",
    data: qs.stringify(form),
  })
}
//角色获取（一条）
export const reqManagegetOne = (id) => {
  return axios({
    url: api+"/api/roleinfo",
    method: "get",
    params: { id: id, },
  })
}
//角色修改
export const reqManageupdate = (form) => {
  return axios({
    url: api+"/api/roleedit",
    method: "post",
    data: qs.stringify(form),
  })
}



/////管理员管理/////
//管理员添加
export const reqManageAdd = (form) => {
  return axios({
    url: api+'/api/useradd',
    method: 'post',
    data: qs.stringify(form)
  })
}
//管理员列表（分页）
export const reqManageuserlist = (params) => {
  return axios({
    url:api+'/api/userlist',
    methods:'get',
    params:params
  })
}
//管理员获取（一条）
export const reqManageuserinfo = (uid) => {
  return axios({
    url:api+'/api/userinfo',
    method:'get',
    params:{
      uid:uid
    }
  })
}
//管理员修改
export const reqManageuseredit = (form) => {
  return axios({
    url:api+'/api/useredit',
    method:'post',
    data:qs.stringify(form)
  })
}
//管理员删除
export const reqManageuserdelete = (uid) => {
  return axios({
    url:api+'/api/userdelete',
    method:'post',
    data:{
      uid:uid
    }
  })
}
//管理员总数（用于计算分页）
export const reqManageusercount = (uid) => {
  return axios({
    url:api+'/api/usercount',
    method:'get'
  })
}




//////商品分类管理//////
//商品分类添加
export const reqCateAdd = (data) => {
  return axios({
    url:api+'/api/cateadd',
    method:'post',
    data:data
  })
}
//商品分类列表
export const reqCateList = (params) => {
  return axios({
    url:api+'/api/catelist',
    method:'get',
    params:params
  })
}
//管理员删除
export const reqCateDelete = (id) => {
  return axios({
    url:api+'/api/catedelete',
    method:'post',
    data:qs.stringify({id:id})
  })
}
//商品分类获取（一条）
export const reqCateInfo = (id) => {
  return axios({
    url:api+'/api/cateinfo',
    method:'get',
    params:{
      id:id
    }
  })
}
//商品分类修改
export const reqCateDit = (data) => {
  return axios({
    url:api+'/api/cateedit',
    method:'post',
    data:data
  })
}




///////商品规格管理//////
//商品规格添加
export const reqSpecsAdd = (form) => {
  return axios({
    url:api+'/api/specsadd',
    method:'post',
    data:qs.stringify(form)
  })
}
//商品列表（分页）
export const reqSpecsList = (params) => {
  return axios({ 
    url:api+'/api/specslist',
    method:'get',
    params:params
  })
}
//商品规格删除
export const reqSpecsDel = (id) => {
  return axios({
    url:api+'/api/specsdelete',
    method:'post',
    data:qs.stringify({id:id})
  })
}
//商品规格修改
export const reqSpecsEdit = (form) => {
  return axios({
    url:api+'/api/specsedit',
    method:'post',
    data:qs.stringify(form)
  })
}
//商品规格获取一条数据
export const reqSpecsInfo = (id) => {
  return axios({
    url:api+'/api/specsinfo',
    method:'get',
    params:{id:id}
  })
}
//商品规格总数
export const reqSpecsCount = () => {
  return axios({
    url:api+'/api/specscount',
    method:'get'
  })
}




///////商品管理//////
//商品添加
export const reqGoodsAdd = (form) => {
  return axios({
    url:api+'/api/goodsadd',
    method:'post',
    data:form
  })
}
//商品总数（用于计算分页）
export const reqGoodsCount = () => {
  return axios({
    url:api+'/api/goodscount',
    method:'get',
  })
}
//商品列表（分页）
export const reqGoodsList = (params) => {
  return axios({
    url:api+'/api/goodslist',
    method:'get',
    params:params
  })
}
//商品获取（一条）
export const reqGoodsInfo = (id) => {
  return axios({
    url:api+'/api/goodsinfo',
    method:'get',
    params:id
  })
}
//商品管理修改
export const reqGoodseDit = (data) => {
  return axios({
    url:api+'/api/goodsedit',
    method:'post',
    data:data
  })
}
//商品管理删除
export const reqGoodDelete = (id) => {
  return axios({
    url:api+'/api/goodsdelete',
    method:'post',
    data:qs.stringify({id:id})
  })
}




//////会员/////
//会员列表
export const reqMemberList = () => {
  return axios({
    url:api+'/api/memberlist',
    method:'get',
  })
}
//会员获取（一条）
export const reqMemberInfo = (uid) => {
  return axios({
    url:api+'/api/memberinfo',
    method:'get',
    params:{uid:uid}
  })
}
//会员修改
export const reqMemberEdit = (form) => {
  return axios({
    url:api+'/api/memberedit',
    method:'post',
    data:form
  })
}




////////轮播图//////
// //轮播图添加
export const reqBannerAdd = (form) => {
  return axios({
    url:api+'/api/banneradd',
    method:'post',
    data:form
  })
}
//轮播图列表
export const reqBannerList = () => {
  return axios({
    url:api+'/api/bannerlist',
    method:'get',
  })
}
//轮播图获取（一条）
export const reqBannerInfo = (id) => {
  return axios({
    url:api+'/api/bannerinfo',
    method:'get',
    params:{id:id}
  })
}
// 轮播图修改
export const reqBannerEdit = (data) => {
  return axios({
    url:api+'/api/banneredit',
    method:'post',
    data:data
  })
}
//轮播图删除
export const reqbannerDelete = (id) => {
  return axios({
    url:api+'/api/bannerdelete',
    method:'post',
    data:qs.stringify({id:id})
  })
}



/////限时秒杀管理/////
//限时秒杀添加
export const reqSeckAdd = (form) => {
  return axios({
    url:api+'/api/seckadd',
    method:'post',
    data:form
  })
}
//限时秒杀列表
export const reqSeckList = () => {
  return axios({
    url:api+'/api/secklist',
    method:'get',
  })
}
//限时秒杀获取（一条）
export const reqSeckInfo = (id) => {
  return axios({
    url:api+'/api/seckinfo',
    method:'get',
    params:{id:id}
  })
}
//限时秒杀修改
export const reqSeckEdit = (form) => {
  return axios({
    url:api+'/api/seckedit',
    method:'post',
    data:form
  })
}
//限时秒杀删除
export const reqSeckDelete = (id) => {
  return axios({
    url:api+'/api/seckdelete',
    method:'post',
    data:{id:id}
  })
}




////管理员登录////
export const reqUserLogin = (form) => {
  return axios({
    url:api+'/api/userlogin',
    method:'post',
    data:qs.stringify(form)
  })
}
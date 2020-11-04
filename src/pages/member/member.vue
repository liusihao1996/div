<template>
  <div>
    <el-button type="primary" @click="wuillAll" disabled>会员页面没有添加按钮</el-button>
    <v-list @edit='willUpdate($event)'></v-list>
    <v-add :info='info' ref='add'></v-add>
  </div>
</template>
<script>
import vList from './components/list'
import vAdd from './components/add'
export default {
  components: {
      vList,
      vAdd
  },


  data() {
    return {
        info:{
            isshow:false,
            title:''
        }
    };
  },


  methods: {
      wuillAll(){
          this.info={
            isshow:true,
            title:'添加菜单'
        }
      },
      willUpdate(uid){
        this.info={
            isshow:true,
            title:'编辑菜单'
        },
          this.$refs.add.MemberInfo(uid)
      }
  },


  mounted() {},
};
</script>
<style scoped>
</style>
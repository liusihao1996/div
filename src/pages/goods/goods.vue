<template>
  <div>
      <el-button type="primary" @click="wuillAll">添加</el-button>
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
      //添加按钮
      wuillAll(){
         this.info={
            isshow:true,
            title:'添加菜单' 
        },
        this.$refs.add.empy()
      },
     
     //编辑按钮
      willUpdate(id){
          this.info={
            isshow:true,
            title:'编辑菜单' 
          },
          this.$refs.add.getInfo(id)//用refs调用add里的一条数据的方法
      }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
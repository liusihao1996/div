<template>
  <div>
    <el-button type="primary" @click="wuillAll">添加</el-button>
    <v-list @edit='wuiiAll($event)'></v-list>
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
        },
        this.$refs.add.empty()
      }, 
      wuiiAll(id){
         this.info={
            isshow:true,
            title:'编辑菜单'
        },
        this.$refs.add.getBannerInfo(id)
      }
  },


  mounted() {},
};
</script>
<style scoped>
</style>
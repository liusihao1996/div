<template>
  <div>
      
      <el-button type="primary" @click="willAll">添加</el-button>
      <v-list  @edit='wilUpd($event)'></v-list>
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
      willAll(){
          this.info={
            isshow:true,
            title:'添加菜单'
        },
        this.$refs.add.empty()
      },
      wilUpd(id){
          this.$refs.add.getOne(id)
          this.info.title = '编辑菜单';
      }
  },
  mounted() {},
};
</script>
<style scoped>
</style>
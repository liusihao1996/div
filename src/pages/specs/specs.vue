<template>
  <div>
    <el-button type="primary" @click="willAll">添加</el-button>
    <v-list @edit='editBtn($event)'></v-list>
    <v-add :info='info' ref='add'></v-add>
  </div>
</template>
<script>
import vList from "./components/list";
import vAdd from "./components/add";
export default {
  components: {
    vList,
    vAdd,
  },
  data() {
    return {
      info: {
        isshow: false,
        title: "",
      },
    };
  },

  methods: {
    willAll() {
      this.info = {
        isshow: true,
        title: "添加菜单1",
      },
      this.$refs.add.empty()//点击完编辑再点添加就清空add弹窗数据
    },
    //获取add页面的请求一条数据
    editBtn(id){
      this.info.isshow=true
      this.$refs.add.getOne(id)
      this.info.title = '编辑菜单';
    }
  },

  mounted() {},
};
</script>
<style scoped>
</style> 
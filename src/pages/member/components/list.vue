<template>
  <div>
    <el-table
      :data="list"
      style="width: 100%; margin-bottom: 20px"
      row-key="id"
      border
      default-expand-all
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column prop="uid" label="用户编号" sortable width="180">
      </el-table-column>
      <el-table-column prop="nickname" label="昵称" sortable width="180">
      </el-table-column>
      <el-table-column prop="phone" label="手机号"> </el-table-column>
      <el-table-column prop="status" label="状态">
        <template slot-scope="scope">
          <el-button type="primary" v-if="scope.row.status == 1">启用</el-button>
          <el-button type="info" v-else>禁用</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="address" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="edit(scope.row.uid)">编辑</el-button>
          <!-- <el-button type="info" @click="del(scope.row.uid)">删除</el-button> -->
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>
<script>
import {mapGetters,mapActions} from 'vuex'
export default {
  computed: {
    ...mapGetters({
      list:'member/list'
    })
  },
  components: {},

  data() {
    return {
      
    }
  },

  methods: {
    ...mapActions({
      reqListAction:'member/reqListAction'
    }),
    //编辑
    edit(uid){
      this.$emit('edit',uid)
    }
  },

  mounted() {
    this.reqListAction()
  },
};
</script>
<style scoped>
</style>
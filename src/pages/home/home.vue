<template>
  <div>
    <div id="main" class="box"></div>
  </div>
</template>
<script>
import echarts from "echarts";
import { mapGetters, mapActions } from "vuex";
export default {
  computed: {
    ...mapGetters({
      list: "cate/list",
    }),
  },
  components: {},
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      reqListAction: "cate/reqListAction",
    }),
  },
  watch: {
    list: {
      handler() {
        if (this.list.length > 0) {
          let myChart = echarts.init(document.getElementById("main"));
          let option = {
            title: {
              text: "商品分类",
            },
            // color:[],
            tooltip: {},
            legend: {
              data: ["子分类数量"],
            },
            xAxis: {
              data: this.list.map((item) => item.catename),
            },
            yAxis: {},
            series: [
              {
                name: "子分类数量",
                type: "line",
                data: this.list.map((item) =>
                  item.children ? item.children.length : 0
                ),
              },
            ],
          };
          myChart.setOption(option);
        }
      },
      deep: true,
    },
  },
  mounted() {
      console.log(this.list);
    this.reqListAction();
  },
};
</script>
<style scoped>
.box {
  width: 80%;
  height: 400px;
  background: #ccc;
  margin: 0 auto;
}
</style>
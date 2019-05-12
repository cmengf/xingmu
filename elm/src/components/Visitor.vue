<template>
  <div>
    <el-breadcrumb class="login" color="#00000" separator="/">
      <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>图标</el-breadcrumb-item>
      <el-breadcrumb-item>用户分布</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <div id="myChart" :style="{ width: '1000px', height: '450px' }"></div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      list:[]
    };
  },
  mounted() {
    axios.get("https://elm.cangdu.org/v1/user/city/count").then(res => {
      if (res.data) {
        this.list = res.data.user_city;
        // console.log(this.list);
        this.drawLine();
      }
    });
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChart"));
      // 绘制图表
      myChart.setOption({
        title: {
          text: "用户分布",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: ["北京", "上海", "深圳", "杭州", "其他"]
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: [
              { value: this.list.beijing, name: "北京" },
              { value: this.list.shanghai, name: "上海" },
              { value: this.list.shenzhen, name: "深圳" },
              { value: this.list.hangzhou, name: "杭州" },
              { value: this.list.qita, name: "其他" }
            ],
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      });
    }
  }
};
</script>
<style scoped>
* {
  margin: 0;
  width: 100%;
  padding: 0;
  box-sizing: border-box;
}
.login{
  width: 100%;
  height:60px;
  background: #EFF2F7;
  line-height:60px;
  font-size:15px;
  padding-left:15px;
  margin-left: -10px;
  color: silver;
}
.img{
  height: 40px;
  width: 40px;
  position: absolute;
  right:30px;
  top:10px;
  border-radius: 50%;
}
</style>

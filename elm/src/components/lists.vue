<template>
  <div class="right">
    <div class="login">首页</div>
    <div class="tu">数据管理</div>
    <div class="tu-1">
      <span class="span1">当日数据：</span>
      <span class="span2">{{user2}} 新增用户</span>
      <span class="span2">{{dingdan}}  新增订单</span>
      <span class="span2">{{admin}}  新增管理员</span>
    </div>
    <div class="tu-2">
      <span class="span1">总数据：</span>
      <span class="span2">{{user}}   注册用户</span>
      <span class="span2">{{dingdan2}}    订单</span>
      <span class="span2"> {{admin2}}    管理员</span>
    </div>
    <div id="chartmain" style="width:900px; height: 450px;margin-top:50px;margin-left:50px"></div>

  </div>
</template>
<script>
  import axios from "axios";
  export default {
    data() {
      return {
        user:'',
        dingdan:'',
        admin:'',
        dingdan2:'',
        admin2:'',
        user2:''
      };
    },
    mounted(){
      this.on()
      axios
        .get("https://elm.cangdu.org/v1/users/count")
        .then((res)=>{
          this.user=res.data.count
        })
      axios
        .get("https://elm.cangdu.org/statis/order/2019-04-28/count")
        .then((res)=>{
          this.dingdan=res.data.count
        })
      axios
        .get("https://elm.cangdu.org/statis/admin/2019-04-28/count")
        .then((res)=>{
          this.admin=res.data.count
        })
      axios
        .get("https://elm.cangdu.org/bos/orders/count")
        .then((res)=>{
          this.dingdan2=res.data.count
        })
// https://elm.cangdu.org/admin/count
      axios
        .get("https://elm.cangdu.org/admin/count")
        .then((res)=>{
          this.admin2=res.data.count
        })
      axios
        .get(" https://elm.cangdu.org/statis/user/2019-04-22/count")
        .then((res)=>{
          this.user2=res.data.count
        })
    },
    created(){

    },
    methods: {
      userList(){
        this.$router.push({name:'userList'})
      },
      detail(){
        this.$router.push({name:'detail'})
      },
      on(){
        let aaa= this.$echarts.init(document.getElementById("chartmain"))
        aaa.setOption({
          title: {
            text: '走势图',
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['新注册用户','新增订单','新增管理员']
          },
          toolbox: {
            show: true,
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              dataView: {readOnly: false},
              magicType: {type: ['line', 'bar']},
              restore: {},
              saveAsImage: {}
            }
          },
          xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['2019-04-22','2019-04-23','2019-04-24','2019-04-25','2019-04-26','2019-04-27','2019-04-28']
          },
          yAxis: {
            type: 'value',
            min: 0,
            max: 200,
            interval: 50,
            axisLabel: {
              formatter: '{value}'
            }
          },
          series: [
            {
              name:'新注册用户',
              type:'line',
              data:[199, 113, 77, 50, 38, 13, 0,5],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },
            },
            {
              name:'新增订单',
              type:'line',
              data:[15, 3, 2, 30, 3, 21, 2,17],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },

            },
            {
              name:'新增管理员',
              type:'line',
              data:[124, 129, 123, 124, 127, 13, 22],
              markPoint: {
                data: [
                  {type: 'max', name: '最大值'},
                  {type: 'min', name: '最小值'}
                ]
              },

            }
          ]
        })
      },
    }
  };
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .right{
    width:98.5%;
    background:white;
    z-index: 222;
    height:940px;
    .login{
      width:100%;
      height:60px;
      background: #EFF2F7;
      line-height:60px;
      font-size:15px;
      padding-left:15px;
      color: lightgrey;
    }
    .tu{
      width:100%;
      height:60px;
      line-height:60px;
      font-size:30px;
      text-align:center;
    }
    .tu-1{
      margin-left:20px;
      width:100%;
      span{
        display: inline-block;
        width:250px;
        height:40px;
        line-height:40px;
        text-align:center;
        background: red;
        margin-left:20px;
        border-radius:7px;
      }
      .span1{
        display: inline-block;
        font-size:25px;
        font-weight:700;
        color: white;
        background: #FF9800;
      }
      .span2{
        display: inline-block;
        background: #E5E9F2;
      }
    }
    .tu-2{
      margin-top:20px;
      margin-left:20px;
      width:100%;
      span{
        display: inline-block;
        width:250px;
        height:40px;
        line-height:40px;
        text-align:center;
        background: red;
        margin-left:20px;
        border-radius:7px;
      }
      .span1{
        font-size:25px;
        font-weight:700;
        color: white;
        background: #20A0FF;
      }
      .span2{
        background: #E5E9F2;
      }

    }
  }
</style>

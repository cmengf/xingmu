<template>
  <div class="right">
    <div class="login">首页</div>
    <div class="tu">数据管理</div>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <div class="tu-1">
      <span class="span1">当日数据：</span>
      <span class="span2">{{adminCount}}新增用户</span>
      <span class="span2">{{userCount}} 新增订单</span>
      <span class="span2">{{orderCount}} 新增管理员</span>
    </div>
    <div class="tu-2">
      <span class="span1">总数据：</span>
      <span class="span2">{{allAdminCount()}}注册用户</span>
      <span class="span2">{{allUserCount}}订单</span>
      <span class="span2">{{allOrderCount}}管理员</span>
    </div>
    <ul>
      <li v-for="i in orderList">
        {{i}}
      </li>
    </ul>
    <!--<div id="chartmain" style="width:900px; height: 450px;margin-top:50px;margin-left:50px"></div>-->
  </div>
</template>
<script>
  import Axios from "axios";
  export default {
    data() {
      return {
        userCount:null,
        orderCount:null,
        adminCount:null,
        allUserCount:null,
        allOrderCount:null,
        allAdminCount:null,
        orderList:[],
        userList:[],
        adminList:[],
      }
    },
    // components:{
    //   headTop
    // },
    mounted(){
      this.getDate('user');
      this.getDate('order');
      this.getDate('admin');
    },
    methods: {
      // initData(){
      //   Promise.all([
      //     this.getData('admin'),this.getData('order'),this.getData('user')
      //   ]).then(res=>{
      //    console.log()
          // this.adminCount=res[0].data.count;
          // this.adminCount=res[2].data.count;
          // this.adminCount=res[2].data.count;
        // }).catch(err=>{
        //   console.log(err)
        // })
      // },
      getData (url) {
        for (let i = 0;i<7;i++){
          let date=new Date();
          date.setDate(date.getDate()-i);
          const today = dtime(new Data()).format('YYYY-MM-DD');
       this.$axios.get('http://elm.cangdu.org/statis/'+url+'/'+today+'/count').then(res=>{
         if(url==='admin'){
           if(i==0){
             this.adminCount=res.data.count;
           }else {
             this.allAdminCount+=res.data.count;
           }
           this.adminList[today]=res.data.count
         }
         else if(url==='user'){
           if(i==0){
             this.userCount=res.data.count;
           }else {
             this.allUserCount+=res.data.count;
           }
           this.userList[today]=res.data.count
         }
         else if(url==='order'){
           if(i==0){
             this.orderCount=res.data.count;
           }else {
             this.allOrderCount+=res.data.count;
           }
           this.orderList[today]=res.data.count
           console.log(this.orderList)
         }

        })
      }
     }
    }
  }
</script>
<style scoped lang="scss">
  .right {
    width: 83%;
    background: white;
    z-index: 222;
    height: 950px;
    .login {
      width: 100%;
      height: 60px;
      background: #eff2f7;
      line-height: 60px;
      font-size: 15px;
      padding-left: 15px;
      color: lightgrey;
    }
    .tu {
      width: 100%;
      height: 60px;
      line-height: 60px;
      font-size: 30px;
      text-align: center;
    }
    .tu-1 {
      margin-left: 20px;
      width: 100%;
      span {
        display: inline-block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: red;
        margin-left: 20px;
        border-radius: 7px;
      }
      .span1 {
        display: inline-block;
        font-size: 25px;
        font-weight: 700;
        color: white;
        background: #ff9800;
      }
      .span2 {
        display: inline-block;
        background: #e5e9f2;
      }
    }
    .tu-2 {
      margin-top: 20px;
      margin-left: 20px;
      width: 100%;
      span {
        display: inline-block;
        width: 250px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        background: red;
        margin-left: 20px;
        border-radius: 7px;
      }
      .span1 {
        font-size: 25px;
        font-weight: 700;
        color: white;
        background: #20a0ff;
      }
      .span2 {
        background: #e5e9f2;
      }
    }
  }
</style>

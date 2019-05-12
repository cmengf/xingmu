<template>
  <div class="box2">
    <el-breadcrumb separator="/">
      <el-breadcrumb-item :to="{ path:'/List'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="(item,index) in $route.meta" :key="index">{{ item }}</el-breadcrumb-item>
    </el-breadcrumb>

    <el-dropdown @command="handleCommand">
      <span class="el-dropdown-link">
          <img :src="'https://elm.cangdu.org/img/'+this.list.avatar" class="action">
      </span>
      <el-dropdown-menu slot="dropdown"  >
        <el-dropdown-item command="List">首页</el-dropdown-item>
        <el-dropdown-item command="DengLu">退出</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </div>
</template>

<script>
  import {mapMutations} from 'vuex';
  import Axios from 'axios'
  export default {
    data(){
      return{
        num:[],
        list:{}
      }
    },
    created(){
      Axios.get("https://elm.cangdu.org/admin/info").then((item)=>{
        console.log(item.data)
        this.list=item.data.data
      })
      // this.num=this.$router.currentRoute.meta
    },
    methods: {
      ...mapMutations(['saveAdminInfo']),
      handleCommand(command) {
        console.log(command)
        if (command == 'List') {
          this.$router.push('/List')
        } else if (command == 'DengLu') {
          Axios.get('https://elm.cangdu.org/admin/singout').then(res => {
            if (res.data.success=='退出成功'){

              this.saveAdminInfo({login:false});
              this.$router.push('/')
            }
          })
        }

      }
    }
  }
</script>

<style>
.box2{
  width: 100%;
  height: 60px;
  background: whitesmoke;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
}
  .action{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 20px;
  }
.el-dropdown-link {
  cursor: pointer;
  color: #409EFF;
}
.el-icon-arrow-down {
  font-size: 12px;
}
.demonstration {
  display: block;
  color: #8492a6;
  font-size: 14px;
  margin-bottom: 20px;
}
</style>

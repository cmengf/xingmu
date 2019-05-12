<template>
  <div id="box1">
    <!--<el-breadcrumb class="login" color="#00000" separator="/">-->
      <!--<el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>数据管理</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>用户列表</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--<router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>-->
    <heard> </heard>
    <el-table
      class="boby"
      ref="singleTable"
      :data="tableData"
      highlight-current-row
      @current-change="handleCurrentChange"
      style="width: 100%"
    >
      <el-table-column type="index" width="220"> </el-table-column>
      <el-table-column property="registe_time" label="注册日期" width="220">
      </el-table-column>
      <el-table-column property="username" label="用户姓名" width="280">
      </el-table-column>
      <el-table-column property="city" label="注册地址"> </el-table-column>
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        background
        layout="total,prev, pager, next"
        :total="1000"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import Axios from 'axios'
  import heard from './head'
  export default {
    data() {
      return {
        tableData: [

        ],
        currentRow: null,
        list: "",
        currentPage1: 1,
        num:0
      };
    },
    created() {
      Axios.get("https://elm.cangdu.org/v1/users/list?offset=0&limit=20").then((item)=>{
        console.log(item.data)
        this.tableData=item.data

      })
      this.list = this.$route.params.headername;
    },
    beforeCreate(){
      Axios.get("https://elm.cangdu.org/v1/users/list?offset=0&limit=20").then(item => {
        console.log(item);
      });
    },
    components:{
      heard
    },
    methods: {
      setCurrent(row) {
        this.$refs.singleTable.setCurrentRow(row);
      },
      handleCurrentChange(val) {
        this.currentRow = val;
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.num=val-1
          Axios.get("https://elm.cangdu.org/v1/users/list?offset="+this.num*20+"&limit=20").then(item => {
            console.log(item.data)
            this.tableData=item.data
                });
      }
    }
  };
</script>
<style>
  #box1 {
    background: white;
    width: 99%;
    height: 100%;

  }
  .boby{
    height: 76%;
    overflow-y: scroll;

  }
  .login{
    width:100%;
    height:60px;
    background: #EFF2F7;
    line-height:60px;
    font-size:15px;
    padding-left:15px;
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

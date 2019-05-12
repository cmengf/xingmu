<template>
  <div id="box1">
    <el-breadcrumb class="login" color="#00000" separator="/">
      <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>管理员列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>

    <el-table :data="table" style="width: 100%" class="boby">
      <el-table-column label="姓名" width="320" property="user_name">
      </el-table-column>
      <el-table-column label="注册日期" width="320" property="create_time">
      </el-table-column>
      <el-table-column label="地址" width="320" property="city">
      </el-table-column>
      <el-table-column label="权限" property="admin">
      </el-table-column>
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
  import axios from "axios";
  export default {
    data() {
      return {
        table: [],
        list: "",
        currentPage1: 1,
        num:0
      };
    },
    created() {
      axios
        .get(
          "https://elm.cangdu.org/admin/all?offset=0&limit=20"
        )
        .then(item => {
          console.log(item.data);
          this.table = item.data.data;
        });
      // console.log(this.table)
      this.list = this.$route.params.headername;
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val*20-val}`);
        axios.get("https://elm.cangdu.org/admin/all?offset="+this.num*20+"&limit=20").then(item => {
          console.log(item.data);
          // this.tableData=item.data
        });
      }
    }
  };
</script>
<style>
  #box1 {
    width: 99%;
    height:100%;

  }
  .boby{
    height: 70%;
    overflow-y: scroll;
  }
  .img{
    height: 40px;
    width: 40px;
    position: absolute;
    right:30px;
    top:10px;
    border-radius: 50%;
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
</style>

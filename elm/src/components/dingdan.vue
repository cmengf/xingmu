<template>
  <div id="box1">
    <el-breadcrumb class="login" color="#00000" separator="/">
      <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>订单列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <el-table
      :data="table"
      class="boby"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="用户名">
              <span>{{  props.row.restaurant_name }}</span>
            </el-form-item>
            <el-form-item label="店铺名称">
              <span>{{ props.row.shop }}</span>
            </el-form-item>
            <el-form-item label="收货地址">
              <span>{{ props.row.id }}</span>
            </el-form-item>
            <el-form-item label="店铺 ID">
              <span>{{ props.row.shopId }}</span>
            </el-form-item>
            <el-form-item label="店铺地址">
              <span>{{ props.row.category }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column
        label="订单 ID"
        prop="address_id">
      </el-table-column>
      <el-table-column
        label="总价格"
        prop="total_amount">
      </el-table-column>
      <el-table-column
        label="订单状态"
        prop="status_bar.title">
      </el-table-column>
    </el-table>
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
        table:[],
        list: "",
        currentPage1: 1
      }
    },
    created() {
      axios
        .get(
          "https://elm.cangdu.org/bos/orders?offset=0&limit=20&restaurant_id=undefined"
        )
        .then(item => {
          console.log(item.data);
          this.table = item.data;
        });
      // console.log(this.table)
      this.list = this.$route.params.headername;
    },
    methods: {
      handleEdit(index, row) {
        console.log(index, row);
      },
      handleDelete(index, row) {
        console.log(index, row);
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style>
  #box1 {
    width: 99%;
    height:100%;

  }
  .boby{
    height: 76%;
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
  .demo-table-expand {
    font-size: 0;
  }
  .demo-table-expand label {
    width: 90px;
    color: #99a9bf;
  }
  .demo-table-expand .el-form-item {
    margin-right: 0;
    margin-bottom: 0;
    width: 50%;
  }
</style>

<template>
  <div id="box1">
    <div class="login"><font color="#00000">首页&nbsp;/&nbsp;数据管理&nbsp;/&nbsp;</font>食品列表</div>
    <el-table :data="table" style="width: 100%" class="boby">
      <el-table-column label="店铺名称" width="320" property="name">

      </el-table-column>
      <el-table-column label="店铺地址" width="320" property="description">

      </el-table-column>
      <el-table-column label="店铺介绍" width="320" property="rating">


      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button
          >
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)"
          >删除</el-button
          >
        </template>
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
          "https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined"
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
        console.log(`当前页: ${val*20-val}`);
        axios.get("https://elm.cangdu.org/shopping/v2/foods?offset="+this.num*20+"limit=20&restaurant_id=undefined").then(item => {
          console.log(item.data);
          this.tableData=item.data
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

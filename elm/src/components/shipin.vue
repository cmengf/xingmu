<template>
  <div id="box1">
    <el-breadcrumb class="login" color="#00000" separator="/">
      <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>食品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <template><el-table  :row-key="row=>row.index"  :row-style='fun'  @expand-change="toggleRowExpansion" :data="table" style="width: 100%" class="boby">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="餐馆ID">
              <span>{{ props.row.restaurant_id}}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.add_address }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.fenlei }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" width="320" property="name">
      </el-table-column>
      <el-table-column label="食品介绍" width="320" property="description">
      </el-table-column>
      <el-table-column label="评分" width="320" property="rating">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>

          <el-dialog title="修改食品名称" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="食品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品介绍" :label-width="formLabelWidth">
                <el-input v-model="form.region" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品分类" :label-width="formLabelWidth">
                <el-select v-model="form.date1" placeholder="请选择">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.name"
                    :value="item.name"
                  >
                  </el-option>
                </el-select>
                <el-form-item label="食品图片" class="adada" prop="region">
                  <el-upload
                    class="avatar-uploader"
                    action="https://elm.cangdu.org/v1/addimg/food/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                  >
                    <img
                      v-if="dialogImageUrl"
                      :src="dialogImageUrl"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
                <el-table
                  ref="singleTable"
                  :data="tableData"
                  highlight-current-row
                  @current-change="handleCurrentChange"
                  style="width: 100%"
                >
                  <el-table-column property="date" label="规格" width="120">
                  </el-table-column>
                  <el-table-column property="name" label="包装费" width="120">
                  </el-table-column>
                  <el-table-column property="address" label="价格">
                  </el-table-column>
                  <el-table-column label="操作">
                    <template slot-scope="scope">
                      <el-button
                        size="mini"
                        type="danger"
                        @click="handleDelete(scope.$index, scope.row)"
                      >删除</el-button
                      >
                    </template>
                  </el-table-column>
                </el-table>
              </el-form-item>
            </el-form>
            <div class="guige">
              <el-button type="primary" @click="sub()">添加规格</el-button>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="queren()"
              >确 定</el-button
              >
            </div>
          </el-dialog>
              <el-dialog title="添加规格" :visible.sync="paaaaaa">
                <el-form :model="patr">
                  <el-form-item label="规格" :label-width="formLabelWidth">
                    <el-input v-model="patr.date1" autocomplete="off"></el-input>
                  </el-form-item>
                  <el-form-item label="包装费" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="patr.num"
                      @change="handleChange"
                      :min="0"
                      :max="10"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                  <el-form-item label="价格" :label-width="formLabelWidth">
                    <el-input-number
                      v-model="patr.num1"
                      @change="handleChange"
                      :min="0"
                      :max="10"
                      label="描述文字"
                    ></el-input-number>
                  </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                  <el-button @click="paaaaaa = false">取 消</el-button>
                  <el-button type="primary" @click="paa()"
                  >确 定</el-button
                  >
                </div>
              </el-dialog>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)"
              >删除</el-button
              >
        </template>
      </el-table-column>
    </el-table></template>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="20"
        background
        layout="total,prev, pager, next"
        :total="count"
      ></el-pagination>
    </div>
  </div>
</template>

<script>

  import axios from "axios";
  export default {
    data() {
      return {
        num: 1,
        num1: 1,
        count:0,
        date1:"",
        table: [],
        name: [],

        currentPage1: 1,
        srr: 0,
        dialogTableVisible: false,
        dialogFormVisible: false,
        paaaaaa: false,
        form: {

        },
        patr: {

        },
        formLabelWidth: "120px",
        tableData: [],
        dialogImageUrl: "",
        imageUrl: "",
        dialogVisible: false,
        options: [],
        value: "",
        poot: ""
      };
    },
    created() {
      // console.log(this.table)

      this.initData();
      this.getFoods();
      axios
        .get(
          "https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined"
        )
        .then(item => {
          console.log(item.data);
          this.table = item.data;
        });
      this.list = this.$route.params.username;
    },
    methods: {
      initData(){
        axios.get('https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=').then(res=>{
          // console.log(res)
          if (res.data.status===1){
            this.count=res.data.count;
          } else {
            throw new Error('获取数据失败')
          }
        })
      },
      getFoods(){
        axios.get('https://elm.cangdu.org/shopping/v2/foods?offset=' + this.num + "&limit=20&restaurant_id=").then(res=>{
          // console.log(res)
          if (res.data.length>0){
            this.table=res.data
          }
        })
      },
      beforeMount () {
        axios.defaults.withCredentials=true;
      },
      queren(index,row) {
        let date={
          category_id: this.form.category_id,
          category_name: this.options.value,
          description: this.form.description,
          image_path: this.dialogImageUrl,
          index: 15,
          item_id: this.form.item_id,
          month_sales: this.form.month_sales,
          name: this.form.name,
          new_category_id: this.form.category_id,
          rating: this.form.rating,
          restaurant_address: this.form.restaurant_address,
          restaurant_id: this.form.restaurant_id,
          restaurant_name: this.form.restaurant_name,
          specfoods: this.form.specfoods,
          specs: [
            {
              specs:'',
              packing_fee:'',
              price:""
            }
          ],
          // category_id: this.arrlist.category_id,
          // category_name:this.options.value,
          // description: this.arrlist.description,
          // image_path:this.dialogImageUrl,
          // index: 15,
          // item_id: this.arrlist.item_id,
          // month_sales: this.arrlist.month_sales,
          // name: this.arrlist.name,
          // new_category_id: this.arrlist.category_id,
          // rating: this.arrlist.rating,
          // restaurant_address: this.arrlist.restaurant_address,
          // restaurant_id: this.arrlist.restaurant_id,
          // restaurant_name: this.arrlist.restaurant_name,
          // specfoods: [{}],
          // specs:[{
          //   specs:'',
          //   packing_fee:'',
          //   price:""
          // }],
        }
        this.dialogFormVisible = false;
        axios.post("https://elm.cangdu.org/shopping/v2/updatefood",date).then((item)=>{
          console.log(item)
        })
      },
      fun(row, rowIndex) {
        row.row.index = row.rowIndex;
      },
      paa(){
        let obj={
          date:this.patr.date1,
          name:this.patr.num,
          address:this.patr.num1
        }
        this.tableData.push(obj)
        this.paaaaaa = false;
      },
      fun(row,rowIndex){
        row.row.index=row.rowIndex
      },
      toggleRowExpansion(row, expanded) {
        axios
          .get(`https://elm.cangdu.org/shopping/restaurant/${row.restaurant_id}`)
          .then(item => {
            console.log(item);
            if (item.data !== "") {
              this.table[row.index].addname = item.data.name;
              this.table[row.index].add_address = item.data.address;
            }
            var obj = this.table[row.index];
            this.table.splice(row.index, 1, obj);
          });
        axios
          .get(`https://elm.cangdu.org/shopping/v2/menu/${row.category_id}`)
          .then(res => {
            console.log(res);

            this.table[row.index].fenlei = res.data.name;
            console.log(this.table[row.index]);

            var obj = this.table[row.index];
            this.table.splice(row.index, 1, obj);
          });
      },
      handleChange(value) {
        console.log(value);
      },
      handleAvatarSuccess(res, file) {
        console.log(res)
        console.log(file)
        // this.imageUrl = URL.createObjectURL(file.raw);
        this.dialogImageUrl= "https://elm.cangdu.org/img/" + res.image_path;
      },
      beforeAvatarUpload(file) {
        // console.log(file)
        const isJPG = file.type === "image/jpeg";
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error("上传头像图片只能是 JPG 格式!");
        }
        if (!isLt2M) {
          this.$message.error("上传头像图片大小不能超过 2MB!");
        }
        return isJPG && isLt2M;
      },
      handlePictureCardPreview(file) {
        this.dialogVisible = true;
      },
      handleRemove(file, fileList) {
        // console.log(file, fileList);
      },
      handleEdit(index, row) {
    console.log(row)
    this.dialogImageUrl = "https://elm.cangdu.org/img/" + row.image_path,
      // console.log(this.dialogImageUrl);
      this.form = {
        name: row.name,
        description:row.description,
        region: "",
        date1: "",
        date2: "",
        delivery: false,
        type: [],
        resource: "",
        desc: ""
      },

      this.dialogFormVisible = true;
    axios
      .get(
        `https://elm.cangdu.org/shopping/v2/menu?restaurant_id=${
          row.restaurant_id
          }&allMenu=true`
      )
      .then(item => {
        // console.log(item.data)
        this.options = item.data;
      });
  },
  handleDelete(index, row) {
    console.log(index, row);
    this.tableData.splice(index, 1);
  },
      handleSizeChange(val) {
        // console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        // console.log(`当前页: ${val}`);
        this.currentPage1=val;
        // console.log(val)
        this.num = (val - 1)*20;
        this.getFoods();
      },
  sub() {
    this.paaaaaa = true;
  },
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
  .guige {
    margin-left: 400px;
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
  .adada{
    margin-top: 20px;
    margin-left: -65px;
  }
  .aadd{
    /*margin-top: 20px;*/
    margin-left: -65px;
  }
</style>

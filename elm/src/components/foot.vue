<template>
  <div id="box1">
    <el-breadcrumb class="logiin" color="#00000" separator="/">
      <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>数据管理</el-breadcrumb-item>
      <el-breadcrumb-item>食品列表</el-breadcrumb-item>
    </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <el-table
      :data="table"
      @expand-change="expan"
      :expand-row-keys="expands"
      :row-key="row => row.index"
      :row-class-name="tableRowClassName"
      style="width: 100%">
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="食品名称">
              <span>{{ props.row.name }}</span>
            </el-form-item>
            <el-form-item label="食品ID">
              <span>{{ props.row.item_id }}</span>
            </el-form-item>
            <el-form-item label="食品介绍">
              <span>{{ props.row.description }}</span>
            </el-form-item>
            <el-form-item label="食品评分">
              <span>{{ props.row.rating }}</span>
            </el-form-item>
            <el-form-item label="月销量">
              <span>{{ props.row.month_sales }}</span>
            </el-form-item>
            <el-form-item label="餐馆名称">
              <span>{{ props.row.addname }}</span>
            </el-form-item>
            <el-form-item label="餐馆ID">
              <span>{{ props.row.restaurant_id}}</span>
            </el-form-item>
            <el-form-item label="餐馆地址">
              <span>{{ props.row.address }}</span>
            </el-form-item>
            <el-form-item label="食品分类">
              <span>{{ props.row.fenlei }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>
      <el-table-column label="食品名称" width="280" property="name">
      </el-table-column>
      <el-table-column label="食品介绍" width="340" property="description">
      </el-table-column>
      <el-table-column label="评分" width="320" property="rating">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="食品名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品介绍" :label-width="formLabelWidth">
                <el-input v-model="form.description" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="食品分类" :label-width="formLabelWidth">
                <el-select v-model="value" placeholder="请选择">
                  <el-option
                    v-for="item in names"
                    :key="item.value"
                    :label="item"
                    :value="item"></el-option>
                </el-select>
              </el-form-item>
              <div class="zhao">
                <el-form-item label="商铺图片" prop="region">
                  <el-upload
                    class="avatar-uploader"
                    action="https://elm.cangdu.org/v1/addimg/food/"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload">
                    <img v-if="imageUrl" :src="'https://elm.cangdu.org/img/'+imageUrl" class="avatar" />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
                </el-form-item>
              </div>
            </el-form>
            <el-table ref="singleTable" :data="tableData" highlight-current-row @current-change="handleCurrentChange" style="width: 100%; text-align: center" >
              <el-table-column property="date" label="规格" width="170"></el-table-column>
              <el-table-column property="name" label="包装费" width="170"></el-table-column>
              <el-table-column property="address" label="价格" width="170"></el-table-column>
              <el-table-column label="操作">
                <template slot-scope="scope">
                  <el-button size="mini" type="danger"  @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
            <div class="guige">
              <el-button type="primary" @click="sub()">添加规格</el-button>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="ok">确 定</el-button>
            </div>
          </el-dialog>
          <el-dialog title="添加规格" :visible.sync="dialogForm">
            <el-form :model="form">
              <el-form-item label="*规格" :label-width="formLabelWidth">
                <el-input v-model="form.namee" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="包装费" :label-width="formLabelWidth">
                <el-input-number v-model="shu" @change="handleChange" :min="1" :max="10" label="包装费"></el-input-number>
              </el-form-item>
              <el-form-item label="价格" :label-width="formLabelWidth">
                <el-input-number v-model="numm" @change="handleChange" :min="10" :max="100000" label="包装费"></el-input-number>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogForm = false">取 消</el-button>
              <el-button type="primary" @click="queding">确 定</el-button>
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
    </el-table>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page.sync="currentPage1"
        :page-size="100"
        background
        layout="total,prev, pager, next"
        :total="this.allnum"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
  import axios from "axios";
  export default {
    data() {
      return {
        allnum:0,
        srr:0,
        shu: 1,
        count:0,
        numm:1,
        tableData: [],
        currentRow: null,
        value: '',
        imageUrl: '',
        dialogVisible: false,
        table: [],
        list: "",
        currentPage1: 1,
        dialogForm:false,
        dialogTableVisible: false,
        dialogFormVisible: false,
        expands:[],
        form: {
          description:'',
          name:""
        },
        formLabelWidth: '120px',
        names: [
        ],
        selectedOptions: [],
        selectedOptions2: [],

      };
    },
    // components: {
    //   Header
    // },
    created() {
      this.initData();
      this.getFoods();
      axios.get("https://elm.cangdu.org/shopping/v2/foods?offset=0&limit=20&restaurant_id=undefined").then(item => {
        // console.log(item.data);
        this.table = item.data;
      });
      // console.log(this.table)
      this.list = this.$route.params.headername;
      this.name=this.$route.params.username;
      axios
        .get(
          `https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=undefined`
        )
        .then(res => {
          this.allnum = res.data.count;
          // console.log(res)
        });
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
      ok(){
        let data={
          category_id:this.form.category_id,
          category_name:this.value,
          description:this.form.description,
          image_path:this.imageUrl,
          index:this.form.index,
          item_id:this.form.item_id,
          month_sales:this.form.month_sales,
          name:this.form.name,
          new_category_id:this.form.category_id,
          rating:this.form.rating,
          restaurant_address:this.form.restaurant_address,
          restaurant_id:this.form.restaurant_id,
          restaurant_name:this.form.restaurant_name,
          specfoods:this.form.specfoods,
          specs:[{
            specs:'',
            packing_fee:'',
            price:""
          }]
          // category_id: 4641
          // category_name: "热销榜"
          // description: "4554"
          // image_path: "16a61cf85e133851.jpg"
          // index: 18
          // item_id: 2400
          // month_sales: 81
          // name: "牛肉面"
          // new_category_id: 4646
          // rating: 4.1
          // restaurant_address: "福建省福州市马尾区登龙路"
          // restaurant_id: 5053
          // restaurant_name: "福州阳光来一碗"
          // specfoods: [{specs_name: "默认", name: "牛肉面", item_id: 2400, sku_id: 8199, food_id: 8198, restaurant_id: 5053,…}]
          // specs: [{specs: "默认", packing_fee: 0, price: 14}
        };
        axios.post("https://elm.cangdu.org/shopping/v2/updatefood",data).then(res=>{
          console.log(res.data)

          if(res.data.status===1 ){
            this.dialogFormVisible = false;
            this.$message({
              type:"success",
              message:'修改成功'
            })
          }else{
            this.$message({
              type:"error",
              message:res.data.message
            })
          }
        })
      },
      queding(){
        let obj={};
        obj.date=this.form.namee;
        obj.name=this.shu;
        obj.address=this.numm;
        this.tableData.push(obj);
        this.dialogForm=false
      },
      handleChange(value) {
        console.log(value);
      },
      sub(){
        this.dialogForm=true

      },
      handleAvatarSuccess(res, file) {
        if(res.status==1){
          this.imageUrl=res.image_path
        }

      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 20;

        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 20MB!');
        }
        return isJPG && isLt2M;
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true
        this.form.category_id=row.category_id
        this.form.name=row.name
        this.form.image_path=row.image_path
        this.form.index=row.index
        this.form.item_id=row.item_id
        this.form.month_sales=row.month_sales
        this.form.rating=row.rating
        console.log(row);
        this.category_id = row.category_id;
        this.form.description = row.description;
        this.imageUrl =row.image_path;
        this.form.specfoods=row.specfoods
// this.from=row
        this.dialogFormVisible = true;

        // console.log( this. imageUrl);
        this.axios.get('https://elm.cangdu.org/shopping/v2/menu?restaurant_id='+row.restaurant_id+'&allMenu=true').then((res)=>{
          for(let i=0;i<res.data.length;i++){
            this.names.push(res.data[i].name)
          }
          // console.log(this.names)
        })
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1)
      },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.srr = val - 1;
        console.log(this.srr);
        axios
          .get("https://elm.cangdu.org/shopping/v2/foods?offset" + "=" + this.srr * 20 + "&limit=20&restaurant_id=undefined").then(item => {
          console.log(item.data);
          this.table = item.data;
        });
      },
      tableRowClassName({ row, rowIndex }) {
        //把index放到row里
        row.index = rowIndex;
      },
      expan(row){
        this.axios
          .get('https://elm.cangdu.org/shopping/v2/menu/'+row.category_id)
          .then(res=>{
            this.table[row.index].fenlei=res.data.name
            var obj=this.table[row.index]
            this.table.splice(row.index,1,obj)
          })
        this.axios
          .get('https://elm.cangdu.org/shopping/restaurant/'+row.restaurant_id)
          .then(res=>{
            this.table[row.index].address=res.data.address
            this.table[row.index].addname=res.data.name
            var obj=this.table[row.index]
            this.table.splice(row.index,1,obj)
            console.log(res.data)
          })
      }
    }
  };
</script>
<style>
  #box1 {
    width: 100%;
    height: 100%;
    overflow: auto;
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
  .zhao{
    margin-left: 50px;
  }
  .img{
    height: 40px;
    width: 40px;
    position: absolute;
    right:30px;
    top:10px;
    border-radius: 50%;
  }
  .logiin{
    width:100%;
    height:60px;
    background: #EFF2F7;
    line-height:60px;
    font-size:15px;
    padding-left:15px;
    color: silver;
  }
  .guige{
    margin:20px 320px;
  }
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
</style>

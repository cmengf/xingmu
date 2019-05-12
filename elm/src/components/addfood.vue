<template>
  <div id="right">
    <div class="home">
      <el-breadcrumb
        separator="/"
        style="height:50px;line-height:50px;text-indent:10px;"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
        ><a href="javascript:;">添加数据</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>添加商品</el-breadcrumb-item>
      </el-breadcrumb>
      <img src="https://elm.cangdu.org/img/default.jpg" />
    </div>
    <div class="tianjia">
      <h4>选择食品种类</h4>
      <div class="from">
        <span style="padding-left:40px;padding-right:10px;font-size:13px;padding-top:15px;" >食品种类</span>
        <el-select v-model="value" placeholder="请选择"
                   @change="idid(value)"
                   style="width:500px;height:35px;margin-top:10px">
          <el-option
            style="z-index=1;"
            v-for="item in options"
            :key="item.value"
            :label="item.name"
            :value="item.name">
          </el-option>
        </el-select>
      </div>
      <el-collapse-transition>
        <div v-show="show3">
          <div class="transition-box from1">
            <el-form  label-width="80px" :model="formLabelAlign"  style='margin-left:30px;'>
              <el-form-item label="食品种类">
                <el-input v-model="formLabelAlign.name" style="width:500px;"></el-input>
              </el-form-item>
              <el-form-item label="种类描述">
                <el-input v-model="formLabelAlign.region" style="width:500px;"> </el-input>
              </el-form-item>
              <el-row>
                <el-button type="primary" @click="onSubmit" style="margin-left:130px;margin-bottom:20px;">提交</el-button>
              </el-row>
            </el-form>
          </div>
        </div>
      </el-collapse-transition>
      <div class="">  </div>
      <div class="from2" style="width：100;height:40px;text-align:center;line-height:40px;font-size:13px;color:gray;margin-bottom:5px;">
        <el-button style="background: white;
          border:none;" @click="show3 = !show3" class="bbb">
          <i class="el-icon-caret-top edit_icon"></i>
          添加食品种类
        </el-button></div>
    </div>
    <div class='meau'>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
        <h4>添加食品</h4>
        <el-form-item label="食品名称" prop="name" >
          <el-input v-model="ruleForm.name" ></el-input>
        </el-form-item>

        <el-form-item label="食品活动" prop="pro">
          <el-input v-model="ruleForm.pro"></el-input>
        </el-form-item>
        <el-form-item label="食品详情" prop="chian">
          <el-input v-model="ruleForm.chian"></el-input>
        </el-form-item>
        <el-form-item label="上传商品图片" prop="region">
          <el-upload
            class="avatar-uploader"
            :action="'https://elm.cangdu.org/v1/addimg/shop'"
            list-type="picture-card"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              width="100%"
              v-if="imageUrl"
              :src="'https://elm.cangdu.org/img/' + imageUrl"
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="食品特点" :label-width="formLabelWidth">
          <el-select v-model="value1"
                     multiple
                     filterable
                     allow-create
                     default-first-option
                     placeholder="热销榜">
            <el-option
              v-for="item in b"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <div></div>
        <el-form-item label="食品规格" prop="region">
          <el-radio v-model="radio" label="1" @change="dan"> 单规格</el-radio>
          <el-radio v-model="radio" label="2" @change="duo">多规格</el-radio>
        </el-form-item>
        <div v-show='show'>
          <el-form-item label="包装费" prop="region">
            <el-input-number v-model="num" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
          <el-form-item label="价格" prop="region">
            <el-input-number v-model="num1" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
          </el-form-item>
        </div>
        <div v-show='!show'>
          <el-form-item>
            <el-button type="primary" @click="onSubmit, (innerVisible = true)">
              添加规格
            </el-button>
          </el-form-item>

          <el-table :data="list" style="width: 100%">
            <el-table-column prop="detail" label="规格" width="120">
            </el-table-column>
            <el-table-column label="包装费" prop="num" width="120">
            </el-table-column>
            <el-table-column label="价格" prop="num1" width="120">
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
          <el-dialog
            width="45%"
            title="添加规格"
            :visible.sync="innerVisible"
            append-to-body
          >
            <div class="main">
              <el-form
                :data="tableData"
                :model="ruleForm"
                :rules="rules"
                ref="ruleForm"
                label-width="100px"
                class="demo-ruleForm"
              >
                <el-form-item label="规格" prop="detail">
                  <el-input v-model="ruleForm.detail"></el-input>
                </el-form-item>
                <el-form-item label="包装费" prop="region">
                  <el-input-number
                    v-model="num"
                    :min="1"
                    :max="100"
                    label="描述文字"
                  ></el-input-number>
                </el-form-item>
                <el-form-item label="价格" prop="region">
                  <el-input-number
                    v-model="num1"
                    :min="1"
                    :max="100"
                    label="描述文字"
                  ></el-input-number>
                </el-form-item>
              </el-form>
            </div>
            <div slot="footer" class="dialog-footer">
              <el-button @click="innerVisible = false">取 消</el-button>
              <el-button type="primary" @click="add">确定</el-button>
            </div>
          </el-dialog>
        </div>
        <el-form-item>
          <el-button type="primary" @click="onSubmit1">确认添加商品</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
  </div>
</template>
<script>
  import axios from 'axios'
  export default {
    data() {
      return {
        show3:false,
        show:true,
        value:'',
        idId:null,
        value1:[],
        formLabelWidth: "120px",
        radio: '1',
        imageUrl: '',
        tableData: [

        ],
        dialogVisible:true,
        innerVisible: false,
        outerVisible: false,
        list: [
          {
            detail: "默认",
            num: 0,
            num1: 20
          }
        ],
        num: 5,
        num1:20,
        chian:'',
        pro:'',
        b:[
          {
            value: '新品',
            label: '新品'
          }, {
            value: '招牌',
            label: '招牌'
          }
        ],
        options: [],
        ruleForm: {
          name: '',
          region: '',
        },
          formLabelAlign: {
          name: '',
          region: '',
          type: ''
        },
        rules: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
        }
      };
    },
    methods: {
      dan(){
        //   alert(2)
        this.show=true
      },
      duo(){
        //   alert(1)
        this.show=!true
      },
      handleChange(value) {
        console.log(value);
      },
      handleAvatarSuccess(res, file) {
        // console.log(res)
        if (res.status === 1) {
          this.imageUrl = res.image_path;
        }else {
          this.$message.error("上传图片失败");
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');1
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      idid(value){
        console.log(value)
        for(var a=0;a<this.options.length;a++){
          if(this.options[a].name===value){
            this.idId=this.options[a].id
          }
        }


      },
      onSubmit(){
        let a={
          description:this.formLabelAlign.region,
          name:this.formLabelAlign.name,
          restaurant_id:this.$route.query.restaurant_id
        }
        axios.post('https://elm.cangdu.org/shopping/addcategory',a).then((res)=>{
          if(success===''){
            this.$message({
              message: '添加成功',
              type: 'success'
            });
          }else {
            this.$message({
              message: '必须填写食品类型名称',
              type: 'warning'
            });
          }
        })
        console.log(this.options)
      },
      onSubmit1(){
        let b={
          activity: this.ruleForm.pro,
          attributes: this.b,
          category_id:this.idId,
          description:this.ruleForm.chian,
          image_path:this.imageUrl,
          name:this.ruleForm.name,
          restaurant_id: this.$route.query.restaurant_id,
          specs:this.list
        }
        axios.post('https://elm.cangdu.org/shopping/addfood',b).then((res)=> {

        })
      },
      add() {
        this.innerVisible = false;
        let obj = {
          detail: this.ruleForm.detail,
          num: this.num,
          num1: this.num1
        };
        if (obj.detail !=="") {
          this.list.push(obj);
        }
        console.log(this.list);
      },
      handleDelete(index) {
        this.list.splice(index, 1);
      },
    },
    mounted () {
      axios.get('https://elm.cangdu.org/shopping/getcategory/'+this.$route.query.restaurant_id).then((res)=>{
        if(res.data.status===1){
          console.log(res.data.category_list)
          this.options=res.data.category_list
        }

      })
      if(this.$route.query.restaurant_id){
        // this.dialogVisible=false
          console.log(this.$route.query.restaurant_id)

      }else{
        this.$alert('添加食品需要选择一个商铺，请先去选择一个商铺', '提示', {
        confirmButtonText: '确定',
        callback: action => {

          this.$router.push({ path: '/shangjia'})

        }
      });

      }
    }
  }
</script>

<style lang='scss'>
  #right {
    width: 100%;
    height: 100%;
    overflow: auto;
    .home {
      font-size: 10px;
      width: 100%;
      height: 50px;
      background: #eff2f7;
      line-height: 50px;
      img {
        height: 40px;
        width: 40px;
        position: absolute;
        right: 10px;
        top: 5px;
        border-radius: 50%;
      }
    }
  }

  .tianjia{
    margin-left:150px;
    width:800px;
    border:1px solid #ccc;
    border-radius: 5px;
    .from{
      width:100%;
      height:80px;
      //   line-height:50px;
      //   border:1px solid red;
    }
    .from1{
      background: #F9FAFC;
      //   border:1px solid red;
    }
    .from2:hover{
      background:#F9FAFC;
      color: lightblue;

    }
    .bbb{
      background: #F9FAFC;
    }
  }
  .meau{
    margin-left:150px;
    margin-top: 50px;
    width:800px;
    border:1px solid #ccc;
    border-radius: 5px;
  }
</style>


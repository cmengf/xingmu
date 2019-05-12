<template>
  <div id="box1">
      <el-breadcrumb class="login" color="#00000" separator="/">
        <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>添加数据</el-breadcrumb-item>
        <el-breadcrumb-item>添加商铺</el-breadcrumb-item>
      </el-breadcrumb>
    <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      <el-form-item label="店铺名称" prop="name" >
        <el-input v-model="ruleForm.name" ></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-select
          class="pp"
          v-model="value"
          filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading">
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.address"
            :value="item.address">
          </el-option>
        </el-select>
        <p class="p">当前城市：北京</p>
      </el-form-item>
      <el-form-item label="联系电话" prop="phone">
        <el-input v-model="ruleForm.phone"></el-input>
      </el-form-item>
      <el-form-item label="店铺简介" prop="pro">
        <el-input v-model="ruleForm.pro"></el-input>
      </el-form-item>
      <el-form-item label="店铺标语" prop="chian">
        <el-input v-model="ruleForm.chian"></el-input>
      </el-form-item>
      <el-form-item label="店铺分类">
        <el-cascader
          class="ppp"
          :options="option"
          v-model="selectedOptions"
          :props="defaultParams"
          ref="cascaderAddr"
        ></el-cascader>
      </el-form-item>
      <div></div>
      <el-form-item label="店铺特点" prop="region">
        <el-form-item class="ii" label="品牌保证" prop="delivery" style="display:inline-block">
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="蜂鸟专送" prop="song"style="display:inline-block">
          <el-switch v-model="ruleForm.song"></el-switch>
        </el-form-item>
        <el-form-item label="新开店铺" prop="xin"style="width:10px;display:inline-block">
          <el-switch v-model="ruleForm.xin"></el-switch>
        </el-form-item>
        <br>
        <el-form-item class="ii" label="外卖保" prop="bao"style="display:inline-block">
          <el-switch v-model="ruleForm.bao"></el-switch>
        </el-form-item>
        <el-form-item label="准时达" prop="da"style="display:inline-block">
          <el-switch v-model="ruleForm.da"></el-switch>
        </el-form-item>
        <el-form-item label="开发票" prop="piao"style="width:10px;display:inline-block">
          <el-switch v-model="ruleForm.piao"></el-switch>
        </el-form-item>
      </el-form-item>
      <el-form-item label="配送费" prop="region">
        <el-input-number v-model="num" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="起送价" prop="region">
        <el-input-number v-model="num1" @change="handleChange" :min="1" :max="100" label="描述文字"></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间" required>
        <el-time-select
          v-model="value1" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="起始时间">
        </el-time-select>
        <el-time-select
          v-model="value2" :picker-options="{start: '08:30',step: '00:15',end: '18:30'}" placeholder="结束时间">
        </el-time-select>
      </el-form-item>

      <el-form-item label="上传店铺头像" prop="region">
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
            v-if="imageUr1"
            :src="'https://elm.cangdu.org/img/' + imageUr1"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item label="上传营业执照" prop="region">
        <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img
            width="100%"
            v-if="imageUr11"
            :src="'https://elm.cangdu.org/img/' + imageUr11"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证" prop="region">
        <el-upload
          class="avatar-uploader"
          :action="'https://elm.cangdu.org/v1/addimg/shop'"
          list-type="picture-card"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <img
            width="100%"
            v-if="imageUr12"
            :src="'https://elm.cangdu.org/img/' + imageUr12"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>



      <el-form-item label="优惠活动" prop="region"  >
        <el-select v-model="ruleForm.region" placeholder="满减优惠" @change="up()" class="ppp">
          <el-option  label="满减优惠" value="yh"></el-option>
          <el-option label="优惠大酬宾"  value="cb"></el-option>
          <el-option label="新用户立减"  value="xyh"></el-option>
          <el-option label="进店领券"  value="lj"></el-option>
        </el-select>
      </el-form-item>
      <el-table-column label="活动详情" width="100">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.detail }}</span>
        </template>
      </el-table-column>
      <el-table
        :data="pass"
        style="width: 800px;" >
        <el-table-column
          label="活动标题"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column
          label="活动名称"
          width="200">
            <template slot-scope="scope">
              <span style="margin-left: 10px">{{ scope.row.name }}</span>
            </template>
        </el-table-column>
        <el-table-column
          label="活动详情"
          width="200">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.detail}}</span>
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button
              size="mini"
              type="danger"
              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
  import Axios from 'axios'
  export default {
    data() {
      return {
        option:'',
        pass:[],
        selectedOptions: [260,260],
        defaultParams: {
          label: 'name',
          value: 'id',
          children: 'sub_categories'
        },
        value1:'',
        value2:'',
        options: [],
        value: null,
        list: [],
        loading: false,
        states: [],
        iteminfo:[],
        tableData: [
          {
            title:'减',
            name:'满减优惠',
            detail:'满30减5，满60减8'
          }
        ],
        num: 5,
        num1:20,
        imageUr1: '',
        imageUr11: '',
        imageUr12: '',
        dialogVisible: false,
        ruleForm: {
          name: '',
          region: '',
          phone:'',
          address:'',
          date1: '',
          date2: '',
          delivery: true,
          song:true,
          xin:true,
          bao:true,
          da:true,
          piao:true,
          type: [],
          resource: '',
          desc: ''
        },
        dialogTableVisible: false,
        dialogFormVisible: false,
        form: {
          name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
        formLabelWidth: '120px',
        rules: {
          name: [
            { required: true, message: '请输入店铺名称', trigger: 'blur' },
            { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
          ],
          address:[
            { required: true, message: '请输入详细地址',}
          ],
          phone:[
            { required: true, message: '请输入联系电话',}
          ],
          date1: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          date2: [
            { type: 'date', required: true, message: '请选择时间', trigger: 'change' }
          ],
          type: [
            { type: 'array', required: true, message: '请至少选择一个活动性质', trigger: 'change' }
          ],
          resource: [
            { required: true, message: '请选择活动资源', trigger: 'change' }
          ],
          desc: [
            { required: true, message: '请填写活动形式', trigger: 'blur' }
          ]
        }
      };
    },
    // created:在模板渲染成html前调用，即通常初始化某些属性值，然后再渲染成视图。
    // mounted:在模板渲染成html后调用，通常是初始化页面完成后，再对html的dom节点进行一些需要的操作。
    created(){
      Axios.get('https://elm.cangdu.org/shopping/v2/restaurant/category').then((res)=>{
        // console.log(res.data)
        this.option=res.data
      })
    },
    methods: {
      handleChange(value) {
        console.log(value);
      },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(file) {
        this.imageUr1 = file.url;
        this.dialogVisible = true;
      },
      up() {
        this.$prompt("请输入详情活动", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消"
        })
          .then(({ value }) => {
            if (this.ruleForm.region === "满减优惠") {
              let obj = {};
              obj.title = "减";
              obj.name = this.ruleForm.region;
              obj.detail = value;
              this.pass.push(obj);
            } else if (this.ruleForm.region === "优惠大酬宾") {
              let obj = {};
              obj.title = "特";
              obj.name = this.ruleForm.region;
              obj.detail = value;
              this.pass.push(obj);
            } else if (this.ruleForm.region === "新用户立减") {
              let obj = {};
              obj.title = "新";
              obj.name = this.ruleForm.region;
              obj.detail = value;
              this.pass.push(obj);
            } else if (this.ruleForm.region === "进店领券") {
              let obj = {};
              obj.title = "领";
              obj.name = this.ruleForm.region;

              3
              obj.detail = value;
              this.pass.push(obj);
            }
            console.log(this.pass);
          })
          .catch(() => {
            this.$message({
              type: "info",
              message: "取消输入"
            });
          });
      },
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      },
      handleDelete(index, row) {
        console.log(index, row);
        this.tableData.splice(index,1)
      },
      onSubmit() {
        let data = {
          activities: this.tableData,
          address: this.value,
          bao: this.ruleForm.bao,
          business_license_image: this.imageUr11,
          category: this.$refs["cascaderAddr"].currentLabels,
          catering_service_license_image: this.imageUr1,
          delivery_mode: this.ruleForm.deliver,
          description: this.ruleForm.title,
          endTime: this.endTime,
          float_delivery_fee: this.numm,
          float_minimum_order_amount: this.nummm,
          image_path: this.imageUr12,
          is_premium: this.ruleForm.delivery,
          latitude: " 39.8087",
          longitude: "116.16191",
          name: this.ruleForm.name,
          new: this.ruleForm.da,
          phone: this.ruleForm.phone,
          piao: this.ruleForm.del,
          promotion_info: this.ruleForm.biao,
          startTime: this.startTime,
          zhun: this.ruleForm.deli
        };
        Axios.post("https://elm.cangdu.org/shopping/addShop", data).then(item => {
          console.log(item);
        });
      },
      handleAvatarSuccess(res, file) {
        // console.log(res)
        if (res.status == 1) {
          this.imageUr1 = res.image_path;
        }else {
          this.$message.error("上传图片失败");
        }
      },
      handleAvatarSuccess1(res, file) {
        // console.log(res)
        if (res.status == 1) {
          this.imageUr11 = res.image_path;
        }else {
          this.$message.error("上传图片失败");
        }
      },
      handleAvatarSuccess2(res, file) {
        // console.log(res)
        if (res.status == 1) {
          this.imageUr12 = res.image_path;
        }else {
          this.$message.error("上传图片失败");
        }
      },
      beforeAvatarUpload(file) {
        const isJPG = file.type === 'image/jpeg';
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isJPG) {
          this.$message.error('上传头像图片只能是 JPG 格式!');
        }
        if (!isLt2M) {
          this.$message.error('上传头像图片大小不能超过 2MB!');
        }
        return isJPG && isLt2M;
      },
      remoteMethod(value) {
        Axios.get('https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword=undefined&keyword='+value).then((res)=>{
          let options=res.data
          this.options=res.data
        })
        if (value !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(value.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
      }
    },
    mounted() {
      this.list = this.states.map(item => {
        return { value: item, label: item };
      });
      Axios
        .get(
          "https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword=%E5%8C%97%E4%BA%AC"
        )
        .then(item => {
          this.list = item.data;
        });
    },

  }
</script>
<style lang='scss' scoped>
  #box1 {
    background: white;
    width: 100%;
    height: 100%;
    margin-left:10px;
    .login{
      width:100%;
      height:60px;
      background: #EFF2F7;
      line-height:60px;
      font-size:15px;
      padding-left:15px;
      margin-left: -10px;
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
    .demo-ruleForm{
      width:70%;
      text-align: center;
      margin-left:200px;
      margin-top:50px;
    }
  }
.p{
  font-size: 15px;
  margin-left: -85%;

}
  .pp{
    width:100%;
  }
  .ppp{
    width:60%;
    margin-left: -40%;
  }
  .ii{
    margin-left: -60%;
  }

</style>

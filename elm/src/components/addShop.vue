<template>
  <div id="box1">
    <div class="home">
      <el-breadcrumb
        separator="/"
        style="height:50px;line-height:50px;text-indent:10px;"
      >
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item
          ><a href="javascript:;">添加数据</a></el-breadcrumb-item
        >
        <el-breadcrumb-item>添加店铺</el-breadcrumb-item>
      </el-breadcrumb>
      <img src="https://elm.cangdu.org/img/default.jpg" />
    </div>

    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="店铺名称" prop="name">
        <el-input v-model="ruleForm.name"></el-input>
      </el-form-item>
      <el-form-item label="详细地址">
        <el-select
          v-model="value"
            filterable
          remote
          reserve-keyword
          placeholder="请输入关键词"
          :remote-method="remoteMethod"
          :loading="loading"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.address"
            :value="item.address"
          >
          </el-option>
        </el-select>
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
          :options="option"
          v-model="selectedOptions"
          :props="defaultParams"
          ref="cascaderAddr"
        ></el-cascader>
      </el-form-item>
      <el-form-item label="店铺特点" prop="region">
        <el-form-item
          label="品牌保证"
          prop="delivery"
          style="display:inline-block"
        >
          <el-switch v-model="ruleForm.delivery"></el-switch>
        </el-form-item>
        <el-form-item label="蜂鸟专送" prop="song" style="display:inline-block">
          <el-switch v-model="ruleForm.song"></el-switch>
        </el-form-item>
        <el-form-item40
          label="新开店铺"
          prop="xin"
          style="width:10px;display:inline-block"
        >
          <el-switch v-model="ruleForm.xin"></el-switch>
        </el-form-item40>
        <el-form-item label="外卖保" prop="bao" style="display:inline-block">
          <el-switch v-model="ruleForm.bao"></el-switch>
        </el-form-item>
        <el-form-item label="准时达" prop="da" style="display:inline-block">
          <el-switch v-model="ruleForm.da"></el-switch>
        </el-form-item>
        <el-form-item
          label="开发票"
          prop="piao"
          style="width:10px;display:inline-block"
        >
          <el-switch v-model="ruleForm.piao"></el-switch>
        </el-form-item>
      </el-form-item>
      <el-form-item label="配送费" prop="region">
        <el-input-number
          v-model="num"
          @change="handleChange"
          :min="1"
          :max="100"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="起送价" prop="region">
        <el-input-number
          v-model="num1"
          @change="handleChange"
          :min="1"
          :max="100"
          label="描述文字"
        ></el-input-number>
      </el-form-item>
      <el-form-item label="营业时间" required>
        <el-time-select
          placeholder="起始时间"
          v-model="startTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30'
          }"
        >
        </el-time-select>
        <el-time-select
          class="shi1"
          placeholder="结束时间"
          v-model="endTime"
          :picker-options="{
            start: '08:30',
            step: '00:15',
            end: '18:30',
            minTime: startTime
          }"
        >
        </el-time-select> </el-form-item>


      <el-form-item label="上传店铺头像" prop="region"  >
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="dialogImageUrl"
            :src="'https://elm.cangdu.org/img/' + dialogImageUrl"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>

        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="上传营业执照" prop="region">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess1"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="dialogImageUrl1"
            :src="'https://elm.cangdu.org/img/' + dialogImageUrl1"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>
      <el-form-item label="上传餐饮服务许可证" prop="region">
        <el-upload
          class="avatar-uploader"
          action="https://elm.cangdu.org/v1/addimg/shop"
          :show-file-list="false"
          :on-success="handleAvatarSuccess2"
          :before-upload="beforeAvatarUpload"
        >
          <img
            v-if="dialogImageUrl2"
            :src="'https://elm.cangdu.org/img/' + dialogImageUrl2"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="" />
        </el-dialog>
      </el-form-item>



      <el-form-item label="优惠活动" prop="region">
        <el-select
          v-model="ruleForm.region"
          placeholder="满减优惠"
          @change="open()"
        >
          <el-option label="满减优惠" value="满减优惠"></el-option>
          <el-option label="优惠大酬宾" value="优惠大酬宾"></el-option>
          <el-option label="新用户立减" value="新用户立减"></el-option>
          <el-option label="进店领券" value="进店领券"></el-option>
        </el-select>
      </el-form-item>
      <el-table :data="pass" style="width: 100%">
        <el-table-column label="活动标题" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.title }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动名称" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.name }}</span>
          </template>
        </el-table-column>
        <el-table-column label="活动详情" width="100">
          <template slot-scope="scope">
            <span style="margin-left: 10px">{{ scope.row.detail }}</span>
          </template>
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

      <el-form-item>
        <el-button type="primary" @click="onSubmit()">立即创建</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import axios from "axios";
export default {
  data() {
    return {
      startTime: "",
      endTime: "",
      options: [],
      value: null,
      pass: [],
      loading: false,
      // tableData: [],
      num: 5,
      num1: 20,
      dialogImageUrl: "",
      dialogImageUrl1: "",
      dialogImageUrl2: "",
      dialogVisible: false,
      states: [],
      ruleForm: {
        name: "",
        region: "",
        phone: "",
        address: "",
        date1: "",
        date2: "",
        delivery: true,
        song: true,
        xin: true,
        bao: true,
        da: true,
        piao: true,
        type: [],
        resource: "",
        desc: ""
      },
      option: [],
      selectedOptions: [260, 260],
      selectedOptions2: [],
      defaultParams: {
        label: "name",
        value: "id",
        children: "sub_categories"
      },
      rules: {
        name: [
          { required: true, message: "请输入店铺名称", trigger: "blur" },
          { min: 3, max: 5, message: "长度在 3 到 5 个字符", trigger: "blur" }
        ],
        address: [{ required: true, message: "请输入详细地址" }],
        phone: [{ required: true, message: "请输入联系电话" }],
        date1: [
          {
            type: "date",
            required: true,
            message: "请选择日期",
            trigger: "change"
          }
        ],
        date2: [
          {
            type: "date",
            required: true,
            message: "请选择时间",
            trigger: "change"
          }
        ],
        type: [
          {
            type: "array",
            required: true,
            message: "请至少选择一个活动性质",
            trigger: "change"
          }
        ],
        resource: [
          { required: true, message: "请选择活动资源", trigger: "change" }
        ],
        desc: [{ required: true, message: "请填写活动形式", trigger: "blur" }]
      },
    };
  },
  created() {
    axios
      .get("https://elm.cangdu.org/shopping/v2/restaurant/category")
      .then(res => {
        // console.log(res.data)
        this.option = res.data;
      });
  },
  mounted() {
    axios
      .get(
        "https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword=%E5%8C%97%E4%BA%AC"
      )
      .then(item => {
        this.list = item.data;
      });

    this.list = this.states.map(item => {
      return { value: item, label: item };
    });
  },
  methods: {
    handleDelete(index) {
      this.list.splice(index, 1);
    },
    handleAvatarSuccess(res, file) {
      console.log(res);
      if (res.status == 1) {
        this.dialogImageUrl = res.image_path;
      } else {
        this.$message.error("上传图片失败");
      }
    },
    handleAvatarSuccess1(res, file) {
      console.log(res);
      if (res.status == 1) {
        this.dialogImageUrl1 = res.image_path;
      } else {
        this.$message.error("上传图片失败");
      }
    },
    handleAvatarSuccess2(res, file) {
      console.log(res);
      if (res.status == 1) {
        this.dialogImageUrl2 = res.image_path;
      } else {
        this.$message.error("上传图片失败");
      }
    },
    beforeAvatarUpload(file) {
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
    //  Axios.get('')
    handleChange(value) {
      console.log(value);
    },
    open() {
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
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url;
      this.dialogVisible = true;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          alert("submit!");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
    },
    onSubmit() {
      let data = {
        activities: this.pass,
        address: this.value,
        bao: this.ruleForm.bao,
        business_license_image: this.dialogImageUrl1,
        category: this.$refs["cascaderAddr"].currentLabels,
        catering_service_license_image: this.dialogImageUrl,
        delivery_mode: this.ruleForm.deliver,
        description: this.ruleForm.title,
        endTime: this.endTime,
        float_delivery_fee: this.numm,
        float_minimum_order_amount: this.nummm,
        image_path: this.dialogImageUrl2,
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
      axios.post("https://elm.cangdu.org/shopping/addShop", data).then(item => {
        console.log(item);
      });
    },
    remoteMethod(query) {
      if (query !== "") {
        this.loading = true;
        setTimeout(() => {
          this.loading = false;
          this.options = this.list.filter(item => {
            return item.label.toLowerCase().indexOf(query.toLowerCase()) > -1;
          });
        }, 200);
      } else {
        this.options = [];
      }
      axios
        .get(
          "https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword=" +
            query
        )
        .then(item => {
          console.log(item.data);
          this.options = item.data;
        });
    }
  }
};
</script>
<style lang='scss' scoped>
#box1 {
  background: white;
  width: 100%;
  height: 100%;
  margin-left: 10px;
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
  .demo-ruleForm {
    width: 500px;
    text-align: center;
    margin-left: 200px;
    margin-top: 50px;
  }
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
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
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

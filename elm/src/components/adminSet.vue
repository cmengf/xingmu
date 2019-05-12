<template>
      <div id="right">
        <el-breadcrumb class="login" color="#00000" separator="/">
          <el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>设置</el-breadcrumb-item>
          <el-breadcrumb-item>管理员设置</el-breadcrumb-item>
        </el-breadcrumb>
        <router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>
    <div class='box'>
        <h3>管理员信息</h3>
            <ul :data="list">
              <li>
                <span>姓名：</span>
                <span>{{list.user_name}}</span>
              </li>
              <li>
                <span>注册时间：</span>
                <span>{{list.create_time}}</span>
              </li>
              <li>
                <span>管理员权限：</span>
                <span>{{list.admin}}</span>
              </li>
              <li>
                <span>管理员ID：</span>
                <span>{{list.id}}</span>
              </li>
              <li>
                <span>更换头像：</span><br>
                  <el-upload
                    class="avatar-uploader"
                    :action="'https://elm.cangdu.org/admin/update/avatar/'+this.list.id"
                    list-type="picture-card"
                    :show-file-list="false"
                    :on-success="handleAvatarSuccess"
                    :before-upload="beforeAvatarUpload"
                    >
                    <img
                      width="100%"
                      v-if="list.avatar"
                      :src="'https://elm.cangdu.org/img/' + list.avatar"
                      class="avatar"
                    />
                    <i v-else class="el-icon-plus avatar-uploader-icon"></i>
                  </el-upload>
              </li>
            </ul>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
        list:[],
        avatar:''
    }
  },
  methods: {
    handleAvatarSuccess(res, file) {
        // console.log(res)
        if (res.status == 1) {
          this.list.avatar = res.image_path;
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
  },
  beforeMount () {
    axios.defaults.withCredentials=true;
  },
  mounted() {
    axios.get('https://elm.cangdu.org/admin/info').then((res)=>{
      this.list=res.data.data
      console.log(this.list)
    })
  },
}
</script>

<style lang='scss'>
 #right {
  width: 100%;
  height: 100%;
  overflow: auto;
}
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
.box{
  width: 100%;
  height: 100%;
  margin: 0px 200px;
  h3{
    margin: 20px 300px;
  }
    ul{
      width: 700px;
      height: 480px;
      list-style: none;
      line-height: 50px;
      background: whitesmoke;
      li{
        margin: 15px 10px;
      }
    }

}
</style>

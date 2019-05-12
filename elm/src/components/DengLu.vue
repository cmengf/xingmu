<template>
  <div class="login">
    <div class="content">
      <transition name="fade" mode="in-out">
        <section class="form_contianer" v-show="showLogin">
          <h1>elm后台管理系统</h1>
          <div class="con">
            <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="6px" class="demo-ruleForm">
              <el-form-item  prop="uname">
                <el-input v-model.number="ruleForm.uname" placeholder="用户名"></el-input>
              </el-form-item>
              <el-form-item  prop="pass">
                <el-input type="password" v-model="ruleForm.pass" placeholder="密码" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              </el-form-item>
            </el-form>
            <div class="red">
              <p>温馨提示:</p>
              <p>未登陆过的新用户，自动注册</p>
              <p>注册过的用户可凭账号密码登录</p>
            </div>
          </div>
        </section>
      </transition>
    </div>
  </div>
</template>


<script>
  import { mapMutations } from 'vuex'
  export default {
    data() {
      var validatePass = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          if (this.ruleForm.checkPass !== '') {
            this.$refs.ruleForm.validateField('checkPass');
          }
          callback();
        }
      };
      var validateUname= (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        }
        else {
          callback();
        }
      };
      return {
        ruleForm: {
          pass: '',
          uname: ''
        },
        rules: {
          pass: [
            { validator: validatePass, trigger: 'blur' }
          ],
          uname: [
            { validator: validateUname, trigger: 'blur' }
          ],
        },
        showLogin:false
      };
    },
    mounted(){
      this.showLogin=true
    },
    beforeRouteEnter(to, from, next){
      next((vm)=>{
        console.log(vm.$store.state.adminInfo.login)
        if(vm.$store.state.adminInfo.login){
          next("/List")
        }else{
          next("/")
        }
      })
    },
    methods: {
      ...mapMutations(["saveAdminInfo"]),
      setCookie(name, value, day) {
        var exp = new Date();
        exp.setDate(exp.getDate() + day);
        document.cookie =
          name + "=" + unescape(value) + ";expires=" + exp.toGMTString();
      },

      submitForm(formName) {
        this.$refs[formName].validate( (valid) => {
          if (valid) {
            let data={password:this.ruleForm.pass,user_name:this.ruleForm.uname}
            this.axios.post("https://elm.cangdu.org/admin/login",data)
              .then((res)=>{
                if(res.data.status===1){
                  this.setCookie("xxx", JSON.stringify(res.data), 7)
                  this.$message({
                    type:"success",
                    message:"登录成功"
                  })
                  this.saveAdminInfo({login:true})
                  this.$router.push("/list");
                }else{
                  this.$message({

                    type:"error",
                    message:res.data.message
                  })

                }
              })
          } else {
            this.$notify.error({
              title:'错误',
              message:'请输入正确的用户名密码',
              offset:30
            })
            return false
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },

  }
</script>


<style lang="scss" scoped>
  .login{
    width:100%;
    height:1000px;
    background-color: #324057;
    .content{
      width:380px;
      margin: 0 auto;
      text-align: center;
      padding-top: 160px;
      // animation: fadeInDown 1s ;
      h1{
        font-size: 30px;
        color:#fff;
      }
      .con{
        background-color: #fff;
        border-radius: 5px;
        padding: 15px;
        height: 260px;
        margin-top: 50px;
        .el-form-item{
          padding: 10px;
          margin: 0;
          .el-input,.el-button{
            width:100%;
          }
        }
      }
      .red{
        width:100%;
        text-align: center;
        font-size: 12px;
        margin-top:-8px;
        p{
          color:#FF0000;
        }
      }
    }
  }
  .fade-enter-active, .fade-leave-active {
    transition: all 1s ;
  }
  .fade-enter, .fade-leave-active{
    transform: translate3d(0,-50px,0);
    opacity: 0;
  }
  .el-notification{
    i{
      font-size: 45px;
    }
    .el-notification__group{
      margin-left: 30px;
    }
  }
  .el-message{
    i{
      font-size: 15px;
    }
    .el-notification__group{
      margin-left: 30px;
    }
  }
</style>

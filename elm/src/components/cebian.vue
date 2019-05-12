<template>
  <div id="box">
    <el-container style=" border: 1px solid #eee;">
      <el-aside width="200px" style="background-color: #545c64; height:1500px;">
        <el-menu  default-active="1"
                  class="el-menu-vertical-demo"
                  @open="handleOpen"
                  @close="handleClose"
                  background-color="#545c64"
                  text-color="#fff"
                  active-text-color="#ffd04b"	>

          <!-- //首页 -->
          <router-link tag="div"  to="/List">
            <el-menu-item index="1">
              <i class="el-icon-menu"></i>
              <span slot="title" >首页</span>
            </el-menu-item>
          </router-link>
          <el-submenu index="2">
            <!-- //数据管理 -->
            <template slot="title"><i class="el-icon-document"></i>数据管理</template>
            <el-menu-item-group>
              <router-link tag="div" to="/Hol">
                <el-menu-item index="1-1">用户列表</el-menu-item>
              </router-link>
              <router-link tag="div" to="/shangjia">
                <el-menu-item index="1-2">商家列表</el-menu-item>
              </router-link>
              <router-link tag="div"  to="/foot">
                <el-menu-item index="1-3">食品列表</el-menu-item>
              </router-link>
              <router-link tag="div"  to="/dingdan">
                <el-menu-item index="1-4">订单列表</el-menu-item>
              </router-link>
              <router-link tag="div" to="/guanliyuan">
                <el-menu-item index="1-5">管理员列表</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu>
          <el-submenu index="3">
            <!-- // 添加数据 -->
            <template slot="title"><i class="el-icon-plus"></i>添加数据</template>
            <el-menu-item-group>
              <router-link tag="div"  to="/addShop">
                <el-menu-item index="1-1">添加商鋪</el-menu-item>
              </router-link>
              <router-link tag="div"  to="/addfood">
                <el-menu-item index="1-2">添加商品</el-menu-item>
              </router-link>
            </el-menu-item-group>
          </el-submenu> <el-submenu index="4">
          <!--  //图标 -->
          <template slot="title"><i class="el-icon-star-on"></i>图标</template>
          <el-menu-item-group>
            <router-link tag="div"  to="/vis">
              <el-menu-item index="1-1">用户分布</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu> <el-submenu index="5">
          <!-- //编辑 -->
          <template slot="title"><i class="el-icon-edit"></i>编辑</template>
          <el-menu-item-group>
            <router-link tag="div"  to="/Bianji">
              <el-menu-item index="1-1">文本编辑</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu> <el-submenu index="6">
          <!-- //设置 -->
          <template slot="title"><i class="el-icon-setting"></i>设置</template>
          <el-menu-item-group>
            <router-link tag="div"  to="/adminSet">
              <el-menu-item index="1-1">管理员设置</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu> <el-submenu index="7">
          <!-- 	//说明 -->
          <template slot="title"><i class="el-icon-warning-outline"></i>说明</template>
          <el-menu-item-group>
            <router-link tag="div"  to="/paging">
              <el-menu-item index="1-1">说明</el-menu-item>
            </router-link>
          </el-menu-item-group>
        </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <router-view/>
      </el-container>
    </el-container>
  </div>
</template>
<script>
  export default {
    data(){
      return {
    //     list:"首页/数据管理/用户列表 ",
    //     food:"首页/数据管理/商家列表",
    //     shipin:"首页/数据管理/食品列表",
    //     orderID:"首页/数据管理/订单列表",
    //     listing:"首页/数据管理/管理员列表",
      }
    },
    methods: {
      handleOpen(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClose(key, keyPath) {
        console.log(key, keyPath);
      }}};
</script>
<style>
  *{
    margin: 0;
    padding: 0;
  }
  #box{
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {

    color: #333;
  }
</style>

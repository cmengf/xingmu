<template>
  <div id="box1">
    <!--<el-breadcrumb class="login" color="#00000" separator="/">-->
      <!--<el-breadcrumb-item :to="{ path: '/List' }">首页</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>数据管理</el-breadcrumb-item>-->
      <!--<el-breadcrumb-item>商家列表</el-breadcrumb-item>-->
    <!--</el-breadcrumb>-->
    <!--<router-link  to="/"><img class='img' src="https://elm.cangdu.org/img/default.jpg" /></router-link>-->
    <heard> </heard>
    <template>
      <el-table
        :data="lista"
        class="boby"
        style="width: 100%">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="商品名称">
                <span>{{ props.row.name }}</span>
              </el-form-item>
              <el-form-item label="店铺地址">
                <span>{{ props.row.address }}</span>
              </el-form-item>
              <el-form-item label="店铺介绍">
                <span>{{ props.row.description }}</span>
              </el-form-item>
              <el-form-item label="店铺 ID">
                <span>{{ props.row.id }}</span>
              </el-form-item>
              <el-form-item label="联系电话">
                <span>{{ props.row.phone }}</span>
              </el-form-item>
              <el-form-item label="评分">
                <span>{{ props.row.rating }}</span>
              </el-form-item>
              <el-form-item label="销售量">
                <span>{{ props.row.recent_order_num }}</span>
              </el-form-item>
              <el-form-item label="分类">
                <span>{{ props.row.category }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column
          label="店铺名称"
          prop="name">
        </el-table-column>
        <el-table-column
          label="店铺地址"
          prop="address">
        </el-table-column>
        <el-table-column
          label="店铺介绍"
          prop="description">
        </el-table-column>
        <el-table-column
          label="操作"
          prop="desc">
          <template slot-scope="scope">
          <el-button size="mini" @click="handleEdit(scope.$index, scope.row)"
          >编辑</el-button>
          <el-dialog title="修改食品信息" :visible.sync="dialogFormVisible">
            <el-form :model="form">
              <el-form-item label="店铺名称" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="详细地址" prop="address" >
                <el-select
                  v-model="value"
                  multiple
                  filterable
                  remote
                  reserve-keyword
                  placeholder="请输入关键词"
                  :remote-method="remoteMethod"
                  :loading="loading">
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                    {{item.address}}
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="店铺介绍" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="联系电话" :label-width="formLabelWidth">
                <el-input v-model="form.name" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="店铺分类" prop="region">
                <el-cascader
                  expand-trigger="hover"
                  :options="options"
                  v-model="selectedOptions2"
                  @change="handleChange">
                </el-cascader>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button>
              <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
          </el-dialog>
          <el-button size="mini" @click="tiaoId(scope.$index, scope.row)"
          >添加</el-button
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
    </template>
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
  import Axios from 'axios'
  import heard from './head'
  export default {
    data() {
      return {
        lista:[],
        num: 1,
        count:0,
        currentPage1:1,
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
        options: [],
        value: [],
        // list: [],
        loading: false,
        tableData: [],
        num: 5,
        num1: 20,
        dialogImageUrl: "",
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
        options: [{
          value: 'zhinan',
          label: '指南',
          children: [{
            value: 'shejiyuanze',
            label: '设计原则',
            children: [{
              value: 'yizhi',
              label: '一致'
            }, {
              value: 'fankui',
              label: '反馈'
            }, {
              value: 'xiaolv',
              label: '效率'
            }, {
              value: 'kekong',
              label: '可控'
            }]
          }, {
            value: 'daohang',
            label: '导航',
            children: [{
              value: 'cexiangdaohang',
              label: '侧向导航'
            }, {
              value: 'dingbudaohang',
              label: '顶部导航'
            }]
          }]
        }, {
          value: 'zujian',
          label: '组件',
          children: [{
            value: 'basic',
            label: 'Basic',
            children: [{
              value: 'layout',
              label: 'Layout 布局'
            }, {
              value: 'color',
              label: 'Color 色彩'
            }, {
              value: 'typography',
              label: 'Typography 字体'
            }, {
              value: 'icon',
              label: 'Icon 图标'
            }, {
              value: 'button',
              label: 'Button 按钮'
            }]
          }, {
            value: 'form',
            label: 'Form',
            children: [{
              value: 'radio',
              label: 'Radio 单选框'
            }, {
              value: 'checkbox',
              label: 'Checkbox 多选框'
            }, {
              value: 'input',
              label: 'Input 输入框'
            }, {
              value: 'input-number',
              label: 'InputNumber 计数器'
            }, {
              value: 'select',
              label: 'Select 选择器'
            }, {
              value: 'cascader',
              label: 'Cascader 级联选择器'
            }, {
              value: 'switch',
              label: 'Switch 开关'
            }, {
              value: 'slider',
              label: 'Slider 滑块'
            }, {
              value: 'time-picker',
              label: 'TimePicker 时间选择器'
            }, {
              value: 'date-picker',
              label: 'DatePicker 日期选择器'
            }, {
              value: 'datetime-picker',
              label: 'DateTimePicker 日期时间选择器'
            }, {
              value: 'upload',
              label: 'Upload 上传'
            }, {
              value: 'rate',
              label: 'Rate 评分'
            }, {
              value: 'form',
              label: 'Form 表单'
            }]
          }, {
            value: 'data',
            label: 'Data',
            children: [{
              value: 'table',
              label: 'Table 表格'
            }, {
              value: 'tag',
              label: 'Tag 标签'
            }, {
              value: 'progress',
              label: 'Progress 进度条'
            }, {
              value: 'tree',
              label: 'Tree 树形控件'
            }, {
              value: 'pagination',
              label: 'Pagination 分页'
            }, {
              value: 'badge',
              label: 'Badge 标记'
            }]
          }, {
            value: 'notice',
            label: 'Notice',
            children: [{
              value: 'alert',
              label: 'Alert 警告'
            }, {
              value: 'loading',
              label: 'Loading 加载'
            }, {
              value: 'message',
              label: 'Message 消息提示'
            }, {
              value: 'message-box',
              label: 'MessageBox 弹框'
            }, {
              value: 'notification',
              label: 'Notification 通知'
            }]
          }, {
            value: 'navigation',
            label: 'Navigation',
            children: [{
              value: 'menu',
              label: 'NavMenu 导航菜单'
            }, {
              value: 'tabs',
              label: 'Tabs 标签页'
            }, {
              value: 'breadcrumb',
              label: 'Breadcrumb 面包屑'
            }, {
              value: 'dropdown',
              label: 'Dropdown 下拉菜单'
            }, {
              value: 'steps',
              label: 'Steps 步骤条'
            }]
          }, {
            value: 'others',
            label: 'Others',
            children: [{
              value: 'dialog',
              label: 'Dialog 对话框'
            }, {
              value: 'tooltip',
              label: 'Tooltip 文字提示'
            }, {
              value: 'popover',
              label: 'Popover 弹出框'
            }, {
              value: 'card',
              label: 'Card 卡片'
            }, {
              value: 'carousel',
              label: 'Carousel 走马灯'
            }, {
              value: 'collapse',
              label: 'Collapse 折叠面板'
            }]
          }]
        }, {
          value: 'ziyuan',
          label: '资源',
          children: [{
            value: 'axure',
            label: 'Axure Components'
          }, {
            value: 'sketch',
            label: 'Sketch Templates'
          }, {
            value: 'jiaohu',
            label: '组件交互文档'
          }]
        }],
        selectedOptions: [],
        selectedOptions2: [],
        formLabelWidth: '120px'
      }
    },
    components:{
      heard
    },
    created() {
      this.initData();
      this.getFoods();
      Axios.get('https://elm.cangdu.org/shopping/restaurants?latitude=39.90469&longitude=116.407173&offset=0&limit=20').then((res)=>{
        this.lista=res.data
        // console.log(this.lista)
      })
    },
    methods: {
      initData(){
        Axios.get('https://elm.cangdu.org/shopping/v2/foods/count?restaurant_id=').then(res=>{
          // console.log(res)
          if (res.data.status===1){
            this.count=res.data.count;
          } else {
            throw new Error('获取数据失败')
          }
        })
      },
      getFoods(){
        Axios.get('https://elm.cangdu.org/shopping/v2/foods?offset=' + this.num + "&limit=20&restaurant_id=").then(res=>{
          // console.log(res)
          if (res.data.length>0){
            this.table=res.data
          }
        })
      },
      handleEdit(index, row) {
        this.dialogFormVisible=true
        // console.log(index, row);
      },
      tiaoId(index,row){
        this.$router.push({ path: '/addfood',query:{restaurant_id:row.id}})
      },
      handleDelete(index, row) {
        console.log(index, row);
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
      handleChange(value) {
        console.log(value);
      },
      remoteMethod(query) {
        if (query !== '') {
          this.loading = true;
          setTimeout(() => {
            this.loading = false;
            this.options = this.list.filter(item => {
              return item.label.toLowerCase()
                .indexOf(query.toLowerCase()) > -1;
            });
          }, 200);
        } else {
          this.options = [];
        }
        axios.get("https://elm.cangdu.org/v1/pois?type=search&city_id=3&keyword="+query).then((item)=>{
          console.log(item.data)
          this.options=item.data
        })
      }
    }
  }
</script>

<style scoped>
  #box1 {
    width: 99%;
    height:100%;

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

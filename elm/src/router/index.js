import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
// import DengLu from '@/components/DengLu'
// import cebian from "../components/cebian";
// import lists from "../components/lists";
// import shangjia from "../components/shangjia";
// import shipin from "../components/shipin";
// import dingdan from "../components/dingdan";
const dingdan = resolve =>require(["../components/dingdan"],resolve);
const foot = resolve =>require(["../components/foot"],resolve);
const shangjia = resolve =>require(["../components/shangjia"],resolve);
const lists = resolve =>require(["../components/shouye"],resolve);
const cebian = resolve =>require(["../components/cebian"],resolve);
const DengLu = resolve =>require(["../components/DengLu"],resolve);
const HelloWorld = resolve =>require(["../components/HelloWorld"],resolve);
const guanliyuan = resolve =>require(["../components/guanliyuan"],resolve);
const addshop = resolve =>require(["../components/addShop"],resolve);
const Visitor = resolve =>require(["../components/Visitor"],resolve);
const adminSet = resolve =>require(["../components/adminSet"],resolve);
const addfood = resolve =>require(["../components/addfood"],resolve);
const Bianji = resolve =>require(["../components/Bianji"],resolve);
Vue.use(Router)

// export default new Router({
//   routes: [
//     {
//       path: '/Cb',
//       name: 'cebian',
//       component: cebian,
//       children:[
//         {
//           path: '/Hol', name: 'HelloWorld', component: HelloWorld,
//         },
//         {
//           path: '/', name: 'lists', component: lists,
//         },
//         {
//           path: '/List', name: 'lists', component: lists,
//         },
//         {
//           path: '/shangjia', name: 'shangjia', component: shangjia,
//         },
//         {
//           path: '/shipin',name: 'shipin', component: shipin,
//         },
//         {
//           path: '/dingdan', name: 'dingdan', component: dingdan,
//         },
//         {
//           path: '/guanliyuan',name: 'guanliyuan', component: guanliyuan,
//         }
//       ]
//     },
//     {
//       path: '/', name: 'DengLu', component: DengLu
//     }
//   ]
// })
const routes = [
  {
    path:'/',
    component:resolve => require(['@/components/DengLu'],resolve)
  },

  {
    path:'/Cb',
    component:resolve => require(['@/components/cebian'],resolve),
    children:[
      {
        path:'/Hol',
        component:resolve => require(['@/components/HelloWorld'],resolve,),
        meta:["数据管理","用户列表"]
      },{
        path:'/guanliyuan',
        component:resolve => require(['@/components/guanliyuan'],resolve),
        meta:["数据管理","管理员列表"]
      },
      {
        path:'/dingdan',
        component:resolve => require(['@/components/dingdan'],resolve),
        meta:["数据管理","订单列表"]
      },
      {
        path:'/foot',
        component:resolve => require(['@/components/foot'],resolve),
        meta:["数据管理","食品列表"]
      },
      {
        path:'/shangjia',
        component:resolve => require(['@/components/shangjia'],resolve),
        meta:["数据管理","商家列表"]
      },
      {
        path:'/list',
        component:resolve => require(['@/components/shouye'],resolve),
        meta:["首页"]
      },
      {
        path:'/vis',
        component:resolve => require(['@/components/Visitor'],resolve),
        meta:["图标","用户分布"]
      }
      ,
      {
        path:'/addshop',
        component:resolve => require(['@/components/addone'],resolve),
        meta:["数据添加","添加商铺"]
      },
      {
        path:'/addfood',
        component:resolve => require(['@/components/addfood'],resolve),
        meta:["数据列表","添加食品"]
      }
      ,{
        path:'/adminSet',
        component:resolve => require(['@/components/adminSet'],resolve),
        meta:["设置","管理员设置"]
      },
      {
        path:'/Bianji',
        component:resolve => require(['@/components/Bianji'],resolve),
        meta:["编辑","文本编辑"]
      }
    ],
    redirect:'/List'
  }
]

const router = new Router({
  routes
})
export default router;

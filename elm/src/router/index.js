import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import DengLu from '@/components/DengLu'
import cebian from "../components/cebian";
import lists from "../components/lists";
import shangjia from "../components/shangjia";
import shipin from "../components/shipin";
import dingdan from "../components/dingdan";

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/Cb',
      name: 'cebian',
      component: cebian,
      children:[
        {
          path: '/Hol',
          name: 'HelloWorld',
          component: HelloWorld,
        },
        {
          path: '/',
          name: 'lists',
          component: lists,
        },
        {
          path: '/List',
          name: 'lists',
          component: lists,
        },
        {
          path: '/shangjia',
          name: 'shangjia',
          component: shangjia,
        },
        {
          path: '/shipin',
          name: 'shipin',
          component: shipin,
        },
        {
          path: '/dingdan',
          name: 'dingdan',
          component: dingdan,
        }
      ]
    },
    {
      path: '/',
      name: 'DengLu',
      component: DengLu
    }
  ]
})

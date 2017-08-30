/**
 * Created by rain on 2017/8/23.
 */
import RainElm from '../rainElm.vue';

// 路由懒加载  官网
// https://router.vuejs.org/zh-cn/advanced/lazy-loading.html

// require.ensure 是 Webpack 的特殊语法，用来设置 code-split point
// （代码分块）需要独立打包、异步加载的代码，使用require.ensure
// 资料网址 http://www.cnblogs.com/lvdabao/p/5953884.html

const Msite = r => require.ensure([], ()=>r(require('pages/msite/msite')), 'msite');
const Discover = r => require.ensure([], ()=>r(require('pages/discover/discover')), 'discover');
const Order = r => require.ensure([], ()=>r(require('pages/order/order')), 'order');
const Profile = r => require.ensure([], ()=>r(require('pages/profile/profile')), 'profile');

const Shop = r => require.ensure([], () => r(require('pages/shop/shop')), 'shop');


export default [
  {
    path: '/',
    component: RainElm,
    children: [
      {
        path: '',
        redirect: '/msite',
      },

      // 如果不写在 RainElm的 children里面的话, 是一个单独的路由, 那么就是直接跳转到Msite页面, 只有写在children里面, 才能在rainElm.vue的<router-view>中进行渲染
      {
        path: '/msite',
        component: Msite,
      },
      {
        path: '/discover',
        component: Discover,
      },
      {
        "path": '/order',
        component: Order,
      },
      {
        path: '/profile',
        component: Profile,
      },

      // 商铺详情
      {
        path: '/shop',
        component: Shop,
      }





    ]

  }

]
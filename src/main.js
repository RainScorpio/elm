/**
 * Created by rain on 2017/8/23.
 */
import Vue from 'vue';
import router from './router';
// import Resource from 'vue-resource';
import store from './vuex-store';
import '@/css/index.scss'; // 引入样式表
import './common/rem.js'; // 引入rem布局

// Vue.use(Resource);

// 在生产模式下不提示
Vue.config.productionTip = false;

new Vue ({
  el: '#rain',
  router,
  store,
  // template: '<RainElm></RainElm>',
  // components: {
  //   RainElm
  // }
})



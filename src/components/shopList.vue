<template>
  <div class="shopList">

  </div>


</template>


<script type="text/ecmascript-6">

import {
  getShopList,
} from '@/data/getData';

import {
  getImgPath
} from '@/common/function';


export default {
  name: 'shopList',
  data() {
    return {
      shops:[], // 商铺列表
    }
  },

  mounted() {
    getShopList(0).then(respnse => {
      this.shops = respnse;
    }).catch(error => {

      //     todo: 注意catch(实际就是reject回调函数)中写console.log会报错.
//       console.log('商家列表');
//       console.log(error);
    })
  },

  mixins: [getImgPath],

}

</script>

<style lang="scss">

</style>
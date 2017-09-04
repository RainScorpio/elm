<template>

  <div id="shop">

    <!-- 头部 -->
    <div class="header">
      <!-- 返回按钮-->
      <p @click="goBack">返回</p>

      <!-- 商家信息 -->
      <div class="shop-message" v-if="message">

        <div class="message">
          <img :src="getImgPath(message.image_path, '130x130')" alt="message.name">
          <div class="description">
            <h2>{{message.name}}</h2>
            <div>
              <span>{{message.delivery_mode.text}}</span>
              /
              <span>{{message.piecewise_agent_fee.tips}}</span>
            </div>

          </div>
        </div>


      </div>


    </div>



    <div>

    </div>

    <h3>我是商铺页面</h3>
  </div>

</template>


<script type="text/ecmascript-6">
import {
  getShopMessage,
} from '@/data/getData';

import {
  getImgPath
} from '@/common/function';


  export default {
    data() {
      return {
        message: {}, // 商家信息
      };
    },

    methods: {
      goBack:function() {
        this.$router.go(-1);
      }
    },
    mixins: [getImgPath],

    mounted() {

      getShopMessage(this.$route.query.id).then((response)=>{

        this.message = response;

      }).catch((error)=>{

      });


    }

  }
</script>

<style lang="scss">

</style>
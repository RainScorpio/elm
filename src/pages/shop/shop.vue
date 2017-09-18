<template>

  <div id="shop">

    <!-- 头部 -->
    <div class="header">

      <!-- 头部背景图片 -->
      <div class="header-background" :style="{backgroundImage: headerBackground}"></div>

      <!-- 导航, 返回按钮-->
      <nav class="header-navbar">
        <arrow></arrow>
      </nav>

      <!-- 商家信息 -->
      <div class="header-message" style="display: flex">
          <img :src="getImgPath(message.image_path, '130x130')" alt="message.name" style="width: 130px; height: 130px">
          <div class="description">
            <h2>{{message.name}}</h2>
            <div>
              <span v-if="message.delivery_mode">{{message.delivery_mode.text}}</span>
              <span v-else>商家配送</span>
              /
              <span>{{message.order_lead_time}}</span>
              /
              <span>{{message.piecewise_agent_fee.tips}}</span>
            </div>
          </div>
        </div>

      <!-- 商家活动 -->
      <div class="header-activities">
        <activity :activity="message.activities"></activity>
      </div>


    </div>

    <!-- 商品 评价 店铺-->
    <div class="tab" style="display: flex">
      <div class="tab-item" style="width: 33%; text-align: center">
        <span>商品</span>
      </div>
      <div class="tab-item" style="width: 33%; text-align: center">
        <span>评价</span>
      </div>
      <div class="tab-item" style="width: 33%; text-align: center">
        <span>店铺</span>
      </div>
    </div>

    <!-- 商品页面 -->
    <div class="goods" style="display: flex">
        <!-- 侧边栏 -->
        <aside class="goods-category" style="border-right: 2px solid black">
          <div style="height: 100px" class="category" v-for="item in goods" :key="item.id">{{item.name}}</div>

        </aside>

        <!-- 商品详细信息 -->
        <section class="goods-menu">

          <dl v-for="menu in goods">
            <dt>{{menu.name}} {{menu.description}}</dt>
            <dd v-for="food in menu.foods" style="display: flex">
              <img src="getImgPath(food.image_path, '140x140')" alt="">
              <div class="food-message">
                <h3>{{food.name}}</h3>
                <p>月售{{food.month_sales}}  好评率{{food.satisfy_rate}}%</p>
                <p>{{food.specfoods.price}}</p>
                <!-- 选规格 -->
                <p>{{food.specifications.name}}</p>

              </div>
            </dd>
          </dl>




        </section>
        <!-- 商品详细信息 结束-->



      </div>
    <!-- 商品页面 结束-->

    <!-- 评价页面 -->
    <!-- 评价页面 结束-->

    <!-- 店铺页面 -->
    <!-- 店铺页面 结束-->

  </div>

</template>


<script type="text/ecmascript-6">
import {
  getShopMessage,
  getShopGoods,
} from '@/data/getData';

import {
  getImgPath
} from '@/common/function';

import {mapState} from 'vuex';


import activity from '@/components/activity';
import arrow from "../../components/arrow";


  export default {
    data() {
      return {
        message: {}, // 商家信息
        goods: [], // 商品信息
      };
    },

    computed: {

      ...mapState(['geohash', 'location']),

      // 计算 头部 模糊背景图片的路径
      headerBackground() {

        var url = 'url(' + this.getBlurImgPath(this.message.image_path, '40', '50x40') + ')';
        return url;
      },

    },

    components: {
      arrow, activity
    },

    methods: {
      goBack:function() {
        this.$router.go(-1);
      }
    },

    mixins: [getImgPath],

    mounted() {


      // 获取商铺信息
      getShopMessage(this.$route.query.id).then((response)=>{
        this.message = response;
      }).catch((error)=>{
        console.log(error);
      });

      getShopGoods(this.$route.query.id).then((response)=>{
        this.goods = response;
      }).catch((error)=> {

      });

    }

  }
</script>

<style lang="scss">
  @import "../../css/mixin";

  #shop {

    /* 头部 */
    .header {
      position: relative;

      /* 头部背景图片 */
      .header-background {
        position: absolute;
        top: 0;
        left: 0;
        height: 100%;
        width: 100%;
        background-size: cover;
        background-repeat: no-repeat;
        background-color: #3190e8;
        z-index: -10;
      }

      nav.header-navbar {
        position: relative;
        height: pxToRem(73px);
      }

      .header-message {
        @include property-of-rem('padding', 20px, 30px, 0px);

        img {
          width: pxToRem(130px);
          height: pxToRem(130px);
          border-radius: pxToRem(4px);
          border: 1px solid #fff;

        }

        .description {
          margin-left: pxToRem(20px);
          color: #fff;
        }





      }

    }



  }


</style>
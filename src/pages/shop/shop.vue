<template>

  <div id="shop">

    <!-- 头部 -->
    <div class="header">
      <!-- 返回按钮-->
      <p @click="goBack">返回</p>

      <!-- 商家信息 -->
      <div class="shop-message" v-if="message">

        <div class="message" style="display: flex">
          <img :src="getImgPath(message.image_path, '130x130')" alt="message.name" style="width: 130px; height: 130px">
          <div class="description">
            <h2>{{message.name}}</h2>
            <div>
              <span>{{message.delivery_mode.text}}</span>
              /
              <span>{{message.order_lead_time}}</span>
              /
              <span>{{message.piecewise_agent_fee.tips}}</span>
            </div>

          </div>
        </div>


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






    <div>

    </div>

    <h3>我是商铺页面</h3>
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


  export default {
    data() {
      return {
        message: {}, // 商家信息
        goods: [], // 商品信息
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

</style>
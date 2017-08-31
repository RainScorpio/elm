<template>
  <div class="shop-list">

    <!-- 商家列表 -->
    <section v-for="shop in shops" :key="shop.id" class="list-item">

      <div class="shop-logo">
        <div class="logo-img">
          <img :src="getImgPath(shop.image_path, '130x130')" alt="shop.name">
        </div>

      </div>

      <div class="shop-message">

        <!-- 商家基本信息 -->
        <div class="shop-base">

          <div class="base-first">
            <h3 class="shop-name">{{shop.name}}</h3>

            <!-- 保障 -->
            <div class="supports">
              <span v-for="sup in shop.supports" class="sup">{{sup.icon_name}}</span>
            </div>
          </div>
          <div class="base-second">
            <div class="shop-score">
              <span>{{shop.rating}}</span>
              <span> 月售{{shop.recent_order_num}}单</span>

            </div>
            <!-- 蜂鸟专送-->
            <div class="bird" v-if="shop.delivery_mode">
              <span>蜂鸟专送</span>

            </div>
          </div>
          <div class="base-third">
            <!-- 配送价格 -->
            <div class="distribution-price">
              <span>¥{{shop.float_minimum_order_amount}}起送</span>
              <span>{{shop.piecewise_agent_fee.description}}</span>
            </div>

            <!-- 配送时间 -->
            <div class="distribution-time">

              <span>{{shop.distance}}m </span>

              <span>{{shop.order_lead_time}}分钟</span>

            </div>
          </div>

        </div>
        <!-- 商家基本信息 结束-->

        <!-- 优惠 -->
        <div class="shop-discount">

        </div>
        <!-- 优惠 结束-->

      </div>


    </section>


    <!-- 商家列表 结束-->




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
  @import "../css/mixin";

  /* 商家列表 */
  .shop-list {
    background-color: #fff;

    /* 列表项 */
    .list-item {

      @include flex-content();
      @include font-dpr(11px);
      color: #666;

      /* 商家商标图片 */
      .shop-logo {
        @include property-of-rem(padding, 30px, 20px);

        &>div.logo-img {
          width: pxToRem(130px);
          height: pxToRem(130px);

          & img {
            width: 100%;
            height: 100%;
          }
        }
      }

      /* 商家信息 */
      .shop-message {
        width: pxToRem(580px);
        @include property-of-rem(padding, 30px, 20px, 30px, 0px);

        /* 商家基本信息 */
        .shop-base {
          border-bottom: 1px solid #ddd;

          .base-first, .base-second, .base-third {
            @include flex-content();
            margin-bottom: pxToRem(15px);
          }

          /* 第一行 */
          .base-first {

            /* 商家名称 */
            .shop-name {
              color: #333;
              @include font-dpr(15px);
              white-space: nowrap;
              overflow: hidden;
              text-overflow: ellipsis;
              height: pxToRem(32px);
              max-width: pxToRem(375px);
            }

            .supports {
              span.sup {
                @include font-dpr(12px);
                border: 1px solid rgb(221, 221, 221);
                border-radius: pxToRem(4px);
                color: rgb(153, 153, 153);
                margin-left: pxToRem(5px);
                display: inline-block;
                width: pxToRem(32px);
                height: pxToRem(32px);
                text-align: center;

              }
            }

          }

          /* 第二行 */
          .base-second {

            .bird {
              color: #fff;
              @include font-dpr(10px);
              background-image: linear-gradient(45deg, #0085ff, #0af);
              border-radius: pxToRem(4px);
              border: 1px solid rgb(68, 165, 255);
              height: pxToRem(26px);
              @include property-of-rem(padding, 0px, 4px);


            }
          }

          /* 第三行 */
          .base-third {
            .distribution-price, .distribution-time {
              & span:first-child {
                padding-right: pxToRem(5px);
                border-right: 1px solid #aaa;
                margin-right: pxToRem(10px);
              }
            }




          }



        }

        .shop-discount {
          text-align: right;

        }

      }




    }






  }





</style>
<template>
  <div id="msite">

    <!-- 使用导航后加载数据 -->
    <!-- 会先加载组件 msite, 但是如果没有v-if控制, div.wrap 是不会显示, 并且组件也不会加载在父组件内. 只有获取到数据后, 才会加载组件.  -->
    <!-- 但是如果用v-if判断的话, 就会加载msite组件, 并根据值判断是否显示 -->

      <!-- 选择收货地址页面 -->
      <transition name="slide">
        <div class="delivery" v-show="showDelivery">

          <rain-header title="选择收货地址"></rain-header>

          <!-- 设置搜索输入框 -->
          <form class="search-box" @submit="deliverySubmit">
            <i class="fa fa-search"></i>
            <input type="search" placeholder="请输入地址" autofocus @change="deliveryInput">
          </form>

          <section class="current-address">
            <h4>当前地址</h4>
            <div class="address-name">
              <span class="name">{{locationName}}</span>
              <span class="reposition-button">
                <i class="fa fa-bullseye"></i>
                <span>重新定位</span>
              </span>
            </div>
          </section>





        </div>
      </transition>

      <!-- 选择收货地址页面 结束-->

      <!--主页面-->
      <main class="main">

        <!-- 头部 -->
        <!--<header class="msite-header">-->

          <!-- 地址天气 -->
          <div class="header-top msite-header">

            <div class="location-name" @click="selectPosition">
              <i class="fa fa-map-marker"></i>
              <span>{{locationName}}</span>
              <i class="fa fa-caret-down"></i>
            </div>

            <div class="weather" v-if="temperature">
              <div>
                <p>{{temperature}}度</p>
                <p>{{description}}</p>
              </div>
              <img :src="imgURL(weather.image_hash, '69x69')" alt="">
            </div>



          </div>
          <!-- 地址天气 结束-->

          <!-- 搜索 -->
          <div class="search msite-header" style="position: sticky; top: 0px; z-index: 999">
            <router-link to="" class="link">
              <i class="fa fa-search"></i>
              <span>搜索商家, 商品名称</span>
            </router-link>
          </div>
          <!-- 搜索 结束-->



          <!-- 热门搜索词汇 -->
          <div class="hot msite-header">

            <div class="keyword" v-show="hotSearchWords">
              <router-link to="" v-for="(a, index) in hotSearchWords" :key="index">{{a.word}}</router-link>
            </div>


          </div>
          <!-- 热门搜索词汇 结束-->


        <!--</header>-->
        <!-- 头部 结束 -->


        <div v-if="showMain">

          <!-- 分类 -->
          <div class="entries" v-show="entries">

            <div class="entry-wrap" @touchstart="start" @touchmove="move" @touchend="endOrCancel"  v-if="entries.length">


              <!-- 分类第一页 -->
              <div class="entries-page" :class="{active: isActive}">
                <router-link to="" v-for="(n, index) in 8" :key="index">
                  <!-- 报错:Error in render function: "TypeError: Cannot read property 'image_hash' of undefined"
      但是页面依然可以出现. 添加v-if="entries.length"判断-->
                  <img :src="imgURL(entries[index].image_hash, '90x90')" alt="">
                  <p>{{entries[index].name}}</p>

                </router-link>
              </div>

              <!-- 分类第2页 -->
              <div class="entries-page" :class="{active: !isActive}">

                <router-link to="" v-for="(n, index) in (entries.length - 8)" :key="index">

                  <img :src="imgURL(entries[index + 8].image_hash, '90x90')" alt="">
                  <p>{{entries[index + 8].name}}</p>
                </router-link>


              </div>

            </div>

            <div class="dots">

              <div class="dot" :class="{active: isActive}"></div>
              <div class="dot" :class="{active: !isActive}"></div>

            </div>


          </div>

          <!-- 分类结束 -->

          <!-- 推荐商家 标题-->
          <h3 class="list-title">推荐商家</h3>

          <!-- 商家列表 组件-->
          <shop-list :geohashProps="geohash" :locationProps="location"></shop-list>
          <!-- 商家列表 组件结束-->


        </div>

        <section v-else>

          <h2>定位失败</h2>

        </section>



        <rain-footer></rain-footer>

      </main>
      <!--主页面 结束-->



  </div>

</template>

<script type="text/ecmascript-6">
import {
  getPosition,
  getAddress,
  getWeather,
  getHotSearchWords,
  getEntries,
  getSearchAddress,
} from '@/data/getData';

import {
  mixinOfImgPath,
  setStore,
  getStore
} from '@/common/function';

import shopList from '@/components/shopList';
import rainFooter from '@/components/footer';
import rainHeader from '@/components/header';

export default {
  name: 'msite',
  data() {
    return {

      showMain: true, // 是否显示页面主要内容
      showDelivery: false, // 显示选择收货地址界面
      location: {}, // 存储 获取到的定位信息
      locationName: '获取地址中...', // 当前定位地址名称
      geohash: '',
      temperature: '', // 天气气温
      description: '', // 天气描述
      hotSearchWords: [], // 热门搜索词汇
      entries: [], // 首页分类
      preClientX: 0, // 记录手指移动时上一次的位置.
      touchPage: null, // 记录手指触摸的元素
      touchPageSibling: null, //记录手指触摸的兄弟元素.
      touchPageX: 0, // 记录手指触摸到元素的X.
      touchPageSiblingX: 0, // 记录触摸元素兄弟元素的X.
      isActive: true, // 判断是否添加active类.

    }
  },
  components: {
    shopList,
    rainFooter,
    rainHeader,
  },


  mixins: [mixinOfImgPath],

  created() {
    console.log('我是msite的cretaed');
  },

  beforeMount() {
    console.log('我是msite的beforeMount');
  },

  async mounted() {

    // 获取定位
    console.log('我是msite的mounted');

    // 使用promise对象, 先获取定位坐标, 然后根据坐标获取地址信息.

    try{
      // 如果 getPosition() 出错, 那么就不会执行下一句语句, 而是转向catch

      // TODO 1. 获取定位坐标
      let position = await getPosition();


      // TODO 2. 成功则 赋值并保存在本地
      this.location = {
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      };


    } catch (error){

      // TODO 3. 失败 就从本地读取坐标


      this.location = JSON.parse(getStore('location'));
      console.log(error.code);
      console.log(error.message);
    }

    // 判断是否获取到定位坐标
    if (!this.location) {
      this.showMain = false;
      return;
    }
  },

  watch: {

    // 观察location属性值是否发生改变, 如果改变就重新请求数据.
    location: function (newValue, oldValue) {
      console.log('newValue', newValue);
      console.log('oldValue', oldValue);

      this.$store.commit('SAVE_LOCATION', newValue);
      setStore('location', this.location);
      // 根据定位坐标获取数据.
      this.initData();
    }

  },

  methods: {
    // 在模板中只能用vue实例的方法, 不能直接用js方法.
    // 可以使用mixins中的getImgPath替代.
//    imgURL: getImageURL,

    // 获取数据
    initData() {
      console.log('initData');
      console.log(this.location.latitude);
      console.log(typeof this.location);
      // 获取地址信息
      getAddress(this.location.latitude, this.location.longitude).then(response => {

        this.locationName = response.name;

        // 将geohash的值存入状态中.
        this.$store.commit('SAVE_GEOHASH', response.geohash);
        // 将geohash的值存入本地
//        var location = getStore('location');
//        location.geohash = response.geohash;

      }).catch(error => {

        this.locationName = '地址出错了';
        console.log('地址信息获取不到');
        console.log(error);
        this.showMain = false;

      });


      // 获取天气信息
      getWeather(this.location.latitude, this.location.longitude).then(response => {
        this.weather = response;
        this.temperature = response.temperature;
        this.description = response.description;
      }).catch(reject => {
         console.log(reject);
        }
      );



      // 获取热门搜索词汇
      getHotSearchWords(this.location.latitude, this.location.longitude).then(response => {
        this.hotSearchWords = response;
      });

      // 获取首页分类
      getEntries(this.location.latitude, this.location.longitude).then(response => {
        this.entries = response[0].entries;

      });

    },

    // 地址点击事件.
    selectPosition() {
      console.log('select')
      this.showDelivery = true;
      console.log(this.showDelivery)
    },

    // 选择收货地址 form submit事件(点击回车时会触发form的提交事件)
    deliverySubmit() {
      console.log('触发提交');
    },

    // 选择收货地址 input change事件
    deliveryInput(event) {
      console.log('sdf');
      event = event || window.event;
      console.log(event.target.value);
      var data = fetch('../../../static/searchAddress.json', {method: 'GET'});

      data.then(response => response.json()).then(add => {
        console.log(add);
      }).catch(error=>{
        console.log(error);
      })


    },

    start: function(event) {

      event = event || window.event;
//      // 获取.entries-page元素
      var touchPage = event.target;

      if (!touchPage.classList.contains('entries-page')) {
        // offsetParent代表找到离元素最近的祖先元素.
        touchPage = touchPage.offsetParent;
      }
      this.touchPage = touchPage;
      this.touchPageSibling = touchPage.nextElementSibling || touchPage.previousElementSibling;

      this.touchPageSibling.style.display = 'block';

//      console.log(event.changedTouches[0].clientX);
//
//      console.log('preClientX',event.changedTouches[0].clientX);
      this.preClientX = event.changedTouches[0].clientX;

    },

    move: function(event){

      event = event || window.event;

      event.preventDefault();

      // 计算手指移动距离
      var currentx = event.changedTouches[0].clientX;
      var movex = this.preClientX - currentx;
      // 计算兄弟元素的translatex的距离
      var siblingx = 0;
      if (movex < 0) { // 代表向右滑动, mx为负, tpx为正, 等于-mx, tpsx为负, 等于750-Math.abs(mx)之后取负值.
        siblingx = -document.documentElement.clientWidth - movex;

      } else { // 代表向左滑动, mx为正, tpx为负, 等于-mx, tpsx为正, 等于750-mx
        siblingx = document.documentElement.clientWidth - movex;
      }
      this.touchPageX = -movex;
      this.touchPageSiblingX = siblingx;

//      window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
//
//      window.requestAnimationFrame(()=>{
//
//      });

      // 更改元素的transform
      this.touchPage.style.transform = 'translate3d(' + this.touchPageX + 'px, 0, 0)';
      this.touchPageSibling.style.transform = 'translate3d(' + this.touchPageSiblingX + 'px, 0, 0)';




    },

    endOrCancel: async function () {

      // 元素样式字符串.
      var touchPageStyle = '';
      var touchPageSiblingStyle = '';

      // 设置过渡时间
      this.touchPage.setAttribute('style', 'transition: transform 300ms ease-in-out;');
      this.touchPageSibling.setAttribute('style', 'display: block;transition: transform 300ms ease-in-out;');


      // 计算两个页面移动的距离
      if (Math.abs(this.touchPageX) < Math.abs(this.touchPageSiblingX)) {

        touchPageStyle = this.touchPage.getAttribute('style') + ';transform: translate3d(0px, 0px, 0px);';

        var x = document.documentElement.clientWidth;
        if (this.touchPageX > 0) { // 向右滑
          x = -document.documentElement.clientWidth;
        }

        touchPageSiblingStyle = this.touchPageSibling.getAttribute('style') + ';transform: translate3d('+x+'px, 0px, 0px);';

      } else {
        var x = -document.documentElement.clientWidth;
        if (this.touchPageX > 0) { // 向右滑
          x = document.documentElement.clientWidth;
        }

        touchPageStyle = this.touchPage.getAttribute('style') + 'transform: translate3d('+x+'px, 0px, 0px);';
        touchPageSiblingStyle = this.touchPageSibling.getAttribute('style') + ';transform: translate3d(0px, 0px, 0px);';

      }


      var timer01Promise = new Promise((resolve, reject) => {

        // 5毫秒后再设置transform, 否则没有过渡
        var timer01Id = setTimeout(()=> {

          this.touchPage.setAttribute('style', touchPageStyle);
          this.touchPageSibling.setAttribute('style', touchPageSiblingStyle);
          console.log('timer01Id', timer01Id);
          resolve(timer01Id);
        }, 5);
      });
      var timer02Promise = new Promise((resolve, reject) => {

        // 305毫秒后再清除所有的内联样式
        var timer02Id = setTimeout(()=>{
          this.touchPage.setAttribute('style', '');
          this.touchPageSibling.setAttribute('style', '');

          if(Math.abs(this.touchPageX) > Math.abs(this.touchPageSiblingX)) {
            this.isActive = !this.isActive;
          }
          console.log('timer02Id', timer02Id);

          resolve(timer02Id);

        }, 300);


      });

      // 执行定时器, 清除定时器.
      try {
        const timer01Id = await timer01Promise;
        console.log('timer01', timer01Id);
        clearTimeout(timer01Id);

        const timer02Id = await timer02Promise;
        console.log('timer02', timer02Id);
        clearTimeout(timer02Id);

      } catch(error) {
        console.log('timer error', error);
      }

    }



  }

}


</script>


<style lang="scss">

  @import "../../css/mixin";

  #msite {

    .slide-enter, .slide-leave-to {
      transform: translateX(10rem);
    }

    .slide-enter-active, .slide-leave-active {
      transition: all .3s ease;
    }

    .slide-enter-to, .slide-leave {
      transform: translateX(0px);
    }

    .delivery {
      // 背景色遮挡下面的元素
      background-color: #f4f4f4;
      position: fixed;
      top: 0;
      left: 0;
      right: 0;
      // bottom 为0 可以让页面和视口一样高.
      bottom: 0;
      // 重要
      z-index: 1000;
      .search-box {
        position: relative;
        background-color: #fff;
        @include property-of-rem('padding', 20px, 30px);
        input {
          width: pxToRem(690px);
          height: pxToRem(72px);
          background-color: #f2f2f2;
          @include property-of-rem('padding', 18px, 36px, 18px, 66px);
          border-radius: pxToRem(2px);
          font-size: pxToRem(26px);

          outline:none;
          border: none;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
        }

        .fa.fa-search {
          position: absolute;
          left: pxToRem(52px);
          top: pxToRem(40px);
          color: #bbb;
          font-size: pxToRem(30px);
        }



      }

      .current-address {
        h4 {
          @include property-of-rem('padding', 30px, 0px, 14px, 30px);
          color: #666;
          font-size: pxToRem(26px);
          line-height: pxToRem(36px);
        }
        .address-name {
          @include flex-content();
          background-color: #fff;
          height: pxToRem(88px);
          @include property-of-rem('padding', 0px, 34px, 0px, 30px);
          .name {
            font-size: pxToRem(30px);
            font-weight: 700;
            max-width: pxToRem(500px);
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .reposition-button {
            color: #2395ff;
            font-size: pxToRem(28px);
            line-height: pxToRem(30px);


          }

        }
      }

    }

    /* msite页的头部 */
    .msite-header {
      background-image: linear-gradient(90deg, #0af, #0085ff);
      color: #fff;
      @include property-of-rem(padding, 20px, 28px);
    }
      /* 地址, 天气 */
    .header-top {
        @include flex-content();
        padding-bottom: 0px;
        /* 地址 */
        & > .location-name {
          @include flex-content(flex-start);

          /*<!--@include font-dpr(18px);-->*/
          font-size: pxToRem(36px);
          font-weight: 700;
          width: 60%;
          @include property-of-rem(height, 69px);
          /* 地址名称 */
          & span {
            margin: pxToRem(0px, 10px);
            max-width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            display: inline-block;
            vertical-align: bottom;
          }

        }

        /* 天气 */
        & .weather {
          @include flex-content();
          /*<!--@include font-dpr(12px);-->*/
          font-size: pxToRem(24px);
          text-align: right;
          img {
            @include property-of-rem(width, 55px);
            @include property-of-rem(height, 55px);
            @include property-of-rem(margin-left, 8px);
          }
        }
      }

      /* 搜索 */
    .search {
      margin-top: -1px;
        .link {
          width: 100%;
          @include property-of-rem(height, 72px);
          @include flex-content(center);
          /*<!--@include font-dpr(13px);-->*/
          font-size: pxToRem(26px);
          background-color: #fff;
          color: rgb(102, 102, 102);
          span {
            @include property-of-rem(margin-left, 10px);
          }
        }
      }

      /* 热门搜索词汇 */
    .hot {
        padding-bottom: pxToRem(10px);
        font-size: pxToRem(24px);
        padding-top: 0px;

        .keyword {
          white-space: nowrap;
          overflow-x: auto;

          a {
            color: #fff;
            @include property-of-rem(margin-right, 30px);
          }
        }

      }


    /* 分类 */
    .entries {
      background-color: #fff;
      position: relative;
      height: pxToRem(354px);

      .entry-wrap {
        position: relative;
        overflow: hidden;
        height: 100%;

        .entries-page {
          /* 使用绝对定位的方式, 让元素脱离文本流, 这样在手指拖动元素时, 才不会将整体页面一起拖动.*/
          position: absolute;
          width: 100%;
          height: 100%;
          display: none;
          /* TODO: transform渲染效率比定位高??? */
          transform: translateX(-100%);
          /*top: 0;*/
          /*left: 0;*/
          &.active {
            display: block;
            transform: none;
          }

          &::after {
            content: '';
            display: table;
            clear: both;
          }

          a {
            display: block;
            float: left;
            width: 25%;
            text-align: center;
            margin-top: pxToRem(22px);
            font-size: pxToRem(24px);
            img {
              width: pxToRem(90px);
              height: pxToRem(90px);
            }
          }

        }
      }

      .dots {
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);

        .dot {
          display: inline-block;
          width: 8px;
          height: 8px;
          border-radius: 4px;
          background-color: #ccc;
          &.active {
            background-color: #555;
          }
        }

      }

    }

    /* 推荐商家 */
    h3.list-title {
      margin-top: pxToRem(20px);
      font-weight: 600;
      /*<!--@include font-dpr(16px);-->*/
      font-size: pxToRem(32px);

      @include property-of-rem(padding, 32px, 20px, 0px);
      background-color: #fff;

    }

    /* 获取不到定位信息的时候. */

    .no-position {
      .no-shop {
        display: flex;
        justify-content: center;
        align-items: center;
        height: 80%;
      }
    }







  }



</style>
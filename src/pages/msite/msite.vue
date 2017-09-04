<template>
  <div id="msite">

    <!-- 使用导航后加载数据 -->
    <!-- 会先加载组件 msite, 但是如果没有v-if控制, div.wrap 是不会显示, 并且组件也不会加载在父组件内. 只有获取到数据后, 才会加载组件.  -->
    <!-- 但是如果用v-if判断的话, 就会加载msite组件, 并根据值判断是否显示 -->
    <div class="wrap" v-if="hasData">
      <!-- 头部 -->
      <header class="msite-header">

        <!-- 地址天气 -->
        <div class="header-top">
          <div class="location-name">
            <i class="fa fa-map-marker"></i>
            <span>{{locationName}}</span>
            <i class="fa fa-caret-down"></i>
          </div>

          <div class="weather">
            <div>
              <p>{{temperature}}度</p>
              <p>{{description}}</p>
            </div>
            <img :src="imgURL(weather.image_hash, '69x69')" alt="">
          </div>



        </div>
        <!-- 地址天气 结束-->

        <!-- 搜索 -->
        <div class="search">
          <router-link to="" class="link">
            <i class="fa fa-search"></i>
            <span>搜索商家, 商品名称</span>
          </router-link>
        </div>
        <!-- 搜索 结束-->



        <!-- 热门搜索词汇 -->
        <div class="hot">

          <div class="keyword">
            <router-link to="" v-for="(a, index) in hotSearchWords" :key="index">{{a.word}}</router-link>
          </div>


        </div>
        <!-- 热门搜索词汇 结束-->


      </header>
      <!-- 头部 结束 -->

      <!-- 分类 -->

      <div class="entries">

        <div class="entry-wrap" @touchstart="start" @touchmove="move"  v-if="entries.length">
          <!-- 分类第一页 -->
          <div class="entries-page  active">
            <router-link to="" v-for="(n, index) in 8" :key="index">
              <!-- 报错:Error in render function: "TypeError: Cannot read property 'image_hash' of undefined"
  但是页面依然可以出现. 添加v-if="entries.length"判断-->
              <img :src="imgURL(entries[index].image_hash, '90x90')" alt="">
              <p>{{entries[index].name}}</p>

            </router-link>
          </div>
          <!-- 分类第2页 -->
          <div class="entries-page">

            <router-link to="" v-for="(n, index) in (entries.length - 8)" :key="index">

              <img :src="getImgPath(entries[index + 8].image_hash, '90x90')" alt="">
              <p>{{entries[index + 8].name}}</p>
            </router-link>


          </div>

        </div>

        <div class="dots">

          <div class="dot active"></div>
          <div class="dot"></div>

        </div>


      </div>

      <!-- 分类结束 -->

      <!-- 推荐商家 标题-->
      <h3 class="list-title">推荐商家</h3>

      <!-- 商家列表 组件-->
      <!-- 商家列表 组件结束-->
      <shop-list :geohashProps="geohash"></shop-list>



    </div>


    <!-- 无法获取定位信息 -->
    <div v-else>
      <!-- 头部 -->
      <header class="msite-header">

        <!-- 地址天气 -->
        <div class="header-top">
          <div class="location-name">
            <i class="fa fa-map-marker"></i>
            <span>{{locationName}}</span>
            <!--<span>获取地址中...</span>-->
            <i class="fa fa-caret-down"></i>
          </div>
        </div>
        <!-- 地址天气 结束-->
        <!-- 搜索 -->
        <div class="search">
          <router-link to="" class="link">
            <i class="fa fa-search"></i>
            <span>搜索商家, 商品名称</span>
          </router-link>
        </div>
        <!-- 搜索 结束-->
      </header>
      <!-- 头部 结束 -->


      <div class="no-shop" v-if="hasPositionError">
        <img src="https://fuss10.elemecdn.com/6/87/4efda8c6bf4734d39faf86fe190c3gif.gif" alt="" style="width: 50%;">
      </div>




    </div>


  </div>
</template>

<script type="text/ecmascript-6">
import {
  getPosition,
  getAddress,
  getWeather,
  getHotSearchWords,
  getEntries,
} from '@/data/getData';

import {
  getImageURL,
  getImgPath,
  setStore
} from '@/common/function';

import shopList from '@/components/shopList';



export default {
  name: 'msite',
  data() {
    return {
      hasData: false,
      hasPositionError: false,
      locationName: '获取地址中...', // 当前定位地址名称
      locationAddress: '', // 当前定位地址
      locationCity: '', // 当前定位城市
      weather:{},
      temperature: '', // 天气气温
      description: '', // 天气描述
      error: '',
      hotSearchWords: [], // 热门搜索词汇
      entries: [], // 首页分类
      preClientX: 0, // 记录手指移动时上一次的位置.
      geohash: ''

    }
  },
  components: {
    shopList,

  },


  mixins: [getImgPath],

  created() {
    console.log('我是msite的cretaed');
  },
  beforeMount() {
    console.log('我是msite的beforeMount');
  },

  // 只有在模板加载完成之后, 改变vue实例中的数据, 才能通知视图进行改变.
  // 简单例子:
  /**
   * var a = 1;
   * var b = a;
   * a = 2; // b并不会变成2
   *
   * 就好比
   * lat = 2.333
   * this.lat = 2.333 // 在模板加载完成之前获取的数据.
   * lat = 5.3445
   * this.lat 还是2.333
   *
   * */
  async mounted() {

    // 获取定位
    console.log('我是msite的mounted');

    // 使用promise对象, 先获取定位坐标, 然后根据坐标获取地址信息.

    try{
      // 如果 getPosition() 出错, 那么就不会执行下一句语句, 而是转向catch
      var position = await getPosition();

      this.hasData = true;
      setStore('latitude', position.coords.latitude);
      setStore('longitude', position.coords.longitude);
      this.initData();

    } catch (error){

      this.hasPositionError = true;

//     console.log('sdf');
      console.log(error.code);
      console.log(error.message);


    }






    // 使用promise对象, 先获取定位坐标, 然后根据坐标获取地址信息.
//   getPosition().then((position)=>{
//
//     this.hasData = true;
//     setStore('latitude', position.coords.latitude);
//     setStore('longitude', position.coords.longitude);
//
//   }, (error) => {
//     this.hasPositionError = true;
//
////     console.log('sdf');
//     console.log(error.code);
//     console.log(error.message);
//
//   }).then(()=>{
//
//     if (!this.hasData) {
//       return;
//     }
//
//     this.initData();
//
//   });

   console.log('msite mounted end');
  },

  methods: {
    // 在模板中只能用vue实例的方法, 不能直接用js方法.
    // 可以使用mixins中的getImgPath替代.
    imgURL: getImageURL,

    initData() {
      console.log('initData');
      // 获取定位信息
      getAddress().then(response => {

        this.locationName = response.name;
        this.hasData = true;

        this.geohash = response.geohash;
//        this.SAVE_GEOHASH(response.geohash);
        this.$store.commit('SAVE_GEOHASH', response.geohash);


      }, function (va) {
        // 报错信息
//       console.log('va');
//       console.log(va);
      });


      // 获取天气信息
      getWeather().then(response => {
        this.weather = response;
        this.temperature = response.temperature;
        this.description = response.description;
      }).catch(
        reject => {
//         console.log('weather');
//         console.log(reject);
        }
      );

//     const weather = getweather(this.latitude, this.longitude);
//     console.log(weather);
//     this.temperature = weather.temperature;
//     this.description = weather.description;


      // 获取热门搜索词汇
      getHotSearchWords().then(response => {
        this.hotSearchWords = response;
      });

      // 获取首页分类
      getEntries().then(response => {
        this.entries = response[0].entries;

      });

    },

    start: function (event) {

      event = event || window.event;
//      // 获取.entries-page元素
      var touchPage = event.target;
      if (!touchPage.classList.contains('entries-page')) {
        // offsetParent代表找到离元素最近的祖先元素.
        touchPage = touchPage.offsetParent;
      }
      var sibling = touchPage.nextElementSibling || touchPage.previousElementSibling;
      sibling.style.display = 'block';

//      console.log(event.changedTouches[0].clientX);
//
      this.preClientX = event.changedTouches[0].clientX;

    },

    move(event){
      event = event || window.event;

      // 计算手指移动距离
      var currentx = event.changedTouches[0].clientX;
//      console.log(this.preClientX);
//      console.log('df', currentx);
      var movex = this.preClientX - currentx;
//      console.log('mx: ', movex);

      var siblingx = document.documentElement.clientWidth - Math.abs(movex);

      // 计算兄弟元素的translatex的距离
      if (movex < 0) {
        siblingx = -siblingx;
        movex = Math.abs(movex);
      } else {
        movex = -movex;
      }

      // 获取.entries-page元素
      var touchpage = event.target;
      if (!touchpage.classList.contains('entries-page')) {
        touchpage = touchpage.offsetParent;
      }

      // 获取兄弟元素
      var sibling = touchpage.nextElementSibling || touchpage.previousElementSibling;


      console.log(movex);
      console.log(siblingx);

      // 更改元素的transform
      touchpage.style.transform = 'translate3d(' + movex + 'px, 0, 0)';

      sibling.style.transform = 'translate3d(' + siblingx + 'px, 0, 0)';

    },

    end: function (event) {




    }





  }

}


</script>


<style lang="scss">

  @import "../../css/mixin";


  #msite {


   /* msite页的头部 */
    .msite-header {
      background-image: linear-gradient(90deg, #0af, #0085ff);
      color: #fff;
      @include property-of-rem(padding, 20px, 28px);

      /* 地址, 天气 */
      &>.header-top {
        @include flex-content();
        @include property-of-rem(margin-bottom, 14px);


        /* 地址 */
        &>.location-name {
          @include flex-content(flex-start);

          /*<!--@include font-dpr(18px);-->*/
          font-size: pxToRem(36px);
          font-weight: 700;
          width: 60%;
          @include property-of-rem(height,69px);
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
      & .search {
        @include property-of-rem(margin-bottom, 14px);
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
      & .hot {
        padding-bottom: pxToRem(10px);
        font-size: pxToRem(24px);

        .keyword {
          white-space: nowrap;
          overflow-x: auto;

          a {
            color: #fff;
            @include property-of-rem(margin-right, 30px);
          }
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
    .no-shop {
      display: flex;
      justify-content: center;
      align-items: center;
      height: 80%;
    }

  }

</style>
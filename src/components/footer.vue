<template>
  <div id="rain-footer">
    <router-link to="/msite" class="active" @click.native="toggle">
      <i class="fa fa-edge"></i>
      <span>外卖</span>
    </router-link>

    <router-link to="/discover" @click.native="toggle">
      <i class="fa fa-safari"></i>
      <span>发现</span>
    </router-link>

    <router-link to="/order" @click.native="toggle">
      <i class="fa fa-file-text-o"></i>
      <span>订单</span>
    </router-link>

    <router-link to="/profile" @click.native="toggle">
      <i class="fa fa-user-o"></i>
      <span>我的</span>

    </router-link>
  </div>
</template>


<script type="text/ecmascript-6">

  export default {
    name: 'footer',

    created() {
      console.log('我是rainElm的created');
    },
    beforeMount() {
      console.log('我是rainElm的beforeMount');
    },
    mounted() {
      console.log('我是rainElm的mounted');
    },


    methods: {
      toggle(ev) {
        console.log('foooter');
        ev = ev || window.event;

        var item = ev.currentTarget;

        var allItems = item.parentElement.children;
        for (var i = 0; i < allItems.length; i++) {
          allItems[i].classList.remove('active');
        }

        item.classList.add('active');
      }
    }



  }

</script>


<style lang="scss">

  @import "../css/mixin";

  #footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    z-index: 999;
    width: 100%;
    height: pxToRem(100px);
    background-color: #fff;
    box-shadow: 0 -0.026667rem 0.053333rem rgba(0,0,0,0.1);
    padding-top: pxToRem(9px);
    text-align: center;



    @include flex-content(space-around);

    a {
      flex: 1;
      @include font-dpr(18px);

      &.active {
        color: #0089dc;
      }

      span {
        display: block;
        @include font-dpr(10px);
      }


    }


  }


</style>

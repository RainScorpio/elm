<template>
  <div id="rain-header">
    <div class="header">
      <arrow></arrow>
      <div class="address-title">{{title}}</div>
    </div>

    
  </div>

</template>


<script type="text/ecmascript-6">
  import arrow from '@/components/arrow';

  export default {
    name: 'header',

    props: ['title'],

    components: {
      arrow
    }

  }

</script>

<style lang="scss">
  @import "../css/mixin";

  #rain-header {
    position: sticky;
    top: 0;
    z-index: 1000;
    color: #fff;

    .header {
      background-image: linear-gradient(90deg,#0af,#0085ff);
      text-align: center;
      font-size: pxToRem(24px);
      position: relative;

      .address-title {
        font-size: pxToRem(36px);
        line-height: pxToRem(88px);
      }

    }




  }
  

</style>
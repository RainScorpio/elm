<template>
  <div id="arrow" @click="goBack">
    <i class="fa fa-angle-left"></i>
  </div>

</template>


<script type="text/ecmascript-6">
  export default {
    name: 'arrow',
    methods: {
      goBack(eve) {

        switch (this.$route.path) {
          case '/msite': {
            eve.currentTarget.offsetParent.offsetParent.offsetParent.style.display = 'none';
            return;
          }

        }

        this.$router.go(-1);
      }
    }
  }

</script>

<style lang="scss">
  @import "../css/mixin";

  #arrow {
    position: absolute;
    top: pxToRem(10px);
    left: pxToRem(25px);
    width: pxToRem(40px);
    height: pxToRem(80px);
    text-align: center;
    i.fa {
      font-size: pxToRem(64px);
    }

  }

</style>
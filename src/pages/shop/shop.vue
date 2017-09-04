<template>

  <div>

    <p @click="goBack">返回</p>

    <div>

    </div>

    <h3>我是商铺页面</h3>
  </div>

</template>


<script type="text/ecmascript-6">

  export default {

    methods: {
      goBack:function() {
        this.$router.go(-1);
      }
    }
  }
</script>

<style lang="scss">

</style>
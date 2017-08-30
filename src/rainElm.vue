<template>


  <div id="rain-elm">

    <div id="content">
      <router-view></router-view>
    </div>



    <div id="footer">
      <router-link to="/msite">外卖</router-link>
      <router-link to="/discover">发现</router-link>
      <router-link to="/order">订单</router-link>
      <router-link to="/profile">我的</router-link>
    </div>
  </div>

</template>


<script type="text/ecmascript-6">

</script>

<style lang="scss">

  #footer {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 30px;
    background-color: gold;
    z-index: 100;
  }


</style>
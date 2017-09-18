<template>
  <div id="activity">
    <span class="icon_name" :style="{backgroundColor: '#'+ activity[0].icon_color}">{{activity[0].icon_name}}</span>
    <span class="activity-tips">{{activity[0].tips}}</span>
  </div>

</template>


<script type="text/ecmascript-6">
  export default {
    name: 'activity',
    props: ['activity'],
  }

</script>

<style lang="scss">
  @import "../css/mixin";

  #activity {
    @include flex-content(flex-start);
    font-size: pxToRem(26px);
    color: #fff;
    .icon_name {
      font-size: pxToRem(24px);
      margin-right: pxToRem(12px);
      border-radius: pxToRem(4px);
      width: pxToRem(32px);
      height: pxToRem(32px);
      text-align: center;
      @include property-of-rem('padding', 2px, 3px);
      .activity-tips {
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
      }

    }

  }


</style>
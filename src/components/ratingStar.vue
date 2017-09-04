<template>
  <div class="rating-star">
    <div class="star-grey">

      <i class="fa fa-star" v-for="n in 5"></i>

    </div>

    <div class="rating" :style="{width: (rating * 20) + '%'}">
      <div class="star-yellow">
        <i class="fa fa-star" v-for="n in 5"></i>
      </div>
    </div>

  </div>



</template>


<script type="text/ecmascript-6">

  export default {
    name: 'rating-star',
    props: {
      rating: Number
    },
    computed: {
      starWidth() {
        return (this.rating * 20) + '%;';
      }

    },

  }



</script>

<style lang="scss">
  @import "../css/mixin";
  .rating-star {
    display: inline-block;
    position: relative;
    height: pxToRem(20px);
    width: pxToRem(112px);
    /*<!--@include font-dpr(10px);-->*/
    font-size: pxToRem(20px);

    .star-grey {
      color: #ddd;

      @include flex-content(space-around);
    }

    .rating {
      overflow: hidden;
      position: absolute;
      top: 0;
      left: 0;

      .star-yellow {
        @include flex-content(space-around);
        color: orange;
        width: pxToRem(112px);

      }

    }






  }

</style>
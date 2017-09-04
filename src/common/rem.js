/**
 * Created by rain on 2017/8/29.
 */

// TODO: 改进
;(function (window, document) {

  /**
   * 设置meta viewport
   * 计算1rem的值
   */
  var recalc = function () {


    // clientWidth 只有在 initial-scale = 1.0的情况下才会输出375, 如果没有设置viewport, 则输出 980;
    //  console.log(document.documentElement.clientWidth); // 980

    // 获取dpr
    var dpr = Math.floor(window.devicePixelRatio) || 1;

    // 获取html元素
    var html = document.documentElement;


    // 计算缩放比例的值
    var scale = 1 / dpr;

    // 创建meta元素
    var metaEl = document.createElement('meta');
    metaEl.setAttribute('name', 'viewport');
    metaEl.setAttribute('content', 'width='+ 'device-width' + ', initial-scale=' + scale + ', maximum-scale=' + scale + ', minimum-scale=' + scale + ', user-scalable=no');
    document.head.appendChild(metaEl);

    // 此时设置完viewport, clientWidth的值要取决于initial-scale的值, 如果是0.5, clientWidth = 375(逻辑像素) / 0.5 = 750
    // console.log(document.documentElement.clientWidth); // 750

// 设置data-dpr 属性, 用于以后CSS Hack
    html.setAttribute('data-dpr', dpr);

// 动态写入样式
// 计算1rem的值
    var rem = 75;
    // 通过分析饿了么官网的页面, 发现屏幕宽度大于1242时, rem都等于108
    if (html.clientWidth < 1242) {
      rem = html.clientWidth / 10; // 网上做法是html.clientWidth * dpr / 10, 但前提是clientWidth为375. 所以进行改进 1rem = 物理像素 / 10 (10也可以是其他的数值);
    } else {
      rem = 108;
    }

    // 设置根元素的字体大小
    html.style.fontSize = rem + 'px';

    document.body.style.fontSize = 12 * dpr + 'px';

  };


  // var resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize';


  if(document.addEventListener){
    document.addEventListener('DOMContentLoaded', recalc, false);
    window.addEventListener('orientationchange', recalc, false);

  }else{
    // 适配IE
    window.attachEvent('resize', recalc);
    document.onreadystatechange=function(){
      if(document.readyState=='complete'){
        recalc();
      }
    };
  }







  // if (window.addEventListener) {
  //   console.log('adde');
  //   window.addEventListener('orientationchange', recalc, false);
  // } else if(window.attachEvent) {
  //   window.attachEvent('onorientationchange', recalc, false);
  // } else {
  //   window.onorientationchange = recalc;
  // }



})(window, document);

/**
 * Created by rain on 2017/8/23.
 */
import fetch from '@/config/fetch';

// 获取定位
export const getPosition = function () {

  return  navigator.geolocation ? new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000,maximumAge:1e4});

  }) : Promise.reject();

};


// 获取地址数据
export const getAddress = function () {

  // 因为已经设置了跨域的参数(反向代理),
  // 所以/bgs/poi/reverse_geo_coding相当于https://mainsite-restapi.ele.me/bgs/poi/reverse_geo_coding

  return fetch('/bgs/poi/reverse_geo_coding')
};

// 获取天气数据
export const getWeather = () => fetch('/bgs/weather/current');

// 热门搜索词汇
export const getHotSearchWords = () => fetch('/shopping/v3/hot_search_words');

// 获取分类
export const getEntries = (latitude, longitude) => fetch('/shopping/v2/entries', {
  'templates[]':'main_template'
});

// 获取推荐商家列表
export const getShopList = (offset) => fetch('/shopping/restaurants', {
  offset: offset,
  limit: 20,
  'extras[]': 'activities',
  terminal: 'h5'
});

// 获取商家页面中商家的信息
export const getShopMessage = (id) => fetch('/shopping/restaurant/' + id, {
  'extras[]': 'activities',
  'extras[]': 'albums',
  'extras[]':'license',
  'extras[]': 'identification',
  'extras[]': 'qualification'
});

// 获取商家页面中商品信息
export const getShopGoods = (id) => fetch('/shopping/v2/menu', {
  'restaurant_id': id,
});




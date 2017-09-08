/**
 * Created by rain on 2017/8/25.
 */

import {imgBaseURL} from '../config/env.js';


// 根据图片地址的hash值, 拼接图片地址.

export const getImageURL =  function (imageHash, size) {

  if (!imageHash) {
    return;
  }

  // TODO 如何改进
  var first = imageHash.substr(0, 1);
  var second = imageHash.substr(1, 2);
  var third = imageHash.substr(3);
  var imgType = imageHash.substr(32);
  // console.log('th', third);

  var iu = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';



  return iu;

};

// 使用vuejs中的mixin 方式获取图片地址
export const getImgPath = {

  // 参考 https://cn.vuejs.org/v2/guide/mixins.html#基础
  methods: {
    getImgPath(imageHash, size) {
      if (!imageHash) {
        return;
      }

      // TODO 如何改进
      var first = imageHash.substr(0, 1);
      var second = imageHash.substr(1, 2);
      var third = imageHash.substr(3);
      var imgType = imageHash.substr(32);
      // console.log('th', third);

      var iu = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!' + size + 'r/gravity/Center/crop/' + size + '/';



      return iu;

    }
  }
}





// 存储localStorage
export const setStore = (name, content) => {
  if (!name) return;
  if (typeof content !== 'string') {
    content = JSON.stringify(content);

  }

  window.localStorage.setItem(name, content);

};

// 获取localStorage
export const getStore = name => {
  if (!name) return;
  return window.localStorage.getItem(name);
};
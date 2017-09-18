/**
 * Created by rain on 2017/8/25.
 */

import {imgBaseURL} from '../config/env.js';


// 根据图片地址的hash值, 拼接图片地址.

const getImageURL =  function (imageHash, size) {

  if (!imageHash) {
    return;
  }

  // TODO 如何改进
  var first = imageHash.substr(0, 1);
  var second = imageHash.substr(1, 2);
  var third = imageHash.substr(3);
  var imgType = imageHash.substr(32);
  // console.log('th', third);

  var iu = imgBaseURL + '/' + first + '/' + second + '/' + third + '.' + imgType + '?' + 'imageMogr/thumbnail/!';



  return iu;

};

// 使用vuejs中的mixin 方式获取图片地址
export const mixinOfImgPath = {

  // 参考 https://cn.vuejs.org/v2/guide/mixins.html#基础
  methods: {
    imgURL: function(imageHash, size) {
     const str = getImageURL(imageHash);

      const path = str + size + 'r/gravity/Center/crop/' + size + '/';

      return path;

    },
    getBlurImgPath: function(imageHash, p, size) {
      const str = getImageURL(imageHash);
      const path = str + p + 'p/blur/' + size + '/';
      return path;
    },

  }

};





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
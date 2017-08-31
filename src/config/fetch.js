/**
 * Created by rain on 2017/8/23.
 */
import {baseURL} from './env'; // 获取域名地址
import {setStore, getStore} from '@/common/function';


const getPosition = function () {

  return  navigator.geolocation ? new Promise(function (resolve, reject) {

    navigator.geolocation.getCurrentPosition(resolve, reject, {timeout: 10000,maximumAge:1e4});

  }) : Promise.reject();

};

/**
 * 封装异步请求方法fetch
 * async 函数 是 ES7 中的函数, 是General函数的语法糖, 是一个协程
 */
// async和()之间不能有空格
export default async(url = '', data = {}, type = 'GET', method = 'fetch') => {

  type = type.toUpperCase();
  url = baseURL + url; // 拼接路径

  // 获取定位坐标
  var lat = getStore('latitude');
  var lon = getStore('longitude');

  if (!lat || !lon) {
    const position = await getPosition();
    lat = position.coords.latitude;
    lon = position.coords.longitude;
    // console.log('sdf');
    // console.log(lat);
    // console.log(lon);
    setStore('latitude', lat);
    setStore('longitude', lon);
  }

  data.latitude = lat;
  data.longitude = lon;





  // console.log(data);

  // 为了 79 行的时候使用.
  if (type === 'GET') {
    // 如果请求方式是GET 在路径后面拼接参数
    let dataStr = '';
    // Object.keys() 方法会返回一个由一个给定对象的自身可枚举属性组成的数组
    Object.keys(data).forEach(key=>{
      // 拼接参数
      dataStr += key + '=' + data[key] + '&';

    });



    // 如果存在参数, 则拼接路径
    if (dataStr !== '') {
      dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
      url = url + '?' + dataStr;
    }
  }

  // TODO method=='fetch'有什么作用

  if (window.fetch && method == 'fetch') {

    // 配置请求头
    let requestConfig = {
      credentials: 'include', // 开启Cookie, 在所有网站的请求中包含凭据, 因为网站数据是跨域请求. "same-origin" 就是在同一站点的请求中包含凭据.
      method: type,
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',

      },
      mode: 'cors', // cors模式我们通常用作跨域请求来从第三方提供的API获取数据。
      // mode属性用来决定是否允许跨域请求，以及哪些response属性可读.
      cache: 'force-cache' // 缓存策略  force-cache: 强制缓存
    }

    if (type === 'POST') {

      // Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。
      Object.defineProperty(requestConfig, 'body', { // 给请求头添加body参数, 参数的内容是请求的参数键值对.
        // JSON.stringify() 方法将一个  JavaScript 值转换为一个 JSON 字符串
        value: JSON.stringify(data)
      });
    }

    try {

      const response = await fetch(url, requestConfig);

      const responseJSON = await response.json();

      return responseJSON;

    } catch (error) {

      // console.log(error);
      throw new Error(error);
    }
  } else {

    console.log('不支持fetch');
    // 异步控制
    return new Promise((resolve, reject) => {
      let requestObj;
      if (window.XMLHttpRequest) {
        requestObj = new XMLHttpRequest();
      } else {
        requestObj = new ActiveXObject(); // 老版本的 Internet Explorer （IE5 和 IE6）使用 ActiveX(new ActiveXObject()) 对象：
      }

      let sendData = '';
      if (type == 'POST') {
        sendData = JSON.stringify(data);
      }

      requestObj.open(type, url, true);
      requestObj.setRequestHeader('Content-type', 'application/x-www-form-urlencoded');
      // 发送请求数据
      requestObj.send(sendData);

      requestObj.onreadystatechange = () => {
        if (requestObj.readyState == 4) {
          if (requestObj.status == 200) {
            // 如果异步操作成功

            let obj = requestObj.response;
            if (typeof obj !== 'object') {
              // 把字符串变成
              obj = JSON.parse(obj);
            }

            // 将Promise对象状态从'未完成'变为'成功'
            resolve(obj);

          } else {
            // 将Promise对象状态从'未完成'变为'失败'
            reject(requestObj);
          }
        }
      }

    })
  }

}


/**
 * Created by rain on 2017/8/23.
 * 配置编译环境和线上环境之间的切换
 * baseURL: 域名地址
 * routerMode: 路由模式
 * imgBaseURL: 图片所在域名地址
 */

let baseURL = '';
let routerMode = 'history';
let imgBaseURL = 'https://fuss10.elemecdn.com';

if (process.env.NODE_ENV == 'developement') {

} else if (process.env.NODE_ENV == 'production') {
  // let baseURL = 'https://mainsite-restapi.ele.me';
}

export {
  baseURL,
  routerMode,
  imgBaseURL
}
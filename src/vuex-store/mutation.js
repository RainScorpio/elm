/**
 * Created by rain on 2017/8/26.
 */

import {SAVE_GEOHASH} from './mutation-types';

export default {

  // 更新geohash的值.
  // [SAVE_GEOHASH]是ES6中计算属性值的语法.
  [SAVE_GEOHASH](state, geohash) {
    state.geohash = geohash;
  }
}


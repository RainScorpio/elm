/**
 * Created by rain on 2017/8/26.
 */

import Vue from 'vue'
import Vuex from 'vuex'
import mutations from './mutation'

Vue.use(Vuex);

const state = {
  geohash: '' // 地址中的geohash值.
};

export default new Vuex.Store({
  state,
  mutations
})


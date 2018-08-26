// https://vuex.vuejs.org/zh-cn/intro.html
// make sure to call Vue.use(Vuex) if using a module system
import Vue from 'vue'
import Vuex from 'vuex'
import { INCREMENT, DECREMENT } from './mutations_type.js'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    count: 5
  },
  mutations: {
    [INCREMENT]: (state) => {
      const obj = state
      obj.count += 1
    },
    [DECREMENT]: (state) => {
      const obj = state
      obj.count -= 1
    }
  }
})

export default store

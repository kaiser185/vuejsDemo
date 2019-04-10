import Vue from 'vue'
import Vuex from 'vuex'
import spending from './modules/spending'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    spending
  },
  strict: process.env.NODE_ENV !== 'production'
})
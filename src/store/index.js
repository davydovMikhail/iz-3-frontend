import Vue from 'vue'
import Vuex from 'vuex'
import {
  connect,
  test
} from '@/utils/web3.js';


Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
  },
  getters: {
    IS_CONNECTED: state => state.isConnected,
  },
  mutations: {
    SET_CONNECT_STATUS: (state, status) => state.isConnected = status, 
  },
  actions: {
    async CONNECT_METAMASK() {
      await connect();
    },
    async TEST() {
      await test();
    }
  },
  modules: {
  }
})

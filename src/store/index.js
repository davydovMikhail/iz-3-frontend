import Vue from 'vue'
import Vuex from 'vuex'
import {
  connect,
  checkAddress,
  stake,
  claim,
  unstake
} from '@/utils/web3.js';

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    isConnected: false,
    message: '',
    btnDisabled: false
  },
  getters: {
    IS_CONNECTED: state => state.isConnected,
    MESSAGE: state => state.message,
    BTN_DISABLED: state => state.btnDisabled
  },
  mutations: {
    SET_CONNECT_STATUS: (state, status) => state.isConnected = status, 
    SET_MESSAGE: (state, msg) => state.message = msg,
    SET_BTN_STATUS: (state, status) => state.btnDisabled = status
  },
  actions: {
    async CONNECT_METAMASK({commit}) {
      const status = await connect();
      if(status) {
        commit('SET_CONNECT_STATUS', true);
      }
    },
    async STAKE({commit}, amount) {
      commit('SET_BTN_STATUS', true);
      commit('SET_MESSAGE', '');
      const addresses = await checkAddress();
      if(addresses) {
        const message = await stake(amount);
        if (message.hash) {
          commit('SET_MESSAGE', `https://goerli.etherscan.io/tx/${message.hash}`);
        } else if (message.error.message) {
          commit('SET_MESSAGE', message.error.message);
        }
      } else {
        commit('SET_CONNECT_STATUS', false);
      }
      commit('SET_BTN_STATUS', false);
    },
    async CLAIM({commit}) {
      commit('SET_BTN_STATUS', true);
      commit('SET_MESSAGE', '');
      const addresses = await checkAddress();
      if(addresses) {
        const message = await claim();
        if (message.hash) {
          commit('SET_MESSAGE', `https://goerli.etherscan.io/tx/${message.hash}`);
        } else if (message.error.message) {
          commit('SET_MESSAGE', message.error.message);
        }
      } else {
        commit('SET_CONNECT_STATUS', false);
      }
      commit('SET_BTN_STATUS', false);
    },
    async UNSTAKE({commit}) {
      commit('SET_BTN_STATUS', true);
      commit('SET_MESSAGE', '');
      const addresses = await checkAddress();
      if(addresses) {
        const message = await unstake();
        if(message.error) {
          commit('SET_MESSAGE', message.error.message);
        }
      } else {
        commit('SET_CONNECT_STATUS', false);
      }
      commit('SET_BTN_STATUS', false);
    }
  }
})

import Vue from "vue";
import Vuex from "vuex";
import axios from "axios"
Vue.use(Vuex);


export const ACTIONS = {
  BLOCK_ADD: "BLOCK_ADD",
  BLOCK_SET_HEAD: "BLOCK_SET_HEAD",
  BLOCK_GET_BY_ID: "BLOCK_GET_BY_ID",
  BLOCK_SET_SINGLE: "BLOCK_SET_SINGLE",
  BLOCK_GET_HEAD: "BLOCK_GET_HEAD",
  BLOCKS_GET: "BLOCKS_GET",
  BLOCKS_SET: "BLOCKS_SET",
  BLOCKS_REPLACE: "BLOCKS_REPLACE",
  //OPERATIONS
  TRANSACTIONS_SET: "TRANSACTIONS_SET",
  TRANSACTIONS_GET: "TRANSACTIONS_GET",

  ENDORSEMENTS_SET: "ENDORSEMENTS_ADD",
  ENDORSEMENTS_GET: "ENDORSEMENTS_GET",

  DELEGATIONS_SET: "DELEGATIONS_ADD",
  DELEGATIONS_GET: "DELEGATIONS_GET",

  INFO_NEW: "INFO_NEW",
  INFO_GET: "INFO_GET"

}

export default new Vuex.Store({
  state: {
    txs: [],
    blocks: [],
    endorsements: [],
    delegations: [],
    priceInfo: {},
    headBlock: {},
    viewBlock: {},
    app: {
      platform: "tezos",
      network: "mainnet",
      actions: ACTIONS,
    }
  },
  mutations: {
    [ACTIONS.BLOCKS_ADD]: function (state, block) {
      if (!this.getters.getBlockById(block.level)) {
        state.blocks.unshift(block);
      }
    },
    [ACTIONS.BLOCKS_SET]: function (state, blocks) {
      state.blocks = blocks
    },
    [ACTIONS.TRANSACTIONS_SET]: function (state, txs) {
      state.txs = txs;
    },
    [ACTIONS.ENDORSEMENTS_SET]: function (state, ops) {
      state.endorsements = ops
    },
    [ACTIONS.DELEGATIONS_SET]: function (state, ops) {
      state.delegations = ops;
    },
    [ACTIONS.INFO_NEW]: function (state, info) {
      state.priceInfo = info;
    },
    [ACTIONS.BLOCK_SET_HEAD]: function (state, block) {
      state.headBlock = block;
    },
    [ACTIONS.BLOCK_SET_SINGLE]: function (state, block) {
      state.viewBlock = block
    },

  },
  actions: {
    async [ACTIONS.BLOCKS_GET]({ commit }, params) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/blocks`);
      commit(ACTIONS.BLOCKS_SET, result.data)
    },
    async [ACTIONS.BLOCK_GET_BY_ID]({ commit }, blockLevel) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/blocks/${blockLevel}`);
      commit(ACTIONS.BLOCK_SET_SINGLE, result.data.block)
    },
    async [ACTIONS.INFO_GET]({ commit }) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/info`);
      commit(ACTIONS.INFO_NEW, result.data)
    },
    async [ACTIONS.BLOCK_GET_HEAD]({ commit }) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/blocks/head`);
      commit(ACTIONS.BLOCK_SET_HEAD, result.data)
    },
    async [ACTIONS.TRANSACTIONS_GET]({ commit }) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/operations?operation_kind=transaction`);
      commit(ACTIONS.TRANSACTIONS_SET, result.data)
    },
    async [ACTIONS.ENDORSEMENTS_GET]({ commit }, level) {
      let url = `https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/operations?operation_kind=endorsement`;
      if (level && level > 0) {
        url = `https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/blocks/${level}/endorsements`
      }
      const result = await axios.get(url);
      commit(ACTIONS.ENDORSEMENTS_SET, result.data)
    },
    async [ACTIONS.DELEGATIONS_GET]({ commit }) {
      const result = await axios.get(`https://teztracker.everstake.one/v2/data/${this.state.app.platform}/${this.state.app.network}/operations?operation_kind=delegation`);
      commit(ACTIONS.DELEGATIONS_SET, result.data)
    }

  },
  getters: {
    getBlockById(state) {
      return id => state.blocks.find(el => el.level === id)
    },
    getTransactionById(state) {
      return id => state.txs.find(el => el.hash === id)
    },
    getActions(state) {
      return () => state.app.actions
    }
  }
});

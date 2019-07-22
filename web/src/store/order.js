import axios,{ config, financeConfig, shoppingConfigPay } from '../http.js'

const state = {

};

const err = (error) => {
  throw new Error(error.data.rtnMsg);
};

const getters = {

};

const mutations = {

};

const actions = {
  //订单列表
  orderList:({ commit }, request) => {
    return axios.post("orderList.mo", request, config).then(value => {
      return value.data.orderList;
    }).catch(err);
  },

  //订单详情
  userOderInfo:({ commit }, request) => {
    return axios.post("userOderInfo.mo", request, config).then(value => {
      return value.data.data;
    }).catch(err);
  },

  //提交订单
  orderSubmit: ({ commit }, request) => {
    return axios.post("orderSubmit.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //提交服务包订单
  servOrderSubmit: ({ commit }, request) => {
    return axios.post("servOrderSubmit.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //服务包订单列表
  servOrderList: ({ commit }, request) => {
    return axios.post("servOrderList.mo", request, config).then(value => {
      return {orderList:value.data.dataList, total: value.data.total.value};
    }).catch(err);
  },

  //取消服务包订单
  servOrderAudit: ({ commit }, request) => {
    return axios.post("servOrderAudit.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //支付订单
  userConsume: ({ commit }, request) => {
    return axios.post("userConsume.mo", request, financeConfig).then(value => {
      return value.data;
    }).catch(err);
  },
  //商城支付订单
  payCreateOrder: ({ commit }, request) => {
    return axios.post("sk/jvFinPayCreateOrder.mo", request, shoppingConfigPay).then(value => {
      return value.data;
    }).catch(err);
  },

  //查询账户余额
  userAccount: ({ commit }, request) => {
    return axios.post("userAccount.mo", request, financeConfig).then(value => {
      return value.data;
    }).catch(err);
  },
  //商城查询账户余额
  finAccountQuery: ({ commit }, request) => {
    return axios.post("sk/jvFinAccountQuery.mo", request, shoppingConfigPay).then(value => {
      return value.data;
    }).catch(err);
  },

  //取消订单
  orderStepOp: ({ commit }, request) => {
    return axios.post("orderStepOp.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //提交预约订单
  userOrderSubmit: ({ commit }, request) => {
    return axios.post("userOrderSubmit.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //获取用户预约订单
  userOderList: ({ commit }, request) => {
    return axios.post("userOderList.mo", request, config).then(value => {
      return {orderList:value.data.docOderList, total: value.data.total.value};
    }).catch(err);
  },

  //取消订单
  docorderstepop: ({ commit }, request) => {
    return axios.post("docorderstepop.mo", request, config).then(value => {
      return value.data;
    }).catch(err);
  },

  //查询问诊详情
  subscribeRecordsQuery: ({ commit }, request) => {
    return axios.post("subscribeRecordsQuery.mo", request, config).then(value => {
      return value.data.data;
    }).catch(err);
  },

};

export default {
  state,
  mutations,
  actions,
  getters
}

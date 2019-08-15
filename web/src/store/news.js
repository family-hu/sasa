import axios,{ config , orgConfig} from '../http.js'

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
  //获取资讯列表
  newsList:({ commit }, request) => {
    return axios.post("newsList.mo", request, config).then(value => {
      return value.data.newsList;
    }).catch(err);
  },

  //获取资讯详情
  newsDetail:({ commit }, request) => {
    return axios.post("news/detail", request, orgConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  //资讯详情分享二维码
  newsShare: ({ commit }, request) => {
    return axios.post("news/share", request, orgConfig).then(value => {
      return value.data;
    }).catch(err);
  },

  // //获取机构详情
  // orgDetail:({ commit }, request) => {
  //   return axios.post("newsAuthorOrgGet.mo", request, config).then(value => {
  //     return value.data.orgObj;
  //   }).catch(err);
  // },

  // //获取医生详情
  // servInfoGet:({ commit }, request) => {
  //   return axios.post("servInfoGet.mo", request, config).then(value => {
  //     return value.data.servObj;
  //   }).catch(err);
  // },

};

export default {
  state,
  mutations,
  actions,
  getters
}

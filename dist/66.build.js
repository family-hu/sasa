webpackJsonp([66],{202:function(t,s,a){"use strict";function e(t){a(598)}Object.defineProperty(s,"__esModule",{value:!0});var i=a(413),r=a(600),l=a(44),n=e,c=l(i.a,r.a,!1,n,"data-v-54ba8c96",null);s.default=c.exports},413:function(t,s,a){"use strict";var e=a(11);s.a={data:function(){return{orderDetail:{},orderId:this.$route.query.orderId}},computed:{acceptName:function(){var t=this.orderDetail.goodsSnapObj;if(t){var s=t.acceptUserObj;if(s)return s.userName}return""},orderStatus:function(){return parseInt(this.orderDetail.status.value)},serviceTimes:function(){var t=this.orderDetail.goodsSnapObj;return t?"￥"+t.price+"/1次":""},goodPrice:function(){var t=this.orderDetail.goodsSnapObj;return t?"￥"+t.price:""},statusName:function(){var t=this.orderDetail.status.value,s=this.orderDetail.isEnd.value,a=this.orderDetail.cancelStatus.value;if(t==e.r||t==e.q)return"已完成";if("0"==s){if(t==e.t)return"未付款";if(t==e.s)return"待确认";if(t==e.p)return"咨询中"}else{if("0"!=a)return"已完成(撤销)";if(t==e.t)return"已完成(未付款)";if(t==e.s)return"已完成(未受理)";if(t==e.p)return"已完成"}return"已完成"}},created:function(){var t=sessionStorage.getItem("orderDetail");t&&(this.orderDetail=JSON.parse(t))}}},598:function(t,s,a){var e=a(599);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a(1)("b7e6074e",e,!0,{})},599:function(t,s,a){s=t.exports=a(0)(!1),s.push([t.i,".cell[data-v-54ba8c96]{background:#0093ff;padding:12px 0;text-align:center}.textW[data-v-54ba8c96]{font-size:14px;color:#fff;font-weight:300}.cell0[data-v-54ba8c96]{background:#fff;padding:10px 16px}.textb[data-v-54ba8c96]{font-size:13px;color:#000;font-weight:400}.textg[data-v-54ba8c96]{font-size:12px;color:#b8b8b8;font-weight:400;float:right}.textbb[data-v-54ba8c96]{font-size:12px}.textgg[data-v-54ba8c96]{font-size:12px;color:#b8b8b8}",""])},600:function(t,s,a){"use strict";var e=function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticStyle:{position:"relative"}},[a("div",{staticClass:"cell"},[a("span",{staticClass:"textW"},[t._v(t._s(t.statusName))]),t._v(" "),a("br")]),t._v(" "),a("div",{staticClass:"cell0"},[a("span",{staticClass:"textb"},[t._v("服务医生")]),t._v(" "),a("span",{staticClass:"textg"},[t._v(t._s(t.acceptName))])]),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),a("div",{staticClass:"cell0"},[a("span",{staticClass:"textb"},[t._v("患者姓名")]),t._v(" "),a("span",{staticClass:"textg"},[t._v(t._s(t.orderDetail.servName))])]),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),t._m(0),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),a("div",{staticClass:"cell0"},[a("span",{staticClass:"textb"},[t._v("服务期限")]),t._v(" "),a("span",{staticClass:"textg"},[t._v(t._s(t.serviceTimes))])]),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),a("div",{staticClass:"cell0"},[a("span",{staticClass:"textb"},[t._v("订单总价")]),t._v(" "),a("span",{staticClass:"textg",staticStyle:{color:"rgba(0,147,255,1)"}},[t._v(t._s(t.goodPrice))])]),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),a("div",{staticStyle:{display:"inline-block","margin-top":"10px",position:"absolute",left:"0",right:"0"}},[t._m(1),t._v(" "),a("hr",{staticClass:"full-line",attrs:{size:"1"}}),t._v(" "),a("div",{staticClass:"cell0"},[a("div",{staticStyle:{"padding-top":"12px","line-height":"15px","margin-bottom":"5px"}},[a("span",{staticClass:"textbb"},[t._v("订单编号:")]),t._v(" "),a("span",{staticClass:"textgg"},[t._v(t._s(t.orderDetail.servId.value))])]),t._v(" "),a("div",{staticStyle:{"padding-top":"4px","line-height":"15px","margin-bottom":"5px"}},[a("span",{staticClass:"textbb"},[t._v("下单时间:")]),t._v(" "),a("span",{staticClass:"textgg"},[t._v(t._s(t.orderDetail.createTime))])]),t._v(" "),t.orderStatus>1?a("div",{staticStyle:{"padding-top":"4px","line-height":"15px","margin-bottom":"5px"}},[a("span",{staticClass:"textbb"},[t._v("付款时间:")]),t._v(" "),a("span",{staticClass:"textgg"},[t._v(t._s(t.orderDetail.payTime))])]):t._e(),t._v(" "),t.orderStatus>2?a("div",{staticStyle:{"padding-top":"4px","line-height":"15px","margin-bottom":"5px"}},[a("span",{staticClass:"textbb"},[t._v("服务时间:")]),t._v(" "),a("span",{staticClass:"textgg"},[t._v(t._s(t.orderDetail.acceptTime))])]):t._e()])])])},i=[function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"cell0"},[a("span",{staticClass:"textb"},[t._v("服务类型")]),t._v(" "),a("span",{staticClass:"textg"},[t._v("在线咨询")])])},function(){var t=this,s=t.$createElement,a=t._self._c||s;return a("div",{staticClass:"cell0"},[a("div",{staticStyle:{"padding-bottom":"10px"}},[a("span",{staticClass:"textb"},[t._v("其他信息")])])])}],r={render:e,staticRenderFns:i};s.a=r}});
//# sourceMappingURL=66.build.js.map
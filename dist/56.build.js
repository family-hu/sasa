webpackJsonp([56],{215:function(t,i,e){"use strict";function a(t){e(665)}Object.defineProperty(i,"__esModule",{value:!0});var s=e(433),c=e(667),o=e(44),n=a,r=o(s.a,c.a,!1,n,"data-v-6038bcd7",null);i.default=r.exports},239:function(t,i,e){"use strict";i.a={packPerson:"./static/img/ic_pack_personal.png",packTeam:"./static/img/ic_pack_team.png",packDept:"./static/img/ic_pack_org.png",orgPubImg:"./static/img/ic_org_bg.png",orgImg:"./static/img/ic_org_logo.png",appIconDoctor:"./static/img/app_icon_doctor.png",appIconUser:"./static/img/app_icon.png",topBg:"./static/img/topbg.png",payWx:"./static/img/ic_pay_wechat.png",docMale:"./static/img/ic_doc_male.png",docFeMale:"./static/img/ic_doc_female.png",focusImg:"./static/img/ic_focused.png",unfocusImg:"./static/img/ic_unfocus.png",yuyueImg:"./static/img/ic_yuyue.png",reportImg:"./static/img/ic_report.png",askImg:"./static/img/ic_ask.png",serviceImg:"./static/img/ic_services.png",yuyueGrayImg:"./static/img/ic_yuyue_gray.png",askGrayImg:"./static/img/ic_ask_grey.png",serviceGrayImg:"./static/img/ic_services_grey.png",starImg:"./static/img/ic_rating_all.png",docRectMale:"./static/img/ic_rect_male.png",docRectFeMale:"./static/img/ic_rect_female.png",defaultAva:"./static/img/ic_default_ava.png",appointBg:"./static/img/ic_appoint_bg.png",rulePhoto:"./static/img/ic_rule.png",arrowDown:"./static/img/ic_arrow_down.png",arrowRight:"./static/img/arrow_right.png",arrowR:"./static/img/ic_arrow_right.png",home:"./static/img/home.png",news:"./static/img/news.png",service:"./static/img/service.png",mine:"./static/img/mine.png",doctor:"./static/img/doctor.png",mineBg:"./static/img/mine_bg.png",homeAppoint:"./static/img/home_appoint.png",homeDoctor:"./static/img/home_doctor.png",homeOnline:"./static/img/home_online.png",homeOrder:"./static/img/home_order.png",notice:"./static/img/notice.png",groupUser:"./static/img/ic_group_user.png",groupDoc:"./static/img/ic_group_doc.png",groupDocPatient:"./static/img/ic_group_doc_patient.png",shareImg:"./static/img/share.png",consultationHomeDefault:"./static/img/ic_consulation_home_default.png",consultationHomeSelected:"./static/img/ic_consulation_home_selected.png",consultationMineDefault:"./static/img/ic_consulation_mine_default.png",consultationMineSelected:"./static/img/ic_consulation_mine_selected.png",consultationSmallImg:"./static/img/ic_consultation_small_default.png",consultationBigImg:"./static/img/ic_consultation_big_default.png",consultationWant:"./static/img/ic_want.png",consultationWanted:"./static/img/ic_wanted.png",consultationPaySuccess:"./static/img/ic_sign_success.png",choose:"./static/img/choose.png",chosen:"./static/img/choosen.png",arrowWhiteRight:"./static/img/ic_arrow_right_white.png",consultationMineBg:"./static/img/ic_mine_bg.png",consultationEmpty:"./static/img/ic_empty.png",house_n:"./static/img/house_n.png",house_s:"./static/img/house_s.png",shopping_n:"./static/img/shopping_n.png",shopping_s:"./static/img/shopping_s.png",group_n:"./static/img/group_n.png",group_s:"./static/img/group_s.png",msg_n:"./static/img/msg_n.png",msg_s:"./static/img/msg_s.png",my_n:"./static/img/my_n.png",my_s:"./static/img/my_s.png",focusLookImg:"./static/img/look@2.png",unfocusLookImg:"./static/img/no_look@2.png",assistantHeadImg:"./static/img/assistant_head_img.png",msgTip:"./static/img/msg_tip.png",msgDot:"./static/img/msg_dot.png",systemMsg:"./static/img/system_msg.png",noticeMsg:"./static/img/notice_msg.png",familyDoc:"./static/img/family_doc.png"}},433:function(t,i,e){"use strict";var a=e(239);e(11);i.a={data:function(){return{drId:this.$route.query.drId,servId:this.$route.query.servId,orgId:this.$route.query.orgId,orgNames:this.$route.query.orgNames,serviceDetail:[],selected:"overview",codeShade:!1,docCode:""}},computed:{servImgUrl:function(){return this.serviceDetail.servImgUrl?this.serviceDetail.servImgUrl:a.a.orgPubImg},docImg:function(){var t=a.a.docRectMale;if(this.serviceDetail.basUserObj)t=this.serviceDetail.basUserObj.photoUrl;else if(this.serviceDetail.basUserObj){var i=this.serviceDetail.basUserObj.gender.value;"0"==i&&(t=a.a.docRectFeMale)}return t},orgImg:function(){return this.serviceDetail.orgObj?this.serviceDetail.orgObj.photoUrl:a.a.orgImg},title:function(){return this.serviceDetail.basUserObj?this.serviceDetail.basUserObj.titlesName+" "+this.serviceDetail.basUserObj.departmentName:""},orgNames:function(){return this.serviceDetail.orgObj?this.serviceDetail.orgObj.orgNames:""},days:function(){return this.serviceDetail.days?this.serviceDetail.days.value:""},tags:function(){if(this.serviceDetail.tags){var t=this.serviceDetail.tags.split(",");return t&&t.length>3&&(t=t.splice(0,3)),t}return[]}},mounted:function(){var t=this;setTimeout(function(){t.wxShareCallback(t.serviceDetail)},1e3)},methods:{wxShareCallback:function(t){var i=window.location.href.split("#")[0],e={title:t.servName,desc:"好友给你推荐了"+t.servName,link:i,imgUrl:t.servImgUrl?t.servImgUrl:"http://yun.sinoylb.com/static/img/share@2x.png"};this.wxapi.wxShare(i,e)},tagColor:function(t){var i=t%3;return 0==i?"#0076FF":1==i?"#FF001F":"#00B48C"},servInfoGet:function(){var t=this,i=this;this.$indicator.open();var e={servId:this.servId};this.$store.dispatch("servInfoGet",e).then(function(e){i.serviceDetail=e,document.title=e.acceptName?e.acceptName+"的服务包":"服务包详情",t.orgId=e.orgObj.orgId.value,t.orgNames=e.orgObj.orgNames}).catch(function(i){t.$toast(i.message)}).finally(function(){t.$indicator.close()})},goBuy:function(){this.serviceDetail.servId&&this.$router.push({path:"serviceSubmitPay",query:{servId:this.servId,price:this.serviceDetail.price,acceptUser:this.serviceDetail.acceptId.value,orgId:this.serviceDetail.orgObj.orgId.value}})},backHome:function(){this.$router.push({path:"home",query:{orgId:this.orgId,orgNames:this.orgNames}})},backMine:function(){this.$router.push({path:"mine",query:{orgId:this.orgId,orgNames:this.orgNames}})},focusDoc:function(){var t=this,i={docid:[this.drId]},e=this;this.$store.dispatch("doctorCode",i).then(function(i){i.docList&&(t.codeShade=!0,e.docCode=i.docList[0].codeimage)}).catch(function(i){t.$toast(i.message)})},other_hide:function(){this.codeShade=!1}},created:function(){this.servInfoGet()}}},665:function(t,i,e){var a=e(666);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(1)("e78d469a",a,!0,{})},666:function(t,i,e){i=t.exports=e(0)(!1),i.push([t.i,".shade[data-v-6038bcd7]{position:fixed;top:0;bottom:0;width:100%;background:rgba(0,0,0,.5);z-index:300}.doctorCode[data-v-6038bcd7]{position:fixed;top:50%;left:50%;margin-left:-85px;margin-top:-85px;width:170px;height:170px;z-index:1000;text-align:center}.doctorCode img[data-v-6038bcd7]{width:170px;height:170px}.doctorCode p[data-v-6038bcd7]{font-size:15px;color:#fff;margin-top:10px}.head_bar[data-v-6038bcd7]{width:100%;height:43px;border-bottom:1px solid #eee;padding:0 11px 0 16px;background:#fff}.head_bar img[data-v-6038bcd7]{width:20px;height:20px;margin-right:5px}.head_bar span[data-v-6038bcd7]{max-width:150px;word-break:break-all;text-overflow:ellipsis;display:-webkit-box;-webkit-box-orient:vertical;-webkit-line-clamp:1;overflow:hidden}.flex_box[data-v-6038bcd7]{display:flex;align-items:center}.mint-navbar[data-v-6038bcd7]{width:100%;display:flex}.flex_title[data-v-6038bcd7]{position:fixed;top:0;width:100%;z-index:200}.flex_title a[data-v-6038bcd7]{flex:1}.mint-navbar .mint-tab-item[data-v-6038bcd7]{padding:14px 0}[data-v-6038bcd7] .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{color:#0076ff;font-weight:500}[data-v-6038bcd7] .mint-navbar .mint-tab-item.is-selected{border:none}[data-v-6038bcd7] .mint-tab-item-label{font-size:16px!important;color:rgba(4,11,28,.67)}.main[data-v-6038bcd7]{margin-top:42px}.servImgBg[data-v-6038bcd7]{width:100%;height:137px}.center[data-v-6038bcd7]{position:absolute;top:120px;padding:32px 16px 60px;width:100%;box-sizing:border-box}.box[data-v-6038bcd7]{background:#fff;padding:16px;box-shadow:0 0 7px 1px rgba(4,11,28,.06);border-radius:4px;margin-bottom:10px}.title[data-v-6038bcd7]{font-size:18px;color:#040b1c;font-weight:600}.middle[data-v-6038bcd7]{text-align:center;margin-bottom:10px}.price[data-v-6038bcd7]{font-size:16px;color:red}.desp[data-v-6038bcd7]{font-size:14px;color:#040b1c;opacity:.5}.tag[data-v-6038bcd7]{margin-top:5px}.tag span[data-v-6038bcd7]{display:inline-block;color:#0076ff;border:1px solid rgba(0,118,255,.5);padding:0 5px;font-size:10px;border-radius:12px;margin-bottom:10px;margin-right:5px}.name[data-v-6038bcd7]{opacity:.5}.name[data-v-6038bcd7],.time[data-v-6038bcd7]{font-size:14px;color:#040b1c}.html_css[data-v-6038bcd7]{text-align:justify}.html_css img[data-v-6038bcd7]{max-width:100%!important;margin:0!important;padding:0!important;height:auto}.el-collapse[data-v-6038bcd7]{border:none}.collapse_text[data-v-6038bcd7]{color:rgba(4,11,28,.5)}[data-v-6038bcd7] .el-collapse-item__content{padding-bottom:16px!important}.list_num[data-v-6038bcd7]{width:18px;height:18px;background:#0076ff;border-radius:50%;color:#fff;font-size:14px;font-weight:600;margin-right:10px;line-height:18px;text-align:center;padding-right:3px;box-sizing:border-box}.servItemNum[data-v-6038bcd7]{font-size:16px;color:#0076ff;margin-left:5px}.doc_box[data-v-6038bcd7]{display:flex}.doc_box img[data-v-6038bcd7]{width:63px;height:63px;margin-right:10px}.btn_box[data-v-6038bcd7]{position:fixed;bottom:10px;width:100%;height:40px;padding:0 16px;box-sizing:border-box}.btn_box .btn[data-v-6038bcd7]{display:block;text-align:center;width:100%;height:40px;line-height:40px;color:#fff;border-radius:20px;background:#0076ff;font-size:16px;font-weight:600}.servItemPrice[data-v-6038bcd7]{position:absolute;right:55px;color:rgba(4,11,28,.5);font-size:14px}",""])},667:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"flex_title"},[e("div",{staticClass:"head_bar flex-b"},[e("div",{staticClass:"flex_box",on:{click:t.backHome}},[e("img",{attrs:{src:"/static/img/bar_back_home@2x.png",alt:""}}),t._v(" "),e("span",[t._v(t._s(t.orgNames))])]),t._v(" "),e("div",[e("img",{attrs:{src:"/static/img/bar_back_mine@2x.png",alt:""},on:{click:t.backMine}})])]),t._v(" "),e("mt-navbar",{model:{value:t.selected,callback:function(i){t.selected=i},expression:"selected"}},[e("a",{attrs:{href:"#overview"}},[e("mt-tab-item",{attrs:{id:"overview"}},[t._v("服务概述")])],1),t._v(" "),e("a",{attrs:{href:"#detail"}},[e("mt-tab-item",{attrs:{id:"detail"}},[t._v("服务详情")])],1),t._v(" "),e("a",{attrs:{href:"#content"}},[e("mt-tab-item",{attrs:{id:"content"}},[t._v("服务内容")])],1)])],1),t._v(" "),e("div",{staticClass:"main"},[e("img",{staticClass:"servImgBg",attrs:{src:t.servImgUrl,alt:""}}),t._v(" "),e("div",{staticClass:"center"},[e("div",{staticClass:"box",attrs:{id:"overview"}},[e("div",{staticClass:"flex-b"},[e("p",{staticClass:"title"},[t._v(t._s(t.serviceDetail.servName))]),t._v(" "),e("span",{staticClass:"price"},[t._v(t._s(t.serviceDetail.price)+"元")])]),t._v(" "),e("div",{staticClass:"desp"},[t._v(t._s(t.serviceDetail.desp))]),t._v(" "),e("div",{staticClass:"tag"},t._l(t.tags,function(i,a){return e("span",{key:a},[t._v(t._s(i))])})),t._v(" "),e("div",{staticClass:"flex-b"},[e("p",{staticClass:"name"},[t._v("服务有效期")]),t._v(" "),e("p",{staticClass:"time"},[t._v(t._s(t.days)+"天")])]),t._v(" "),e("div",{staticClass:"flex-b"},[e("p",{staticClass:"name"},[t._v("适用人群")]),t._v(" "),e("p",{staticClass:"time"},[t._v(t._s(t.serviceDetail.ptName))])]),t._v(" "),e("div",{staticClass:"flex-b"},[e("p",{staticClass:"name"},[t._v("适用范围")]),t._v(" "),e("p",{staticClass:"time"},[t._v(t._s(t.serviceDetail.scopeCustom))])])]),t._v(" "),e("div",{staticClass:"box",attrs:{id:"detail"}},[e("h3",{staticClass:"title middle"},[t._v("服务详情")]),t._v(" "),e("div",{staticClass:"html_css",domProps:{innerHTML:t._s(t.serviceDetail.useProcess)}},[t._v(t._s(t.serviceDetail.useProcess))])]),t._v(" "),e("div",{staticClass:"box",attrs:{id:"content"}},[e("h3",{staticClass:"title middle"},[t._v("服务内容")]),t._v(" "),e("div",[e("el-collapse",{attrs:{accordion:""}},t._l(t.serviceDetail.servItemList,function(i,a){return e("el-collapse-item",{key:a,attrs:{name:a+1}},[e("template",{slot:"title"},[e("em",{staticClass:"list_num"},[t._v(t._s(a+1))]),t._v("\n                  "+t._s(i.servItemName)+"\n                  "),e("span",{staticClass:"servItemNum"},[t._v("x"+t._s(i.servItemNum.value))]),t._v(" "),e("div",{staticClass:"servItemPrice"},[t._v("¥"+t._s(i.servItemPrice.value)+"/次")])]),t._v(" "),e("div",{staticClass:"collapse_text"},[t._v(t._s(i.servItemContend))])],2)}))],1)]),t._v(" "),e("div",{staticClass:"box"},[e("h3",{staticClass:"title middle"},[t._v("关于医生")]),t._v(" "),e("div",{staticClass:"doc_box"},[e("img",{attrs:{src:t.docImg,alt:""}}),t._v(" "),e("div",[e("p",{staticClass:"title"},[t._v(t._s(t.serviceDetail.acceptName))]),t._v(" "),t.orgNames?e("p",[t._v(t._s(t.orgNames))]):t._e(),t._v(" "),e("p",[t._v(t._s(t.title))])])])])])]),t._v(" "),e("div",{staticClass:"btn_box"},[e("a",{staticClass:"btn",attrs:{href:"javascript:void(0);"},on:{click:t.goBuy}},[t._v("立即购买")])]),t._v(" "),t.codeShade?e("div",{staticClass:"shade",on:{click:t.other_hide}}):t._e(),t._v(" "),t.codeShade?e("div",{staticClass:"doctorCode"},[e("img",{attrs:{src:t.docCode,alt:""}}),t._v(" "),e("p",[t._v("长按识别，关注公众号")])]):t._e()])},s=[],c={render:a,staticRenderFns:s};i.a=c}});
//# sourceMappingURL=56.build.js.map
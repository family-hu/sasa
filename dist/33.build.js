webpackJsonp([33],{233:function(t,i,e){"use strict";function a(t){e(752)}Object.defineProperty(i,"__esModule",{value:!0});var s=e(458),n=e(754),o=e(44),c=a,r=o(s.a,n.a,!1,c,"data-v-2d163ad7",null);i.default=r.exports},239:function(t,i,e){"use strict";i.a={packPerson:"./static/img/ic_pack_personal.png",packTeam:"./static/img/ic_pack_team.png",packDept:"./static/img/ic_pack_org.png",orgPubImg:"./static/img/ic_org_bg.png",orgImg:"./static/img/ic_org_logo.png",appIconDoctor:"./static/img/app_icon_doctor.png",appIconUser:"./static/img/app_icon.png",topBg:"./static/img/topbg.png",payWx:"./static/img/ic_pay_wechat.png",docMale:"./static/img/ic_doc_male.png",docFeMale:"./static/img/ic_doc_female.png",focusImg:"./static/img/ic_focused.png",unfocusImg:"./static/img/ic_unfocus.png",yuyueImg:"./static/img/ic_yuyue.png",reportImg:"./static/img/ic_report.png",askImg:"./static/img/ic_ask.png",serviceImg:"./static/img/ic_services.png",yuyueGrayImg:"./static/img/ic_yuyue_gray.png",askGrayImg:"./static/img/ic_ask_grey.png",serviceGrayImg:"./static/img/ic_services_grey.png",starImg:"./static/img/ic_rating_all.png",docRectMale:"./static/img/ic_rect_male.png",docRectFeMale:"./static/img/ic_rect_female.png",defaultAva:"./static/img/ic_default_ava.png",appointBg:"./static/img/ic_appoint_bg.png",rulePhoto:"./static/img/ic_rule.png",arrowDown:"./static/img/ic_arrow_down.png",arrowRight:"./static/img/arrow_right.png",arrowR:"./static/img/ic_arrow_right.png",home:"./static/img/home.png",news:"./static/img/news.png",service:"./static/img/service.png",mine:"./static/img/mine.png",doctor:"./static/img/doctor.png",mineBg:"./static/img/mine_bg.png",homeAppoint:"./static/img/home_appoint.png",homeDoctor:"./static/img/home_doctor.png",homeOnline:"./static/img/home_online.png",homeOrder:"./static/img/home_order.png",notice:"./static/img/notice.png",groupUser:"./static/img/ic_group_user.png",groupDoc:"./static/img/ic_group_doc.png",groupDocPatient:"./static/img/ic_group_doc_patient.png",shareImg:"./static/img/share.png",consultationHomeDefault:"./static/img/ic_consulation_home_default.png",consultationHomeSelected:"./static/img/ic_consulation_home_selected.png",consultationMineDefault:"./static/img/ic_consulation_mine_default.png",consultationMineSelected:"./static/img/ic_consulation_mine_selected.png",consultationSmallImg:"./static/img/ic_consultation_small_default.png",consultationBigImg:"./static/img/ic_consultation_big_default.png",consultationWant:"./static/img/ic_want.png",consultationWanted:"./static/img/ic_wanted.png",consultationPaySuccess:"./static/img/ic_sign_success.png",choose:"./static/img/choose.png",chosen:"./static/img/choosen.png",arrowWhiteRight:"./static/img/ic_arrow_right_white.png",consultationMineBg:"./static/img/ic_mine_bg.png",consultationEmpty:"./static/img/ic_empty.png",house_n:"./static/img/house_n.png",house_s:"./static/img/house_s.png",shopping_n:"./static/img/shopping_n.png",shopping_s:"./static/img/shopping_s.png",group_n:"./static/img/group_n.png",group_s:"./static/img/group_s.png",msg_n:"./static/img/msg_n.png",msg_s:"./static/img/msg_s.png",my_n:"./static/img/my_n.png",my_s:"./static/img/my_s.png",focusLookImg:"./static/img/look@2.png",unfocusLookImg:"./static/img/no_look@2.png",assistantHeadImg:"./static/img/assistant_head_img.png",msgTip:"./static/img/msg_tip.png",msgDot:"./static/img/msg_dot.png",systemMsg:"./static/img/system_msg.png",noticeMsg:"./static/img/notice_msg.png",familyDoc:"./static/img/family_doc.png"}},294:function(t,i,e){"use strict";var a=e(239);i.a={data:function(){return{rateScore:0}},props:["evaItem"],computed:{userImg:function(){return this.evaItem.photoUrl?this.evaItem.photoUrl:a.a.defaultAva},userName:function(){if(this.evaItem){if(this.evaItem.nickName)return this.evaItem.nickName;if(this.evaItem.userName)return this.evaItem.userName}return"-"}},filters:{dataFormat:function(t){return new Date(Date.parse(t.replace(/-/g,"/"))).format("MM-dd")},commentFilter:function(t){return t||"无评价内容"}},methods:{average:function(){var t,i=(t=[]).concat.apply(t,arguments);return i.reduce(function(t,i){return t+i},0)/i.length}},mounted:function(){this.rateScore=this.average(this.evaItem.scoreList)}}},371:function(t,i,e){"use strict";function a(t){e(372)}var s=e(294),n=e(374),o=e(44),c=a,r=o(s.a,n.a,!1,c,"data-v-3b43b8b4",null);i.a=r.exports},372:function(t,i,e){var a=e(373);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(1)("ab4bb418",a,!0,{})},373:function(t,i,e){i=t.exports=e(0)(!1),i.push([t.i,".icon[data-v-3b43b8b4]{width:40px;height:40px;border-radius:50%;float:left}.titlecs[data-v-3b43b8b4]{font-size:14px;font-weight:400;color:#222;line-height:14px}.namecs[data-v-3b43b8b4]{font-size:15px;font-weight:700;color:#222;line-height:25px}.jibing[data-v-3b43b8b4]{display:inline-block;font-size:14px;padding:0 9px;text-align:center;margin-right:15px;border:1px solid #ccc;line-height:30px;color:#222;white-space:nowrap;margin-top:10px}",""])},374:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticStyle:{background:"white",padding:"15px"}},[e("img",{staticClass:"icon",attrs:{src:t.userImg}}),t._v(" "),e("div",{staticStyle:{"padding-left":"50px"}},[e("div",[e("span",{staticClass:"namecs"},[t._v(t._s(t.userName))]),t._v(" "),e("span",{staticClass:"titlecs",staticStyle:{float:"right"}},[t._v(t._s(t._f("dataFormat")(t.evaItem.timeCreate)))]),t._v(" "),e("el-rate",{attrs:{disabled:"","text-color":"#ff9900","score-template":"{value}","allow-half":""},model:{value:t.rateScore,callback:function(i){t.rateScore=i},expression:"rateScore"}}),t._v(" "),t._l(t.evaItem.keywords,function(i){return e("span",{staticClass:"jibing"},[t._v(t._s(i))])})],2),t._v(" "),e("div",{staticClass:"titlecs",staticStyle:{"margin-top":"10px"}},[t._v(t._s(t._f("commentFilter")(t.evaItem.content))+" ")])])]),t._v(" "),e("hr",{staticClass:"full-line"})])},s=[],n={render:a,staticRenderFns:s};i.a=n},458:function(module,__webpack_exports__,__webpack_require__){"use strict";function _defineProperty(t,i,e){return i in t?Object.defineProperty(t,i,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[i]=e,t}var __WEBPACK_IMPORTED_MODULE_0_vuex__=__webpack_require__(12),__WEBPACK_IMPORTED_MODULE_1__static_js_imgmap_js__=__webpack_require__(239),__WEBPACK_IMPORTED_MODULE_2__ConsultationEvaItem_vue__=__webpack_require__(371),_extends=Object.assign||function(t){for(var i=1;i<arguments.length;i++){var e=arguments[i];for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&(t[a]=e[a])}return t};__webpack_exports__.a={data:function(){return{pevalId:this.$route.query.pevalId,consultationItem:{},popupVisible:!1,porderId:"",paySuccess:!1,pfavId:null,evaList:[],keywords:[]}},components:{consultationEvaItem:__WEBPACK_IMPORTED_MODULE_2__ConsultationEvaItem_vue__.a},filters:{lossValue:function(t){if(t)return t.value}},computed:_extends({},Object(__WEBPACK_IMPORTED_MODULE_0_vuex__.c)(["loginData","loginUrl"]),{consultationPrice:function(){if(this.consultationItem.pevalId){return"0"==this.consultationItem.ifPay.value?"免费":"¥"+this.consultationItem.price.value}},consultationPriceOld:function(){return this.consultationItem.price1?this.consultationItem.price1.value:""},consultationWantImg:function(){return this.pfavId?__WEBPACK_IMPORTED_MODULE_1__static_js_imgmap_js__.a.consultationWanted:__WEBPACK_IMPORTED_MODULE_1__static_js_imgmap_js__.a.consultationWant},consultationImg:function(){return this.consultationItem.picWide?this.consultationItem.picWide:__WEBPACK_IMPORTED_MODULE_1__static_js_imgmap_js__.a.consultationBigImg},consultationPaySuccess:function(){return __WEBPACK_IMPORTED_MODULE_1__static_js_imgmap_js__.a.consultationPaySuccess}}),methods:_extends({},Object(__WEBPACK_IMPORTED_MODULE_0_vuex__.d)(["setRefreshOrder","setRefreshCollect"]),{collect:function(){var t=this;if(this.loginData.userObj){var i={},e="";this.pfavId?(i={pfavId:this.pfavId},e="favoriteDel"):(i={pevalId:this.pevalId,userId:this.loginData.userObj.userId.value},e="favoriteAdd"),this.$store.dispatch(e,i).then(function(i){i&&i.pfavId?(t.pfavId=i.pfavId.value,t.$toast("操作成功，可在「我的」查看想测内容")):(t.pfavId=null,t.$toast("取消想测成功")),t.setRefreshCollect(!0)}).catch(function(i){t.$toast(i.message)})}else this.myUtils.wxLogin()},showDialog:function(t,i){var e=this,a="0"!=t;this.$messagebox(_defineProperty({cancelButtonText:"去支付",confirmButtonText:a?"查看报告":"继续答题",message:a?"您已经购买过这道测试题，是否再次购买？":"该测评您还有未完成的记录，是否继续答题？",showCancelButton:!0},"showCancelButton",!0)).then(function(s){"cancel"==s?e.showBottom():"confirm"==s&&(a?e.goReport(t,i):(e.porderId=i,e.startTest()))})},showBottom:function(){this.popupVisible=!this.popupVisible,this.paySuccess=!1},goReport:function(t,i){this.$router.push({path:"consultationResult",query:{prepId:t,porderId:i,pevalId:this.pevalId}})},startBuy:function(){var t=this;if(this.loginData.userObj){var i={pevalId:this.pevalId,userId:this.loginData.userObj.userId.value};this.$store.dispatch("orderCheck",i).then(function(i){if(i){var e=i.prepId.value,a=i.porderId.value;"0"!=e||"0"!=a?t.showDialog(e,a):t.showBottom()}else t.showBottom()}).catch(function(i){t.$toast(i.message)})}else this.myUtils.wxLogin()},startTest:function(){this.popupVisible=!1,this.$router.push({path:"consultationTest",query:{pevalId:this.pevalId,porderId:this.porderId}})},submitOrder:function(){var t=this;if(this.consultationItem.pevalId){var i=this.consultationItem.ifPay.value;if(this.loginData.userObj)if(this.porderId)"0"==i?this.orderPaySuccess():(this.$indicator.open(),this.wxPay());else{this.$indicator.open();var e={pevalId:this.pevalId,price:this.consultationItem.price.value,userId:this.loginData.userObj.userId.value,orgId:this.consultationItem.orgId.value};this.$store.dispatch("orderCreate",e).then(function(e){t.porderId=e.porderId.value,"0"==i?(t.orderPaySuccess(),t.$indicator.close()):t.wxPay()}).catch(function(i){t.$toast(i.message),t.$indicator.close()})}else this.myUtils.wxLogin()}},orderPaySuccess:function(){this.paySuccess=!0,this.setRefreshOrder(!0)},wxPay:function wxPay(){var _this5=this,price=this.consultationItem.price.value,request={busiId:this.porderId,busiType:2000105,desp:"心理咨询",drId:0,money:price,moneyRmb:price,orgId:this.consultationItem.orgId.value,tradeMode:8101104,userId:this.loginData.userObj.userId.value};this.$store.dispatch("userConsume",request).then(function(data){var request=data.data;request?(request=eval("("+request+")"),_this5.invokeWx(request)):_this5.orderPaySuccess()}).catch(function(t){_this5.$toast(t.message)}).finally(function(){_this5.$indicator.close()})},onBridgeReady:function(t){var i=this;WeixinJSBridge.invoke("getBrandWCPayRequest",t,function(t){"get_brand_wcpay_request:ok"==t.err_msg?i.orderPaySuccess():i.$toast("支付失败")})},invokeWx:function(t){"undefined"==typeof WeixinJSBridge?document.addEventListener?document.addEventListener("WeixinJSBridgeReady",this.onBridgeReady(t),!1):document.attachEvent&&(document.attachEvent("WeixinJSBridgeReady",this.onBridgeReady(t)),document.attachEvent("onWeixinJSBridgeReady",this.onBridgeReady(t))):this.onBridgeReady(t)},commentListGet:function(){var t=this,i={pageNum:1,pageSize:2,pevalId:this.pevalId};this.$store.dispatch("commentList",i).then(function(i){t.evaList=i.dataList,t.keywords=i.keywords}).catch(function(i){t.$toast(i.message)})},consultationGet:function(){var t=this;this.$store.dispatch("evalListQuery",{pevalId:this.pevalId,orgId:this.$store.getters.getOrgId}).then(function(i){i.dataList&&i.dataList.length>0&&(t.consultationItem=i.dataList[0],document.title=t.consultationItem.title)}).catch(function(i){t.$toast(i.message)})},toEvaList:function(){this.$router.push({path:"consultationEvaList",query:this.$route.query})}}),mounted:function(){var t=this;if(this.loginData.userObj){var i={pevalId:this.pevalId,userId:this.loginData.userObj.userId.value};this.$store.dispatch("favoriteCheck",i).then(function(i){i&&i.pfavId?t.pfavId=i.pfavId.value:t.pfavId=null}).catch(function(i){t.$toast(i.message)})}},created:function(){this.consultationGet(),this.commentListGet()}}},752:function(t,i,e){var a=e(753);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);e(1)("1af5ecc6",a,!0,{})},753:function(t,i,e){i=t.exports=e(0)(!1),i.push([t.i,".head[data-v-2d163ad7]{background:#fff;padding:16px 0;text-align:center}.bottom[data-v-2d163ad7]{background:#fff;height:70px;position:fixed;bottom:0}.wrap[data-v-2d163ad7]{margin-bottom:70px}.title[data-v-2d163ad7]{font-size:20px;color:#333}.bold[data-v-2d163ad7]{font-weight:700}.price[data-v-2d163ad7]{font-size:15px;color:red}.priceOld[data-v-2d163ad7]{padding-left:10px;font-size:15px;font-weight:400;color:#999;text-decoration:line-through}.text[data-v-2d163ad7]{font-size:14px;color:#000}.title1[data-v-2d163ad7]{color:#333;font-size:16px;text-align:center}.content[data-v-2d163ad7]{font-size:14px;color:#333;font-weight:400;padding:10px 0}.tip[data-v-2d163ad7]{background-color:#f2f2f2;padding:16px 12px}.text6[data-v-2d163ad7]{font-size:15px;font-weight:500;color:#333;display:inline-block;text-align:center;margin-top:25px;padding-left:8px}.btn[data-v-2d163ad7]{display:inline-block;color:#fffaf0;float:right;margin-right:20px;margin-top:13px;text-align:center;width:60%;line-height:44px}.btn[data-v-2d163ad7],.pay[data-v-2d163ad7]{font-size:20px;font-weight:500;background-color:#0093ff;height:44px;border-radius:22px}.pay[data-v-2d163ad7]{color:#fff;margin-top:23px;width:100%;border-width:0;outline:none}.img[data-v-2d163ad7]{width:54px;height:54px;position:absolute;left:0;right:0;margin:0 auto}.test[data-v-2d163ad7]{font-size:20px;font-weight:500;color:#fffaf0;background-color:#0093ff;height:44px;border-radius:22px;margin-top:17px;width:60%;margin-left:20%;border-width:0;outline:none}.buleLeb[data-v-2d163ad7]{color:#0093ff;font-size:14px;font-weight:500;padding:10px 0;background:#fff}.jibing[data-v-2d163ad7]{display:inline-block;font-size:14px;padding:0 9px;text-align:center;margin-right:16px;border:1px solid #ccc;line-height:30px;color:#222;white-space:nowrap;margin-top:16px}",""])},754:function(t,i,e){"use strict";var a=function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[e("div",{staticClass:"bottom",staticStyle:{display:"inline-block",width:"100%","z-index":"99"}},[e("div",{staticStyle:{"margin-top":"23px","padding-left":"44px",display:"inline-block",float:"left"}},[e("img",{attrs:{src:t.consultationWantImg,width:"24px",height:"24px"},on:{click:t.collect}})]),t._v(" "),e("div",{staticClass:"text6"},[t._v("想测")]),t._v(" "),e("div",{staticClass:"btn",on:{click:t.startBuy}},[t._v("立即购买")])]),t._v(" "),e("div",{staticClass:"wrap"},[e("img",{staticStyle:{"vertical-align":"top"},attrs:{height:"200px",width:"100%",src:t.consultationImg}}),t._v(" "),e("div",{staticClass:"head"},[e("div",{staticClass:"title bold"},[t._v(t._s(t.consultationItem.title))]),t._v(" "),e("div",{staticStyle:{margin:"6px 0"}},[e("span",{staticClass:"price bold"},[t._v(t._s(t.consultationPrice))]),t._v(" "),e("span",{staticClass:"priceOld"},[t._v("¥"+t._s(t.consultationPriceOld))])]),t._v(" "),e("div",{staticClass:"text"},[t._v(t._s(t._f("lossValue")(t.consultationItem.subCount))+"道精选试题    |    "+t._s(t._f("lossValue")(t.consultationItem.reportCount))+"页专业报告    |    "+t._s(t._f("lossValue")(t.consultationItem.orderCount))+"人已测")])]),t._v(" "),e("div",{staticStyle:{padding:"16px","margin-top":"10px",background:"white"}},[e("div",{staticClass:"title1 bold"},[t._v("测试介绍")]),t._v(" "),e("div",{staticClass:"content"},[t._v(t._s(t.consultationItem.introduce))]),t._v(" "),e("div",{staticClass:"tip"},[e("div",{staticClass:"title1 bold"},[t._v("温馨提示")]),t._v(" "),e("div",{staticClass:"content",staticStyle:{"padding-bottom":"0","line-height":"22px"}},[e("div",[t._v("1. 测试题："+t._s(t._f("lossValue")(t.consultationItem.subCount))+"题，测试时间：约"+t._s(t._f("lossValue")(t.consultationItem.duration))+"分钟。")]),t._v(" "),e("div",[t._v("2. 测评不能重测，做题时请根据实际情况作答，答题结束后会生成一份专业报告。 ")]),t._v(" "),e("div",[t._v("3. 付费成功后，页面跳转可能需要时间进行加载，建议在网络较好的情况下进行测试。 ")]),t._v(" "),t._m(0)])])]),t._v(" "),t.evaList.length>0?e("div",{staticStyle:{"margin-top":"10px",background:"white"}},[e("div",{staticClass:"bold",staticStyle:{color:"#333333","font-size":"16px",margin:"0 16px","padding-top":"16px"}},[t._v("用户评价")]),t._v(" "),e("div",{staticStyle:{"padding-left":"16px","padding-bottom":"16px"}},t._l(t.keywords,function(i){return e("span",{staticClass:"jibing"},[t._v(t._s(i[0])+"  "+t._s(i[1]))])})),t._v(" "),e("hr",{staticClass:"full-line"}),t._v(" "),t._l(t.evaList,function(t){return e("consultation-eva-item",{key:t.pcomtId.value,attrs:{evaItem:t}})}),t._v(" "),e("div",{staticClass:"buleLeb",staticStyle:{"text-align":"center"},on:{click:t.toEvaList}},[t._v(" 查看全部评价")])],2):t._e()]),t._v(" "),e("mt-popup",{staticClass:"mint-popup-4",attrs:{position:"bottom"},model:{value:t.popupVisible,callback:function(i){t.popupVisible=i},expression:"popupVisible"}},[t.paySuccess?t._e():e("div",{staticStyle:{background:"white",padding:"20px"}},[e("div",{staticStyle:{"line-height":"50px"}},[e("span",{staticStyle:{color:"#666666","font-size":"15px"}},[t._v("商品")]),t._v(" "),e("span",{staticStyle:{float:"right",color:"black","font-size":"16px","font-weight":"bold"}},[t._v(t._s(t.consultationItem.title))])]),t._v(" "),e("div",{staticClass:"full-line"}),t._v(" "),e("div",{staticStyle:{"font-weight":"bold","font-size":"16px",color:"#FF0000","line-height":"50px",float:"right"}},[t._v("合计："+t._s(t.consultationPrice))]),t._v(" "),e("button",{staticClass:"pay",attrs:{type:"button"},on:{click:t.submitOrder}},[t._v("立即支付")])]),t._v(" "),t.paySuccess?e("div",{staticStyle:{background:"white",padding:"20px"}},[e("img",{staticClass:"img",attrs:{src:t.consultationPaySuccess}}),t._v(" "),e("div",{staticStyle:{"font-size":"20px","font-weight":"500",color:"black","text-align":"center","margin-top":"68px"}},[t._v("支付成功")]),t._v(" "),e("button",{staticClass:"test",attrs:{type:"button"},on:{click:t.startTest}},[t._v("开始测试")])]):t._e()])],1)},s=[function(){var t=this,i=t.$createElement,e=t._self._c||i;return e("div",[t._v("4. 购买的测评会自动保存"),e("span",{staticClass:"text bold"},[t._v("【我的测评】")]),t._v("列表。")])}],n={render:a,staticRenderFns:s};i.a=n}});
//# sourceMappingURL=33.build.js.map
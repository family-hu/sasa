webpackJsonp([54],{221:function(t,i,s){"use strict";function a(t){s(692)}Object.defineProperty(i,"__esModule",{value:!0});var e=s(440),o=s(694),n=s(44),c=a,g=n(e.a,o.a,!1,c,"data-v-abd7125c",null);i.default=g.exports},239:function(t,i,s){"use strict";i.a={packPerson:"./static/img/ic_pack_personal.png",packTeam:"./static/img/ic_pack_team.png",packDept:"./static/img/ic_pack_org.png",orgPubImg:"./static/img/ic_org_bg.png",orgImg:"./static/img/ic_org_logo.png",appIconDoctor:"./static/img/app_icon_doctor.png",appIconUser:"./static/img/app_icon.png",topBg:"./static/img/topbg.png",payWx:"./static/img/ic_pay_wechat.png",docMale:"./static/img/ic_doc_male.png",docFeMale:"./static/img/ic_doc_female.png",focusImg:"./static/img/ic_focused.png",unfocusImg:"./static/img/ic_unfocus.png",yuyueImg:"./static/img/ic_yuyue.png",reportImg:"./static/img/ic_report.png",askImg:"./static/img/ic_ask.png",serviceImg:"./static/img/ic_services.png",yuyueGrayImg:"./static/img/ic_yuyue_gray.png",askGrayImg:"./static/img/ic_ask_grey.png",serviceGrayImg:"./static/img/ic_services_grey.png",starImg:"./static/img/ic_rating_all.png",docRectMale:"./static/img/ic_rect_male.png",docRectFeMale:"./static/img/ic_rect_female.png",defaultAva:"./static/img/ic_default_ava.png",appointBg:"./static/img/ic_appoint_bg.png",rulePhoto:"./static/img/ic_rule.png",arrowDown:"./static/img/ic_arrow_down.png",arrowRight:"./static/img/arrow_right.png",arrowR:"./static/img/ic_arrow_right.png",home:"./static/img/home.png",news:"./static/img/news.png",service:"./static/img/service.png",mine:"./static/img/mine.png",doctor:"./static/img/doctor.png",mineBg:"./static/img/mine_bg.png",homeAppoint:"./static/img/home_appoint.png",homeDoctor:"./static/img/home_doctor.png",homeOnline:"./static/img/home_online.png",homeOrder:"./static/img/home_order.png",notice:"./static/img/notice.png",groupUser:"./static/img/ic_group_user.png",groupDoc:"./static/img/ic_group_doc.png",groupDocPatient:"./static/img/ic_group_doc_patient.png",shareImg:"./static/img/share.png",consultationHomeDefault:"./static/img/ic_consulation_home_default.png",consultationHomeSelected:"./static/img/ic_consulation_home_selected.png",consultationMineDefault:"./static/img/ic_consulation_mine_default.png",consultationMineSelected:"./static/img/ic_consulation_mine_selected.png",consultationSmallImg:"./static/img/ic_consultation_small_default.png",consultationBigImg:"./static/img/ic_consultation_big_default.png",consultationWant:"./static/img/ic_want.png",consultationWanted:"./static/img/ic_wanted.png",consultationPaySuccess:"./static/img/ic_sign_success.png",choose:"./static/img/choose.png",chosen:"./static/img/choosen.png",arrowWhiteRight:"./static/img/ic_arrow_right_white.png",consultationMineBg:"./static/img/ic_mine_bg.png",consultationEmpty:"./static/img/ic_empty.png",house_n:"./static/img/house_n.png",house_s:"./static/img/house_s.png",shopping_n:"./static/img/shopping_n.png",shopping_s:"./static/img/shopping_s.png",group_n:"./static/img/group_n.png",group_s:"./static/img/group_s.png",msg_n:"./static/img/msg_n.png",msg_s:"./static/img/msg_s.png",my_n:"./static/img/my_n.png",my_s:"./static/img/my_s.png",focusLookImg:"./static/img/look@2.png",unfocusLookImg:"./static/img/no_look@2.png",assistantHeadImg:"./static/img/assistant_head_img.png",msgTip:"./static/img/msg_tip.png",msgDot:"./static/img/msg_dot.png",systemMsg:"./static/img/system_msg.png",noticeMsg:"./static/img/notice_msg.png",familyDoc:"./static/img/family_doc.png"}},440:function(t,i,s){"use strict";s(239),s(11);i.a={data:function(){return{title:this.$route.query.title,msgList:this.$route.query.msgList,idList:this.$route.query.idList,radio:"0",userName:"",phone:"",cardNo:""}},components:{},computed:{},mounted:function(){},methods:{radioVal:function(){console.log(this.radio)},checkPhone:function(t){return/^1[0-9]{10}$/.test(t)},checkCardNo:function(t){return/^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/.test(t)},goSave:function(){return this.userName?this.checkPhone(this.phone)?this.checkCardNo(this.cardNo)?void(this.msgList?this.getUserMsgUpdate():this.getUserMsgSave()):(this.$toast("请输入正确的身份证号"),!1):(this.$toast("请输入正确的手机号"),!1):(this.$toast("请输入体检人姓名"),!1)},getUserMsgSave:function(){var t=this,i={reservationUser:{userId:this.$store.getters.loginData.userObj.userId.value,userName:this.userName,gender:this.radio,mobile:this.phone,cardNo:this.cardNo}};this.$store.dispatch("userMsgSave",i).then(function(i){"1"==i.rtnCode?t.$router.push({path:"medicalManList",query:{idList:t.idList}}):t.$toast(i.rtnMsg)}).catch(function(i){t.$toast(i.message)})},getUserMsgUpdate:function(){var t=this,i={reservationUser:{reserUserInfoId:JSON.parse(this.msgList).reserUserInfoId.value,userName:this.userName,gender:this.radio,mobile:this.phone,cardNo:this.cardNo}};this.$store.dispatch("userMsgUpdate",i).then(function(i){"1"==i.rtnCode?t.$router.push({path:"medicalManList",query:{idList:t.idList}}):t.$toast(i.rtnMsg)}).catch(function(i){t.$toast(i.message)})}},created:function(){if(document.title=this.title,this.msgList){var t=JSON.parse(this.msgList);this.userName=t.userName,this.radio=t.gender,this.phone=t.mobile,this.cardNo=t.cardNo}}}},692:function(t,i,s){var a=s(693);"string"==typeof a&&(a=[[t.i,a,""]]),a.locals&&(t.exports=a.locals);s(1)("348c8be4",a,!0,{})},693:function(t,i,s){i=t.exports=s(0)(!1),i.push([t.i,".box[data-v-abd7125c]{margin-bottom:15px;background:#fff}.list[data-v-abd7125c]{padding:16px;border-bottom:1px solid hsla(0,0%,93%,.6)}.list .span[data-v-abd7125c]{font-size:16px;color:#333;width:20%;display:inline-block}.list input[data-v-abd7125c]{font-size:16px;color:#333;max-width:50%}.btn_bottom[data-v-abd7125c]{position:fixed;bottom:33px;height:44px;width:100%;background:#fff;box-sizing:border-box}.next_btn[data-v-abd7125c]{display:block;width:91%;height:44px;margin:0 auto;background:#0093ff;line-height:44px;text-align:center;color:#fff;font-size:16px;font-weight:500;border-radius:2px}",""])},694:function(t,i,s){"use strict";var a=function(){var t=this,i=t.$createElement,s=t._self._c||i;return s("div",[s("div",{staticClass:"box"},[s("div",{staticClass:"list"},[s("span",{staticClass:"span"},[t._v("姓名")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.userName,expression:"userName"}],attrs:{type:"text",placeholder:"请输入姓名","placeholder-style":"color:#CCCCCC"},domProps:{value:t.userName},on:{input:function(i){i.target.composing||(t.userName=i.target.value)}}})]),t._v(" "),s("div",{staticClass:"list"},[s("span",{staticClass:"span"},[t._v("性别")]),t._v(" "),s("el-radio",{attrs:{label:"1"},on:{change:t.radioVal},model:{value:t.radio,callback:function(i){t.radio=i},expression:"radio"}},[t._v("男")]),t._v(" "),s("el-radio",{attrs:{label:"0"},on:{change:t.radioVal},model:{value:t.radio,callback:function(i){t.radio=i},expression:"radio"}},[t._v("女")])],1),t._v(" "),s("div",{staticClass:"list"},[s("span",{staticClass:"span"},[t._v("手机号")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.phone,expression:"phone"}],attrs:{type:"number",placeholder:"请输入手机号","placeholder-style":"color:#CCCCCC"},domProps:{value:t.phone},on:{input:function(i){i.target.composing||(t.phone=i.target.value)}}})]),t._v(" "),s("div",{staticClass:"list"},[s("span",{staticClass:"span"},[t._v("身份证")]),s("input",{directives:[{name:"model",rawName:"v-model",value:t.cardNo,expression:"cardNo"}],attrs:{type:"number",placeholder:"请输入身份证号","placeholder-style":"color:#CCCCCC"},domProps:{value:t.cardNo},on:{input:function(i){i.target.composing||(t.cardNo=i.target.value)}}})])]),t._v(" "),s("div",{staticClass:"btn_bottom flex-b"},[s("a",{staticClass:"next_btn",attrs:{href:"javascript:void(0);"},on:{click:t.goSave}},[t._v("保存")])])])},e=[],o={render:a,staticRenderFns:e};i.a=o}});
//# sourceMappingURL=54.build.js.map
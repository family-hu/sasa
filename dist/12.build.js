webpackJsonp([12],{165:function(t,i,a){"use strict";function e(t){a(306)}Object.defineProperty(i,"__esModule",{value:!0});var o=a(264),s=a(308),n=a(44),c=e,r=n(o.a,s.a,!1,c,"data-v-136df261",null);i.default=r.exports},239:function(t,i,a){"use strict";i.a={packPerson:"./static/img/ic_pack_personal.png",packTeam:"./static/img/ic_pack_team.png",packDept:"./static/img/ic_pack_org.png",orgPubImg:"./static/img/ic_org_bg.png",orgImg:"./static/img/ic_org_logo.png",appIconDoctor:"./static/img/app_icon_doctor.png",appIconUser:"./static/img/app_icon.png",topBg:"./static/img/topbg.png",payWx:"./static/img/ic_pay_wechat.png",docMale:"./static/img/ic_doc_male.png",docFeMale:"./static/img/ic_doc_female.png",focusImg:"./static/img/ic_focused.png",unfocusImg:"./static/img/ic_unfocus.png",yuyueImg:"./static/img/ic_yuyue.png",reportImg:"./static/img/ic_report.png",askImg:"./static/img/ic_ask.png",serviceImg:"./static/img/ic_services.png",yuyueGrayImg:"./static/img/ic_yuyue_gray.png",askGrayImg:"./static/img/ic_ask_grey.png",serviceGrayImg:"./static/img/ic_services_grey.png",starImg:"./static/img/ic_rating_all.png",docRectMale:"./static/img/ic_rect_male.png",docRectFeMale:"./static/img/ic_rect_female.png",defaultAva:"./static/img/ic_default_ava.png",appointBg:"./static/img/ic_appoint_bg.png",rulePhoto:"./static/img/ic_rule.png",arrowDown:"./static/img/ic_arrow_down.png",arrowRight:"./static/img/arrow_right.png",arrowR:"./static/img/ic_arrow_right.png",home:"./static/img/home.png",news:"./static/img/news.png",service:"./static/img/service.png",mine:"./static/img/mine.png",doctor:"./static/img/doctor.png",mineBg:"./static/img/mine_bg.png",homeAppoint:"./static/img/home_appoint.png",homeDoctor:"./static/img/home_doctor.png",homeOnline:"./static/img/home_online.png",homeOrder:"./static/img/home_order.png",notice:"./static/img/notice.png",groupUser:"./static/img/ic_group_user.png",groupDoc:"./static/img/ic_group_doc.png",groupDocPatient:"./static/img/ic_group_doc_patient.png",shareImg:"./static/img/share.png",consultationHomeDefault:"./static/img/ic_consulation_home_default.png",consultationHomeSelected:"./static/img/ic_consulation_home_selected.png",consultationMineDefault:"./static/img/ic_consulation_mine_default.png",consultationMineSelected:"./static/img/ic_consulation_mine_selected.png",consultationSmallImg:"./static/img/ic_consultation_small_default.png",consultationBigImg:"./static/img/ic_consultation_big_default.png",consultationWant:"./static/img/ic_want.png",consultationWanted:"./static/img/ic_wanted.png",consultationPaySuccess:"./static/img/ic_sign_success.png",choose:"./static/img/choose.png",chosen:"./static/img/choosen.png",arrowWhiteRight:"./static/img/ic_arrow_right_white.png",consultationMineBg:"./static/img/ic_mine_bg.png",consultationEmpty:"./static/img/ic_empty.png",house_n:"./static/img/house_n.png",house_s:"./static/img/house_s.png",shopping_n:"./static/img/shopping_n.png",shopping_s:"./static/img/shopping_s.png",group_n:"./static/img/group_n.png",group_s:"./static/img/group_s.png",msg_n:"./static/img/msg_n.png",msg_s:"./static/img/msg_s.png",my_n:"./static/img/my_n.png",my_s:"./static/img/my_s.png",focusLookImg:"./static/img/look@2.png",unfocusLookImg:"./static/img/no_look@2.png",assistantHeadImg:"./static/img/assistant_head_img.png",msgTip:"./static/img/msg_tip.png",msgDot:"./static/img/msg_dot.png",systemMsg:"./static/img/system_msg.png",noticeMsg:"./static/img/notice_msg.png",familyDoc:"./static/img/family_doc.png"}},240:function(t,i,a){"use strict";i.a={props:{showBack:{default:!0},title:{default:"在线问诊"},showMenu:{default:!1}},methods:{back:function(){this.$router.go(-1)},menu:function(){this.$emit("confirm")}}}},241:function(t,i,a){"use strict";function e(t){a(242)}var o=a(240),s=a(244),n=a(44),c=e,r=n(o.a,s.a,!1,c,null,null);i.a=r.exports},242:function(t,i,a){var e=a(243);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a(1)("67921c4f",e,!0,{})},243:function(t,i,a){i=t.exports=a(0)(!1),i.push([t.i,".header_box,.mint-header{background:#fff}.mint-header .mint-button .mintui-back{color:rgba(4,11,28,.8)}.mint-header-title{font-size:15px;color:#006dff}",""])},244:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"header_box"},[a("mt-header",{attrs:{fixed:"",title:t.title}},[t.showBack?a("mt-button",{attrs:{slot:"left",icon:"back"},nativeOn:{click:function(i){return t.back(i)}},slot:"left"}):t._e(),t._v(" "),t.showMenu?a("mt-button",{attrs:{slot:"right"},nativeOn:{click:function(i){return t.menu(i)}},slot:"right"},[t._v("确定")]):t._e()],1)],1)},o=[],s={render:e,staticRenderFns:o};i.a=s},245:function(t,i,a){"use strict";var e=a(11),o=a(239);i.a={props:{doctorDetail:{}},computed:{doctorName:function(){return this.doctorDetail.userName?this.doctorDetail.userName:this.doctorDetail.nickName?this.doctorDetail.nickName:""},goodRate:function(){var t=this.doctorDetail.expertStatObj;return t&&t.rate?t.rate:"100"},numConsult:function(){var t=this.doctorDetail.expertStatObj;return t?t.numConsult.value:0},deptName:function(){if(!this.doctorDetail.userId)return"";if(this.doctorDetail.department.value==e.d){if(this.doctorDetail.deptDesp)return this.doctorDetail.deptDesp;if(this.doctorDetail.departmentName)return this.doctorDetail.departmentName}else if(this.doctorDetail.departmentName)return this.doctorDetail.departmentName;return""},doctorTitle:function(){var t=this.doctorDetail.orgNames,i=this.doctorDetail.officeTypeName;return i&&"无级别"==i&&(i=""),i&&(t+=" | "+i),t},docImg:function(){var t=o.a.docRectMale;if(this.doctorDetail.photoUrl)t=this.doctorDetail.photoUrl;else{"0"==this.doctorDetail.gender.value&&(t=o.a.docRectFeMale)}return t}}}},247:function(t,i,a){"use strict";function e(t){a(252)}var o=a(245),s=a(254),n=a(44),c=e,r=n(o.a,s.a,!1,c,"data-v-244a8dcb",null);i.a=r.exports},252:function(t,i,a){var e=a(253);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a(1)("5e0ffe1c",e,!0,{})},253:function(t,i,a){i=t.exports=a(0)(!1),i.push([t.i,".cell[data-v-244a8dcb]{padding:20px 16px}.namecs[data-v-244a8dcb]{font-size:16px;font-weight:500;color:#000}.titlecs1[data-v-244a8dcb]{font-size:12px;font-weight:400;color:#7a8093;margin-left:2px}.lab1[data-v-244a8dcb]{color:#0093ff;border:1px solid #0093ff;border-radius:4px}.lab1[data-v-244a8dcb],.lab2[data-v-244a8dcb]{padding:3px 6px;text-align:center;font-size:12px;margin-right:10px}.lab2[data-v-244a8dcb]{color:#16d332;border:1px solid #16d332;border-radius:4px}.lab3[data-v-244a8dcb]{padding:3px 6px;text-align:center;font-size:12px;color:#ff5b5b;border:1px solid #ff5b5b;border-radius:4px}.cellL[data-v-244a8dcb]{width:80%;background-color:#fff;margin-left:20px}.hos[data-v-244a8dcb]{font-size:10px;font-weight:400;color:#000}.personLab[data-v-244a8dcb]{color:#a1a1a1;font-size:13px}.personLab1[data-v-244a8dcb]{color:#7a8093;font-size:12px;font-weight:400}.red[data-v-244a8dcb]{color:#ff5b5b;font-size:13px}.jibing[data-v-244a8dcb]{color:#7a8093;font-size:12px;font-weight:400}.usericon[data-v-244a8dcb]{width:70px;height:70px;border-radius:50%}.maxLine[data-v-244a8dcb]{display:-webkit-box;-webkit-line-clamp:2;-webkit-box-orient:vertical;overflow:hidden;text-overflow:ellipsis}.bottomV[data-v-244a8dcb]{margin:12px 0}.money[data-v-244a8dcb]{color:red;font-size:14px;float:left;margin-left:-90px}.yuyue[data-v-244a8dcb]{background-color:#ffbd00;color:#fff;width:55px;line-height:23px;position:absolute;left:10px;top:52px;float:right;font-size:12px;font-weight:300;text-align:center;border-radius:12px}",""])},254:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticStyle:{background:"#fff"}},[a("div",{staticClass:"cell flex-b"},[a("div",[a("img",{staticClass:"usericon",attrs:{src:t.docImg}})]),t._v(" "),a("div",{staticClass:"cellL"},[a("div",[a("div",{staticStyle:{display:"inline-block"}},[a("span",{staticClass:"namecs"},[t._v(t._s(t.doctorName))]),t._v(" "),a("span",{staticClass:"titlecs1"},[t._v(t._s(t.deptName))]),t._v(" "),a("span",{staticClass:"titlecs1"},[t._v(t._s(t.doctorDetail.titlesName))])]),t._v(" "),a("div",{staticStyle:{"margin-top":"4px"}},[a("span",{staticClass:"hos"},[t._v(t._s(t.doctorTitle))])]),t._v(" "),a("div",{staticClass:"maxLine",staticStyle:{"margin-top":"4px"}},[a("span",{staticClass:"jibing"},[t._v("擅长疾病:")]),t._v(" "),a("span",{staticClass:"personLab1"},[t._v(t._s(t.doctorDetail.despSpecial))])])])])]),t._v(" "),a("hr",{staticClass:"full-line",attrs:{align:"center",size:"1 "}})])},o=[],s={render:e,staticRenderFns:o};i.a=s},264:function(t,i,a){"use strict";var e=a(247),o=a(241);i.a={data:function(){return{orgId:this.$route.query.orgId,type:this.$route.query.type,doctorList:[],hotDataList:[],loading:!1,display:!1,show:!1,page:1,loaded:!1}},components:{doctorItem:e.a,appHeader:o.a},methods:{goUp:function(){this.display=!this.display},toDetail:function(t){this.$router.push({path:"doctorDetail",query:{userId:t.userId.value}})},goDoctor:function(t){this.$router.push({path:"doctorOneList",query:{deptId:t.dictId.value,orgId:this.orgId}})},loadMore:function(){this.loaded||this.requestDoctorList()},requestDoctorList:function(){var t=this;this.loading=!0;var i={type:this.type,orgId:this.orgId,pageNum:this.page,pageSize:10},a=this,e="doctorList";this.type&&(e="newDocList"),this.$store.dispatch(e,i).then(function(t){if(a.page++,t.doctorList)for(var i=0;i<t.doctorList.length;i++)a.doctorList.push(t.doctorList[i]);a.loaded=a.doctorList.length==t.total,a.loading=!1}).catch(function(i){a.loading=!1,a.loaded=!0,t.$toast(i.message)})},requestTypeList:function(){var t=this;this.loading=!0;var i={orgId:this.orgId,h5query:!0};this.$store.dispatch("orgDeptGet",i).then(function(i){if(i.length>0){for(var a=0;a<i.length;a++){t.hotDataList.push(i[a]);switch(i[a].dictName){case"外科":t.hotDataList[a].hotDataImg="out";break;case"内科":t.hotDataList[a].hotDataImg="in";break;case"牙科":t.hotDataList[a].hotDataImg="tooth";break;case"眼科":t.hotDataList[a].hotDataImg="eye";break;case"男科":t.hotDataList[a].hotDataImg="man";break;case"妇科":t.hotDataList[a].hotDataImg="women";break;case"儿科":t.hotDataList[a].hotDataImg="children";break;case"皮肤科":t.hotDataList[a].hotDataImg="skin";break;case"精神科":t.hotDataList[a].hotDataImg="mind";break;case"耳鼻喉科":t.hotDataList[a].hotDataImg="ent";break;case"肿瘤科":t.hotDataList[a].hotDataImg="tumor";break;case"骨科":t.hotDataList[a].hotDataImg="bone";break;case"中医科":t.hotDataList[a].hotDataImg="medicine";break;case"结核科":t.hotDataList[a].hotDataImg="phthisis";break;case"生殖科":t.hotDataList[a].hotDataImg="reproductive";break;default:t.hotDataList[a].hotDataImg="common"}}i.length>8?(t.display=!0,t.show=!0):(t.display=!1,t.show=!1)}t.loading=!1}).catch(function(i){t.loading=!1,t.$toast(i.message)})}},created:function(){this.requestDoctorList(),this.requestTypeList(),console.log("this.orgId",this.orgId)}}},306:function(t,i,a){var e=a(307);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);a(1)("0d51d6a2",e,!0,{})},307:function(t,i,a){i=t.exports=a(0)(!1),i.push([t.i,"li[data-v-136df261],ul[data-v-136df261]{padding:0;list-style:none;margin:0}.title[data-v-136df261]{padding:14px 16px;background:#fff;overflow:hidden}.title .h3[data-v-136df261]{float:left;color:#000;font-size:14px}.h3 span[data-v-136df261]{display:inline-block;width:3px;height:16px;background:#0093ff;margin-right:5px;position:relative;top:3px}.more[data-v-136df261]{float:right;font-size:13px;color:#b3b3b3;text-decoration:none}.main[data-v-136df261]{background:#fff;padding:14px 16px}.box[data-v-136df261]{overflow:hidden;transition:transform .3s}.hide[data-v-136df261]{height:185px}.show[data-v-136df261]{height:auto}.box dl[data-v-136df261]{text-align:center;float:left;width:25%}.box dt img[data-v-136df261]{width:40px;height:40px}.box dd[data-v-136df261]{margin:0;text-align:center;font-size:13px;color:#666;margin-top:5px}.upDown[data-v-136df261]{width:100%;height:44px;line-height:44px;border-top:1px solid #eee;text-align:center;color:#666;font-size:14px;background:#fff}.upDown img[data-v-136df261]{width:10px;height:10px;margin-left:5px;transition:transform .3s}.on[data-v-136df261]{transform:rotate(180deg)}.btn-box[data-v-136df261]{width:100%;height:100px;background:#fff;margin:10px 0}",""])},308:function(t,i,a){"use strict";var e=function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",[t._m(0),t._v(" "),a("div",{staticClass:"full-line"}),t._v(" "),a("div",{staticClass:"main"},[a("div",{staticClass:"box",class:t.display?"hide":"show"},t._l(t.hotDataList,function(i,e){return a("dl",{key:e,on:{click:function(a){t.goDoctor(i)}}},[a("dt",[a("img",{attrs:{src:"/static/img/"+i.hotDataImg+"@2x.png",alt:""}})]),t._v(" "),a("dd",[t._v(t._s(i.dictName))])])}))]),t._v(" "),t.show?a("div",{staticClass:"upDown",on:{click:t.goUp}},[t._v("展开"),a("img",{class:t.display?"on":"",attrs:{src:"/static/img/ic_arrow_down.png",alt:""}})]):t._e(),t._v(" "),a("div",{staticClass:"btn-box"}),t._v(" "),t._m(1),t._v(" "),a("div",{staticClass:"full-line"}),t._v(" "),a("ul",{directives:[{name:"infinite-scroll",rawName:"v-infinite-scroll",value:t.loadMore,expression:"loadMore"}],attrs:{"infinite-scroll-disabled":"loading","infinite-scroll-distance":"10","infinite-scroll-immediate-check":"false"}},t._l(t.doctorList,function(i,e){return a("doctor-item",{key:e,attrs:{doctorDetail:i},nativeOn:{click:function(a){t.toDetail(i)}}})}))])},o=[function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"title"},[a("div",{staticClass:"h3"},[a("span"),t._v("热门科室")]),t._v(" "),a("a",{staticClass:"more",attrs:{href:"#"}},[t._v("更多 >")])])},function(){var t=this,i=t.$createElement,a=t._self._c||i;return a("div",{staticClass:"title"},[a("div",{staticClass:"h3"},[a("span"),t._v("推荐医生")]),t._v(" "),a("a",{staticClass:"more",attrs:{href:"#"}},[t._v("更多 >")])])}],s={render:e,staticRenderFns:o};i.a=s}});
//# sourceMappingURL=12.build.js.map
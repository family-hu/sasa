webpackJsonp([40],{180:function(t,i,n){"use strict";function e(t){n(486)}Object.defineProperty(i,"__esModule",{value:!0});var s=n(381),o=n(488),a=n(44),r=e,c=a(s.a,o.a,!1,r,"data-v-f0688138",null);i.default=c.exports},240:function(t,i,n){"use strict";i.a={props:{showBack:{default:!0},title:{default:"在线问诊"},showMenu:{default:!1}},methods:{back:function(){this.$router.go(-1)},menu:function(){this.$emit("confirm")}}}},241:function(t,i,n){"use strict";function e(t){n(242)}var s=n(240),o=n(244),a=n(44),r=e,c=a(s.a,o.a,!1,r,null,null);i.a=c.exports},242:function(t,i,n){var e=n(243);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(1)("67921c4f",e,!0,{})},243:function(t,i,n){i=t.exports=n(0)(!1),i.push([t.i,".header_box,.mint-header{background:#fff}.mint-header .mint-button .mintui-back{color:rgba(4,11,28,.8)}.mint-header-title{font-size:15px;color:#006dff}",""])},244:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",{staticClass:"header_box"},[n("mt-header",{attrs:{fixed:"",title:t.title}},[t.showBack?n("mt-button",{attrs:{slot:"left",icon:"back"},nativeOn:{click:function(i){return t.back(i)}},slot:"left"}):t._e(),t._v(" "),t.showMenu?n("mt-button",{attrs:{slot:"right"},nativeOn:{click:function(i){return t.menu(i)}},slot:"right"},[t._v("确定")]):t._e()],1)],1)},s=[],o={render:e,staticRenderFns:s};i.a=o},381:function(t,i,n){"use strict";var e=n(241);n(46),n(47);i.a={data:function(){return{signId:"",contUrl:"",img:""}},components:{appHeader:e.a},computed:{confirmDisplay:function(){return this.img?"inline-block":"none"},signDivWidth:function(){return this.img?"48%":"100%"},signText:function(){return this.img?"修改签名":"去签名"}},methods:{goSign:function(){this.$router.push("/signature")},confirm:function(){var t=this,i=this.img.substring(22,this.img.length),n={signId:this.signId,signImg:i};this.$indicator.open(),this.$store.dispatch("signImgCommit",n).then(function(i){t.$router.replace({path:"success",query:{price:i.price}})}).catch(function(i){t.$toast(i.message)}).finally(function(){t.$indicator.close()})},initImg:function(){sessionStorage.getItem("img")&&(this.img=sessionStorage.getItem("img"),this.$refs.iframe.contentWindow.postMessage(this.img,"*"))},changeFrameHeight:function(){this.$refs.iframe.height=2*document.documentElement.clientHeight}},created:function(){var t=sessionStorage.getItem("signData");if(t){var i=JSON.parse(t);this.signId=i.signId.value,this.contUrl=i.contUrl}},mounted:function(){var t=this,i=document.getElementById("iframe");i.attachEvent?i.attachEvent("onload",function(){t.initImg(),t.changeFrameHeight()}):i.onload=function(){t.initImg(),t.changeFrameHeight()}}}},486:function(t,i,n){var e=n(487);"string"==typeof e&&(e=[[t.i,e,""]]),e.locals&&(t.exports=e.locals);n(1)("e6bab5b8",e,!0,{})},487:function(t,i,n){i=t.exports=n(0)(!1),i.push([t.i,".to-sign[data-v-f0688138]{position:fixed;background-color:#f7f7f7;bottom:0;left:0;right:0;padding:16px}.sign[data-v-f0688138]{position:absolute;left:0;top:40px;bottom:0}.confirm-sign[data-v-f0688138]{box-sizing:border-box;width:48%}.sign-div[data-v-f0688138]{box-sizing:border-box;display:inline-block;float:right}",""])},488:function(t,i,n){"use strict";var e=function(){var t=this,i=t.$createElement,n=t._self._c||i;return n("div",[n("app-header",{attrs:{title:"家庭医生服务合同"}}),t._v(" "),n("div",{staticClass:"page-header-main"},[n("iframe",{ref:"iframe",staticClass:"sign",attrs:{src:t.contUrl,frameborder:"0",width:"100%",scrolling:"no",id:"iframe"}}),t._v(" "),n("div",{staticClass:"to-sign"},[n("div",{staticClass:"confirm-sign",style:{display:t.confirmDisplay}},[n("mt-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(i){return t.confirm(i)}}},[t._v("确认签名")])],1),t._v(" "),n("div",{staticClass:"sign-div",style:{width:t.signDivWidth}},[n("mt-button",{attrs:{size:"large",type:"primary"},nativeOn:{click:function(i){return t.goSign(i)}}},[t._v(t._s(t.signText))])],1)])])],1)},s=[],o={render:e,staticRenderFns:s};i.a=o}});
//# sourceMappingURL=40.build.js.map
webpackJsonp([74],{237:function(t,e,i){"use strict";function o(t){i(768)}Object.defineProperty(e,"__esModule",{value:!0});var n=i(463),c=i(770),s=i(44),r=o,a=s(n.a,c.a,!1,r,"data-v-6c780e9c",null);e.default=a.exports},463:function(t,e,i){"use strict";var o=i(12),n=Object.assign||function(t){for(var e=1;e<arguments.length;e++){var i=arguments[e];for(var o in i)Object.prototype.hasOwnProperty.call(i,o)&&(t[o]=i[o])}return t};e.a={data:function(){return{pevalId:this.$route.query.pevalId,porderId:this.$route.query.porderId,scoreTypes:[],scoreList:[],drawList:[],content:""}},computed:n({},Object(o.c)(["loginData"])),methods:n({},Object(o.d)(["setComment"]),{changeCheck:function(t){var e=this.drawList[t];e.checked?e.checked=!e.checked:e.checked=!0,this.$set(this.drawList,t,e)},commentAdd:function(){for(var t=this,e=[],i=0;i<this.drawList.length;i++)this.drawList[i].checked&&e.push(this.drawList[i].key);if(0==e.length)return void this.$toast("请添加关键词!");var o={content:this.content,keywordList:e,scoreList:this.scoreList,userId:this.loginData.userObj.userId.value,pevalId:this.pevalId,porderId:this.porderId};this.$indicator.open(),this.$store.dispatch("commentAdd",o).then(function(e){t.$toast("添加成功"),t.$router.go(-1),t.setComment({pcomtId:e.pcomtId.value,porderId:t.porderId})}).catch(function(e){t.$toast(e.message)}).finally(function(){t.$indicator.close()})}}),created:function(){var t=this;this.$store.dispatch("commentKeywordsQuery",{}).then(function(e){if(t.scoreTypes=e.scoreTypes,e.keywords&&e.keywords.length>0)for(var i=0;i<e.keywords.length;i++){var o=e.keywords[i];t.drawList[i]={key:o,checked:!1}}if(e.scoreTypes&&e.scoreTypes.length>0)for(var n=0;n<e.scoreTypes.length;n++)t.scoreList[n]=5}).catch(function(e){t.$toast(e.message)})}}},768:function(t,e,i){var o=i(769);"string"==typeof o&&(o=[[t.i,o,""]]),o.locals&&(t.exports=o.locals);i(1)("72566abb",o,!0,{})},769:function(t,e,i){e=t.exports=i(0)(!1),e.push([t.i,"input[data-v-6c780e9c]::-webkit-input-placeholder{font-size:15px;color:#999}.textA[data-v-6c780e9c]{border-width:0;outline:none;font-size:15px;margin-top:8px;width:100%;color:#222}.checked[data-v-6c780e9c]{color:#0093ff;border:1px solid #0093ff}.unchecked[data-v-6c780e9c]{color:#222;border:1px solid #ccc}.jibing[data-v-6c780e9c]{display:inline-block;font-size:14px;padding:0 9px;text-align:center;margin-right:15px;line-height:30px;white-space:nowrap;margin-top:16px}.btn[data-v-6c780e9c]{font-size:20px;font-weight:600;color:#fffaf0;background-color:#0093ff;height:44px;margin-top:25px;width:90%;margin-left:5%;border-width:0;outline:none;border-radius:22px}",""])},770:function(t,e,i){"use strict";var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{padding:"18px 20px 14px 20px","font-weight":"600","font-size":"16px"}},[t._v("该测评对你有帮助吗？")]),t._v(" "),i("div",{staticStyle:{background:"white","padding-left":"20px","padding-bottom":"16px"}},t._l(t.scoreTypes,function(e,o){return i("div",{staticStyle:{display:"inline-block","padding-top":"16px"}},[i("span",{staticStyle:{"font-size":"14px","margin-right":"30px"}},[t._v(t._s(e))]),t._v(" "),i("el-rate",{staticStyle:{display:"inline-block"},attrs:{"allow-half":""},model:{value:t.scoreList[o],callback:function(e){t.$set(t.scoreList,o,e)},expression:"scoreList[index]"}})],1)})),t._v(" "),i("div",{staticStyle:{"background-color":"white","margin-top":"10px",padding:"0 16px"}},[i("div",{staticStyle:{display:"inline-block"}},t._l(t.drawList,function(e,o){return i("span",{staticClass:"jibing",class:[e.checked?"checked":"unchecked"],on:{click:function(e){t.changeCheck(o)}}},[t._v(t._s(e.key))])})),t._v(" "),i("div",{staticClass:"full-line",staticStyle:{"margin-top":"20px"}}),t._v(" "),i("textarea",{directives:[{name:"model",rawName:"v-model",value:t.content,expression:"content"}],staticClass:"textA",attrs:{placeholder:"说说你的测试心得，分享给想测的朋友吧",clos:"5",rows:"5",warp:"virtual"},domProps:{value:t.content},on:{input:function(e){e.target.composing||(t.content=e.target.value)}}})]),t._v(" "),i("button",{staticClass:"btn",attrs:{type:"button"},on:{click:t.commentAdd}},[t._v("提交")])])},n=[],c={render:o,staticRenderFns:n};e.a=c}});
//# sourceMappingURL=74.build.js.map
<template>
    <div>
      <!-- 医生详情名片 -->
      <div class="docDetail_box" @click="goDocDetail" v-if="elementType == 'CMD' && message.chatBody.userActionMy == '99' && isSelf" style="margin-top:20px">
        <div class="box_item">
          <img :src="docImg" alt="">
          <div style="width:100%">
            <div class="flex-b">
               <div><span class="doc_name">{{message.chatBody.cardObj.nameCn}}</span><span class="doc_title">{{message.chatBody.cardObj.titlesName}}</span></div>
            </div>
            <div><span class="doc_hos">{{message.chatBody.cardObj.orgNames}}</span><span class="doc_hos">{{message.chatBody.cardObj.departmentName}}</span></div>
            <div class="doc_desp">{{message.chatBody.cardObj.despSkill}}</div>
          </div>
        </div>
      </div>
      <!-- 医生服务记录 -->
      <div class="server_list" v-if="serverList">
        <h3>夏金晶医生的服务记录</h3>
        <div class="list_box">
          <img src="/static/img/assistant_head_img.png" alt="">
          <div style="width:100%">
            <div class="flex-b">
              <span class="server_name">电话咨询</span>
              <span class="server_status">已完成</span>
            </div>
            <div class="server_time">完成时间：2019-03-19 19:18</div>
            <div class="server_time">订单金额：¥24</div>
          </div>
        </div>
      </div>
      <!-- 医生服务 无记录 -->
      <div class="server_list2" v-if="serverList">
        <div class="list_box">
          <img :src="friendHeadUrl" alt="">
          <div style="width:100%">
            <div class="flex-b">
              <span class="server_name">该医生目前暂无服务记录</span>
            </div>
            <div class="docDetail" @click="goDocDetail">进入医生主页</div>
          </div>
        </div>
      </div>
      <!-- 服务结束 -->
      <div class="server_end" v-if="elementType == 'CMD' && message.chatBody.userAction == '200' && message.chatBody.desc == '本次咨询结束'">
        <!-- <div class="tip_box" v-if="!isDoctorChat">请对我的服务作出评价吧，<span @click="evaluationShow">立即评价</span></div> -->
        <div class="end_btn"><span>本次咨询结束</span></div>
        <div class="end_time">结束时间：{{message.chatBody.time}}</div>
      </div>

      <div class="npcTalkItem clearFix" v-if="message.chatBody.userActionMy != '99' && message.chatBody.desc != '本次咨询开始'" :class="[!isSelf ? 'border-left' : 'border-right']">  <!-- v-if="!tipType && !customType(105)" 不是提示消息，不是服务包-->

        <div class="npcTalkImg" :class="[!isSelf ? 'fl' : 'fr']">
          <img :src="headImg" alt='头像' width='50px' height='50px'>
        </div>

        <div class="npcTalk" :class="[!isSelf ? 'fl' : 'fr']">
          <!-- 文字 -->
          <div class="npcTalkCon" v-if="elementType == 'TEXT' ">
            <div v-if="isSelf">{{message.chatBody}}</div>
            <div v-else>{{message.chatBody}}</div>
          </div>
           <!-- 表情-->
          <div class="npcTalkCon" v-if="elementType == 'FACE' " >
            <div v-if="isSelf" v-html="eleText">{{eleText}}</div>
            <div v-else v-html="eleHtml">{{eleHtml}}</div>
          </div>
           <!--  图片  -->
          <div class="npcTalkCon img_box" v-if="elementType == 'IMAGE'">
            <div v-if="isSelf" :id="'imgs'+ index">
              <img :src="message.chatBody" @click="toBigPic(index)"/>
            </div>
            <div v-else :id="'imgs'+ index">
              <img :src="message.chatBody" @click="toBigPic(index)"/>
            </div>
          </div>
           <!--  音频  -->
          <div class="npcTalkCon audioPlay" v-if="elementType == 'SOUND'"  @click="audioPlay(index)">
            <i> </i>"{{message.chatBody.length}}
            <audio v-if="isSelf"  preload="none" :src="message.chatBody.file.url" :id="'audioPlay' + index">
              <source :src="message.chatBody.file.url">
            </audio> <!-- controls="controls" 显示播放按钮 -->
            <audio v-else  :id="'audioPlay' + index" preload="none" :src="message.chatBody.objectURL">
              <source :src="message.chatBody.objectURL">
            </audio>
          </div>

          <!--  自定义消息  资讯  -->
          <div class="npcTalkCon" style="width: 200px;" v-if="elementType == 'CMD' && message.chatBody.userAction == '100'" @click="articleDetail">
            <div class="title new_title">{{ message.chatBody.articleObj.title }}</div>
            <div class="content maxLine"> {{ message.chatBody.articleObj.htmlContent }}</div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 14px;color: #666666;">资讯</div>
          </div>
          <!--  自定义消息  名片 -->
          <div class="npcTalkCon" style="width: 200px;" @click="docDetail" v-if="elementType == 'CMD' && message.chatBody.userAction == '101' && !isSelf">
            <div class="title">{{ message.chatBody.cardObj.nameCn}} <span class="content">{{ message.chatBody.cardObj.titlesName}}</span></div>
            <div class="content"> {{ message.chatBody.cardObj.orgNames }} &nbsp;&nbsp; {{ message.chatBody.cardObj.departmentName }}</div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 14px;color: #666666;">医生</div>
          </div>
          <!--  自定义消息  机构  -->
          <!-- <div class="npcTalkCon" style="width: 160px;" v-if="customType(102)" @click="toHome">
            <div class="title">{{ orgNames }}</div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 14px;color: #666666;">机构</div>
          </div> -->
           <!--  自定义消息  健康计划  -->
          <div class="npcTalkCon" @click="planDetail" style="width: 200px;" v-if="elementType == 'CMD' && message.chatBody.userAction == '103'">
            <div class="title">{{ message.chatBody.planObj.title }}</div>
            <div class="flex-b" style="margin-top:5px">
               <div class="content maxLine" style="margin-top:0;width:178px">{{ message.chatBody.planObj.htmlContent }}</div>
               <img style="margin-left:10px;width:50px;height:50px" :src="message.chatBody.planObj.imgUrl" alt="">
            </div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 12px;color: #666666;">健康计划</div>
          </div>
          <!--  自定义消息  随访计划  -->
          <div class="npcTalkCon" style="width: 200px;" @click="visitDetail" v-if="elementType == 'CMD' && message.chatBody.userAction == '104'">
            <div class="title">{{ message.chatBody.visitObj.visitName }}</div>
            <div class="content maxLine">{{ message.chatBody.visitObj.content }}</div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 14px;color: #666666;">随访计划</div>
          </div>
          <!--  自定义消息  服务包  -->
          <div class="npcTalkCon" style="min-width: 200px;padding:10px 20px"  @click="serverBag" v-if="elementType == 'CMD' && message.chatBody.userAction == '105'">
            <div class="flex-b">
              <div class="title">{{ message.chatBody.servInfoObj.acceptName }}</div>
              <div class="tag" v-if="message.chatBody.servInfoObj.servType == '2009101'">个人</div>
              <div class="tag" v-if="message.chatBody.servInfoObj.servType == '2009102'">团队</div>
              <div class="tag" v-if="message.chatBody.servInfoObj.servType == '2009103'">机构</div>
              <div class="tag" v-if="message.chatBody.servInfoObj.servType == '2009104'">科室</div>
            </div>
            <hr class="full-line" style="margin: 10px 0" />
            <div class="flex-b">
              <div style="display:flex;align-items: center;">
                <img class="serverBag" src="../../../static/img/serverBag.png" alt="">
                <div class="desp">
                  <div class="desp_title">{{ message.chatBody.servInfoObj.servName }}</div>
                  <div class="content_bag maxLine">{{ message.chatBody.servInfoObj.desp }}</div>
                  <div style="margin-top:3px;width:150px;margin-left:-3px">
                    <p v-for="(item,index) in tags " :key="index" class="desp_tag" :class="tagColor(index)">{{item}}</p>
                  </div>
                </div>
              </div>
              <div class="price">¥{{message.chatBody.servInfoObj.price}}</div>
            </div>
          </div>
          <!--  自定义消息  小组分享  -->
          <div class="npcTalkCon" @click="groupDetail" style="width: 200px;" v-if="elementType == 'CMD' && message.chatBody.userAction == '106'">
            <div class="title">有一篇好的帖子分享给你！</div>
            <div class="flex-b" style="margin-top:5px">
               <div class="content maxLine" style="margin-top:0;width:178px">{{ message.chatBody.groupObj.conDesc }}</div>
               <img v-if="message.chatBody.groupObj.imgList[0]" style="margin-left:10px;width:50px;height:50px" :src="message.chatBody.groupObj.imgList[0]" alt="">
            </div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 12px;color: #666666;">小组</div>
          </div>
          <!--  自定义消息  推广分享  -->
          <div class="npcTalkCon" @click="promoteCenter" style="width: 200px;" v-if="elementType == 'CMD' && message.chatBody.userAction == '107'">
            <div class="title">{{message.chatBody.title}}</div>
            <div class="flex-b" style="margin-top:5px">
               <div class="content maxLine" style="margin-top:0;width:180px">{{ message.chatBody.desp }}</div>
               <!-- <img style="margin-left:10px;width:50px;height:50px" :src="message.chatBody.shareURL" alt=""> -->
            </div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 12px;color: #666666;">推广中心</div>
          </div>
           <!--  自定义消息  医疗服务  -->
          <div class="npcTalkCon" @click="shopDetail" style="width: 200px;" v-if="elementType == 'CMD' && message.chatBody.userAction == '108'">
            <div class="title">{{message.chatBody.title}}</div>
            <div class="flex-b" style="margin-top:5px">
               <div class="content maxLine" style="margin-top:0;width:178px">{{ message.chatBody.desp }}</div>
               <img style="margin-left:10px;width:50px;height:50px" :src="message.chatBody.imagePath" alt="">
            </div>
            <hr class="full-line" style="margin: 10px 0" />
            <div style="font-size: 12px;color: #666666;">医疗服务</div>
          </div>

        </div>

      </div>
      <!--  自定义消息  服务包 -->
      <!-- <service-item style="margin: 0 16px;" :serviceItem="serviceItem"  @click.native="serviceDetail"></service-item> -->

      <!-- <div class="tip" v-if="tipType">{{ tipValue }}</div>   自定义消息  提示信息  -->



    </div>
</template>

<script>
// import { webim } from '../../assets/im/webim.js'
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import { faces } from "../../../static/js/face.js";
// import ServiceItem from  '../service/ServiceItem.vue'
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      // TEXT: webim.MSG_ELEMENT_TYPE.TEXT,
      // CUSTOM: webim.MSG_ELEMENT_TYPE.CUSTOM,
      // IMAGE: webim.MSG_ELEMENT_TYPE.IMAGE,
      // SOUND: webim.MSG_ELEMENT_TYPE.SOUND,
      // FACE: webim.MSG_ELEMENT_TYPE.FACE,
      docId: this.$route.query.docId,
      isDoctorChat: this.$route.query.isDoctorChat,
      customType: null,
      serverList: null,
      type: null
      // groupId: this.$route.query.groupId
    };
  },

  props: {
    message: {},
    friendHeadUrl: "",
    gender: "",
    index: "",
    groupId: ""
  },

  components: {
    // serviceItem: ServiceItem
  },
  mounted() {},
  computed: {
    ...mapGetters(["loginData"]),
    //当前时间
    nowTime() {
      Date.prototype.Format = function(fmt) {
        var o = {
          "M+": this.getMonth() + 1, //月份
          "d+": this.getDate(), //日
          "H+": this.getHours(), //小时
          "m+": this.getMinutes(), //分
          "s+": this.getSeconds(), //秒
          "q+": Math.floor((this.getMonth() + 3) / 3), //季度
          S: this.getMilliseconds() //毫秒
        };
        if (/(y+)/.test(fmt))
          fmt = fmt.replace(
            RegExp.$1,
            (this.getFullYear() + "").substr(4 - RegExp.$1.length)
          );
        for (var k in o)
          if (new RegExp("(" + k + ")").test(fmt))
            fmt = fmt.replace(
              RegExp.$1,
              RegExp.$1.length == 1
                ? o[k]
                : ("00" + o[k]).substr(("" + o[k]).length)
            );
        return fmt;
      };
      return new Date().Format("yyyy-MM-dd HH:mm:ss");
      console.log(new Date().Format("yyyy-MM-dd HH:mm:ss"), "==timer");
    },
    //本地表情解析
    eleText() {
      var strarr = [
        "[):]",
        "[:D]",
        "[;)]",
        "[:-o]",
        "[:p]",
        "[(H)]",
        "[:@]",
        "[:s]",
        "[:$]",
        "[:(]",
        "[:'(]",
        "[:|]",
        "[(a)]",
        "[8o|]",
        "[8-|]",
        "[+o(]",
        "[|-)]",
        "[|-)]",
        "[*-)]",
        "[:-#]",
        "[:-*]",
        "[^o)]",
        "[8-)]",
        "[(|)]",
        "[(u)]",
        "[(S)]",
        "[(*)]",
        "[(#)]",
        "[(R)]",
        "[({)]",
        "[(})]",
        "[(k)]",
        "[(F)]",
        "[(W)]",
        "[(D)]"
      ];
      var str = this.message.chatBody;
      for (var i = 0; i < strarr.length; i++) {
        while (str.indexOf(strarr[i]) >= 0) {
          str = str.replace(
            strarr[i],
            `<img src="http://webim.easemob.com/demo/images/faces/ee_${i+1}.png">`
          );
        }
      }
      console.log(str);
      return str;
    },
    //解析表情
    eleHtml() {
      console.log("文字、表情文本解析");
      var data = this.message.chatBody;
      let Emoji = [];
      for (var i = 0; i < data.length; i++) {
        Emoji.push(data[i]);
      }
      let elems = Emoji; //获取消息包含的元素数组
      let count = elems.length;
      if (count > 0) {
        let html = "";
        for (let i = 0; i < count; i++) {
          let elem = elems[i];
          let type = elem.type; //获取元素类型
          let content = elem.data; //获取元素对象
          switch (type) {
            case "txt":
              html += content;
              break;

            case "emoji":
              html += "<img src='" + content + "' />";
              // let data = content.getData();
              // let index = webim.EmotionDataIndexs[data];
              // if (index) {
              //   let path = faces[index - 1];
              //   html += "<img src='" + path + "' />";
              // }
              break;
          }
        }

        return html;
      }
    },

    // firstEle() {
    //   let elems = this.message.getElems(); //获取消息包含的元素数组
    //   let count = elems.length;
    //   if(count > 0) {
    //     return elems[0];
    //   }
    // },

    // tipType() {
    //    let type = this.elementType;
    //    if(type == this.CUSTOM && this.firstEle) {
    //      let content = this.firstEle.getContent(); //获取元素对象
    //      let data = content.getData(); //自定义数据
    //      data = JSON.parse(data);
    //      // console.log("自定义消息类型:" + data.userAction);
    //      if(data.userAction == 301 || data.userAction == 300 || data.userAction == 200 || data.userAction == 201) return true;
    //    }
    // },

    // tipValue() {
    //   if(this.firstEle) {
    //     let content = this.firstEle.getContent(); //获取元素对象
    //     return content.getDesc();
    //   }
    // },
    //标签分隔
    tags() {
      if (this.message.chatBody.servInfoObj.tags) {
        let tags = this.message.chatBody.servInfoObj.tags.split(",");
        if (tags && tags.length > 3) {
          tags = tags.splice(0, 3);
        }
        return tags;
      }
      return [];
    },
    //判断消息类型
    elementType() {
      let type;
      let chatType = typeof this.message.chatType == 'string' ? this.message.chatType : this.message.chatType.value;
      console.log(chatType,'==chatType')
      switch (chatType) {
        case "0":
          type = "TEXT";
          break;
        case "1":
          type = "CMD";
          break;
        case "5":
          type = "IMAGE";
          break;
        case "3":
          type = "FACE";
          break;
        case "4":
          type = "SOUND";
          break;
        default:
          break;
      }
      return type
    },
    //判断是发送的消息还是接受的消息
    isSelf() {
      let chatId = typeof this.message.chatId == 'string' ? this.message.chatId : this.message.chatId.value;
      if (chatId == this.loginData.userObj.userId.value) {
        return true
      }else{
        return false
      }
    },
    //服务包图片
    servImgUrl() {
      // if(this.message.chatBody.servInfoObj.servImgUrl){
      //   return this.message.chatBody.servInfoObj.servImgUrl;
      // }else{
      //   return '/static/img/serverBag.png';
      // }
    },

    videoUrl() {
      // if(this.firstEle) {
      //   let content = this.firstEle.getContent(); //获取元素对象
      //   return content.getDownUrl();
      // }
    },

    // videoSeconds() {
    //   if(this.firstEle) {
    //     let content = this.firstEle.getContent(); //获取元素对象
    //     return content.second;
    //   }
    // },
    // 医生名片图像
    docImg() {
      if (this.message.chatBody.cardObj.photoUrl != "") {
        return this.message.chatBody.cardObj.photoUrl;
      }
      return imgMap.docMale;
    },
    //发送接受消息人的头像
    headImg() {
      let img;
      if (this.isSelf) {
        //如果是自己发的消息
        let userObj = this.loginData.userObj;
        if (userObj.photoUrl) {
          img = userObj.photoUrl;
        } else {
          img = imgMap.defaultAva;
        }
      } else {
        //如果别人发的消息
        if (this.message.chatId.value == this.docId) {
          console.log("==this.docId");
          if (this.friendHeadUrl) {
            img = this.friendHeadUrl;
          } else {
            if (this.gender && this.gender == "0") {
              img = imgMap.docFeMale;
            } else {
              img = imgMap.docMale;
            }
          }
        } else {
          img = imgMap.assistantHeadImg;
        }
      }
      return img;
    }

    // customData() {
    //   const LosslessJSON = require('lossless-json');
    //   let ele = this.firstEle;
    //   let content = ele.getContent(); //获取元素对象
    //   let data = content.getData(); //自定义数据
    //   data = LosslessJSON.parse(data);
    //   return data;
    // },

    // title() {
    //   let data = this.customData;
    //   return data.desc;
    // },
    // org() {
    //   let data = this.customData;
    //   return data.cardObj.orgNames;
    // },
    // dept() {
    //   let data = this.customData;
    //   return data.cardObj.departmentName;
    // },

    // orgNames() {
    //   let data = this.customData;
    //   return data.orgObj.orgNames;
    // },

    // htmlContent() {
    //   let data = this.customData;
    //   return data.articleObj.htmlContent;
    // },

    // healthHtmlContent() {
    //   let data = this.customData;
    //   return data.planObj.htmlContent;
    // },

    // content() {
    //   let data = this.customData;
    //   return data.visitObj.content;
    // },

    // serviceItem() {
    //   let data = this.customData;
    //   return data.servInfoObj;
    // }
  },

  methods: {
    //播放语音
    audioPlay(index) {
      let audio = document.getElementById('audioPlay' +index);
      if(audio.paused){
        audio.play();
        return false
      }else{
        audio.pause();
      }
    },
    //立即评价
    evaluationShow() {
      this.$parent.evaluation();
    },
    //医生主页
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.$route.query.docId
        }
      });
    },
    //点击图片放大
    toBigPic(pos) {
      var pswpElement = document.querySelectorAll(".pswp")[0];
      var items = [];
      var aDiv = document.getElementById("imgs" + pos);
      if (aDiv.hasChildNodes()) {
        for (var i = 0; i < aDiv.children.length; i++) {
          var img = aDiv.children;
          var item = {
            src: img[i].src,
            w: img[i].naturalWidth,
            h: img[i].naturalHeight
          };
          items.push(item);
          // console.log(i + "===child====" + item.src);
          // console.log(i + "===child====" + item.w);
          // console.log(i + "===child====" + item.h);
        }
      }
      // define options (if needed)
      var options = {
        // history & focus options are disabled on CodePen
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,
        index: pos,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };

      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    },
    //小组
    groupDetail() {
      this.$router.push({
        path: "topicDetail",
        query: {
          groupid: this.message.chatBody.groupObj.groupId,
          con_id: this.message.chatBody.groupObj.conId
        }
      });
    },
    //推广
    promoteCenter() {
      window.location.href = this.message.chatBody.shareURL;
    },
    //医疗服务
    shopDetail() {
      window.location.href = this.message.chatBody.shareURL;
    },
    //资讯详情
    articleDetail() {
      window.location.href =
        types.NEWS_DETAIL + this.message.chatBody.articleObj.newsId;
    },
    //随访计划详情
    visitDetail() {
      this.$toast("随访计划，敬请期待");
    },
    //健康计划详情
    planDetail() {
      this.$toast("健康计划，敬请期待");
    },
    //服务包标签颜色
    tagColor(index) {
      let remain = index % 3;
      if (remain == 0) return "tag_red";
      if (remain == 1) return "tag_blue";
      return "tag_green";
    },
    //跳转服务包详情
    serverBag() {
      this.$router.push({
        path: "serviceDetail",
        query: { servId: this.message.chatBody.servInfoObj.servId }
      });
    },
    // customType(type) {
    //   let currentType = this.elementType;
    //   if(currentType == this.CUSTOM && this.firstEle) {
    //     let content = this.firstEle.getContent(); //获取元素对象
    //     let data = content.getData(); //自定义数据
    //     // console.log(data);
    //     data = JSON.parse(data);
    //     if (data.userAction == type) return true;
    //   }
    //   return false;
    // },

    //个人名片-跳转医生详情
    docDetail() {
      let data = this.message.chatBody;
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: data.cardObj.userId
        }
      });
    }

    // serviceDetail() {
    //   let data = this.customData;
    //   this.$router.push({path: "serviceDetail", query: { servId: data.servInfoObj.servId.value}})
    // },

    // toHome() {
    //   let data = this.customData;
    //   this.$router.push({path: "home", query:{orgId: data.orgObj.orgId.value, focusEnter: true}});
    // },

    // newsDetail() {
    //   let data = this.message.chatBody;
    //   window.location.href = types.NEWS_DETAIL + data.articleObj.newsId;
    // }
  },
  created() {
    //自定义消息，安卓数据转对象
    if (this.message.ext) {
      let ext = typeof this.message.chatBody;
      let servInfoObj = typeof this.message.ext.servInfoObj;
      let cardObj = typeof this.message.ext.cardObj;
      let planObj = typeof this.message.ext.planObj;
      let visitObj = typeof this.message.ext.visitObj;
      let articleObj = typeof this.message.ext.articleObj;
      let groupObj = typeof this.message.ext.groupObj;
      if (ext == "string") {
        this.message.ext = JSON.parse(this.message.chatBody);
      } else if (servInfoObj == "string") {
        this.message.ext.servInfoObj = JSON.parse(this.message.ext.servInfoObj);
      } else if (cardObj == "string") {
        this.message.ext.cardObj = JSON.parse(this.message.ext.cardObj);
      } else if (planObj == "string") {
        this.message.ext.planObj = JSON.parse(this.message.ext.planObj);
      } else if (visitObj == "string") {
        this.message.ext.visitObj = JSON.parse(this.message.ext.visitObj);
      } else if (articleObj == "string") {
        this.message.ext.articleObj = JSON.parse(this.message.ext.articleObj);
      } else if (groupObj == "string") {
        this.message.ext.groupObj = JSON.parse(this.message.ext.groupObj);
      } else if (
        this.message.ext.userAction == "200" &&
        this.message.ext.desc == "本次咨询结束"
      ) {
        //结束会话
        this.$emit("fun", false);
        this.$parent.requestImStatus("endTime"); //医生结束聊天
      }
    }
    //微信端发送表情
    if (this.message.body) {
      let str = this.message.body.msg;
      let regex = /\[|\]|【|】/g;
      let emoji = regex.test(str);
      if (emoji == true) {
        this.type = "emoji";
      }
    }

    console.log("elementType==", this.elementType);
    console.log("isSelf==", this.isSelf);
    console.log("friendHeadUrl==", this.friendHeadUrl);
    console.log("message==", this.message);
  }
};
</script>

<style scoped>
/* 服务记录 start */
.server_list {
  padding: 0 15px 20px 15px;
  background: #fff;
  margin: 20px 16px 0 16px;
}
.server_list h3 {
  font-size: 15px;
  color: #040b1c;
  font-weight: 500;
  padding: 12px 0;
  border-bottom: 1px solid #eee;
}
.server_list2 {
  margin: 20px 16px 0 16px;
  padding: 12px;
  background: #fff;
}
.server_list2 .list_box {
  align-items: center;
  padding: 0;
}
.docDetail {
  color: #0076ff;
  font-size: 13px;
}
.list_box {
  padding-top: 15px;
  display: flex;
}
.list_box img {
  width: 56px;
  height: 56px;
  margin-right: 10px;
}
.list_box .server_name {
  font-weight: 500;
  color: rgba(4, 11, 28, 1);
  font-size: 14px;
  margin-bottom: 2px;
}
.list_box .server_status {
  color: rgba(4, 11, 28, 0.5);
  font-size: 13px;
}
.list_box .server_time {
  color: rgba(4, 11, 28, 0.5);
  font-size: 12px;
}
/* 服务记录 end */
/* 服务结束 start */
.server_end {
  width: 100%;
  margin-top: 12px;
  text-align: center;
  margin-bottom: 20px;
}
.server_end .tip_box {
  font-size: 13px;
  color: #040b1c;
}
.server_end .tip_box span {
  color: #0076ff;
}
.server_end .end_btn {
  margin-top: 16px;
}
.server_end .end_btn span {
  background: rgba(4, 11, 28, 0.06);
  border-radius: 12px;
  color: #040b1c;
  font-size: 12px;
  padding: 3px 10px;
}
.server_end .end_time {
  margin-top: 8px;
  color: rgba(4, 11, 28, 0.5);
  font-size: 12px;
}
/* 服务结束 end */
.title {
  font-size: 16px;
  color: #222222;
  font-weight: 500;
}

.content {
  font-size: 12px;
  color: #666666;
  margin-top: 10px;
  font-weight: normal;
}
.content_bag {
  font-size: 10px;
  color: #666666;
  margin-top: 3px;
}
.maxLine {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tag {
  width: 24px;
  height: 14px;
  font-size: 10px;
  color: #fff;
  background: #0093ff;
  text-align: center;
}
.serverBag {
  width: 60px;
  height: 60px;
}
.desp {
  margin-left: 10px;
  width: 80px;
}
.price {
  color: #ff001f;
  font-size: 14px;
  font-weight: 600;
  margin-left: 10px;
}
.desp_title {
  font-size: 12px;
  color: #222222;
  font-weight: 500;
  width: 100%;
  overflow: hidden;
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.new_title {
  width: 100%;
  overflow: hidden;
  height: 20px;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.desp_tag {
  font-size: 9px;
  padding: 0 3px;
  height: 12px;
  line-height: 12px;
  border-radius: 2px;
  font-weight: normal;
  margin-left: 3px;
  float: left;
}
.tag_red {
  color: #ff001f;
  border: 1px solid #ff001f;
}
.tag_blue {
  color: #0093ff;
  border: 1px solid #0093ff;
}
.tag_green {
  color: #00b48c;
  border: 1px solid #00b48c;
}
.img_box img {
  max-width: 150px;
  max-height: 150px;
}
</style>

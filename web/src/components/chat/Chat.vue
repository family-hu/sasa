<template>
    <div id="dialogue_box">
      <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

          <!-- Container that holds slides.
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

              <!--  Controls are self-explanatory. Order can be changed. -->

              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

              <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
              <!-- element will get class pswp__preloader--active when preloader is running -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>
      </div>
      <app-header v-if="timeSecKill" :title='deadTime'></app-header>
      <div :style="showCustomPopup ? 'padding-bottom:210px' : docDownLine == false ? 'padding-bottom:140px' : 'padding-bottom:100px' ">
        <div id="messageList" class="npcTalklist" :style="timeSecKill ? ' padding-top: 40px' : ''">
          <!-- 医生详情悬浮-->
          <div class="docDetail_box" v-if="groupId">
            <div class="box_item">
              <img :src="doctorCardImg" alt="">
              <div style="width:100%">
                <div class="flex-b">
                  <div><span class="doc_name">{{drName}}</span><span class="doc_title">{{doctorDetail.officeTypeName}}</span></div>
                  <button class="send_detail" @click="send_doc">发送</button>
                </div>
                <div><span class="doc_hos">{{doctorDetail.orgName}}</span><span class="doc_hos">{{doctorDetail.departmentName}}</span></div>
                <div class="doc_desp">{{doctorDetail.despSkill}}</div>
              </div>
            </div>
          </div>
          <div v-if="groupId" class="assistant_tip"><span>由医生助理为您提供服务</span></div>
          <div v-if="isDoctorChat && isTalk == true" class="assistant_tip"><span>为了医师的准确判断，请按照您的真实情况回答</span></div>
          <!-- <div v-if="isDoctorChat && isTalk == false" class="assistant_tip"><span>医生审核已通过，可以开始沟通了</span></div> -->
          <div class="npcTalkItem clearFix border-left" v-if="isDoctorChat">
            <div class="npcTalkImg fl">
              <img :src="docImg" alt="头像" width="50px" height="50px">
            </div>
            <div class="npcTalk fl" >
              <div class="npcTalkCon">您好，我是<span>{{doctorDetail.userName}}</span>医生，您是要咨询什么情况？</div>
            </div>
          </div>
          <div class="npcTalkItem clearFix border-left" v-else>
            <div class="npcTalkImg fl">
              <img :src="assistantImg" alt="头像" width="50px" height="50px">
            </div>
            <div class="npcTalk fl">
              <div class="npcTalkCon">您好，我是<span>{{drName}}</span>医生的助理，请问有什么可以帮助您？</div>
            </div>
          </div>
          <message-item v-for="(message,index) in imMsgList" :key="index" :index="index" :message="message" :friendHeadUrl="friendHeadUrl" :gender="gender" :groupId="groupId" v-on:fun="change"></message-item>
        </div>

        <div v-if="showFaceBox" class='shade_face' @click="hideFace"></div>
        <div v-if="showCustomPopup" class="shade" @click="showCustom"></div>
        <div class="footer_box" v-if="(isDoctorChat && isTalk == true) || groupId">
          <div v-if="groupId" class="user_think" @click="hideFace">
            我想 <button @click="goServerList">查看服务记录</button><button @click="goServiceList">服务推荐</button><button @click="goDocDetail">向医生问诊</button>
          </div>
          <div class="footerTalk">

              <!-- contenteditable="true" -->
              <img class="face" @click="showFace" src="/static/img/im_face.png" alt="">
              <div class="face_box" v-if="showFaceBox">

                <div class="emotion-box" :style="{height: height + 'px' }" >
                  <div class="emotion-box-line" v-for="(line, i) in list" :key="i" >
                    <emotion class="emotion-item" v-for="(item, i) in line" :key="i" @click.native="clickHandler(item)" >{{item}}</emotion>
                  </div>
                </div>

              </div>
              <!-- <img class="voice" src="/static/img/im_voice.png" alt="" @click="sendAudio"> -->
              <div class="center" v-if="audioInput">
                <input type="button" class="send_msg_text send_audio"  id="audio" value="按住  说话" @click="sendPrivateAudio">
              </div>

              <div class="center" v-else>
                <div style="margin-top:-30px;display:none" v-html="content.replace(/\#[\u4E00-\u9FA5]{1,3}\;/gi, emotion)" contentEditable=true></div>
                <input v-model="content"  type="text" class="send_msg_text" id="send_msg_text" @blur="inputBlur">
              </div>

              <button class="right" @click="onSendMsg()" type="button">发送</button>
              <img class="add" @click="showCustom" src="/static/img/add_im.png" alt="">

          </div>
          <div class="CustomPopup" :class="{'CustomPopupContentShow':showCustomPopup}">
            <div class="bottom_box">
              <div class="list">
                <input id="image" type="file" class="file_input" @change="sendPrivateImg('1')">
                <img src="/static/img/im_phone.png" alt="">
                <p>相册</p>
              </div>
              <div class="list">
                <input id="image2" type="file"  accept="image/" capture="camera" class="file_input" @change="sendPrivateImg('2')">
                <img src="/static/img/camare@2x.png" alt="">
                <p>相机</p>
              </div>
              <div v-if="groupId" class="list" @click="goChatRecord">
                <input type="button"  class="file_input">
                <img src="/static/img/record@2x.png" alt="">
                <p>聊天记录</p>
              </div>
              <div v-if="groupId" class="list" @click="evaluation">
                <input type="button"  class="file_input">
                <img src="/static/img/rank@2x.png" alt="">
                <p>客服评价</p>
              </div>
            </div>
          </div>
        </div>
        <div v-if="isDoctorChat && isTalk == false" class="no_talk">
          <!-- 医生不在线提示语 -->
          <div class="doc_noLine" v-if="docDownLine == false">医生不在线，您可以咨询该医院其他医生</div>
          <div style="padding:0 16px">
            <!-- 医生不在线 -->
            <button type="button" v-if="docDownLine == false" @click="goDocList">咨询其他医生</button>
            <button type="button" v-else @click="goPay">再次咨询(<span>{{talkPrice}}</span>元/次)</button>
            <p @click="goChatRecord">查看更多咨询记录 &gt;</p>
          </div>
        </div>
      </div>
      <!-- 评价弹出层 -->
      <div class="shade_evaluation" v-if="show" @click="other_hide"></div>
      <div class="dialog_box" :class=" show ? 'dialog-fade-in' : 'dialog-fade-out'">
        <p class="evaluation_title">请对本次服务进行评价</p>
        <div class="rate_box">
          <el-rate v-model="evaluationScore" show-text text-color="#FF7A00" :colors="['#FF7A00','#FF7A00','#FF7A00']"></el-rate>
        </div>
        <div class="evaluation_tag">
          <span v-on:click="addClass(index,$event)" v-bind:class="{ on:index==current}" v-for="(item,index) in tagList" :key="index">{{item}}</span>
        </div>
        <div class="evaluation_btn" @click="submitEvaInfo">提交评价</div>
      </div>
    </div>
</template>

<script>
import Header from "../Header.vue";
// import { webim } from "../../assets/im/webim.js";
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import MessageItem from "./MessageItem.vue";
import websdk from "../../../node_modules/easemob-websdk";
import CustomPopup from "../../customComponents/CustomPopup.vue";
import Emotion from "./Emotion";
import { faces } from "../../../static/js/face";
export default {
  props: {
    height: {
      type: Number,
      default: 200
    }
  },
  data() {
    return {
      drName: this.$route.query.drName,
      selToID: this.$route.query.docId,
      friendHeadUrl: this.$route.query.friendHeadUrl,
      gender: this.$route.query.gender,
      groupId: this.$route.query.groupId, //群ID
      isDoctorChat: this.$route.query.isDoctorChat, //标记与医生问诊
      isTalk: null, //是否可以会话
      talkPrice: "", //咨询价格
      snapId: "",
      orgId: "",
      doctorDetail: [],
      imMsgList: [],
      locationList: [],
      // selType: webim.SESSION_TYPE.C2C,
      loginInfo: null,
      selSess: null,
      getPrePageC2CHistroyMsgInfoMap: {},
      conversation: null,
      conn: null,
      showCustomPopup: false,
      audioInput: false,
      showFaceBox: false,
      show: false,
      evaluationScore: 5,
      tagList: ["服务态度差", "回答不及时", "没解决问题", "不礼貌"],
      current: null,
      list: [
        ["[):]", "[:D]", "[;)]", "[:-o]", "[:p]", "[(H)]", "[:@]"],
        ["[:s]", "[:$]", "[:(]", "[:'(]", "[:|]", "[(a)]", "[8o|]"],
        ["[8-|]", "[+o(]", "[|-)]", "[|-)]", "[*-)]", "[:-#]", "[:-*]"],
        ["[^o)]", "[8-)]", "[(|)]", "[(u)]", "[(S)]", "[(*)]", "[(#)]"],
        ["[(R)]", "[({)]", "[(})]", "[(k)]", "[(F)]", "[(W)]", "[(D)]"]
      ],
      content: "",
      emotionHtml: "",
      emotionUrl: "",
      deadTime: "",
      setTime: null, //定时器
      countDown: {},
      timeSecKill: false,
      docDownLine: true
    };
  },

  components: {
    appHeader: Header,
    messageItem: MessageItem,
    CustomPopup,
    Emotion
  },

  computed: {
    ...mapGetters(["loginData"]),
    onlineEnable() {
      return (
        this.conversation &&
        this.conversation.onlineStatus &&
        this.conversation.onlineStatus.value == "1"
      );
    },
    onlineBg() {
      if (this.onlineEnable) return "rgba(0,147,255,0.1)";
      return "rgba(181,181,181,1)";
    },
    borderColor() {
      if (this.onlineEnable) return "rgba(127,201,255,1)";
      return "rgba(0,0,0,0)";
    },

    onlineBg1() {
      if (this.onlineEnable) return "rgba(0,147,255,1)";
      return "rgba(181,181,181,1)";
    },
    canChat() {
      if (this.conversation) {
        if (this.conversation.sysType.value == "1003104") return true; //对方是用户
        if (this.conversation.relId.value != "0") return true; //有关系
        if (
          this.conversation.isBusiUser.value == "1" &&
          this.conversation.serving.value == "1"
        )
          return true; //在服务中的业务好友
        if (this.conversation.chatTimes.value != "0") return true; //有免费聊天次数
      }
      return false;
    },
    priceValue() {
      if (this.conversation) {
        if (this.conversation.price) {
          return this.conversation.price.value;
        }
      }
      return "9999";
    },
    snapName() {
      if (this.conversation) {
        return this.conversation.snapName;
      }
      return "";
    },
    doctorCardImg() {
      if (!this.friendHeadUrl) {
        let img = imgMap.docRectMale;
        if (this.gender && this.gender == "0") {
          img = imgMap.docRectFeMale;
        }
        return img;
      } else {
        return this.friendHeadUrl;
      }
    },
    docImg() {
      if (this.friendHeadUrl) {
        return this.friendHeadUrl;
      } else {
        let img = imgMap.docMale;
        if (this.gender && this.gender == "0") {
          img = imgMap.docFeMale;
        }
        return img;
      }
    },
    assistantImg() {
      return imgMap.assistantHeadImg;
    }
  },

  mounted() {
    //滚动到底部
    window.addEventListener("scroll", this.scrollToBottom);
  },
  destroyed() {
    window.removeEventListener("scroll", this.scrollToBottom);
    //销毁定时器
    this.requestImStatus("endTime");
    //清除监听
    window.removeEventListener("visibilitychange", this.changeListennr);
  },
  methods: {
    //监听页面离开状态
    changeListennr() {
      // 监听 visibility change hidden事件
      // 页面变为不可见时触发
      if (document.visibilityState == "hidden") {
        this.requestImStatus("endTime"); //销毁定时器
      }

      // 页面变为可见时触发
      if (document.visibilityState == "visible") {
        // window.location.reload(); //刷新页面
        if (this.isDoctorChat == "1") {
          this.requestImStatus();
        }
      }
    },
    //改变状态
    change(data) {
      this.isTalk = data;
    },
    //倒计时
    setTimer(end, now) {
      var totalSecond = end - now;

      clearInterval(this.setTime);

      var setTime = setInterval(() => {
        if (totalSecond <= 0) {
          clearInterval(setTime);
          this.timeSecKill = false; //不显示倒计时
          this.isTalk = false; //禁止会话
        }
        // 秒数
        var second = totalSecond;

        // 天数位
        var day = Math.floor(second / 3600 / 24);
        var dayStr = day.toString();
        if (dayStr.length == 1) dayStr = "0" + dayStr;

        // 小时位
        var hr = Math.floor((second - day * 3600 * 24) / 3600);
        var hrStr = hr.toString();
        if (hrStr.length == 1) hrStr = "0" + hrStr;

        // 分钟位
        var min = Math.floor((second - day * 3600 * 24 - hr * 3600) / 60);
        var minStr = min.toString();
        if (minStr.length == 1) minStr = "0" + minStr;

        // 秒位
        var sec = second - day * 3600 * 24 - hr * 3600 - min * 60;
        var secStr = sec.toString();
        if (secStr.length == 1) secStr = "0" + secStr;

        this.countDown.day = dayStr;
        var hours = (day * 24 + hr).toString();
        if (hours.length == 1) hours = "0" + hours;

        this.countDown.day = dayStr;
        this.countDown.hour = hrStr;
        // this.countDown.hours= (day * 24 + hr).toString();
        this.countDown.minute = minStr;
        this.countDown.second = secStr;

        let timeDown = "";
        if (this.countDown.day > 0) {
          timeDown =
            this.countDown.day +
            "天" +
            this.countDown.hour +
            ":" +
            this.countDown.minute +
            ":" +
            this.countDown.second;
        } else {
          timeDown =
            this.countDown.hour +
            ":" +
            this.countDown.minute +
            ":" +
            this.countDown.second;
        }

        this.deadTime = "咨询中  " + timeDown;
        // console.log(timeDown,'==timeDown');
        totalSecond--;
      }, 1000);

      this.setTime = setTime;
    },
    //获取会话状态
    requestImStatus(endType) {
      if (endType == "endTime") {
        clearInterval(this.setTime);
        this.timeSecKill = false;
        return false;
      }
      let request = {
        docId: this.selToID,
        userId: this.loginData.userObj.userId.value
      };
      let vm = this;
      this.$store
        .dispatch("imStatus", request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.isTalk = data.isTalk;
            console.log(this.isTalk, "==this.isTalk");
            //"2019/7/4 11:36:52";
            let timerDate = data.deadTime;
            if (this.isTalk == true && timerDate != "") {
              // let timer = '2019/7/4 11:36:52';
              timerDate = timerDate.substring(0, 19);
              timerDate = timerDate.replace(/\//g, "/");
              let endTime = parseInt(new Date(timerDate).getTime() / 1000); //结束时间
              let timestamp = parseInt(Date.parse(new Date()) / 1000); //当前时间
              let i = endTime - timestamp;
              // let d = Math.floor(i / 3600 / 24);
              // let h = Math.floor((i - d * 3600 * 24) / 3600);
              // let hstr = h.toString();
              // hstr.toString() <= 99

              if (i > 0) {
                this.setTimer(endTime, timestamp);
                this.timeSecKill = true;
              }
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //医生列表
    goDocList() {
      this.$router.push({
        path: "doctorOneList",
        query: {
          orgId: this.orgId
        }
      });
    },
    //去支付
    goPay() {
      this.show = false;
      this.$router.push({
        path: "chatSubmitPay",
        query: {
          drId: this.selToID,
          snapId: this.snapId,
          price: this.talkPrice,
          orgId: this.orgId,
          type: "图文咨询",
          docName: this.drName
        }
      });
    },
    //点击表情
    clickHandler(i) {
      // console.log(i,'==i');
      let emotion = `#${i};`;
      this.emotion(i);
    },
    emotion(res) {
      // console.log(res,'==res');
      let word = res.replace(/\#|\;/gi, "");
      const list = [
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
        "[<o)]",
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
      let index = list.indexOf(word) + 1;
      // this.emotionHtml = `<img src="https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/${index}.gif" align="middle">`;
      this.emotionHtml = `<img src="http://webim.easemob.com/demo/images/faces/ee_${index}.png" align="middle">`;
      this.emotionUrl = `http://webim.easemob.com/demo/images/faces/ee_${index}.png`;
      console.log(
        `<img src="http://webim.easemob.com/demo/images/faces/ee_${index}.png" align="middle">`,
        word,
        "==img"
      );
      return (this.content += res);
    },
    //医生主页
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.selToID
        }
      });
    },
    //获取本地的缓存
    getStorage() {
      //取缓存聊天记录
      // window.localStorage.removeItem('localImMsgList');
      let getLocalImMsgList = [];
      getLocalImMsgList = window.localStorage.getItem("localImMsgList");
      console.log(JSON.parse(getLocalImMsgList), "=localImMsgList缓存json");
      let msgList = [];
      if (
        getLocalImMsgList &&
        (getLocalImMsgList != "" ||
          getLocalImMsgList != "null" ||
          getLocalImMsgList != "undefined")
      ) {
        this.locationList = JSON.parse(getLocalImMsgList);
        msgList = JSON.parse(getLocalImMsgList);
        console.log(this.locationList, "=locationList当前接受缓存变量json");
        console.log(msgList, "=msgList");
        if (this.conn) {
          let imUserId = this.conn.context.userId;
          // console.log(imUserId,'===imUserId');
          // console.log(this.groupId,'==this.groupId');
          for (let i = 0; i < msgList.length; i++) {
            if (this.groupId) {
              //群
              if (msgList[i].to == this.groupId) {
                this.imMsgList.push(msgList[i]);
                this.scrollToBottom();
                // console.log(this.imMsgList,'==this.imMsgList-群');
              }
            } else {
              //(msgList[i].to == imUserId && msgList[i].ext.userid == this.selToID)
              if (
                (msgList[i].to == imUserId &&
                  msgList[i].from == this.selToID) ||
                msgList[i].to == this.selToID
              ) {
                this.imMsgList.push(msgList[i]);
                this.scrollToBottom();
                // console.log(this.imMsgList,'==this.imMsgList-个人');
              }
            }
          }
        }
      }

      this.listenerConn();
    },
    //聊天记录
    goChatRecord() {
      this.$router.push({
        path: "recordList",
        query: {
          docId: this.selToID,
          userId: this.conn.context.userId,
          groupId: this.groupId,
          friendHeadUrl: this.friendHeadUrl,
          gender: this.gender
        }
      });
    },
    //评论标签切换
    addClass: function(index, event) {
      this.current = index;
    },
    //服务记录
    goServerList() {
      this.$toast("服务记录，敬请期待！");
    },
    //服务推荐
    goServiceList() {
      this.$router.push({
        path: "serviceList",
        query: {
          acceptId: this.selToID
        }
      });
    },
    //滚动条到底部
    scrollToBottom() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollHeight ||
          document.body.scrollHeight ||
          document.getElementById("dialogue_box");
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    //获取医生详情
    expertDetail() {
      let request = { userIds: [this.selToID] };
      let vm = this;
      this.$store
        .dispatch("expertDetailGet", request)
        .then(doctorList => {
          if (doctorList && doctorList.length > 0) {
            vm.doctorDetail = doctorList[0];
            vm.orgId = doctorList[0].orgId.value;
            vm.drName = doctorList[0].userName;
            vm.friendHeadUrl = doctorList[0].photoUrl;
            vm.gender = doctorList[0].gender;

            if(this.groupId && !this.isDoctorChat){
            //助理群聊
              document.title = this.drName + "医生的助理";
            } else {
              document.title = this.drName + "医生";

            }

            let list = doctorList[0].servList;
            for (let i = 0; i < list.length; i++) {
              if (list[i].type.value == "2000104") {
                this.talkPrice = list[i].price.value;
                this.snapId = list[i].snapId.value;
              }
            }
            if (!this.talkPrice && !this.snapId) {
              this.docDownLine = false; //医生不在线
            } else {
              this.docDownLine = true;
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //获取环信聊天记录
    getImchatdata() {
      let request = {
        chatuser: this.selToID
      };
      this.$store
        .dispatch("imchatdata", request)
        .then(data => {
          if (data && data.data != "") {
            for (let i = 0; i < data.data.length; i++) {
              let json = JSON.parse(data.data[i]);
              this.imMsgList.push(json);
              console.log(this.imMsgList, "==this.imMsgList");
            }
            window.localStorage.removeItem("localImMsgList");
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //显示表情
    showFace() {
      this.showFaceBox = !this.showFaceBox;
    },
    //关闭表情
    hideFace() {
      this.showFaceBox = false;
    },
    //底部弹出层
    showCustom() {
      this.showFaceBox = false;
      this.showCustomPopup = !this.showCustomPopup;
      this.scrollToBottom();
    },
    //点击空白关闭评论弹出层
    other_hide() {
      this.show = false;
    },
    //显示评论
    evaluation() {
      this.show = true;
    },
    //提交评论
    submitEvaInfo() {
      let request = {
        busiId: this.selToID, //业务编号
        busiType: 1000113, //业务类型
        orgId: this.doctorDetail.orgId.value, //机构
        userFrom: this.loginData.userObj.userId.value, //评价人
        userTo: this.selToID, //被评价人
        score: this.evaluationScore, //评分
        comment: this.tagList[this.current] //评语
      };
      let vm = this;
      this.$store
        .dispatch("commitBusiEva", request)
        .then(data => {
          if (data.rtnCode == 1) {
            this.$toast("评价成功");
          } else {
            this.$toast(data.rtnMsg);
          }
          this.show = false;
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //显示语音输入框
    sendAudio() {
      this.audioInput = !this.audioInput;
    },
    // 单聊发送音频消息
    sendPrivateAudio() {
      let userName = this.selToID;
      var id = this.conn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("audio", id); // 创建音频消息
      var input = document.getElementById("audio"); // 选择音频的input
      var file = WebIM.utils.getFileUrl(input); // 将音频转化为二进制文件
      var allowType = {
        mp3: true,
        amr: true,
        wmv: true
      };
      if (file.filetype.toLowerCase() in allowType) {
        var option = {
          apiUrl: WebIM.config.apiURL,
          file: file,
          to: userName, // 接收消息对象
          roomType: false,
          chatType: "singleChat",
          onFileUploadError: function() {
            // 消息上传失败
            console.log("onFileUploadError");
          },
          onFileUploadComplete: function() {
            // 消息上传成功
            console.log("onFileUploadComplete");
          },
          success: function() {
            // 消息发送成功
            console.log("Success");
          },
          flashUpload: WebIM.flashUpload
        };
        msg.set(option);
        this.conn.send(msg.body);
        this.imMsgList.push(msg.body);
      }
    },
    //发送医生详情名片
    send_doc() {
      let that = this;
      var id = that.conn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息

      msg.set({
        msg: "[自定义消息]",
        to: that.groupId ? that.groupId : that.selToID, //接收消息对象
        ext: {
          IMicon: that.loginData.userObj.photoUrl,
          IMname: that.loginData.userObj.userName
            ? that.loginData.userObj.userName
            : that.loginData.userObj.nickName,
          cardObj: {
            departmentName: that.doctorDetail.departmentName,
            gender: that.doctorDetail.gender.value,
            nameCn: that.doctorDetail.userName,
            orgNames: that.doctorDetail.orgName,
            photoUrl: that.doctorDetail.photoUrl,
            titlesName: that.doctorDetail.officeTypeName,
            despSkill: that.doctorDetail.despSkill,
            userId: that.doctorDetail.userId.value
          },
          userAction: 101,
          userActionMy: 99
        }, //用户自扩展的消息内容（群聊用法相同）
        success: function(id, serverMsgId) {
          console.log("send private text Success -- 发送成功", msg.body);
          that.imMsgList.push(msg.body);
          that.locationList.push(msg.body);
          window.localStorage.setItem(
            "localImMsgList",
            JSON.stringify(that.locationList)
          );
          that.scrollToBottom();
        } //消息发送成功回调
      });
      if (this.groupId) {
        //如果是群
        msg.setGroup("groupchat");
      }
      that.conn.send(msg.body);
    },
    // 单聊或群发送文本消息
    onSendMsg() {
      let that = this;
      let userName = that.selToID;
      let val = $("#send_msg_text").val();
      if (val == "" || !val) {
        that.$toast("请输入聊天消息");
        return false;
      }
      // 单聊或群发送文本消息
      var id = that.conn.getUniqueId(); // 生成本地消息id
      var msg = new WebIM.message("txt", id); // 创建文本消息
      msg.set({
        msg: val, // 消息内容
        to: this.groupId ? this.groupId : userName, // 接收消息对象（用户id）群或者医生
        from: this.loginData.userObj.userId.value,
        roomType: false, // 群聊类型，true时为聊天室，false时为群组
        ext: {
          IMicon: that.loginData.userObj.photoUrl,
          IMname: that.loginData.userObj.userName
            ? that.loginData.userObj.userName
            : that.loginData.userObj.nickName
        },
        success: function(id, serverMsgId) {
          console.log("send private text Success -- 发送成功", msg.body);
          that.imMsgList.push(msg.body);
          console.log("that.imMsgList==", that.imMsgList);
          that.locationList.push(msg.body);
          window.localStorage.setItem(
            "localImMsgList",
            JSON.stringify(that.locationList)
          );
          console.log("that.locationList==", that.locationList);
          that.scrollToBottom();
        },
        fail: function(e) {
          console.log("Send private text error  -- 发送失败");
        }
      });
      if (this.groupId) {
        // 群消息
        msg.setGroup("groupchat");
      } else {
        msg.body.chatType = "singleChat";
      }
      that.conn.send(msg.body);
      that.showFaceBox = false;
      that.content = "";
    },
    // 私聊或群发送图片消息
    sendPrivateImg(type) {
      let that = this;
      let userName = that.groupId ? this.groupId : that.selToID;
      var id = that.conn.getUniqueId();
      var msg = new WebIM.message("img", id);
      if (type == "1") {
        var input = document.getElementById("image"); // 选择图片的input
      } else {
        var input = document.getElementById("image2"); // 选择图片的input
      }

      var file = WebIM.utils.getFileUrl(input); // 将图片转化为二进制文件
      var allowType = {
        jpg: true,
        gif: true,
        png: true,
        bmp: true
      };

      var option = {
        apiUrl: WebIM.config.apiURL,
        file: file,
        to: userName,
        roomType: false,
        chatType: "singleChat",
        onFileUploadError: function() {
          console.log("onFileUploadError");
        },
        onFileUploadComplete: function() {
          console.log("onFileUploadComplete");
        },
        success: function() {
          console.log("Success");
          that.imMsgList.push(msg.body);
          that.locationList.push(msg.body);
          window.localStorage.setItem(
            "localImMsgList",
            JSON.stringify(that.locationList)
          );
          that.scrollToBottom();
        }
      };
      // for ie8
      try {
        if (!file.filetype.toLowerCase() in allowType) {
          console.log("file type error");
          return;
        }
      } catch (e) {
        option.flashUpload = WebIM.flashUpload;
      }
      msg.set(option);
      if (this.groupId) {
        // 群
        msg.setGroup("groupchat");
      }
      msg.body.msgType = "IMAGE";
      that.conn.send(msg.body);
      that.showFaceBox = false;
      that.content = "";
    },
    // 关掉/拒绝视频
    endCall() {
      rtcCall.endCall();
    },
    // 接受对方呼叫
    acceptCall() {
      rtcCall.acceptCall();
    },
    //失去焦点时，滚动到之前到位置
    inputBlur() {
      setTimeout(function() {
        var scrollHeight =
          document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    //环信登录
    imLogin() {
      // WebIM.conn = new websdk.connection({
      //   isHttpDNS: WebIM.config.isHttpDNS,
      //   isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
      //   https: WebIM.config.https,
      //   url: WebIM.config.xmppURL,
      //   isAutoLogin: true,
      //   heartBeatWait: WebIM.config.heartBeatWait,
      //   autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
      //   autoReconnectInterval: WebIM.config.autoReconnectInterval,
      //   isStropheLog: WebIM.config.isStropheLog,
      //   delivery: WebIM.config.delivery
      // });

      this.conn = new WebIM.connection({
        isMultiLoginSessions: WebIM.config.isMultiLoginSessions,
        https:
          typeof WebIM.config.https === "boolean"
            ? WebIM.config.https
            : location.protocol === "https:",
        url: WebIM.config.xmppURL,
        heartBeatWait: WebIM.config.heartBeatWait,
        autoReconnectNumMax: WebIM.config.autoReconnectNumMax,
        autoReconnectInterval: WebIM.config.autoReconnectInterval,
        apiUrl: WebIM.config.apiURL,
        isAutoLogin: true
      });

      // WebIM.flashUpload = UploadShim({
      //   fileInputId: 'image'
      // }, this.conn).flashUpload;

      const options = {
        apiUrl: WebIM.config.apiURL,
        user: this.loginData.userObj.userId.value, //"1014042765148856320",//
        pwd: "111111",
        appKey: WebIM.config.appkey,
        success: function(res) {
          console.log("连接服务器正常");
        },
        error: function(err) {
          console.log(err);
          // this.imLogin();
          window.location.reload(); //刷新页面
        }
      };
      //登录环信
      this.conn.open(options);
    },
    //聊天监听并建立连接
    listenerConn() {
      //接受信息，赋值给信息list
      let getImMsg = this.imMsgList;
      let isDoctorChat = this.isDoctorChat;
      let groupId = this.groupId;
      let docID = this.selToID;
      let userIdIm = this.conn.context.userId;
      let imConn = this.conn;

      //监听滚动
      function toBottom() {
        setTimeout(function() {
          var scrollHeight =
            document.documentElement.scrollHeight ||
            document.body.scrollHeight ||
            document.getElementById("dialogue_box");
          window.scrollTo(0, Math.max(scrollHeight - 1, 0));
        }, 100);
      }

      //监听接受消息
      imConn.listen({
        onOpened: function(message) {
          //连接成功回调，连接成功后才可以发送消息
          //如果isAutoLogin设置为false，那么必须手动设置上线，否则无法收消息
          // 手动上线指的是调用conn.setPresence(); 在本例中，conn初始化时已将isAutoLogin设置为true
          // 所以无需调用conn.setPresence();
          console.log("%c [opened] 连接已成功建立", "color: green");
        },
        onClosed: function(message) {
          console.log("连接关闭", message);
          //环信登录
          this.imLogin();
          // window.location.reload(); //刷新页面
        }, //连接关闭回调
        onCmdMessage: function(message) {
          console.log("收到命令消息");
        }, //收到命令消息
        onAudioMessage: function(message) {
          if (message.type == "groupchat" && isDoctorChat) {
            //群
            return false;
          }
          console.log("收到音频消息", message);
          if (message.type == "groupchat") {
            //群
            if (message.to == groupId) {
              getImMsg.push(message);
              toBottom();
            }
          } else {
            if (
              (message.to == userIdIm && message.from == docID) ||
              message.to == docID
            ) {
              getImMsg.push(message);
              toBottom();
            }
          }

          // var options = { url: message.url };

          // options.onFileDownloadComplete = function ( response ) {
          //   //音频下载成功，需要将response转换成blob，使用objectURL作为audio标签的src即可播放。
          //   var objectURL = WebIM.utils.parseDownloadResponse.call(this.conn, response);
          // };

          // options.onFileDownloadError = function () {
          //   //音频下载失败
          // };

          // //通知服务器将音频转为mp3
          // options.headers = {
          //   'Accept': 'audio/mp3'
          // };

          // WebIM.utils.download.call(this.conn, options);
        }, //收到音频消息
        onLocationMessage: function(message) {
          console.log("收到位置消息");
        }, //收到位置消息
        onError: function(message) {
          console.log("监听失败回调", message);
        }, //失败回调
        onTextMessage: function(message) {
          // 在此接收和处理消息，根据message.type区分消息来源，私聊或群组或聊天室
          if (message.type == "groupchat" && isDoctorChat) {
            //群
            return false;
          }
          console.log("Text", message);
          if (message.type == "groupchat") {
            //群
            if (message.to == groupId) {
              getImMsg.push(message);
              toBottom();
            }
          } else {
            if (
              (message.to == userIdIm && message.from == docID) ||
              message.to == docID
            ) {
              getImMsg.push(message);
              toBottom();
            }
          }
        },
        onEmojiMessage: function(message) {
          if (message.type == "groupchat" && isDoctorChat) {
            //群
            return false;
          }
          //收到表情消息
          // WebIM.utils.parseEmoji(message);
          console.log("收到Emoji表情消息", message);
          // var data = message.data;
          // let Emoji = [];
          //     // Emoji.push(message.to);
          // for(var i = 0 , l = data.length ; i < l ; i++){
          //     Emoji.push(data[i]);
          // }

          if (message.type == "groupchat") {
            //群
            if (message.to == groupId) {
              getImMsg.push(message);
              toBottom();
            }
          } else {
            if (
              (message.to == userIdIm && message.from == docID) ||
              message.to == docID
            ) {
              getImMsg.push(message);
              toBottom();
            }
          }
        },
        onPictureMessage: function(message) {
          if (message.type == "groupchat" && isDoctorChat) {
            //群
            return false;
          }
          //收到图片消息
          console.log("Location of Picture is ", message);
          if (message.type == "groupchat") {
            //群
            if (message.to == groupId) {
              getImMsg.push(message);
              toBottom();
            }
          } else {
            if (
              (message.to == userIdIm && message.from == docID) ||
              message.to == docID
            ) {
              getImMsg.push(message);
              toBottom();
            }
          }
        },
        onVideoMessage: function(message) {
          if (message.type == "groupchat" && isDoctorChat) {
            //群
            return false;
          }
          var node = document.getElementById("privateVideo");
          var option = {
            url: message.url,
            headers: {
              Accept: "audio/mp4"
            },
            onFileDownloadComplete: function(response) {
              var objectURL = WebIM.utils.parseDownloadResponse.call(
                this.conn,
                response
              );
              node.src = objectURL;
            },
            onFileDownloadError: function() {
              console.log("File down load error.");
            }
          };
          WebIM.utils.download.call(this.conn, option);
        } //收到视频消息
      });
    }
  },

  created() {
    // 监听 visibility change 事件
    document.addEventListener("visibilitychange", this.changeListennr);

    console.log(this.isDoctorChat, "==this.isDoctorChat");

    if (!this.loginData.tid) {
      this.myUtils.wxLogin();
    }

    //环信登录
    this.imLogin();

    //获取医生详情
    this.expertDetail();
    //获取群ID
    if (!this.groupId && this.isDoctorChat) {
      //获取会话状态
      this.requestImStatus();
    }
    //获取本地缓存
    this.getStorage();

    //获取环信聊天记录
    // this.getImchatdata();

    // 初始化WebRTC Call
    var rtcCall = null;
    if (WebIM.WebRTC) {
      rtcCall = new WebIM.WebRTC.Call({
        connection: this.conn,

        mediaStreamConstaints: {
          audio: true,
          video: true
        },

        listener: {
          onAcceptCall: function(from, options) {
            console.log("onAcceptCall::", "from: ", from, "options: ", options);
          },
          onGotRemoteStream: function(stream, streamType) {
            console.log(
              "onGotRemoteStream::",
              "stream: ",
              stream,
              "streamType: ",
              streamType
            );
            var video = document.getElementById("video");
            video.srcObject = stream;
          },
          onGotLocalStream: function(stream, streamType) {
            console.log(
              "onGotLocalStream::",
              "stream:",
              stream,
              "streamType: ",
              streamType
            );
            var video = document.getElementById("localVideo");
            video.srcObject = stream;
          },
          onRinging: function(caller) {
            console.log("onRinging::", "caller:", caller);
          },
          onTermCall: function(reason) {
            console.log("onTermCall::");
            console.log("reason:", reason);
          },
          onIceConnectionStateChange: function(iceState) {
            console.log("onIceConnectionStateChange::", "iceState:", iceState);
          },
          onError: function(e) {
            console.log(e);
          }
        }
      });
    } else {
      console.warn(
        "不能进行视频通话！您的浏览器不支持webrtc或者协议不是https。"
      );
    }
  },

  mounted() {
    // var that = this;
    // this.$imConn.listen({
    //   onTextMessage: function(message) {
    //     console.log(message);
    //     that.chatCont.push({ id: 2, cont: message.data });
    //   },
    //   onPresence: function(message) {
    //     // 这里需要弹出面板标识有人要添加您为好友
    //     console.log(message);
    //     if (message.type == "subscribe") {
    //       that.privateUser = message.from;
    //       that.privateUserPanel = true;
    //     }
    //   }
    // });
  }

  // mounted() {
  //   document.title = this.drName;
  //   let messageList = document.getElementById("messageList");
  //   messageList.style.height = (window.innerHeight - 100) + "px";

  //   this.conversationDetail();
  //   $("#messageList").bind('click','.npcTalklist',function(event){
  //     let audio= $(event.target).children('audio')[0]|| $(event.target).siblings('audio')[0];
  //     if(audio){
  //       if(audio.paused){
  //         $('audio').each(function(idx,ele){
  //           ele.pause();
  //         });
  //         audio.play();// 这个就是播放
  //       }else {
  //         audio.pause();
  //       }
  //     }
  //   });
  // }
};
</script>
<style scoped>
.emotion-box {
  margin: 0 auto;
  width: 100%;
  box-sizing: border-box;
  padding: 5px;
  /* border: 1px solid #b4b4b4; */
  overflow: hidden;
  overflow-y: auto;
}
.emotion-box-line {
  display: flex;
}
.emotion-item {
  flex: 1;
  text-align: center;
  cursor: pointer;
}
.shade_face {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0);
  z-index: 999;
}
.shade_evaluation {
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 2000;
}
@keyframes dialog-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.dialog_box {
  width: 100%;
  height: auto;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 20px 58px;
  box-sizing: border-box;
  z-index: 3000;
  opacity: 0;
}
.dialog-fade-in {
  display: block;
  animation: dialog-fade-in 0.5s;
  animation-fill-mode: forwards;
}
.dialog-fade-out {
  display: none;
  animation: dialog-fade-out 0.5s;
  animation-fill-mode: forwards;
}
</style>
<style>
.docDetail_box {
  background: #fff;
  margin: 0 16px;
  padding: 12px;
}
.box_item {
  display: flex;
}
.doc_name {
  font-weight: 600;
  font-size: 18px;
  color: #040b1c;
  margin-right: 5px;
}
.doc_desp {
  color: rgba(4, 11, 28, 0.5);
  font-size: 13px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.doc_hos {
  color: rgba(4, 11, 28, 0.48);
  font-size: 13px;
  margin-right: 5px;
}
.doc_title {
  color: rgba(4, 11, 28, 0.75);
  font-size: 13px;
}
.box_item img {
  width: 56px;
  height: 56px;
  margin-right: 10px;
}
.send_detail {
  border: none;
  color: #0076ff;
  font-size: 14px;
  font-weight: 500;
  background: #fff;
  padding: 0 8px;
}
.assistant_tip {
  margin-top: 20px;
  text-align: center;
}
.assistant_tip span {
  font-size: 12px;
  color: #040b1c;
  background: rgba(4, 11, 28, 0.06);
  border-radius: 12px;
  padding: 2px 10px;
}
.face_box {
  width: 70%;
  height: auto;
  position: absolute;
  bottom: 53px;
  left: 10px;
  background: #fff;
  padding: 10px;
  box-shadow: 0px 0px 10px rgba(238, 238, 238, 1);
  z-index: 1000;
}
.face_box ul {
  margin-left: -10px;
}
.face_box ul li {
  float: left;
  margin-left: 10px;
}
.send_audio {
  text-align: center;
  font-size: 14px;
  color: #666;
}
.clearFix:after {
  content: "";
  height: 0;
  display: block;
  visibility: hidden;
  clear: both;
}
.fl {
  float: left;
}
.fr {
  float: right;
}
.fr.npcTalk .npcTalkCon {
  background: #0076ff;
  color: #fff;
}
.border-right .fr.npcTalk .npcTalkCon::after {
  border-left-color: #0076ff;
}

.tip {
  font-size: 13px;
  color: #666666;
  text-align: center;
  width: 70%;
  word-break: break-all;
  padding: 5px 15px 5px 15px;
  text-align: center;
  background: rgba(230, 230, 230, 1);
  border-radius: 6px;
  margin: 10px auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  text-align: center; /*让div内部文字居中*/
}

.npcTalklist {
  background-color: #f7f7f7;
  box-sizing: border-box;
  padding-top: 10px;
  /*height: 636px;!*calc(100% - 100px);*!*/
  overflow-y: auto;
  width: 100%;
}
.npcTalkItem {
  width: 100%;
  box-sizing: border-box;
  /* padding: 0.1rem 0.2rem 0.05rem; */
  padding: 20px 16px 0 16px;
}
/*QQ对话*/
.npcTalk .npcTalkCon {
  max-width: 239px;
  font-size: 15px;
  color: white;
  background-color: #fff;
  border-radius: 4px;
  word-wrap: break-word;
  position: relative;
  padding: 10px;
  text-align: justify;
  color: #040b1c;
}

.npcTalkImg img {
  width: 40px;
  height: 40px;
  border-radius: 50%;
}
.npcTalk .npcTalkCon::after {
  content: "";
  width: 0;
  height: 0;
  border-width: 11px;
  border-style: solid;
  border-color: transparent;
  position: absolute;
  top: 10px;
}
.border-left .npcTalk {
  float: left;
}
.border-right .npcTalk {
  float: right;
}
.npcTalk .npcTalkCon i {
  display: block;
  width: 20px;
  height: 20px;
}
.npcTalk.fl .npcTalkCon i {
  float: left;
  margin-right: 0.3rem;
  background: url("/static/img/lyz.png") no-repeat center;
  background-size: 100% 100%;
}
.npcTalk.fr .npcTalkCon i {
  float: right;
  margin-left: 0.3rem;
  background: url("/static/img/lyy.png") no-repeat center -1px;
  background-size: 100% 100%;
}
.border-left .npcTalkImg img {
  margin-right: 20px;
}
.border-right .npcTalkImg img {
  margin-left: 20px;
}
.border-left .npcTalk .npcTalkCon::after {
  border-right-color: #fff;
  left: -20px;
}
.border-right .npcTalk .npcTalkCon::after {
  border-left-color: #fff;
  right: -20px;
}

.npcTalk .userTalkCon {
  max-width: 2.2rem;
  font-size: 0.15rem;
  color: white;
  word-wrap: break-word;
  background-color: #0093ff;
  border-radius: 0.05rem;
  position: relative;
  padding: 0.1rem;
  text-align: justify;
  color: white;
}

.npcTalk .userTalkCon::after {
  content: "";
  width: 0;
  height: 0;
  border-width: 11px;
  border-style: solid;
  border-color: transparent;
  position: absolute;
  top: 16px;
}

.npcTalk .userTalkCon i {
  display: block;
  width: 0.2rem;
  height: 0.2rem;
}
.npcTalk.fl .userTalkCon i {
  float: left;
  margin-right: 0.3rem;
  background: url("/static/img/lyz.png") no-repeat center;
  background-size: 0.3rem 0.3rem;
}
.npcTalk.fr .userTalkCon i {
  float: right;
  margin-left: 0.3rem;
  background: url("/static/img/lyy.png") no-repeat center -1px;
  background-size: 0.3rem 0.3rem;
}
.border-left .npcTalk .userTalkCon::after {
  border-right-color: #0093ff;
  left: -20px;
}
.border-right .npcTalk .userTalkCon::after {
  border-left-color: #0093ff;
  right: -20px;
}
/* .npcTalk .audioPlay {
  width: 50px;
  height: 20px;
} */
.audioPlay audio {
  position: absolute;
  /* opacity: 0; */
  border: 1px solid red;
}
.serveritme {
  font-size: 14px;
  font-weight: 400;
  color: rgba(34, 34, 34, 1);
  line-height: 13px;
  width: auto;
  margin: 8px;
  float: left;
  padding: 8px;
  text-align: center;
  background: rgba(0, 147, 255, 0.1);
  border-radius: 13px;
  border: 1px solid rgba(127, 201, 255, 1);
}
.no_talk {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2000;
  background: #fff;
}
.doc_noLine {
  height: 44px;
  line-height: 44px;
  color: #666;
  font-size: 14px;
  background: rgba(255, 161, 10, 0.1012);
  text-align: center;
  margin-bottom: 15px;
}
.no_talk button {
  width: 100%;
  height: 40px;
  line-height: 40px;
  text-align: center;
  border-radius: 20px;
  background: #0076ff;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
  border: none;
}
.no_talk p {
  width: 100%;
  text-align: center;
  color: rgba(4, 10, 29, 0.5);
  font-size: 13px;
  padding: 10px 0;
}
.footer_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  z-index: 2000;
  background: #f8f8f8;
}
.footerTalk {
  display: flex;
  align-items: center;
  padding: 9px 15px;
  /* width: 100%; */
  box-sizing: border-box;
  background: #fff;
}
.flex-other {
  display: flex;
  align-items: center;
}

.footerTalk.audio {
  display: none;
}
.footerTalk .center {
  /* width: 200px; */
  height: 32px;
  flex: 1;
}
.footerTalk.audio .center {
  text-align: center;
  /* line-height: 0.5rem; */
}
.footerTalk .center input {
  width: 100%;
  height: 100%;
  font-size: 16px;
  border: 0;
  background: rgba(4, 11, 28, 0.04);
  border-radius: 16px;
  box-sizing: border-box;
  padding: 0 10px;
}
.footerTalk .right {
  text-align: center;
  border: 0px solid transparent;
  height: 32px; /* 高度 */
  width: 65px;
  background: #0076ff;
  border-radius: 5px;
  cursor: pointer; /* 鼠标移入按钮范围时出现手势 */
  color: white; /* 字体颜色 */
  font-size: 14px; /* 字体大小 */
  margin-left: 10px;
}
.voice {
  width: 25px;
  height: 25px;
  margin-right: 10px;
}
.face {
  width: 30px;
  height: 30px;
  margin-right: 10px;
}
.add {
  width: 30px;
  height: 30px;
  margin-left: 10px;
}
.bottom_box {
  width: 100%;
  border-top: 1px solid rgba(238, 238, 238, 0.6);
  overflow: hidden;
  margin-bottom: 15px;
}
.CustomPopup {
  height: 0;
  transform: translateY(100%);
  transition: all 0.5s liner;
}
.CustomPopupContentShow {
  height: 100%;
  transition: all 0.5s liner;
  transform: translateY(0);
}
.list {
  float: left;
  text-align: center;
  margin-left: 27px;
  margin-top: 15px;
  position: relative;
}
.list img {
  width: 59px;
  height: 59px;
}
.list p {
  color: rgba(4, 11, 28, 0.75);
  font-size: 12px;
}
.list .file_input {
  width: 55px;
  height: 55px;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 300;
  opacity: 0;
}
@media (max-width: 374px) {
  html {
    font-size: 85.34px;
  }
  body {
    font-size: 0.12rem;
  }
}
@media (min-width: 320px) {
  html {
    font-size: 85.34px;
  }
}
@media (min-width: 360px) {
  html {
    font-size: 96px;
  }
}
@media (min-width: 375px) {
  html {
    font-size: 100px;
  }
}
@media (min-width: 384px) {
  html {
    font-size: 102.5px;
  }
}
@media (min-width: 411px) {
  html {
    font-size: 110px;
  }
}
@media (min-width: 600px) {
  html {
    font-size: 160.4px;
  }
}
@media (min-width: 768px) {
  html {
    font-size: 205.4px;
  }
}
@media (min-width: 800px) {
  html {
    font-size: 213px;
  }
}
.shade {
  position: fixed;
  background: transparent;
  top: 0;
  bottom: 0;
  width: 100%;
  z-index: 1000;
}
.user_think {
  width: 100%;
  height: 45px;
  border-bottom: 1px solid #eee;
  display: flex;
  align-items: center;
  padding: 0 16px;
  font-size: 14px;
  color: rgba(4, 11, 28, 0.75);
  background: #fff;
}
.user_think button {
  display: inline-block;
  padding: 2px 10px;
  border: 1px solid rgba(4, 11, 28, 0.4);
  margin-left: 8px;
  border-radius: 14px;
  font-size: 12px;
  background: #fff;
}
.evaluation_title {
  text-align: center;
  font-size: 15px;
  color: rgba(4, 11, 28, 0.8);
  margin-bottom: 20px;
}
.rate_box {
  text-align: center;
}
.el-rate {
  height: auto;
}
.el-rate__item .el-rate__icon {
  font-size: 24px;
}
.el-rate__text {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.75;
}
.evaluation_tag {
  margin-top: 25px;
  margin-left: -15px;
  overflow: hidden;
}
.evaluation_tag span {
  float: left;
  border: 1px solid rgba(216, 216, 216, 0.3);
  border-radius: 14px;
  padding: 5px 10px;
  background: #fff;
  margin-left: 15px;
  margin-bottom: 15px;
  width: 120px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
}
.evaluation_tag span.on {
  border: 1px solid rgba(0, 118, 255, 0.4);
  background: rgba(0, 118, 255, 0.1);
  color: rgba(4, 11, 28, 0.8);
}
.evaluation_btn {
  width: 100%;
  height: 40px;
  line-height: 40px;
  background: rgba(0, 118, 255, 1);
  border-radius: 20px;
  margin-top: 10px;
  text-align: center;
  color: #fff;
  font-weight: 600;
  font-size: 16px;
}
</style>

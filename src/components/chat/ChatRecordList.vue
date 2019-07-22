<template>
    <div>
        <div v-if="chatRecordList.length > 0">
          <!-- <div class="no_record">没有更多记录了</div>
          <div class="pull_list">下拉查看更多历史消息</div> -->
          <message-item v-for="(message,index) in chatRecordList" :key="index" :index="index" :message="message" :groupId="groupId" :friendHeadUrl="friendHeadUrl" :gender="gender"></message-item>
        </div>
        <div class="empty" v-if="chatRecordList.length == 0">
          <img :src="consultationEmpty" width="144px" height="136px">
          <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无聊天记录</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import MessageItem from "./MessageItem.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      chatRecordList: [],
      docId: this.$route.query.docId, //医生ID
      userId: this.$route.query.userId, //用户ID
      groupId: this.$route.query.groupId, //群ID
      friendHeadUrl: this.$route.query.friendHeadUrl, //医生头像
      gender: this.$route.query.gender
    };
  },

  components: {
    messageItem: MessageItem
  },
  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },

  methods: {
    //获取环信聊天记录
    getImchatdata() {
      let request = {
        chatuser: this.docId
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
    //获取本地的缓存
    getStorage() {
      //取缓存聊天记录
      // window.localStorage.removeItem('localImMsgList');
      let localImMsgList = window.localStorage.getItem("localImMsgList");
      // console.log(localImMsgList,'=localImMsgList');
      if (localImMsgList && (localImMsgList != "" || localImMsgList != "null" || localImMsgList != "undefined")) {
        let msgList = JSON.parse(localImMsgList);
        console.log(msgList, "=msgList");
        for (let i = 0; i < msgList.length; i++) {
          if(this.groupId){ //群记录
            if (msgList[i].to == this.groupId) {
              this.chatRecordList.push(msgList[i]);
            }
          }else{
            //(msgList[i].to == imUserId && msgList[i].ext.userid == this.selToID)
            if ((msgList[i].to == this.userId && msgList[i].from == this.docId) || msgList[i].to == this.docId) {
              this.chatRecordList.push(msgList[i]);
            }
          }
        }
      }
    }
  },

  created() {
    // this.getImchatdata();
    this.getStorage()
  }
};
</script>

<style>
.no_record {
  color: #0076ff;
  font-size: 13px;
  margin-top: 20px;
  text-align: center;
}
.pull_list {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.75);
  margin-top: 15px;
  text-align: center;
}
.empty {
  padding: 50px 40px;
  text-align: center;
}
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
.npcTalk .audioPlay {
  width: 50px;
  height: 20px;
}
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
</style>


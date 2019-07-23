<template>
  <div>
    <div class="msg_box">
      <div class="title_box flex-b">
        <div class="title">{{docMsgList.title}}</div>
        <div class="time">{{msgTime}}</div>
      </div>
      <div class="centet_text">{{docMsgList.content}}</div>
      <div class="type" v-if="msgType == '1'">查看文章</div>
      <div class="type" v-if="msgType == '2'" @click="goOrderDetail(docMsgList)">查看详情</div>
      <div class="type" v-if="msgType == '3'" @click="goReportDetail(docMsgList)">立即报到</div>
      <div class="type" v-if="msgType == '4'" @click="goOrgHome">查看详情</div>
      <div class="type" v-if="msgType == '5'" @click="goChat(docMsgList)">继续咨询</div>
      <div class="type" v-if="msgType == '6'" @click="goChat(docMsgList)">开始问诊</div>
      <div class="type" v-if="msgType == '7'" @click="goChatRecord(docMsgList)">查看问诊记录</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";

export default {
  data() {
    return {};
  },
  props: {
    docMsgList: {},
    orgId: "",
    targetId:''
  },

  computed: {
    ...mapGetters(["loginData"]),
    msgTime() {
      let timerDate = this.docMsgList.time;
      timerDate = timerDate.substring(0, 19);
      timerDate = timerDate.replace(/\//g, "/");
      let timerStatus = parseInt(new Date(timerDate).getTime() / 1000); //消息时间
      let timestamp = parseInt(Date.parse(new Date()) / 1000); //当前时间
      let data = timestamp - timerStatus;
      if (data >= 86400 && data <= 259200) {
        //超过1天小于三天
        timerDate = parseInt(data / 86400) + "天前";
      } else if (data >= 3600 && data <= 86400) {
        //超过1小时小于24小时
        timerDate = parseInt(data / 3600) + "小时前";
      } else if (data >= 600 && data <= 3600) {
        //超过10分钟小于1小时
        timerDate = parseInt(data / 600) + "分钟前";
      } else if (data < 600) {
        //小于10分钟
        timerDate = "刚刚";
      } else {
        timerDate = new Date(Date.parse(timerDate)).format("MM-dd");
      }
      return timerDate;
    },
    msgType() {
      if (
        this.docMsgList.busiType == "文章发布" ||
        this.docMsgList.busiType == "小组文章"
      ) {
        // return "1"; //查看文章
      } else if (
        this.docMsgList.busiType == "预约服务" ||
        this.docMsgList.busiType == "预约消息" ||
        this.docMsgList.busiType == "预约" ||
        this.docMsgList.busiType == "在线咨询"
      ) {
        if(this.docMsgList.title == "温馨提示:您预约的问诊开始了"){
          return "6"; //开始问诊
        }else if(this.docMsgList.title == "温馨提示:您预约的问诊已结束"){
          return "7"; //查看问诊记录
        }
        return "2"; //查看详情
      } else if (this.docMsgList.busiType == "关注医生") {
        return "3"; //立即报到
      } else if (this.docMsgList.busiType == "关注医院") {
        return "4"; //查看详情
      }else if (this.docMsgList.busiType == "群聊消息"){
        return "5";
      }
    }
  },

  mounted() {
    let that = this;
    // 添加返回事件监听
    window.addEventListener(
      "popstate",
      function(e) {
        console.log("返回啦");
      },
      false
    );
  },

  methods: {
    //进入问诊
    goChat(item) {
      if(this.msgType == '6'){ //医生问诊
        this.$router.push({
          path: "chat",
          query: {
            docId: this.targetId,
            isDoctorChat: '1'
          }
        });
      }else{
        this.$router.push({
          path: "chat",
          query: {
            docId: this.targetId,
            groupId: item.busiId.value //当前为群ID
          }
        });
      }

    },
    //聊天记录
    goChatRecord(item) {
      this.$router.push({
        path: "recordList",
        query: {
          docId: this.targetId,
          userId: this.loginData.userObj.userId.value,
        }
      });
    },
    goOrgHome() {
      //机构主页
      this.$router.push({
        path: "home",
        query: {
          orgId: this.orgId,
          selected: 'home'
        }
      });
    },
    goArticleDetail(item) {
      //暂时没有
      //跳转文章详情页
      this.$router.push({
        path: "topicDetail",
        query: {
          groupid: "",
          con_id: item.busiId.value,
          orgNames: this.orgNames,
          orgId: this.orgId
        }
      });
    },
    goOrderDetail(item) {
      //跳转订单详情
      if(item.busiType == "在线咨询"){
        this.$router.push({
          path: "orderDetail",
          query: {
            orgId: this.orgId,
            orderId: item.busiId.value
          }
        });

      }else{
        this.$router.push({
          path: "appointOrderDetail",
          query: {
            orgId: this.orgId,
            orderId: item.busiId.value
          }
        });
      }

    },
    goReportDetail(item) {
      //跳转报到页
      this.$router.push({
        path: "patientReport",
        query: {
          docId: item.busiId.value
        }
      });
    }
  }
};
</script>

<style scoped>
.msg_box {
  padding: 15px;
  margin-top: 15px;
  background: #fff;
}
.title_box {
  padding-bottom: 15px;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
}
.title {
  font-size: 15px;
  color: #040b1c;
  font-weight: 500;
  max-width: 235px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.time {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.3);
}
.centet_text {
  font-size: 14px;
  color: rgba(4, 11, 28, 0.5);
  margin-top: 10px;
  /* display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis; */
}
.type {
  margin-top: 10px;
  font-size: 14px;
  color: #0076ff;
}
</style>

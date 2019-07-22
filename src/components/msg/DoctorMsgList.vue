<template>
  <div>
    <div v-if="docMsgList.length > 0">
      <div class="box" :class="isDocMsg == 'true' ? 'padding' : ''">
        <doctor-msg-item v-for="(message,index) in docMsgList" :key="index" :index="index" :docMsgList="message" :orgId="orgId"></doctor-msg-item>
      </div>
      <div v-if="isDocMsg == 'true'" class="bottom_box">
        <span @click="goDocDetail">医生主页</span>
        <span @click="goChatRecord">咨询记录</span>
        <span @click="goMoreServer">更多服务</span>
      </div>
      <div @click="toChat" class="flex_btn" v-if="isTalk && isDocMsg == 'true'">问诊中</div>
    </div>
    <div class="empty" v-if="docMsgList.length == 0">
      <img :src="consultationEmpty" width="144px" height="136px">
      <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无消息记录</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import DoctorMsgItem from "./DoctorMsgItem.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      docMsgList: [],
      orgId: this.$route.query.orgId,
      modeId: this.$route.query.modeId,
      title: this.$route.query.title,
      isDocMsg: this.$route.query.isDocMsg,
      docName: this.$route.query.docName,
      targetId: this.$route.query.targetId,
      docPhotoUrl: this.$route.query.docPhotoUrl,
      gender: this.$route.query.gender,
      isTalk: false
    };
  },

  components: {
    doctorMsgItem: DoctorMsgItem
  },
  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },

  methods: {
    //问诊中
    toChat() {
      this.$router.push({
        path: "chat",
        query: {
          docId: this.targetId,
          drName: this.docName,
          friendHeadUrl: this.docPhotoUrl,
          isDoctorChat: "1",
          isTalk: this.isTalk
        }
      });
    },
    //医生主页
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.targetId
        }
      });
    },
    //咨询记录
    goChatRecord() {
      this.$router.push({
        path: "recordList",
        query: {
          docId: this.targetId,
          userId: this.loginData.userObj.userId.value,
          friendHeadUrl: this.docPhotoUrl,
          gender: this.gender
        }
      });
    },
    //更多服务
    goMoreServer() {
      this.$router.push({
        path: "serviceList",
        query: {
          acceptId: this.targetId
        }
      });
    },
    //获取消息列表
    requestMsgList() {
      let vm = this;
      const request = {
        orgId: this.orgId,
        userId: this.loginData.userObj.userId.value,
        modeId: this.modeId,
        targetId: this.targetId
      };
      this.$store
        .dispatch("sysMesList", request)
        .then(data => {
          if (data.mesList) {
            for (let i = 0; i < data.mesList.length; i++) {
              vm.docMsgList.push(data.mesList[i]);
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //获取会话状态
    requestImStatus() {
      let request = {
        docId: this.targetId,
        userId: this.loginData.userObj.userId.value
      };
      let vm = this;
      this.$store
        .dispatch("imStatus", request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.isTalk = data.isTalk;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.requestMsgList();
    document.title = '消息列表';
    if (this.isDocMsg == "true") {
      document.title = this.docName;
      this.requestImStatus();
    } else {
      document.title = this.title;
    }
  }
};
</script>

<style scoped>
.empty {
  padding: 50px 40px;
  text-align: center;
}
.box {
  padding: 0 16px;
}
.bottom_box {
  position: fixed;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  background: #fff;
  display: flex;
  width: 100%;
}
.bottom_box span {
  flex: 1;
  text-align: center;
  color: #040b1c;
  font-size: 13px;
  font-weight: 500;
  position: relative;
}
.bottom_box span:not(:last-child)::after{
  content: '';
  position: absolute;
  right: 0;
  width: 1px;
  height: 15px;
  top: 17.5px;
  background:rgba(4,11,28,.1);
}
.padding {
  padding-bottom: 100px;
}
.flex_btn {
  position: fixed;
  right: 16px;
  bottom: 80px;
  width: 56px;
  height: 56px;
  line-height: 56px;
  border-radius: 50px;
  background: linear-gradient(
    280deg,
    rgba(0, 106, 255, 1) 0%,
    rgba(0, 147, 255, 1) 100%
  );
  color: #fff;
  font-size: 14px;
  font-weight: 500;
  text-align: center;
}
</style>


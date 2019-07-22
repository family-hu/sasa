<template>
    <div>
      <div class="cell">
        <div class="flex-b" style="padding:10px 0">
          <div class="left_box">
            <img width="56px" height="56px" :src="docImg">
            <div class="left_text">
              <div>
                <span class="namecs">{{ doctorDetail.userName}}</span>
                <span class="titlecs">{{ typeName }}</span>
              </div>
              <p class="jibie">{{ doctorTitle }} <span>{{doctorDetail.departmentName}}</span></p>
            </div>
          </div>
          <!-- <img class="img" :src="arrowImg"> -->
        </div>

        <div class="my_line"></div>
        <div class="btn_box">
          <button type="button" class="btn" @click="toDetail">医生主页</button>
          <button type="button" class="btn btn1" @click="toDoctorMsg">医生动态<em v-if="toDoctorMsg.mesNum > 0" class="dot"></em></button>
          <button type="button" class="btn btn1 btn2" @click="toDoctorChat" v-if="isTalk">问诊中</button>
          <button type="button" class="btn btn1" @click="toDoctorChat" v-else>联系医生</button>
        </div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
export default {
  props: {
    doctorDetail: {}
  },
  data() {
    return {
      isTalk: false
    };
  },

  computed: {
    ...mapGetters(["loginData"]),
    docImg() {
      let imgUrl = imgMap.docRectMale;
      if (this.doctorDetail.photoUrl) {
        imgUrl = this.doctorDetail.photoUrl;
      } else {
        if (this.doctorDetail.gender) {
          let gender = this.doctorDetail.gender.value;
          if (gender == "0") {
            imgUrl = imgMap.docRectFeMale;
          }
        }
      }
      return imgUrl;
    },
    arrowImg() {
      return imgMap.arrowRight;
    },
    typeName() {
      let type = this.doctorDetail.titlesName;
      let officeTypeName = this.doctorDetail.officeTypeName;
      if (officeTypeName) {
        type += "/" + officeTypeName;
      }
      return type;
    },
    doctorTitle() {
      let title = this.doctorDetail.orgNames;
      return title;
    }
  },

  methods: {
    //联系医生
    toDoctorChat() {
      this.$router.push({
        path: "chat",
        query: {
          docId: this.doctorDetail.userId.value,
          drName: this.doctorDetail.userName,
          friendHeadUrl: this.doctorDetail.photoUrl,
          isDoctorChat: "1",
          isTalk: this.isTalk
        }
      });
    },
    //医生动态
    toDoctorMsg() {
      this.$router.push({
        path: "doctorMsgList",
        query: {
          isDocMsg: true,
          targetId: this.doctorDetail.userId.value, //医生ID
          docName: this.doctorDetail.userName,
          orgId: this.doctorDetail.orgId,
          docPhotoUrl: this.doctorDetail.photoUrl,
          gender: this.doctorDetail.gender.value,
          modeId: 8107102
        }
      });
    },
    //医生主页
    toDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: { userId: this.doctorDetail.userId.value }
      });
    },
    //获取会话状态
    requestImStatus() {
      let request = {
        docId: this.doctorDetail.userId.value,
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
    this.requestImStatus();
  }
};
</script>

<style scoped>
.left_box {
  display: flex;
  align-items: center;
}
.left_text {
  margin-left: 10px;
}
.my_line {
  width: 100%;
  height: 1px;
  background: rgba(4, 11, 28, 0.1);
}
.cell {
  background: rgba(255, 255, 255, 1);
  padding: 15px 16px;
  margin: 10px 12px 0px 12px;
}

.namecs {
  font-size: 17px;
  font-weight: 500;
  color: #040b1c;
}

.titlecs {
  font-size: 14px;
  color: rgba(4, 11, 28, 0.5);
  margin-left: 5px;
}

.jibie {
  font-size: 14px;
  color: rgba(4, 11, 28, 0.5);
  margin-top: 10px;
}
.img {
  width: 12px;
  height: 19px;
}
.btn_box {
  padding-top: 15px;
  display: flex;
  justify-content: space-between;
}
.btn {
  border: none;
  background: #fff;
  width: 33%;
  color: #0076ff;
  font-size: 13px;
  position: relative;
}
.btn .dot {
  position: absolute;
  right: 15px;
  top: 7px;
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: #ff0000;
}
.btn1::after {
  content: "";
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -7.5px;
  background: rgba(4, 11, 28, 0.1);
  width: 1px;
  height: 15px;
}
.btn2 {
  color: #ff0000;
}
</style>

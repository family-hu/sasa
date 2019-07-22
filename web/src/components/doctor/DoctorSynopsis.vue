<template>
  <div>
    <!-- 医生详情 -->
    <div class="body_box">
      <div class="doctor_box">
        <img class="bg_img" :src="docImg" alt="">
        <div class="detail_box">
          <div class="doc_item1">
            <div style="padding-top:17px">
              <div class="doctor_name">{{doctorDetail.userName}}<img src="/static/img/tag@2x.png" alt=""></div>
              <p class="doc_title">{{doctorDetail.departmentName}}  {{doctorDetail.titlesName}}</p>
            </div>
          </div>
        </div>
      </div>
       <div class="server_box">
        <div class="headerText">医生简介</div>
        <div class="titlecs">{{ despPerson }}</div>
      </div>
      <div class="server_box">
        <div class="headerText">擅长疾病</div>
        <div>
          <span class="jibing" v-for="(disease , index) in diseaseList" :key="index">{{ disease.nameCn }}</span>
        </div>
      </div>
      <div class="server_box">
        <div class="headerText">擅长领域</div>
         <div class="titlecs">{{doctorDetail.despSkill}}</div>
      </div>
      <div class="server_box">
        <div class="headerText">从业背景和经验</div>
         <div class="titlecs">{{doctorDetail.despExper}}</div>
      </div>
    </div>

  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      doctorDetail: {},
      drId: this.$route.query.drId,
    };
  },
  components: {
  },
  computed: {
    ...mapGetters(["loginData", "loginUrl"]),
    doctorName() {
      if (this.doctorDetail.userName) return this.doctorDetail.userName;
      if (this.doctorDetail.nickName) return this.doctorDetail.nickName;
      return "";
    },
    deptName() {
      if (!this.doctorDetail.userId) return "";
      if (this.doctorDetail.department.value == type.COUNTRY_ALL_DEPART) {
        //乡村全科
        if (this.doctorDetail.deptDesp) {
          return this.doctorDetail.deptDesp;
        } else {
          if (this.doctorDetail.departmentName) {
            return this.doctorDetail.departmentName;
          }
        }
      } else {
        if (this.doctorDetail.departmentName) {
          return this.doctorDetail.departmentName;
        }
      }
      return "";
    },
    //医生标签
    doctorTitle() {
      if (!this.doctorDetail.userId) return "";
      let title = this.doctorDetail.orgNames;
      let officeTypeName = this.doctorDetail.officeTypeName;
      if (officeTypeName && officeTypeName == "无级别") officeTypeName = "";
      if (officeTypeName) {
        title += " | " + officeTypeName;
      }
      return title;
    },
    //医生简介
    despPerson() {
      if (this.doctorDetail.despPerson) return this.doctorDetail.despPerson;
      return "无";
    },
    //收藏图片
    focusImg() {
      if (this.isFocus) return imgMap.focusLookImg;
      return imgMap.unfocusLookImg;
    },
    //分享图片
    shareImg() {
      return imgMap.shareImg;
    },
    //擅长疾病
    diseaseList() {
      return this.doctorDetail.diseaseList;
    },
    //医生头像
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
    //是否收藏
    isFocus() {
      if (this.doctorDetail.isFav) {
        if (this.doctorDetail.isFav.value == "1") return true;
      }
      return false;
    }
  },

  methods: {
    //获取医生详情
    expertDetail() {
      let request = { userIds: [this.drId] };
      let vm = this;
      this.$store
        .dispatch("expertDetailGet", request)
        .then(doctorList => {
          if (doctorList && doctorList.length > 0) {
            vm.doctorDetail = doctorList[0];
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.expertDetail();
  }
};
</script>

<style scoped>
.body_box{
  position: absolute;
  background: #fff;
  min-height: 100%;
  width: 100%;
}
.doctor_box {
  width: 100%;
  height: 160px;
  position: relative;
  margin-bottom: 6px;
}
.doctor_box .bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  z-index: 1;
  filter: blur(28px);
}
.doctor_box .detail_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 160px;
  padding: 0 16px;
  box-sizing: border-box;
  background:rgba(4,11,28,.6);
  filter:blur(0px);
}
.doctor_name {
  font-size: 22px;
  color: #fff;
  font-weight: 600;
}
.doctor_name img {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  position: relative;
  top: 3px;
}
.doc_item1 {
  position: absolute;
  bottom: 10px;
  z-index: 3;
}
.doc_head {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  text-align: center;
}
.doc_head img {
  width: 58px;
  height: 58px;
  border-radius: 50%;
  margin-top: 2px;
}
.doc_title {
  font-size: 14px;
  color: #fff;
  margin-top: 2px;
}
.doc_txt {
  margin-top: 2px;
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.doc_item2 {
  margin-top: 10px;
}
.item_box {
  display: flex;
}
.item_box p {
  font-size: 12px;
  color: #fff;
}
.item_box p em {
  font-size: 21px;
  color: #fff;
  font-weight: 600;
  margin-right: 5px;
}
.score {
  margin-left: 10px;
}
.score img {
  width: 12px;
  height: 12px;
}
.doc_detail {
  font-size: 12px;
  color: #fff;
  width: 68px;
  height: 20px;
  line-height: 20px;
  border-radius: 12px;
  border: 1px solid #fff;
  text-align: center;
}
.server_box {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
}
.headerText {
  font-weight: 600;
  font-size: 19px;
  color: #222222;
  padding: 10px 0;
  color: #040b1c;
}
.more {
  color: #0d1529;
  font-size: 12px;
}
.more img {
  width: 10px;
  height: 10px;
}
.server_box ul {
  margin-top: 6px;
}
.server_box li {
  display: flex;
  width: 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  background: #f8f8f8;
  margin-bottom: 10px;
  align-items: center;
}
.server_box li img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
.server_box li .both_txt {
  font-size: 16px;
  color: #040b1c;
  font-weight: 500;
}
.server_box li p {
  font-size: 13px;
  color: #040b1c;
}
.server_box li .item_right {
  width: 100%;
}
.server_box li .timer {
  color: #0076ff;
  font-size: 12px;
}
.server_box li .timer span {
  font-size: 16px;
  font-weight: 500;
}
.more_server {
  color: #040b1c;
  font-size: 12px;
  text-align: center;
  padding-bottom: 10px;
}
.more_server img {
  width: 10px;
  height: 10px;
  margin-left: 4px;
}
.team_box {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
}
.team_box li {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px 1px rgba(4, 11, 28, 0.06);
  border-radius: 4px;
  display: flex;
  align-items: center;
}
.team_box li img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 10px;
}
.good_service li img {
  width: 72px;
  height: 72px;
  border-radius: 0;
}
.record_box {
  display: flex;
  margin-top: 5px;
}
.record_box p {
  font-size: 10px;
  color: #0076ff;
  margin-right: 10px;
}
.record_box p img {
  width: 10px;
  height: 10px;
  margin-right: 3px;
}
.team_name {
  font-size: 16px;
  color: #040b1c;
  font-weight: 500;
}
.team_text {
  font-size: 13px;
  color: #040b1c;
  margin-top: 5px;
}
.service_tag span {
  margin-right: 10px;
  border-radius: 12px;
  border: 1px solid #0076ff;
  color: #0076ff;
  padding: 0 5px;
}
.goods {
  color: #0076ff;
  font-size: 13px;
}
.eva_box {
  padding: 0;
}
.bottom_box {
  margin: 20px 0;
  text-align: center;
  color: #040b1c;
  font-size: 12px;
}
.bottom_box h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
}
.eva_title {
  margin-bottom: 10px;
}
.eva_title span {
  display: inline-block;
  padding: 7px 8px;
  background: rgba(4, 11, 28, 0.04);
  border-radius: 14px;
  color: #040b1c;
  margin-right: 10px;
  margin-top: 10px;
}
.eva_title span.on {
  background: #0076ff;
  color: #fff;
}
.eva_title span em {
  margin-left: 3px;
}
.no_evaList {
  padding: 25px 70px;
  font-size: 14px;
  color: #040b1c;
}
.no_evaList a {
  color: #0076ff;
}
.flex_btn {
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: linear-gradient(
    280deg,
    rgba(0, 106, 255, 1) 0%,
    rgba(0, 147, 255, 1) 100%
  );
  color: #fff;
  font-size: 15px;
  border-radius: 50px;
  text-align: center;
  padding-top: 7px;
  box-sizing: border-box;
}
.bottom_talk {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #fff;
}
.bottom_left {
  width: 40%;
  padding-right: 30px;
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.item_talk {
  text-align: center;
  margin-left: 30px;
}
.item_talk img {
  width: 22px;
  height: 22px;
}
.item_talk p {
  font-size: 10px;
}
.btn1 {
  font-size: 16px;
  color: #ffffff;
  background-color: #0076ff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 60%;
  font-weight: 600;
}

.titlecs {
  font-size: 14px;
  color: #222222;
  line-height: 23px;
  text-align: justify;
  opacity: .8;
}
.jibing {
  display: inline-block;
  font-size: 13px;
  border-radius: 2px;
  padding: 4px 8px;
  margin-right: 15px;
  color: #040B1C;
  margin-bottom: 10px;
  background:rgba(4,11,28,.05);
}

</style>

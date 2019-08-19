<template>
    <div>
      <div class="flex-b  box" @click="goDetail">
        <div class="bgm">
          <img class="photo" :src="userImg">
          <div>
            <p class="wlab">{{ userName }}</p>
            <!-- <a href="javascript:void(0);" class="edit_user_msg" @click="goDetail">编辑个人信息</a> -->
          </div>
        </div>
        <img class="more" src="/static/img/arrow_right_white.png" alt="">
      </div>
       <div class="box2">
        <div class="icon_list">
          <div class="list" @click="goOrder">
            <img src="/static/img/my_visits_order.png" alt="">
            <p>问诊订单</p>
          </div>
          <div class="list" @click="goAppointOrder">
            <img src="/static/img/my_booking_order.png" alt="">
            <p>预约订单</p>
          </div>
          <div class="list" @click="goServiceOrder">
            <img src="/static/img/my_service_order.png" alt="">
            <p>服务包订单</p>
          </div>
          <div class="list" @click="medicalServices">
            <img src="/static/img/my_medical_services.png" alt="">
            <p>医疗服务</p>
          </div>
        </div>
        <!-- <div class="icon_list">
          <div class="list">
            <img src="/static/img/my_family_doctor.png" alt="">
            <p>家庭医生</p>
          </div>
          <div class="list">
            <img src="/static/img/my_nurse_come.png" alt="">
            <p>护士上门</p>
          </div>
          <div class="list">
          </div>
          <div class="list">
          </div>
        </div> -->
      </div>
      <div class="box3">
        <h3>我的资产</h3>
         <div class="item_box">
          <div class="item_box item item_coupons" @click="coupons">
            <div>
              <p class="price">优惠券</p>
              <p class="name">立即使用</p>
            </div>
            <!-- <img src="/static/img/my_cash.png" alt=""> -->
          </div>
          <div class="item_box item item_cash" @click="goMyCash">
            <div>
              <p class="price">钱包账户</p>
              <p class="name">查看资产</p>
            </div>
            <!-- <img src="/static/img/my_coupons.png" alt=""> -->
          </div>
        </div>
      </div>

      <!-- <div class="box2" style="height:auto">
        <h3>我的工具</h3>
        <div class="icon_list icon_list3">
          <a href="javascript:void(0);">
            <img src="/static/img/my_diagnosis_report.png" alt="">
            <span>诊后报到</span>
          </a>
          <a href="javascript:void(0);">
            <img src="/static/img/my_family.png" alt="">
            <span>我的家人</span>
          </a>
        </div>
      </div> -->
      <div class="cell" style="margin-top: 10px" @click="goFamliy">
        <span style="font-size:16px;color:rgba(4,11,28,1);">常用人员</span>
        <img class="imgR" :src="arrowImg">
      </div>
      <hr class="full-line" style="margin-left: 16px;" align= center size="0.5">
      <div class="cell"  @click="goHome">
        <span style="font-size:16px;color:rgba(4,11,28,1);">关于我们</span>
        <img class="imgR" :src="arrowImg">
      </div>
      <hr class="full-line" style="margin-left: 16px;" align= center size="0.5">

      <div class="cell" @click="goDownload">
        <span style="font-size:16px;color:rgba(4,11,28,1);">APP下载</span>
        <img class="imgR" :src="arrowImg">
      </div>

    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      balance: "0"
    };
  },
  props: ["orgId"],

  computed: {
    ...mapGetters(["loginData"]),
    mineBg() {
      return imgMap.mineBg;
    },
    userImg() {
      let imgUrl = imgMap.defaultAva;
      const userInfo = this.loginData.userObj;
      if (userInfo && userInfo.photoUrl) {
        imgUrl = userInfo.photoUrl;
      }
      return imgUrl;
    },
    userName() {
      const userInfo = this.loginData.userObj;
      if (userInfo) {
        if (userInfo.userName) {
          return userInfo.userName;
        } else if (userInfo.nickName) {
          return userInfo.nickName;
        }
      }
      return "";
    },
    arrowImg() {
      return imgMap.arrowRight;
    }
  },

  methods: {
    //优惠券
    coupons() {
      this.$router.push({
        path: "couponsList"
      });
    },
    //钱包
    goMyCash() {
      window.location.href =
        "http://gzh.1010psy.com/expressiveList?initUserId=" +
        this.loginData.userObj.userId.value +
        "&orgId=" +
        this.orgId;
    },
    // 我的家人
    goFamliy() {
      this.$router.push({ path: "medicalManList", query: { from: "mine" } });
    },
    //问诊订单
    goOrder() {
      this.$router.push({ path: "orderList", query: { orgId: this.orgId } });
    },
    //服务包订单
    goServiceOrder() {
      this.$router.push({
        path: "serviceOrderList",
        query: { orgId: this.orgId }
      });
    },
    //预约订单
    goAppointOrder() {
      this.$router.push({
        path: "appointOrderList",
        query: { orgId: this.orgId }
      });
    },
    goDetail() {
      this.$router.push("/userDetail");
    },
    goDownload() {
      window.location.href = types.STORE_URL;
    },
    goHome() {
      window.location.href = types.HOME_URL;
    },
    //获取账号余额
    getUserAccount() {
      let request = {
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("userAccount", request)
        .then(data => {
          if (data && data.account) {
            this.balance = data.account.funds[0].money.value;
          }
          // else{
          //   this.$toast(data.rtnMsg);
          // }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    medicalServices() {
      this.$router.push({
        path: "shopOrderList",
        query: { orgId: this.orgId }
      });
    }
  },

  created() {
    const userInfo = this.loginData.userObj;
    if (userInfo) {
      const request = { userId: userInfo.userId.value };
      this.$store.dispatch("userInfoGet", request).catch(err => {
        this.$store.commit("clearUser");
        this.$store.commit("clearCache");
      });
      // this.getUserAccount();
    } else {
      this.myUtils.wxLogin();
    }
  }
};
</script>

<style scoped>
.box {
  background: #fff;
  padding: 16px;
  width: 100%;
  height: 100px;
  background: url("/static/img/mine_bg.png") no-repeat;
  background-size: 100% 100%;
  box-sizing: border-box;
}
.bgm {
  display: flex;
  align-items: center;
}
.more {
  width: 11px;
  height: 11px;
}
.wlab {
  color: #fff;
  font-weight: 500;
  font-size: 20px;
}
.edit_user_msg {
  font-size: 16px;
  color: #666;
}
.photo {
  width: 60px;
  height: 60px;
  border-radius: 32px;
  margin-right: 14px;
}

.imgR {
  width: 8px;
  height: 14px;
  float: right;
  position: absolute;
  margin: auto 0;
  top: 0;
  bottom: 0;
  right: 16px;
}

.cell {
  background-color: white;
  padding: 16px;
  position: relative;
}
.item_box {
  display: flex;
  /* justify-content: center; */
  align-items: center;
  background: #fff;
  padding: 0 16px;
}
.box3 h3 {
  font-size: 15px;
  color: #040b1c;
  font-weight: 600;
  background: #fff;
  margin-top: 10px;
  padding: 12px 0 0 16px;
}
.item {
  flex: 1;
  margin: 11px 0 13px 0;
}
.item img {
  width: 29px;
  height: 23px;
  margin-right: 10px;
}
.item_border {
  position: relative;
}
.item_border::after {
  content: "";
  width: 1px;
  height: 31px;
  background: #eee;
  position: absolute;
  right: 0;
}
.price {
  font-size: 15px;
  color: #040b1c;
  font-weight: 500;
}
.name {
  color: rgba(4, 11, 28, 0.4);
  font-size: 12px;
}
.box2 {
  background: #fff;
  padding: 20px 0;
  margin-top: -8px;
  /* height: 166px; */
  height: 110px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  box-sizing: border-box;
}
.box2 h3 {
  padding-left: 16px;
  margin-bottom: 20px;
  color: #000;
  font-weight: 500;
  font-size: 15px;
}
.icon_list {
  display: flex;
  padding: 0 6px;
  font-size: 12px;
  color: #666;
}
.icon_list img {
  width: 26px;
  height: 26px;
}
.list {
  flex: 1;
  text-align: center;
  margin-bottom: 20px;
}
.list p {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.8);
  margin-top: 5px;
}
.icon_list2 {
  position: absolute;
  /* left: 16px; */
  margin-left: 12px;
}
.icon_list2 .list {
  margin-top: 10px;
  flex: auto;
}
.icon_list3 {
  padding: 0 16px;
}
.icon_list3 a {
  display: block;
  margin-right: 20px;
  background: #f8f8f7;
  padding: 13px 14px;
  border-radius: 3px;
}
.icon_list3 a img {
  width: 24px;
  height: 24px;
  margin-right: 10px;
}
.icon_list3 a img {
  position: relative;
  top: 3px;
}
.icon_list3 a span {
  position: relative;
  bottom: 3px;
  color: #000000;
  font-size: 12px;
}
.item_cash {
  width: 167px;
  height: 64px;
  background: url("/static/img/my_cash.png") no-repeat;
  background-size: 100% 100%;
}
.item_coupons {
  width: 167px;
  height: 64px;
  background: url("/static/img/my_coupons.png") no-repeat;
  background-size: 100% 100%;
}
</style>

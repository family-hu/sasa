<template>
  <div>
      <div v-if="orderItem">
          <div class="main">
            <div class="flex-b title">
              <div class="order_num">{{orderItem.createTime}}</div>
              <div class="order_num" v-if="getPrice && getPrice != ''">
                订单金额：
                <span class="price">{{getPrice}}</span>
              </div>
            </div>
            <div class="box">
              <img :src="docImg" alt="">
              <div class="text">
                <p style="margin-bottom:5px">{{acceptName}}</p>
                <p class="title_name">{{deptName}}<span>{{ titlesName }}</span></p>
              </div>
            </div>
            <div class="flex-b" style="padding:10px 0">
              <div v-if="statusName == '已取消' || statusName == '已完成'" class="state">{{statusName}}</div>
              <div v-if="statusName == '等待受理' || statusName == '已受理' || statusName == '问诊中'" class="state state1">{{statusName}}</div>
              <div v-if="statusName == '待支付'" class="state state2">{{statusName}}</div>
              <div class="btn_box">
                <a class="btn_border" href="javascript:void(0);" v-if="statusName == '待支付'" @click.stop="cancelOrder">取消订单</a>
                <a class="btn_background" href="javascript:void(0);" v-if="statusName == '待支付'" @click.stop="goPay">去支付</a>
                <a class="btn_border" href="javascript:void(0);" v-if="statusName == '已完成' && status" @click.stop="goEvaluation">发布评价</a>
                <a class="btn_background" href="javascript:void(0);" v-if="statusName == '已受理' || statusName == '问诊中'" @click.stop="getImhelper">私信</a>
              </div>
            </div>
          </div>
      </div>

    </div>

</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return{
      helperId: '',
      groupId: ''
    }
  },
  props: ["orderItem"],

  computed: {
    ...mapGetters(["loginData"]),
    showMenu() {
      if (this.orderItem.cancelStatus.value != "0") return false; //已取消
      if (this.orderItem.isEnd.value == "1") return false; //归档了
      if (this.orderItem.status.value == types.ORDER_UNPAID) return true; //未支付
      if (this.orderItem.status.value == types.ORDER_UNCONFIRM) return true; //未确认 可以取消
      return false;
    },

    showPay() {
      return this.showMenu && this.orderItem.status.value == types.ORDER_UNPAID;
    },

    showCancel() {
      return (
        this.showMenu && this.orderItem.status.value == types.ORDER_UNCONFIRM
      );
    },
    // 是否显示评价按钮
    status() {
      if (this.orderItem.status.value == "5"){
        return false;
      }else{
        return true;
      }
    },
    docImg() {
      let imgUrl = imgMap.docMale;
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          if (acceptUser.photoUrl) {
            imgUrl = acceptUser.photoUrl;
          } else {
            let gender = acceptUser.gender.value;
            if (gender == "0") {
              imgUrl = imgMap.docFeMale;
            }
          }
        }
      }
      return imgUrl;
    },
    acceptName() {
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          return acceptUser.userName;
        }
      }
      return "";
    },

    acceptOrgName() {
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          return acceptUser.orgNames;
        }
      }
      return "";
    },
    getPrice() {
      let statusType = this.orderItem.statusType.value;
      if(statusType == '4' || statusType == '5'){
        let goodsSnapObj = this.orderItem.goodsSnapObj;
        if (goodsSnapObj) {
          return goodsSnapObj.price;
        }
      }else{
        let payMoney = this.orderItem.payMoney;
        if (payMoney) {
          return payMoney;
        }
      }
      return "";
    },
    statusName() {
      let statusType = this.orderItem.statusType.value;
      if(statusType == '0'){
        return "等待受理";
      }else if(statusType == '1'){
        return "已受理"
      }else if(statusType == '2'){
        return "问诊中"
      }else if(statusType == '3'){
        return "已完成"
      }else if(statusType == '4'){
        return "已取消"
      }else if(statusType == '5'){
        return "待支付"
      }
    },

    deptName() {
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          return acceptUser.departmentName;
        }
      }
      return "";
    },

    titlesName() {
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          return acceptUser.titlesName;
        }
      }
      return "";
    },

    docName() {
      let goodsSnapInfo = this.orderItem.goodsSnapObj;
      if (goodsSnapInfo) {
        let acceptUser = goodsSnapInfo.acceptUserObj;
        if (acceptUser) {
          return acceptUser.userName;
        }
      }
      return "";
    }
  },

  methods: {
    //评价
    goEvaluation() {
      let doctorDetail = {
        photoUrl: this.docImg,
        name: this.acceptName,
        desp: this.deptName + this.titlesName
      }
      this.$router.push({
        path: "evaluationOrder",
        query: {
          servId: this.orderItem.servId.value, //业务编号
          orgId: this.orderItem.orgId.value, //机构
          docId: this.orderItem.goodsSnapObj.acceptUserObj.userId.value, //被评价人
          doctorDetail: JSON.stringify(doctorDetail)
        }
      });
    },
    //私信-医生助理
    toChatHelper() {
      this.$router.push({
        path: "chat",
        query: {
          docId: this.orderItem.goodsSnapObj.acceptUserObj.userId.value,
          drName: this.orderItem.acceptUserObj.userName,
          friendHeadUrl: this.orderItem.acceptUserObj.photoUrl,
          gender: this.orderItem.acceptUserObj.gender.value,
          groupId: this.groupId
        }
      });
    },
    //咨询医助
    getImhelper() {
      let request = {
        docId: this.orderItem.goodsSnapObj.acceptUserObj.userId.value,
      };
      this.$store.dispatch("imhelper", request).then(data => {
        this.helperId = data.helperId.value;//助理ID
        if(this.helperId){
          this.imHelperOpen();
        }else{
          this.$toast('网络繁忙，稍后重试');
        }
      }).catch(e => {
        this.$toast(e.message);
      })
    },
    //医患开启助手群聊
    imHelperOpen() {
      let request = {
        docId: this.orderItem.goodsSnapObj.acceptUserObj.userId.value,
        userId: this.loginData.userObj.userId.value,
        helperId: this.helperId
      };
      this.$store
        .dispatch("imHelperOpen", request)
        .then(data => {
          if (data.groupId) {
            this.groupId = data.groupId.value; //群组ID
            this.toChatHelper();
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //取消订单
    cancelOrder() {
      let userId = this.loginData.userObj.userId.value;
      let request = {
        desp: "不想买了",
        opType: 3,
        servId: this.orderItem.servId.value,
        status: 1,
        stepType: 2006101100,
        userId: userId
      };
      this.$emit("cancelOrder", request);
    },

    //去支付
    goPay() {
      this.$router.push({
        path: "chatSubmitPay",
        query: {
          servId: this.orderItem.servId.value,
          drId: this.orderItem.goodsSnapObj.acceptUserObj.userId.value,
          snapId: this.orderItem.goodsSnapObj.snapId.value,
          price: this.orderItem.goodsSnapObj.price,
          orgId: this.orderItem.orgId.value,
          type: "图文咨询",
          docName: this.orderItem.goodsSnapObj.acceptUserObj.userName
        }
      });
    }

  }
};
</script>

<style scoped>
.main {
  background: #fff;
  padding: 0 16px;
  margin-top: 10px;
}
.title {
  padding: 10px 0;
}
.order_num {
  color: rgba(4, 11, 28, 0.4);
  font-size: 13px;
}
.price {
  color: #ff0a0a;
  font-size: 13px;
  font-weight: 500;
}
.box {
  display: flex;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.box img {
  width: 56px;
  height: 56px;
}
.text {
  margin-left: 10px;
}
.text p {
  font-size: 17px;
  color: #040b1c;
  font-weight: 600;
}
.text .title_name {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
  font-weight: 400;
}
.text .title_name span {
  margin-left: 5px;
}
.state {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
  font-weight: 500;
}
.state.state1 {
  color: #0076ff;
}
.state.state2 {
  color: #ff0000;
}
.btn_box {
  background: #fff;
  display: flex;
  justify-content: flex-end;
  margin-right: -16px;
}
.btn_box a {
  display: block;
  margin-right: 16px;
  width: 72px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 2px;
  font-size: 13px;
}
.btn_border {
  border: 1px solid #0093ff;
  color: #0093ff;
  background: #fff;
}
.btn_background {
  background: #0093ff;
  color: #fff;
  border: 1px solid transparent;
}
</style>

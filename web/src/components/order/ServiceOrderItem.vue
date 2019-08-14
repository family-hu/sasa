<template>
  <div class="main">
    <div class="flex-b title">
      <div class="order_num">订单编号：{{orderItem.orderId.value}}</div>
      <div class="state" v-if="statusName == '已取消' || statusName == '已完成'">{{statusName}}</div>
      <div class="state state1" v-else>{{statusName}}</div>
    </div>
    <div class="box" @click="goDetail">
      <img :src="servImgUrl" alt="">
      <div class="text">
        <p class="order_name">{{orderItem.servName}}</p>
        <p class="order_num">¥{{orderItem.price}}</p>
      </div>
    </div>
    <div class="flex-b" style="height:56px">
      <div class="total">订单金额：<span>¥{{orderItem.price}}</span></div>
      <div class="btn_box">
        <a href="javascript:void(0);" class="btn_border" v-if="isShowCancel" @click.stop="cancelOrder">取消订单</a>
        <a href="javascript:void(0);" v-if="isShowPay" class="btn_background" @click.stop="goPay">去支付</a>
        <!-- <a href="javascript:void(0);" class="btn_background" v-if="isShowContact" @click.stop="contact">联系医生</a> -->
      </div>
    </div>
  </div>
</template>

<script>
  import imgMap from '../../../static/js/imgmap.js';
  import * as types from '../../constant/ConstantConfig.js';
    export default {
      props: ['orderItem'],
      computed: {
        servImgUrl() {
          if (this.orderItem.servImgUrl) return this.orderItem.servImgUrl;
          if (this.orderItem.servType.value == types.PACK_PERSON) {
            return imgMap.packPerson;
          } else if (this.orderItem.servType.value == types.PACK_TEAM) {
            return imgMap.packTeam;
          }
          return imgMap.packDept;
        },

        statusName() {
          let status = this.orderItem.status.value;
          let isEnd = this.orderItem.isEnd.value;
          if(status == types.ORDER_COMPLETE_UNCOMMENT || status == types.ORDER_COMPLETE_COMMENT) {
            return "已完成";
          }
          if(isEnd == "0") {
            if (status == types.ORDER_UNPAID) return "未付款";
            if (status == types.ORDER_UNCONFIRM) return "待确认";
            if (status == types.ORDER_ADVICING) return "服务中";
          } else {
            return "已取消";
          }
        },

        isShowPay() {
          let status = this.orderItem.status.value;
          let isEnd = this.orderItem.isEnd.value;
          if(isEnd == "0" && status == types.ORDER_UNPAID) return true;
          return false;
        },

        isShowCancel() {
          let status = this.orderItem.status.value;
          let isEnd = this.orderItem.isEnd.value;
          if(isEnd == "0" && status == types.ORDER_UNCONFIRM) return true;
          return false;
        },

        isShowContact() {
          let status = this.orderItem.status.value;
          let isEnd = this.orderItem.isEnd.value;
          if(isEnd == "0" && status == types.ORDER_ADVICING) return true;
          return false;
        },

        deptName() {
          if (this.orderItem.department && this.orderItem.department.value == types.COUNTRY_ALL_DEPART) {  //乡村全科
            if (this.orderItem.deptDesp) {
              return this.orderItem.deptDesp;
            } else {
              if (this.orderItem.departmentName) {
                return this.orderItem.departmentName;
              }
            }
          } else {
            if (this.orderItem.departmentName) {
              return this.orderItem.departmentName;
            }
          }
          return '';
        },
        serverUser() {
          let doctor = this.orderItem.acceptUserObj;
          if(doctor) {
            let strDoctor = doctor.userName;
            if (doctor.department && doctor.department.value == types.COUNTRY_ALL_DEPART) {  //乡村全科
              if (doctor.deptDesp) {
                strDoctor += doctor.deptDesp;
              } else {
                if (doctor.departmentName) {
                  strDoctor += doctor.departmentName;
                }
              }
            } else {
              if (doctor.departmentName) {
                strDoctor += doctor.departmentName;
              }
            }
            if(doctor.titlesName) {
              strDoctor += doctor.titlesName;
            }
            return strDoctor;
          }
       }
      },

      methods: {
        //服务包详情
        goDetail() {
          this.$router.push({
            path: "serviceOrderDetail",
            query:{
              orderId: this.orderItem.orderId.value,
            }
          })
        },
        //去支付
        goPay() {
          this.$router.push({
            path: "serviceSubmitPay",
            query:{
              busiId: this.orderItem.orderId.value,
              price: this.orderItem.price,
              orgId: this.orderItem.orgId.value
            }
          })
        },

        //取消订单
        cancelOrder() {
          let request = {orderId: this.orderItem.orderId.value, status: -1};
          this.$emit("cancelOrder", request);
        },
        //联系医生
        contact() {
          let doctor = this.orderItem.acceptUserObj;
          if(!doctor) return;
          this.$router.push({
            path: "chat",
            query: {docId: doctor.userId.value, drName: doctor.userName, friendHeadUrl: doctor.photoUrl, gender: doctor.gender.value}
          })
        }

      }

    }
</script>

<style scoped>
.main {
  background: #fff;
  padding: 0 16px;
  margin-top: 10px;
}
.title {
  padding-top: 10px;
}
.order_num {
  color: rgba(4, 11, 28, 0.5);
  font-size: 13px;
}
.state {
  font-size: 13px;
  font-weight: 500;
  color: rgba(4, 11, 28, 0.5);
}
.state1 {
  color: #ff0a0a;
}
.box {
  display: flex;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
}
.box img {
  width: 81px;
  height: 60px;
}
.text {
  margin-left: 10px;
}
.order_name {
  font-size: 17px;
  color: #040b1c;
  font-weight: 600;
}
.text span {
  font-size: 13px;
  margin-left: 10px;
  color: rgba(4, 11, 28, 0.5);
}
.order_time {
  color: #040b1c;
  font-size: 13px;
}
.total {
  font-size: 13px;
  color: #040b1c;
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
  font-size: 13px;
  border-radius: 13px;
}
.btn_border {
  border: 1px solid #0076ff;
  color: #0076ff;
  background: #fff;
}
.btn_background {
  background: #0076ff;
  color: #fff;
  border: 1px solid transparent;
}
</style>

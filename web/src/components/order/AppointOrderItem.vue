<template>
  <div class="main">
    <div class="flex-b title">
      <div class="order_num">订单编号：{{orderItem.orderid.value}}</div>
      <div class="state" v-if="statusName == '已取消' || statusName == '已完成'">{{statusName}}</div>
      <div class="state state1" v-else>{{statusName}}</div>
    </div>

    <div class="box" @click="goDetail">
      <img :src="docImg" alt="">
      <div class="text">
        <div style="display:flex;align-items: center;margin-bottom:5px">
           <p class="order_name">{{ orderItem.docName}}</p>
           <span>{{ deptName }}</span>
           <span>{{ orderItem.titlesName }}</span>
        </div>
        <p class="order_time">{{ orderItem.subscribe_day }} {{ orderItem.subscribe_am | maText }}{{ orderItem.subscribe_work_time }}</p>
      </div>
    </div>
    <div class="flex-b" style="height:56px">
      <div class="total">订单金额：<span>¥{{orderItem.price.value}}</span></div>
      <div class="btn_box" v-if="orderItem.status.value == '0'">
        <a href="javascript:void(0);" class="btn_border" @click.stop="cancelOrder">取消订单</a>
      </div>
      <div class="btn_box" v-if="orderItem.status.value == '5'">
        <a href="javascript:void(0);" class="btn_background" @click.stop="goPay">去支付</a>
      </div>
      <div class="btn_box" v-if="orderItem.status.value == '2'">
        <a href="javascript:void(0);" class="btn_background" @click.stop="documentDetail">诊疗详情</a>
      </div>
      <!-- <div class="btn_box" v-if="orderList.orderStatus == '1'">
        <a class="btn_border" href="javascript:void(0);" @click="goTel">电话预约</a>
        <a class="btn_background" href="javascript:void(0);" @click="goServiceVoucher">查看券</a>
      </div>
      <div class="btn_box" v-if="orderList.orderStatus == '11'">
        <a class="btn_border" href="javascript:void(0);" @click="goShopAddComments">去评价</a>
        <a class="btn_background" href="javascript:void(0);" @click="goShopReport">查看报告</a>
      </div>
      <div class="btn_box" v-if="orderList.orderStatus == '12'">
        <a class="btn_border" href="javascript:void(0);" @click="goShopQueryComments">查看评价</a>
        <a class="btn_background" href="javascript:void(0);" @click="goShopReport">查看报告</a>
      </div> -->
    </div>

      <!-- <div style="display: inline-block;padding-top: 10px;padding-bottom: 10px;width: 100%">
        <button type="button" class="btn1" v-if="orderItem.status.value == '2'" @click.stop="documentDetail">诊疗详情</button>
        <button type="button" class="btn1" v-if="orderItem.status.value == '0'" @click.stop="cancelOrder">取消订单</button>
        <button type="button" class="btn1" v-if="orderItem.status.value == '5'" @click.stop="goPay">去支付</button>
      </div>

      <div style="height: 10px; background: #f7f7f7"></div> -->
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  props: ["orderItem"],

  filters: {
    maText(subscribeMa) {
      if (subscribeMa.value == "0") return "上午";
      return "下午";
    }
  },

  computed: {
    docImg() {
      let imgUrl = imgMap.docMale;
      if (this.orderItem.photoUrl) {
        imgUrl = this.orderItem.photoUrl;
      } else {
        if (this.orderItem.gender) {
          let gender = this.orderItem.gender.value;
          if (gender == "0") {
            imgUrl = imgMap.docFeMale;
          }
        }
      }
      return imgUrl;
    },
    statusName() {
      let status = this.orderItem.status.value;
      if (status == "0") return "待确认";
      if (status == "1") return "已预约";
      if (status == "2") return "已完成";
      if (status == "3") return "已过期";
      if (status == "4") return "已取消";
      if (status == "5") return "未付款";
      return "";
    },

    deptName() {
      if (
        this.orderItem.department &&
        this.orderItem.department.value == types.COUNTRY_ALL_DEPART
      ) {
        //乡村全科
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
      return "";
    }
  },
  methods: {
    createItem() {
      let item = {
        subscribeMa: this.orderItem.subscribe_am,
        date: this.orderItem.subscribe_day,
        price: this.orderItem.price,
        workTime: this.orderItem.subscribe_work_time
      };
      item.hospital = this.orderItem.hospital;
      item.userName = this.orderItem.docName;
      item.titlesName = this.orderItem.titlesName;
      item.department = this.orderItem.department;
      item.departmentName = this.orderItem.departmentName;
      item.deptDesp = this.orderItem.deptDesp;
      item.docid = this.orderItem.docid;
      item.orgId = this.orderItem.orgId;
      item.orderId = this.orderItem.orderid.value;
      item.subscribeName = this.orderItem.subscribeName;
      item.phone = this.orderItem.phone;
      item.status = this.orderItem.status.value;
      item.timeCreate = this.orderItem.timeCreate;
      return item;
    },

    goDetail() {
      // sessionStorage.setItem("appointOrder", JSON.stringify(this.createItem()));
      this.$router.push({
        path: "appointOrderDetail",
        query: { orderId: this.orderItem.orderid.value }
      });
    },

    //跳转诊疗详情
    documentDetail() {
      this.$router.push({
        path: "documentDetail",
        query: { orderId: this.orderItem.orderid.value }
      });
    },

    //取消订单
    cancelOrder() {
      let request = { orderId: this.orderItem.orderid.value, opType: 1 };
      this.$emit("cancelOrder", request);
    },

    goPay() {
      const item = this.createItem();
      sessionStorage.setItem("appointItem", JSON.stringify(item));
      this.$router.push({
        path: "appointSubmit",
        query: { orderId: item.orderId }
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

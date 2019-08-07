<template>
  <div class="main">
    <div class="flex-b title">
      <div class="order_num">订单编号：{{orderList.orderId.value}}</div>
      <div class="state" v-if="orderList.orderStatusTxt">{{orderList.orderStatusTxt}}</div>
    </div>
    <div class="box" @click="goOrderDetail" >
      <img :src="orderList.picUrl" alt="">
      <div class="text">
        <p style="margin-bottom:5px">{{orderList.prodName}}</p>
        <p>¥{{orderList.moneyPay.value}}</p>
      </div>
    </div>
    <div class="flex-b" style="padding:5px 0">
      <div class="total">总计：<span>¥{{orderList.moneyPay.value}}</span></div>
      <div class="btn_box">
        <a class="btn_border" href="javascript:void(0);" @click="goTel" v-if="orderList.orderStatus == '1'">电话预约</a>
        <a class="btn_background" href="javascript:void(0);" @click="goServiceVoucher" v-if="orderList.orderStatus == '1'">查看券</a>
        <a class="btn_border" href="javascript:void(0);" @click="goShopAddComments" v-if="orderList.orderStatus == '11'">评价</a>
        <a class="btn_background" href="javascript:void(0);" @click="goShopReport" v-if="orderList.orderStatus == '11'">查看报告</a>
      </div>
    </div>
  </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {};
  },
  props: {
    orderList: {}
  },
  components: {},

  computed: {},

  mounted() {},

  methods: {
    goTel() {
      this.$toast("电话预约，敬请期待～");
    },
    //查看报告
    goShopReport() {
      this.$router.push({
        path: "shopPackageReport",
        query: {
          reportImg: this.orderList.consumeList[0].serviceInfo
        }
      });
    },
    //查看卷
    goServiceVoucher() {
      this.$router.push({
        path: "serviceVoucher",
        query: {
          orderId: this.orderList.orderId.value
        }
      });
    },
    //评论
    goShopAddComments() {
      this.$router.push({
        path: "shopAddComments",
        query: {
          orderId: this.orderList.orderId.value,
          prodId: this.orderList.prodId.value
        }
      });
    },
    //订单详情
    goOrderDetail() {
      this.$router.push({
        path: "shopOrderDetail",
        query: {
          orderId: this.orderList.orderId.value
        }
      });
    }
  },

  created() {}
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
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.order_num {
  color: #7a8093;
  font-size: 15px;
}
.state {
  color: #ff4343;
  font-size: 13px;
}
.box {
  display: flex;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.box img {
  width: 81px;
  height: 60px;
}
.text {
  margin-left: 10px;
}
.text p {
  font-size: 14px;
  color: #333;
  font-weight: 500;
}
.total {
  font-size: 13px;
  color: #000;
}
.total span {
  font-weight: 500;
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
  width: 71px;
  height: 29px;
  line-height: 29px;
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

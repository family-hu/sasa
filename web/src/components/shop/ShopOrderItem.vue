<template>
  <div class="main">
    <div class="flex-b title">
      <div class="order_num">订单编号：{{orderList.orderId.value}}</div>
      <div class="state" v-if="orderList.orderStatusTxt == '已取消' || orderList.orderStatusTxt == '已完成'">{{orderList.orderStatusTxt}}</div>
      <div class="state state1" v-else>{{orderList.orderStatusTxt}}</div>
    </div>
    <div class="box" @click="goOrderDetail" >
      <img :src="orderList.picUrl" alt="">
      <div class="text">
        <p class="order_name">{{orderList.prodName}}</p>
        <p class="order_num">¥{{orderList.moneyPay.value}}</p>
      </div>
    </div>
    <div class="flex-b" style="height:56px">
      <div class="total">订单金额：<span>¥{{orderList.moneyPay.value}}</span></div>
      <div class="btn_box" v-if="orderList.orderStatus == '0'">
        <a href="javascript:void(0);" class="btn_border" @click="cancelOrder">取消订单</a>
        <a href="javascript:void(0);" class="btn_background" @click="goPay">去支付</a>
      </div>
      <div class="btn_box" v-if="orderList.orderStatus == '1'">
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
    //查看评价
    goShopQueryComments() {
      this.$emit("child",this.orderList.prodId.value);
    },
    //去支付
    goPay() {
      this.$router.push({
        path: "shopPayList",
        query: {
          totalPrice: this.orderList.moneyPay.value, //合计支付金额
          packageName: this.orderList.prodName,
          orderId: this.orderList.orderId.value
        }
      });
    },
    //取消订单
    cancelOrder() {
      let request = {
        finOrderId : this.orderList.orderId.value,
      };
      this.$store
        .dispatch("shopCancelOrder", request)
        .then(data => {
          if(data.rtnCode == '1'){//订单取消成功
            this.$toast('订单取消成功');
            this.$router.push({
              path: "shopOrderList",
              query: {
                orgId: this.orderList.orgId.value
              }
            })
          }else{
            this.$toast(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
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
  padding-top:10px;
}
.order_num {
  color:rgba(4,11,28,.5);
  font-size: 13px;
}
.state {
  font-size: 13px;
  font-weight: 500;
  color:rgba(4,11,28,.5);
}
.state1{
  color: #FF0A0A;
}
.box {
  display: flex;
  align-items: center;
  padding: 11px 0;
  border-bottom: 1px solid rgba(4,11,28,.1);
}
.box img {
  width: 81px;
  height: 60px;
}
.text {
  margin-left: 10px;
}
.order_name {
  font-size: 16px;
  color: #040B1C;
  font-weight: 500;
  margin-bottom: 5px;
}
.total {
  font-size: 13px;
  color: #040B1C;
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
  border: 1px solid #0076FF;
  color: #0076FF;
  background: #fff;
}
.btn_background {
  background: #0076FF;
  color: #fff;
  border: 1px solid transparent;
}
</style>

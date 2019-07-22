<template>
    <div>
      <div class="main">
        <img class="pay_ok_img" src="/static/img/pay_ok_icon.png" alt="">
        <p class="pay_ok_text">支付成功</p>
      </div>
      <div class="pay_detail">
        <span class="pay_ok_text">共一件商品，实付款 :</span>
        <span class="price">¥{{totalPrice}}</span>
      </div>
      <div class="btn_box2">
        <a class="order_detail" href="javascript:void(0);" @click="goOrderDetail">订单详情</a>
        <a class="home" href="javascript:void(0);" @click="goHome">返回首页</a>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      totalPrice: this.$route.query.totalPrice
    };
  },

  components: {

  },


  computed: {

  },

  mounted() {
  },

  methods: {
    goHome() {
      this.$router.push({
        path: "home",
        query: {
          orgId: localStorage.getItem('orgId')
        }
      });
    },
    goOrderDetail() {
      this.$router.push({
        path: "shopOrderList",
        query: {
          orgId: localStorage.getItem('orgId')
        }
      });
    }

  },

  created() {
  },


};
</script>

<style scoped>
.main{
  background: #fff;
  padding: 37px;
  text-align: center;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.pay_ok_img{
  width: 54px;
  height: 54px;
  margin-bottom: 14px;
}
.pay_ok_text{
  font-size: 14px;
  color: #000;
}
.pay_detail{
  text-align: right;
  padding: 16px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
  background: #fff;
}
.price{
  color: #FF0000;
  font-size: 14px;
  margin-left: 5px;
}
.btn_box2{
  padding: 10px 0;
  background: #fff;
  display: flex;
  justify-content: flex-end;
}
.btn_box2 a{
  display: block;
  margin-right: 16px;
  width: 71px;
  height: 29px;
  line-height: 29px;
  text-align: center;
  border-radius: 2px;
  font-size: 13px;
}
.order_detail{
  border:1px solid #0093FF;
  color: #0093FF;
  background: #fff;
}
.home{
  background: #0093FF;
  color: #fff;
  border:1px solid transparent;
}
</style>

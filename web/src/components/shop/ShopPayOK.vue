<template>
    <div>
      <div class="main">
        <img class="pay_ok_img" src="/static/img/pay_ok_icon.png" alt="">
        <p class="pay_ok_text">订单支付成功</p>
        <div class="btn_box2">
          <a class="home" href="javascript:void(0);" @click="goHome">更多医疗服务</a>
          <a class="order_detail" href="javascript:void(0);" @click="goOrderDetail">查看订单</a>
        </div>
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

  components: {},

  computed: {},

  mounted() {},

  methods: {
    goHome() {
      sessionStorage.setItem("selected", "shopping");
      this.$router.push({
        path: "home",
        query: {
          orgId: localStorage.getItem("orgId"),
        }
      });
    },
    goOrderDetail() {
      this.$router.push({
        path: "shopOrderList",
        query: {
          orgId: localStorage.getItem("orgId")
        }
      });
    }
  },

  created() {}
};
</script>

<style scoped>
/* .main{
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
} */
.main {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: #fff;
  text-align: center;
}
.pay_ok_img {
  width: 54px;
  height: 54px;
  margin-top: 50px;
  margin-bottom: 14px;
}
.pay_ok_text {
  font-size: 16px;
  color: #040b1c;
}
.btn_box2 {
  padding: 15px 0;
  display: flex;
  justify-content: center;
}
.btn_box2 a {
  display: block;
  padding: 4px 15px;
  text-align: center;
  border-radius: 16px;
  font-size: 14px;
}
.order_detail {
  color: #fff;
  background: #0076ff;
  border: 1px solid transparent;
  margin-left: 15px;
}
.home {
  background: #fff;
  color: #040b1c;
  border: 1px solid rgba(4, 11, 28, 0.118);
}
</style>

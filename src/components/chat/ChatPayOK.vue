<template>
    <div>
      <div class="main">
        <img class="pay_ok_img" src="/static/img/pay_ok_icon.png" alt="">
        <p class="pay_ok_text">订单支付成功，请耐心等待医生联系您！</p>
        <div class="btn_box2">
          <a class="home" href="javascript:void(0);" @click="goDocDetail">医生主页</a>
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
      totalPrice: this.$route.query.totalPrice,
      docId: this.$route.query.docId,
      orgId: this.$route.query.orgId
    };
  },

  components: {

  },


  computed: {

  },

  mounted() {
  },

  methods: {
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.docId
        }
      });
    },
    goOrderDetail() {
      this.$router.push({
        path: "orderList",
        query: {
          orgId: this.orgId
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
  position: fixed;
  top:0;
  bottom: 0;
  width: 100%;
  background: #fff;
  text-align: center;
}
.pay_ok_img{
  width: 54px;
  height: 54px;
  margin-top: 50px;
  margin-bottom: 14px;
}
.pay_ok_text{
  font-size: 16px;
  color: #040B1C;
}
.btn_box2{
  padding: 15px 0;
  display: flex;
  justify-content: center;
}
.btn_box2 a{
  display: block;
  width: 86px;
  height: 30px;
  line-height: 30px;
  text-align: center;
  border-radius: 16px;
  font-size: 14px;
}
.order_detail{
  color: #fff;
  background: #0076FF;
  border:1px solid transparent;
  margin-left: 15px;
}
.home{
  background: #fff;
  color: #040B1C;
  border:1px solid rgba(4,11,28,.118)
}
</style>

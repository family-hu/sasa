<template>
    <div>
        <div class="main">
          <div class="box flex-b">
            <div class="name package_name">{{packageName}}</div>
            <div class="price">¥{{totalPrice}}</div>
          </div>
        </div>
        <div class="main">
          <div class="box border flex-b">
            <div class="name">优惠券</div>
            <div class="state">无可用优惠券<img src="/static/img/arrow_right.png" alt=""></div>
          </div>
          <div class="box flex-b">
            <div class="name">总计</div>
            <div class="price">¥{{totalPrice}}</div>
          </div>
        </div>
        <p class="title">选择支付方式</p>
        <div class="main">
          <div class="box border flex-b">
            <div class="name"><img src="/static/img/balance_pay_icon.png" alt="">余额支付<span class="price">¥ {{balance}}</span></div>
            <el-radio v-model="radio" :disabled="disabled" label="0"></el-radio>
          </div>
          <div class="box flex-b">
            <div class="name"><img src="/static/img/wx_pay_icon.png" alt="">微信支付</div>
            <el-radio v-model="radio" label="1"></el-radio>
          </div>
        </div>
        <div class="btn_bottom flex-b">
          <a class="next_btn" @click="radioVal" href="javascript:void(0);">确认支付</a>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      radio: '0',
      balance: "0", //余额
      payOrderId: "", //支付订单
      disabled: false,
      totalPrice: this.$route.query.totalPrice, //合计支付金额
      packageName: this.$route.query.packageName,
      userName:this.$route.query.userName,
      gender: this.$route.query.gender,
      genderTxt: this.$route.query.genderTxt,
      mobile: this.$route.query.mobile,
      cardNo: this.$route.query.cardNo,
      orderId: this.$route.query.orderId
      // packDetailsId: this.$route.query.orderId
    };
  },

  components: {},

  computed: {
    ...mapGetters(["loginData", "loginUrl", "appId"])
  },

  mounted() {},

  methods: {
    //确认订单
    getShopOrderConfirm() {
      let request = {
        consumeList: [
          {
            cardId: this.cardNo,
            genderTxt:
              this.gender == "0"
                ? "女"
                : this.gender == "1"
                  ? "男"
                  : this.genderTxt,
            mobile: this.mobile,
            name: this.userName
          }
        ],
        orderId: this.orderId
      };
      this.$store
        .dispatch("shopOrderConfirm", request)
        .then(data => {
          if (data.data.rtnCode == "1" && data.status == 200) {
            console.log("订单确定成功");
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //获取账号余额
    getUserAccount() {
      let request = {
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("finAccountQuery", request)
        .then(data => {
          if (data.data) {
            this.balance = data.data[0].moneyNow.value;
            if (parseInt(this.balance) < parseInt(this.totalPrice)) {
              this.radio = '1';
              this.disabled = true;
            }
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //选择支付方式
    radioVal() {
      if (this.totalPrice >= 0) {
        this.goPay();
      }
    },
    //支付订单
    goPay() {
      const request = {
        busiId: this.orderId, //订单ID
        busiType: 2000107,
        moneyRmb: this.totalPrice, //实际需要划扣的金额
        orgId: localStorage.getItem("orgId"),
        tradeMode: this.radio == "0" ? 8101103 : 8101104, //8101103 钱包  8101104 微信
        userId: this.loginData.userObj.userId.value
      };
      //商城支付
      let method = "payCreateOrder";
      // //在线咨询
      // if (isChat) {
      //   method = "userConsume";
      // }
      this.$store
        .dispatch(method, request)
        .then(data => {
          console.log(data, "==data");
          let json = data.data;
          if (json) {
            json = eval("(" + json + ")");
            this.getWx(json);
          }else{
            if (data.rtnCode == "1") {
              //支付成功
              return this.$router.push({
                path: "shopPayOk",
                query: {
                  totalPrice: this.totalPrice
                }
              });
            }else{
              this.$toast(data.rtnMsg);
            }
          }
        })
        .catch(err => {
          this.$toast(err.message);
        });
    },
    onBridgeReady(json) {
      let that = this;
      WeixinJSBridge.invoke(
        "getBrandWCPayRequest",
        {
          appId: json.appId,
          timeStamp: json.timeStamp, //时间戳
          nonceStr: json.nonceStr, //随机串
          package: json.package,
          signType: json.signType, //微信签名方式：
          paySign: json.paySign //微信签名
        },
        function(res) {
          if (res.err_msg == "get_brand_wcpay_request:ok") {
            //支付成功
            that.$router.push({
              path: "shopPayOk",
              query: {
                totalPrice: that.totalPrice
              }
            });
          } else {
            that.$toast("支付失败，请重试");
            that.$router.go(-1);
          }
        }
      );
    },
    getWx(json) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(json),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent("WeixinJSBridgeReady", this.onBridgeReady(json));
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(json)
          );
        }
      } else {
        this.onBridgeReady(json);
      }
    }
  },

  created() {
    const userInfo = this.loginData.userObj;
    if (!userInfo) {
      this.myUtils.wxLogin();
    } else {
      this.getUserAccount(); //获取钱包余额
      this.getShopOrderConfirm(); //确认订单
    }
  }
};
</script>

<style scoped>
/deep/ .el-radio__label{
  display:  none
}
.main {
  background: #fff;
  margin-bottom: 10px;
}
.box {
  background: #fff;
  padding: 18px 16px 18px 0;
  margin-left: 16px;
}
.border {
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
}
.name {
  font-size: 14px;
  color: #000;
}
.name span {
  color: #666;
  margin-left: 10px;
}
.name img {
  width: 22px;
  height: 22px;
  margin-right: 10px;
  position: relative;
  top: 5px;
}
.price {
  color: #ff0000;
  font-size: 14px;
}
.name span.price {
  margin-left: 20px;
  color: #ff0000;
  font-size: 14px;
}
.state {
  color: #b3b3b3;
  font-size: 14px;
}
.state img {
  width: 8px;
  height: 14px;
  margin-left: 5px;
  position: relative;
  top: 3px;
}
.title {
  font-size: 12px;
  color: #b3b3b3;
  padding-left: 16px;
  margin-bottom: 10px;
}
.btn_bottom {
  position: fixed;
  bottom: 33px;
  height: 44px;
  width: 100%;
  background: #fff;
  box-sizing: border-box;
}
.next_btn {
  display: block;
  width: 91%;
  height: 44px;
  margin: 0 auto;
  background: #0093ff;
  line-height: 44px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  border-radius: 2px;
}
.package_name{
  width: 75%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
</style>

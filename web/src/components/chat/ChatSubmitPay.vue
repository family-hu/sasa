<template>
    <div>
      <div class="main">
          <div class="box flex-b">
            <div class="name package_name">在线咨询 <span>{{ docName }}</span></div>
            <div class="price">¥{{price}}</div>
          </div>
        </div>
        <div class="main">
          <div class="box border flex-b">
            <div class="name">优惠券</div>
            <div class="state">无可用优惠券<img src="/static/img/arrow_right.png" alt=""></div>
          </div>
          <div class="box flex-b">
            <div class="name">总计</div>
            <div class="price">¥{{price}}</div>
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
import Header from "../Header.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      radio: "0",
      balance: "0", //余额
      disabled: false,
      price: this.$route.query.price,
      snapId: this.$route.query.snapId,
      orgId: this.$route.query.orgId,
      drId: this.$route.query.drId,
      servId: this.$route.query.servId,
      busiType: 2000104,
      type: this.$route.query.type,
      docName: this.$route.query.docName
      // payWx: imgMap.payWx
    };
  },

  components: {
    appHeader: Header
  },

  computed: {
    ...mapGetters(["loginData"]),
    servName() {
      let userInfo = this.loginData.userObj;
      let servName = userInfo.userName;
      if (!servName) {
        servName = userInfo.nickName;
      }
      return servName;
    }
  },

  methods: {
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
            if (parseInt(this.balance) < parseInt(this.price)) {
              this.radio = '1';
              this.disabled = true;
            }
          }else{
            // this.$toast(data.rtnMsg);
            this.radio = '1';
            this.disabled = true;
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //选择支付方式
    radioVal() {
      if (this.price >= 0) {
        this.submitOrder();
      }
    },
    submitOrder() {
      let vm = this;
      if (!this.servId) {
        //没有servId,下单
        let request = {
          userId: this.loginData.userObj.userId.value,
          snapId: this.snapId,
          goodsType: this.busiType,
          servName: this.servName,
          despIllness: "无",
          showDiary: 1,
          showDynamic: 1,
          orgId: this.orgId
        };
        this.$indicator.open();
        this.$store
          .dispatch("orderSubmit", request)
          .then(data => {
            vm.servId = data.servId.value;
            vm.wxPay();
          })
          .catch(e => {
            this.$toast(e.message);
            this.$indicator.close();
          });
      } else {
        this.$indicator.open();
        vm.wxPay();
      }
    },
    wxPay() {
      let vm = this;
      let request = {
        busiId: this.servId,
        busiType: this.busiType,
        desp: this.type,
        drId: this.drId,
        money: this.price,
        moneyRmb: this.price,
        orgId: this.orgId,
        tradeMode: this.radio == "0" ? 8101103 : 8101104, //8101103 钱包  8101104 微信
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("userConsume", request)
        .then(data => {
          //支付成功
          if (data.rtnCode == "1") {
            let json = data.data;
            if (json) {
              json = eval("(" + json + ")");
              vm.invokeWx(json);
            } else {
              this.$indicator.close();
              // this.$toast("余额支付成功");
              vm.$router.push({
                path: "chatPayOk",
                query: {
                  docId: this.drId,
                  orgId: this.orgId,
                  type: 'chat'
                }
              });
            }
          } else {
            this.$indicator.close();
            this.$toast("网络异常，支付失败");
            vm.$router.go(-1);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    onBridgeReady(request) {
      let vm = this;
      WeixinJSBridge.invoke("getBrandWCPayRequest", request, function(res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          //支付成功
          vm.$router.push({
            path: "chatPayOk",
            query: {
              docId: this.drId,
              orgId: this.orgId,
              type: 'chat'
            }
          });
        } else {
          this.$toast("支付失败");
        }
      });
    },

    invokeWx(request) {
      if (typeof WeixinJSBridge == "undefined") {
        if (document.addEventListener) {
          document.addEventListener(
            "WeixinJSBridgeReady",
            this.onBridgeReady(request),
            false
          );
        } else if (document.attachEvent) {
          document.attachEvent(
            "WeixinJSBridgeReady",
            this.onBridgeReady(request)
          );
          document.attachEvent(
            "onWeixinJSBridgeReady",
            this.onBridgeReady(request)
          );
        }
      } else {
        this.onBridgeReady(request);
      }
    }
  },
  created() {
    document.title = this.type;
    const userInfo = this.loginData.userObj;
    if (!userInfo) {
      this.myUtils.wxLogin();
    } else {
      this.getUserAccount(); //获取钱包余额
    }
  }
};
</script>

<style scoped>
/deep/ .el-radio__label {
  display: none;
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
  bottom: 0px;
  width: 100%;
  background: #fff;
  padding: 10px 16px;
  box-sizing: border-box;
}
.next_btn {
  display: block;
  width: 100%;
  height: 40px;
  background: #0076FF;
  line-height: 40px;
  text-align: center;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
}
.package_name {
  width: 75%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
</style>

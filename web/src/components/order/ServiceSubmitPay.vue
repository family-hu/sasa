<template>
    <div>
      <div class="user_info flex-b">
        <div>预约人</div>
        <div v-if="!msgList" class="choose" @click="goFamliy">请选择预约人<img src="/static/img/arrow_right.png" alt=""></div>
        <div v-else @click="goFamliy" class="choose">{{servUserName}}<img src="/static/img/arrow_right.png" alt=""></div>
      </div>
      <div class="center">
        <div class="box">
          <div><img class="servImg" :src="servImgUrl" alt=""></div>
          <div>
            <p class="title">{{servName}}</p>
            <div class="desp">{{servDesp}}</div>
            <div class="tag">
              <span v-for="(tag,index) in tags" :key="index">{{tag}}</span>
            </div>
            <div class="price">{{serviceDetail.price}}元</div>
          </div>
        </div>
      </div>
      <div class="desp_box">
        <div class="title_desp">病情描述</div>
        <textarea v-model="servUserDesp" placeholder="详细描述您的病情症状，想要获得医生的什么帮助"></textarea>
      </div>
      <div class="cell_box">
        <div class="cell flex-b">
          <div>订单总价</div>
          <div class="price">¥{{serviceDetail.price}}</div>
        </div>
        <div class="cell flex-b">
          <div>优惠券</div>
          <div class="choose" @click="coupons">请选择优惠券<img src="/static/img/arrow_right.png" alt=""></div>
        </div>
      </div>
      <div class="btn_box">
        <a href="javascript:void(0);" class="btn" @click="submitOrder">确认支付</a>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId,
      acceptUser: this.$route.query.acceptUser,
      servId: this.$route.query.servId,
      busiType: 1000112,
      payWx: imgMap.payWx,
      busiId: this.$route.query.busiId,
      msgList: this.$route.query.msgList,
      serviceDetail: {},
      servUserDesp: '',
      servUserName: '',
      servUserMobile: '',
      servUserCardNo: ''
    };
  },

  computed: {
    ...mapGetters(["loginData"]),
    //服务包图片
    servImgUrl() {
      if (this.serviceDetail.servImgUrl) return this.serviceDetail.servImgUrl;
      return imgMap.orgPubImg;
    },
    //服务包描述
    servDesp() {
      let servName = '';
      let serv = this.serviceDetail;
      if (serv) {
        servName = serv.desp;
        let nowLength = this.serviceDetail.length;
        if (nowLength > 30) {
          servName = servName.substr(0, 30) + '...';
        }
      }
      return servName;
    },
    //服务包名称
    servName() {
      let servName = '';
      let serv = this.serviceDetail;
      if (serv) {
        servName = serv.servName;
        let nowLength = this.serviceDetail.length;
        if (nowLength > 10) {
          servName = servName.substr(0, 10) + '...';
        }
      }
      return servName;
    },
    //标签分解
    tags() {
      if (this.serviceDetail.tags) {
        let tags = this.serviceDetail.tags.split(",");
        if (tags && tags.length > 3) {
          tags = tags.splice(0, 3);
        }
        return tags;
      }
      return [];
    }
  },

  methods: {
    //优惠券
    coupons() {
      this.$router.push({
        path: "couponsList"
      });
    },
    // 常用联系人
    goFamliy() {
      this.$router.push({
        path: "medicalManList",
        query: {
          from: "service" ,
          orgId: this.orgId,
          acceptUser: this.acceptUser,
          servId: this.servId,
          busiId: this.busiId
        }
      });
    },
    //标签颜色
    tagColor(index) {
      let remain = index % 3;
      if (remain == 0) return "#0076FF";
      if (remain == 1) return "#FF001F";
      return "#00B48C";
    },
    //获取订单详情
    servInfoGet() {
      this.$indicator.open();
      let request = { servId: this.servId };
      this.$store
        .dispatch("servInfoGet", request)
        .then(serviceDetail => {
          this.serviceDetail = serviceDetail;
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //确认支付
    submitOrder() {
      if(!this.servUserName){
        this.$toast('请选择预约人');
        return false;
      }
      let vm = this;
      if (!this.busiId) {
        //没有servId,下单
        let request = {
          acceptUser: this.acceptUser,
          familyId: this.loginData.userObj.familyId.value,
          servId: this.servId,
          despIllness: this.servUserDesp,
          sickName: this.servUserName,
          userPhone: this.servUserMobile,
          userCard: this.servUserCardNo
        };
        this.$indicator.open();
        this.$store
          .dispatch("servOrderSubmit", request)
          .then(data => {
            vm.busiId = data.servId.value;
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
        busiId: this.busiId,
        busiType: this.busiType,
        desp: "特色服务包",
        money: this.price,
        moneyRmb: this.price,
        orgId: this.orgId,
        tradeMode: 8101104,
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("userConsume", request)
        .then(data => {
          //支付成功
          let request = data.data;
          if (request) {
            request = eval("(" + request + ")");
            vm.invokeWx(request);
          } else {
            this.$router.go(-2);
            this.$toast("余额支付成功");
            this.$indicator.close();
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
          // 使用以上方式判断前端返回,微信团队郑重提示：
          //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
          // alert("支付成功");
          vm.$router.go(-1);
        } else {
          // alert("支付失败");
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
    this.servInfoGet();
    let msgList = this.msgList ? JSON.parse(this.msgList) : '';
    if(!msgList){
      return false
    }else{
      this.servUserName = msgList.userName;
      this.servUserMobile = msgList.mobile,
      this.servUserCardNo = msgList.cardNo
    }
  }

};
</script>

<style scoped>
.user_info {
  background: #fff;
  width: 100%;
  height: 60px;
  padding: 0 16px;
  font-size: 16px;
  color: #040B1C;
}
.user_info .choose{
  color:rgba(4,11,28,.5);
}
.choose img{
  width: 6px;
  height: 11px;
  margin-left: 5px;
}
.center {
  padding: 10px 16px;
  width: 100%;
  box-sizing: border-box;
}
.box {
  background: #fff;
  padding: 16px;
  box-shadow: 0px 0px 7px 1px rgba(4, 11, 28, 0.06);
  border-radius: 4px;
  display: flex;
}
.servImg{
  width: 72px;
  height: 72px;
  margin-right: 15px;
}
.title {
  font-size: 18px;
  color: #040b1c;
  font-weight: 600;
}
.price {
  font-size: 16px;
  color: #ff0000;
}
.desp {
  font-size: 14px;
  color: #040b1c;
  opacity: 0.5;
}
.tag {
  margin-top: 5px;
}
.tag span {
  display: inline-block;
  color: #0076ff;
  border: 1px solid rgba(0, 118, 255, 0.5);
  padding: 0 5px;
  font-size: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  margin-right: 5px;
}
.desp_box{
  padding: 16px;
  background: #fff
}
.desp_box textarea{
  color:#040B1C;
  font-size: 14px;
  width: 100%;
  margin-top: 10px;
  min-height: 80px;
  border:none;
  resize: none;
  margin-bottom: 10px;
  background: #fff
}
.title_desp{
  color:#040B1C;
  font-size: 16px;
}
.cell_box{
  padding: 0 16px;
  background: #ffff
}
.cell {
  height: 46px;
  border-top:1px solid rgba(4,11,28,.1);
  font-size: 16px;
  color: #040B1C;
}
.cell .choose{
  color:rgba(4,11,28,.5);
  font-size: 14px;
}
.cell .price{
  color: #FF0000
}
.btn_box {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
  background: #fff;
  box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
}
.btn_box .btn {
  display: block;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-radius: 20px;
  background: #0076ff;
  font-size: 16px;
  font-weight: 600;
}




.titlecs {
  font-size: 14px;
  color: rgba(179, 179, 179, 1);
  padding-left: 12px;
  vertical-align: middle;
}

.imgw {
  width: 32px;
  height: 22px;
  padding-left: 12px;
  vertical-align: middle;
}

/* .btn {
  border-radius: 20px;
  text-align: center;
  font-size: 14px;
  color: #fff;
  background-color: #0076ff;
  height: 40px;
  margin: 20px 5%;
  width: 90%;
  border: 1px solid transparent;
  font-weight: 600;
} */
</style>

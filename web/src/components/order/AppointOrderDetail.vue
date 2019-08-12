<template>
    <div>
      <div class="head_bg">
        <div class="orderStatusTxt">{{statusName}} <span v-if="statusName == '已预约'">请按照预约时间到院进行就诊</span></div>
      </div>
       <div class="main">
        <div class="box flex-b" @click="goDocDetail" v-if="appointItem">
          <div class="name_box">
            <img class="img" :src="docImg" alt="">
            <div class="text">
              <p class="prodName">{{appointItem.docName}}</p>
              <p>{{departName}}<span style="margin-left:10px">{{ titlesName }}</span></p>
            </div>
          </div>
          <img class="more" src="/static/img/arrow_right_blue.png" alt="">
        </div>
        <div class="appointment_msg box">
          <h3>预约信息</h3>
          <p>就诊人：<span class="detail_txt">{{appointItem.subscribeName}}</span></p>
          <p>就诊时间：<span class="detail_txt">{{appointItem.subscribe_day}}<span>{{maText}}</span>{{appointItem.subscribe_work_time}}</span></p>
          <p>手机号：<span class="detail_txt">{{appointItem.phone}}</span></p>
        </div>
        <div class="appointment_msg box">
          <h3>订单信息</h3>
          <p>订单号：<span class="detail_txt">{{orderId}}</span></p>
          <p>下单时间：<span class="detail_txt">{{appointItem.timeCreate}}</span></p>
          <p>订单总价：<span class="detail_txt">¥{{getPrice}}</span></p>
        </div>
      </div>
      <!-- <div class="btn_box">
        <a class="btn btn_border" href="javascript:void(0);" v-if="statusName == '待支付'" @click="cancelOrder">取消订单</a>
        <a class="btn btn_background" href="javascript:void(0);" v-if="statusName == '待支付'" @click="goPay">去支付</a>
        <a class="btn btn_border" href="javascript:void(0);" v-if="statusName == '已完成' && status" @click="goEvaluation">发布评价</a>
        <a class="btn btn_border" href="javascript:void(0);" v-if="statusName == '已完成' && !status" @click="goEvaluationQuery">查看评价</a>
        <a class="btn btn_background" href="javascript:void(0);" v-if="statusName == '已受理' || statusName == '问诊中'" @click="getImhelper">私信</a>
      </div> -->

    </div>
</template>

<script>
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      appointItem: [],
      orderId: this.$route.query.orderId
    };
  },
  filters: {
    losslessNumberValue(value) {
      if (value) return value.value;
      return "";
    }
  },

  computed: {
    ...mapGetters(["loginData"]),
    maText() {
      let subscribeMa = this.appointItem.subscribe_am;
      if(subscribeMa){
        if (subscribeMa.value == "0") return "上午";
      }
      return "下午";
    },
    docImg() {
      let imgUrl = imgMap.docMale;
      let appointItem = this.appointItem;
      if(appointItem){
        let photoUrl = appointItem.photoUrl;
        if (photoUrl) {
          imgUrl = photoUrl;
        } else {
          let gender = appointItem.gender;
          if(gender){
            if (gender.value == "0") {
              imgUrl = imgMap.docFeMale;
            }
          }

        }
      }
      return imgUrl;
    },
    getPrice() {
      let price = this.appointItem.price;
      if(price){
        return price.value
      }
      return ''
    },
    titlesName() {
      let title = "";
      if (this.appointItem.titlesName) {
        title = this.appointItem.titlesName;
      }
      return title;
    },
    departName() {
      let title = "";
      if (this.appointItem.departmentName) {
        title = this.appointItem.departmentName;
      }
      return title;
    },
    statusName() {
      let status = this.appointItem.status;
      if (status == "0") return "待确认";
      if (status == "1") return "已预约";
      if (status == "2") return "已完成";
      if (status == "3") return "已过期";
      if (status == "4") return "已取消";
      if (status == "5") return "未付款";
      return "";
    }
  },

  methods: {
    //医生主页
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.appointItem.docid.value
        }
      });
    },
  },

  created() {
    let vm = this;
    if (this.orderId) {
      this.$indicator.open();
      let request = { orderId: this.orderId };
      this.$store
        .dispatch("userOderInfo", request)
        .then(data => {
          if(data){
            vm.appointItem = data;
          }

        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  }
};
</script>

<style scoped>
.orderStatusTxt {
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 24px 0 0 27px;
}
.orderStatusTxt span {
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  margin-left: 5px;
}
.text p {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
}
.text .prodName {
  font-size: 17px;
  margin-bottom: 5px;
  color: #040b1c;
  font-weight: 600;
}
.mint-popup-bottom {
  width: 100%;
  padding: 16px;
  background: #fff;
}
.evaluation_box {
  text-align: center;
}
.evaluation_box p {
  color: #040b1c;
  font-size: 14px;
  margin-bottom: 16px;
}
.evaluation_text {
  margin-top: 20px;
  padding: 15px 0;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  color: #040b1c;
}
.main {
  padding: 10px 10px 51px 10px;
  margin-top: -30px;
}
.head_bg {
  width: 100%;
  height: 92px;
  background: linear-gradient(
    180deg,
    rgba(0, 106, 255, 1) 0%,
    rgba(0, 147, 255, 1) 100%
  );
}
.box {
  padding: 12px 16px;
  background: #fff;
  margin-bottom: 10px;
  border-radius: 4px;
}
.box p {
  color: rgba(4, 11, 28, 0.58);
  font-size: 14px;
}
.box .detail_txt {
  color: #040b1c;
}
.detail_txt span{
  margin: 0 5px;
}
.name_box {
  display: flex;
  align-items: center;
}
.img {
  width: 81px;
  height: 60px;
}
.text {
  font-size: 14px;
  color: #000;
  font-weight: 500;
  margin-left: 10px;
}
.more {
  width: 11px;
  height: 11px;
}
.appointment_msg h3 {
  font-size: 17px;
  color: #040b1c;
  font-weight: 600;
  margin-bottom: 12px;
}
.appointment_msg h3.title_physical {
  text-align: center;
}
.appointment_msg h4 {
  font-size: 13px;
  font-weight: 500;
  margin: 10px 0;
  color: #0076ff;
  padding-bottom: 8px;
  border-bottom: 1px solid #eee;
  position: relative;
}
.appointment_msg h4::before {
  content: "";
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 20px;
  height: 3px;
  background: #0076ff;
}
.appointment_msg p {
  font-size: 13px;
  color: #666;
  margin-bottom: 6px;
}

.detail_addres {
  background: #fff;
  padding: 16px;
  position: relative;
  margin-top: 10px;
}
.detail_addres h3 {
  color: #040b1c;
  font-size: 17px;
  font-weight: 600;
}
.detail_addres h4 {
  color: #040b1c;
  font-size: 16px;
  font-weight: 500;
}
.right_img img {
  width: 18px;
  height: 16px;
}
.tel {
  color: rgba(4, 11, 28, 0.75);
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
}
.tel img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  position: relative;
  top: 3px;
}
.addres {
  overflow: hidden;
}
.addres img,
.addres div {
  float: left;
}
.addres div {
  width: 80%;
}
.distance {
  font-size: 11px;
  color: #b3b3b3;
  font-weight: 400;
}
.price {
  color: #f0240e;
  font-size: 13px;
}
.btn_box {
  width: 100%;
  height: 51px;
  position: fixed;
  bottom: 0;
  border-top: 1px solid rgba(238, 238, 238, 0.6);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  background: #fff;
}
.btn {
  display: block;
  width: 71px;
  height: 26px;
  line-height: 26px;
  margin-right: 16px;
  border-radius: 13px;
  font-size: 13px;
  text-align: center;
}
.pay_btn {
  background: #0093ff;
  color: #fff;
  border: 1px solid transparent;
}
.cancel_btn {
  border: 1px solid #b3b3b3;
  color: #666;
  background: #fff;
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

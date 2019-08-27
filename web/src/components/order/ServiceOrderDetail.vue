<template>
    <div>
      <div class="head_bg">
        <div class="orderStatusTxt">{{statusName}} <span v-if="statusName == '服务中'">医生将在24小时内联系您，请耐心等待</span></div>
      </div>
      <div class="main">
        <div class="box flex-b" @click="goDocDetail" v-if="serviceItem">
          <div class="name_box">
            <img class="img" :src="servImgUrl" alt="">
            <div class="text">
              <p class="prodName">{{serviceItem.servName}}</p>
              <p>¥{{serviceItem.price}}</p>
            </div>
          </div>
          <img class="more" src="/static/img/arrow_right_blue.png" alt="">
        </div>
        <div class="appointment_msg box">
          <h3>预约信息</h3>
          <p>体检人：<span class="detail_txt">{{serviceUserName}}</span></p>
          <p>手机号：<span class="detail_txt">{{serviceItem.userPhone}}</span></p>
          <p>身份证：<span class="detail_txt">{{userCard}}</span></p>
        </div>
        <div class="appointment_msg box">
          <h3>订单信息</h3>
          <p>订单号：<span class="detail_txt">{{orderId}}</span></p>
          <p>下单时间：<span class="detail_txt">{{serviceItem.createTime}}</span></p>
          <p>订单总价：<span class="detail_txt">¥{{serviceItem.price}}</span></p>
        </div>
      </div>
      <div class="btn_box">
        <a class="btn btn_border" v-if="statusName == '待支付'" href="javascript:void(0);"  @click="cancelOrder">取消订单</a>
        <a class="btn btn_background" v-if="statusName == '待支付'" href="javascript:void(0);"  @click="goPay">去支付</a>
        <a class="btn btn_border"  v-if="statusName == '已完成' && status == '4'" href="javascript:void(0);"  @click="goEvaluation">发布评价</a>
        <a class="btn btn_border"  v-if="statusName == '已完成' && status == '5'" href="javascript:void(0);"  @click="goEvaluationQuery">查看评价</a>
      </div>
       <!-- 底部查看评价 -->
      <mt-popup v-model="popupVisible" position="bottom" style="width:100%">
        <div class="evaluation_box">
          <p>我的评价</p>
          <div style="padding-left:25px">
            <div class="flex_box">
              <div class="evaluation_title">服务态度</div>
              <el-rate v-model="rateScore1" disabled text-color="#FF7A00" score-template="{value}" allow-half></el-rate>
            </div>
            <div class="flex_box">
              <div class="evaluation_title">医生专业</div>
              <el-rate v-model="rateScore2" disabled text-color="#FF7A00" score-template="{value}" allow-half></el-rate>
            </div>
            <div class="flex_box">
              <div class="evaluation_title">回复时效</div>
              <el-rate v-model="rateScore3" disabled text-color="#FF7A00" score-template="{value}" allow-half></el-rate>
            </div>
            <div class="evaluation_tag" v-if="tagList.length > 0">
              <span  v-for="(item, index) in tagList" :key="index">{{item}}</span>
            </div>
          </div>
          <div class="evaluation_text">{{evaInfo.comment}}</div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
import { mapGetters } from "vuex";
export default {
  data() {
    return {
      serviceItem: [],
      evaInfo: {},
      tagList: [],
      orderId: this.$route.query.orderId,
      rateScore1: 5,
      rateScore2: 5,
      rateScore3: 5,
      popupVisible: false,
      status: null
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
    //身份证
    userCard() {
      let userCard = this.serviceItem.userCard;
      if (userCard) {
        let cardNo = userCard.substr(3, 11);
        return userCard.replace(cardNo, "***********");
      }
    },
    serviceUserName() {
      let sickName = this.serviceItem.sickName;
      let serviceName = this.serviceItem.clientUserObj;
      if (serviceName) {
        return serviceName.userName;
      } else {
        return sickName;
      }
    },
    servImgUrl() {
      if (this.serviceItem.servImgUrl) return this.serviceItem.servImgUrl;
      return imgMap.packPerson;
    },
    getPrice() {
      let price = this.serviceItem.price;
      if (price) {
        return price.value;
      }
      return "";
    },
    titlesName() {
      let title = "";
      if (this.serviceItem.titlesName) {
        title = this.serviceItem.titlesName;
      }
      return title;
    },
    departName() {
      let title = "";
      if (this.serviceItem.departmentName) {
        title = this.serviceItem.departmentName;
      }
      return title;
    },
    statusName() {
      if (this.serviceItem.status) {
        let status = this.serviceItem.status.value;
        let isEnd = this.serviceItem.isEnd.value;
        this.status = status;
        if (status == "4" || status == "5") {
          return "已完成";
        }
        if (isEnd == "0") {
          if (status == "1") return "待支付";
          if (status == "2") return "待确认";
          if (status == "3") return "服务中";
        } else {
          return "已取消";
        }
      }
    }
  },

  methods: {
    //评价
    goEvaluation() {
      let doctorDetail = {
        photoUrl: this.serviceItem.acceptUserObj.photoUrl,
        name: this.serviceItem.acceptUserObj.userName,
        desp: this.serviceItem.acceptUserObj.departmentName + this.serviceItem.acceptUserObj.titlesName
      }
      this.$router.push({
        path: "evaluationOrder",
        query: {
          servId: this.serviceItem.servId.value, //业务编号
          orgId: this.serviceItem.orgObj.orgId.value, //机构
          docId: this.serviceItem.acceptUserObj.userId.value, //被评价人
          doctorDetail: JSON.stringify(doctorDetail)
        }
      });
    },
    //查看评价
    goEvaluationQuery(){
      this.evaInfoGet();
      this.drawDetList();
    },
    //查看画像
    drawDetList(){
      this.tagList = [];
      let request = {
        busiId: this.serviceItem.orderId.value //订单ID
      };
      this.$store.dispatch("drawDetList", request)
        .then(data => {
          for(let i = 0; i < data.drawTypeList.length; i++){
            this.tagList.push(data.drawTypeList[i]);
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
    },
    evaInfoGet(){
      let request = {
        evaId: this.serviceItem.evaId.value
      };
      this.$store
        .dispatch("evaInfoGet", request)
        .then(data => {
          if(data){
            this.evaInfo = data.evaObj;
            let evaDetList = data.evaObj.evaDetList
            for(let i = 0; i < evaDetList.length; i++){
              if(evaDetList[i].evaTypeName == '服务态度'){
                this.rateScore1 = evaDetList[i].score ? parseInt(evaDetList[i].score) : 5;
              }else if(evaDetList[i].evaTypeName == '医生专业'){
                this.rateScore2 = evaDetList[i].score ? parseInt(evaDetList[i].score) : 5;
              }else if(evaDetList[i].evaTypeName == '回复时效'){
                this.rateScore3 = evaDetList[i].score ? parseInt(evaDetList[i].score) : 5;
              }
            }
            this.popupVisible = true;
          }else{
            this.$toast('暂无评价');
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
    },
    //去支付
    goPay() {
      this.$router.push({
        path: "serviceSubmitPay",
        query: {
          servId: this.serviceItem.servId.value,
          busiId: this.serviceItem.orderId.value,
          price: this.serviceItem.price,
          orgId: this.serviceItem.orgObj.orgId.value
        }
      });
    },
    //取消订单
    cancelOrder() {
      let vm = this;
      this.$indicator.open();
      let request = { orderId: this.orderId, status: -1 };
      this.$store
        .dispatch("servOrderAudit", request)
        .then(() => {
          this.$toast("取消成功");
          vm.servOrderInfoGet(request);
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //医生主页
    goDocDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.serviceItem.acceptUserObj.userId.value
        }
      });
    },
    servOrderInfoGet() {
      let vm = this;
      this.$indicator.open();
      let request = { orderId: this.orderId };
      this.$store
        .dispatch("servOrderInfoGet", request)
        .then(data => {
          this.serviceItem = data.servOrderObj;
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  },

  created() {
    this.servOrderInfoGet();
  }
};
</script>

<style>
  .el-rate__icon{
    font-size: 24px;
    margin-left: 10px;
  }
</style>
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
.detail_txt span {
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
.evaluation_box{
  text-align: center
}
.evaluation_box p{
  color: #040B1C;
  font-size: 14px;
  margin: 16px;
}
.evaluation_text{
  margin-top: 20px;
  padding: 15px 25px;
  border-top:1px solid #E6E6E6;
  font-size: 15px;
  color: #040B1C;
  text-align:left;
}
.flex_box{
  display: flex;
  align-items: center;
  margin-bottom:16px;
}
.evaluation_title{
  font-size: 14px;
  color: #040B1C;
  margin-right:14px;
  position: relative;
  top: 3px;
}
.evaluation_tag {
  margin-top: 30px;
  overflow: hidden;
}
.evaluation_tag span {
  float: left;
  border: 1px solid rgba(0, 118, 255, 0.4);
  background: rgba(0, 118, 255, 0.1);
  color: rgba(4, 11, 28, 0.8);
  border-radius: 14px;
  padding: 5px 10px;
  margin-right: 25px;
  margin-bottom:10px;
  min-width: 80px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
}
</style>

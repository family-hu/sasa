<template>
    <div>
      <div class="head_bg">
        <div class="orderStatusTxt">{{orderInfo.orderStatusTxt}} <span v-if="orderInfo.orderStatus == '1'">请按照预约时间到院完成医疗服务</span></div>
      </div>
      <div class="main">
        <div class="box flex-b" @click="goItemDetail" v-if="orderInfo">
          <div class="name_box">
            <img class="img" :src="orderInfo.picUrl" alt="">
            <div class="text">
              <p class="prodName">{{orderInfo.prodName}}</p>
              <p>¥{{moneyPay}}</p>
            </div>
          </div>
          <img class="more" src="/static/img/arrow_right_blue.png" alt="">
        </div>
        <div class="appointment_msg box">
          <h3>预约信息</h3>
          <p>体检人：<span class="detail_txt">{{consumeList.name}}</span></p>
          <p>手机号：<span class="detail_txt">{{consumeList.mobile}}</span></p>
          <p>身份证：<span class="detail_txt">{{cardId}}</span></p>
        </div>
        <div class="detail_addres box">
          <h3>商家信息</h3>
          <div class="flex-b" style="margin:10px 0 8px 0;">
            <h4>{{compayInfo.name}}</h4>
            <a :href="'tel:'+ compayInfo.phone" class="right_img"><img src="../../../static/img/shop_tel_big.png" alt=""></a>
          </div>
          <div class="tel">营业时间：{{compayInfo.workingHours}}</div>
          <div class="tel addres">
            <div>地址：{{compayInfo.detailsAddr}}</div>
             <!-- <div>{{compayInfo.detailsAddr}}<br/><span class="distance">距您1.00km</span></div> -->
          </div>
        </div>
        <div class="appointment_msg box" v-if="orderInfo">
          <h3>订单信息</h3>
          <p>订单号：<span class="detail_txt">{{orderId}}</span></p>
          <p>下单时间：<span class="detail_txt">{{orderInfo.timeCreate}}</span></p>
          <p>订单总价：<span class="detail_txt">¥{{moneyPay}}</span></p>
        </div>
        <div class="appointment_msg box">
          <h3 class="title_physical">体检须知</h3>
          <h4>关于饮食</h4>
          <p>1.体检前三天建议您清淡饮食，不要喝酒</p>
          <p>2.体检前一天晚上22：00后禁止饮食及喝水，保证睡眠，避免激烈运动</p>
          <p>3.体检当天早上禁止饮食及喝水，早上10：00之前务必到达体检中心，携带好个人身份证件</p>
          <p>4.体检当天有高血压或者其他慢性病体检者需要早上服用药物，可以喝一小口水送服</p>
          <h4>关于抽血</h4>
          <p>1.紧握拳头，手保持自然放松</p>
          <p>2.拔针后用无菌棉球按压3分钟，不可揉搓，直至止血</p>
          <p>3.如有晕血晕针，请提前告知医护人员</p>
          <h4>关于X线检查</h4>
          <p>1.参加X线检查，请勿穿着带有金属的衣物或配件</p>
          <p>2.备孕人士或孕妇，请勿做X光射线检查</p>
          <h4>憋尿检查项目</h4>
          <p>1.腹部彩超、子宫附件超声、膀胱彩超，前列腺超声需要憋尿</p>
          <p>2.如果没有尿液，建议检查前1小时饮水1000ML左右，不要排出小便</p>
          <h4>妇科检查项目</h4>
          <p>1.妇科检查前请先排空膀胱，如果遇月经期请勿检查妇科，改期至月经干净后3天再体检</p>
          <p>2.没有性生活的女士禁止做妇科检查</p>
        </div>
        <!-- 没有更多提示 -->
        <bottomloadMore></bottomloadMore>
      </div>
      <div class="btn_box" v-if="orderInfo.orderStatus == '11'">
        <a class="btn btn_border" href="javascript:void(0);" @click="goShopAddComments">评价</a>
        <a class="btn btn_background" href="javascript:void(0);" @click="goShopReport">查看报告</a>
      </div>
      <div class="btn_box" v-if="orderInfo.orderStatus == '12'">
        <a class="btn_border" href="javascript:void(0);" @click="goShopQueryComments">查看评价</a>
        <a class="btn_background" href="javascript:void(0);" @click="goShopReport">查看报告</a>
      </div>
      <div class="btn_box" v-if="orderInfo.orderStatus == '1'">
        <a class="btn btn_border" href="javascript:void(0);" @click="goTel">电话预约</a>
        <a class="btn btn_background" href="javascript:void(0);" @click="goServiceVoucher">查看券</a>
      </div>
      <div class="btn_box" v-if="orderInfo.orderStatus == '0'">
        <a href="javascript:void(0);" class="btn cancel_btn" @click="cancelOrder">取消订单</a>
        <a href="javascript:void(0);" class="btn pay_btn" @click="goPay">去支付</a>
      </div>
      <!-- 底部查看评价 -->
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="evaluation_box">
          <p>我的评价</p>
          <el-rate v-model="rateScore" disabled text-color="#FF7A00" score-template="{value}" allow-half></el-rate>
          <div class="evaluation_text">{{commentInfo}}</div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,
      orderInfo: [], //订单信息
      consumeList: [], //预约信息
      compayInfo: [], //商家信息
      moneyPay:'',
      popupVisible:false,
      rateScore: 5,
      commentInfo: null
    };
  },

  components: {
    bottomloadMore : BottomloadMore
  },


  computed: {
    //身份证
    cardId(){
      let cardId = this.consumeList.cardId;
      if(cardId){
        let cardNo = cardId.substr(3,11);
        return cardId.replace(cardNo,'***********');
      }
    }
  },

  mounted() {
  },

  methods: {
    //查看评价
    goShopQueryComments() {
      const request = {
        pageParam:{
          pageNum: 1,
          pageSize: 10
        },
        appraisal:{
          resourceId: this.orderInfo.prodId.value, //套餐ID
          userId: this.loginData.userObj.userId.value,
          type:'2'
        }

      };
      this.$store.dispatch("shoppingCommentList", request).then((data) => {
        if(data.data.appraisalList.length > 0){
          this.commentInfo = data.data.appraisalList[0].description;
          this.rateScore = data.data.appraisalList[i].score.value ? parseInt(data.data.appraisalList[0].score.value) : 5;
          this.popupVisible = true
        }else{
          this.$toast('暂无评价');
        }
      })
    },
    //电话预约
    goTel() {
      this.$toast('电话预约，敬请期待～');
    },
    //查看报告
    goShopReport() {
      this.$router.push({
        path: "shopPackageReport",
        query: {
          reportImg: this.consumeList.serviceInfo
        }
      });
    },
    //查看卷
    goServiceVoucher() {
      this.$router.push({
        path: "serviceVoucher",
        query: {
          orderId: this.orderId
        }
      });
    },
    //评论
    goShopAddComments() {
      this.$router.push({
        path: "shopAddComments",
        query: {
          orderId: this.orderId
        }
      });
    },
    //去支付
    goPay() {
      this.$router.push({
        path: "shopPayList",
        query: {
          totalPrice: this.orderInfo.moneyPay.value, //合计支付金额
          // userName: this.consumeList.name,
          // genderTxt : this.consumeList.genderTxt,
          // mobile : this.consumeList.mobile,
          // cardNo : this.consumeList.cardId,
          packageName: this.orderInfo.prodName,
          orderId: this.orderId
        }
      });
    },
    //套餐详情
    goItemDetail() {
      this.$router.push({
        path: "healthServiceDetail",
        query: {
          packDetailsId: this.orderInfo.prodId.value,
          serviceCompanyId: this.compayInfo.serviceCompanyId.value,
          orgId: this.orderInfo.orgId.value,
          orgNames: this.compayInfo.name
        }
      });
    },
    //确认信息-订单详情
    getShopOrderDetail() {
      this.$indicator.open();
      let request = {
        orderId: this.orderId
      };
      this.$store
        .dispatch("shopOrderList", request)
        .then(data => {
          if (data.data[0]) {
            this.orderInfo = data.data[0];
            if(data.data[0].consumeList){
              this.consumeList = data.data[0].consumeList[0];
            }
            this.compayInfo = data.data[0].compayInfo;
            this.moneyPay = data.data[0].moneyPay.value;
          }
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //取消订单
    cancelOrder() {
      let request = {
        finOrderId : this.orderId,
      };
      this.$store
        .dispatch("shopCancelOrder", request)
        .then(data => {
          if(data.rtnCode == '1'){//订单取消成功
            this.$toast('订单取消成功');
            this.$router.push({
              path: "shopOrderList",
              query: {
                orgId: this.orderInfo.orgId.value
              }
            })
          }else{
            this.$toast(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    }


  },

  created() {
    this.getShopOrderDetail();

    // 获取当前位置经纬度
    // var location_lon = '',location_lat = ''; // 经度,纬度
    // if (navigator.geolocation){
    //     navigator.geolocation.getCurrentPosition(function (position) {
    //         location_lon = position.coords.longitude;
    //         location_lat = position.coords.latitude;
    //        alert('h5经度：'+location_lon);alert('h5纬度：'+location_lat);
    //     });
    // }else {
    //     alert("您的设备不支持定位功能");
    // }
  },


};
</script>

<style scoped>
.orderStatusTxt{
  color: #fff;
  font-size: 17px;
  font-weight: 500;
  padding: 24px 0 0 27px;
}
.orderStatusTxt span{
  color:rgba(255,255,255,.8);
  font-size: 12px;
  margin-left: 5px;
}
.text p{
  font-size: 13px;
  color:rgba(4,11,28,.5);
}
.text .prodName{
  font-size: 17px;
  margin-bottom: 5px;
  color: #040B1C;
  font-weight: 600
}
.mint-popup-bottom{
  width: 100%;
  padding: 16px;
  background: #fff;
}
.evaluation_box{
  text-align: center
}
.evaluation_box p{
  color: #040B1C;
  font-size: 14px;
  margin-bottom: 16px;
}
.evaluation_text{
  margin-top: 20px;
  padding: 15px 0;
  border-top:1px solid #E6E6E6;
  font-size: 15px;
  color: #040B1C;
}
.main{
  padding: 10px 10px 51px 10px;
  margin-top: -30px;

}
.head_bg{
  width: 100%;
  height: 92px;
  background:linear-gradient(180deg,rgba(0,106,255,1) 0%,rgba(0,147,255,1) 100%);
}
.box{
  padding: 12px 16px;
  background: #fff;
  margin-bottom: 10px;
  border-radius:4px;
}
.box p{
  color:rgba(4,11,28,.58);
  font-size: 14px;
}
.box .detail_txt{
  color: #040B1C
}
.name_box{
  display: flex;
  align-items: center;
}
.img{
  width: 81px;
  height: 60px;
}
.text{
  font-size: 14px;
  color: #000;
  font-weight: 500;
  margin-left: 10px;
}
.more{
  width: 11px;
  height: 11px;
}
.appointment_msg h3{
  font-size: 17px;
  color: #040B1C;
  font-weight: 600;
  margin-bottom: 12px;
}
.appointment_msg h3.title_physical{
  text-align: center;
}
.appointment_msg h4{
  font-size: 13px;
  font-weight: 500;
  margin: 10px 0;
  color: #0076FF;
  padding-bottom: 8px;
  border-bottom:1px solid #eee;
  position: relative;
}
.appointment_msg h4::before{
  content: '';
  position: absolute;
  left: 0;
  bottom: -1px;
  width: 20px;
  height: 3px;
  background: #0076FF
}
.appointment_msg p{
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
.detail_addres h4{
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
.addres{
  overflow: hidden;
}
.addres img,.addres div{
  float: left;
}
.addres div{
  width: 80%;
}
.distance{
  font-size: 11px;
  color: #B3B3B3;
  font-weight: 400;
}
.price{
  color: #F0240E;
  font-size: 13px;
}
.btn_box{
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
.btn{
  display: block;
  width:71px;
  height: 26px;
  line-height: 26px;
  margin-right: 16px;
  border-radius: 13px;
  font-size: 13px;
  text-align: center;
}
.pay_btn{
  background: #0093FF;
  color: #fff;
  border:1px solid transparent;
}
.cancel_btn{
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

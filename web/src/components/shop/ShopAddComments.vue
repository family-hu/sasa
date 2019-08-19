<template>
    <div>
      <div class="main">
        <div class="box flex-b" @click="goServiceDetail">
          <div class="name_box" v-if="orderInfo">
            <img class="img" :src="orderInfo.picUrl" alt="">
            <div class="text">
              <p class="package_name">{{orderInfo.prodName}}</p>
              <p class="price">¥{{moneyPay}}</p>
            </div>
          </div>
          <img class="more" src="/static/img/arrow_right.png" alt="">
        </div>
        <div style="background: #f7f7f7;height:10px;width:100%"></div>
        <div style="padding: 0 16px;background: #fff;">
          <div class="score_box">
            <p>商品评价</p>
            <el-rate v-model="rateScore" text-color="#FF7A00" :colors="['#FF7A00','#FF7A00','#FF7A00']"></el-rate>
          </div>
          <div class="box">
            <textarea v-model="msg" name="" id="" placeholder="说说您对商品的评价，分享给想买的他们吧" placeholder-style="color:rgba(4,11,28,.25)"></textarea>
            <!-- <div class="img_box"><input type="file" id="image" @change="uploadImg"></div> -->
          </div>
        </div>
      </div>
      <div class="btn_box">
        <a href="javascript:void(0);" class="btn" @click="submitComment">发布</a>
      </div>
    </div>
</template>

<script>
import { mapGetters } from 'vuex';
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orderId: this.$route.query.orderId,//订单ID
      prodId: this.$route.query.prodId, //商品ID
      rateScore: 10,
      orderInfo:[],
      msg:'',
      moneyPay:''

    };
  },

  components: {

  },


  computed: {
    ...mapGetters(['loginData']),
  },

  mounted() {
    console.log(this.rateScore);
  },

  methods: {
    //商品详情
    goServiceDetail() {
      this.$router.push({
        path: "healthServiceDetail",
        query: {
          packDetailsId: this.prodId,
          serviceCompanyId: this.orderInfo.compayInfo.serviceCompanyId,
          orgId: this.orderInfo.orgId.value,
          orgNames: this.orderInfo.compayInfo.name
        }
      });
    },
    //提价评论
    submitComment() {
      console.log(this.rateScore,this.msg);
      let request = {
        appraisal : {
          resourceId : this.prodId, //套餐ID
          userId : this.loginData.userObj.userId.value,
          type : "2",
          score : this.rateScore,
          description : this.msg
        },
        orderId: this.orderId,
        imageIdList : []

      };
      this.$store
        .dispatch("getComment", request)
        .then(data => {
          if (data.rtnCode == '1') {
            this.$toast('评价提交成功');
            this.$router.go(-1);
          }else{
            this.$toast(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //确认信息-订单详情
    getShopOrderDetail() {
      let request = {
        orderId: this.orderId
      };
      this.$store
        .dispatch("shopOrderList", request)
        .then(data => {
          if (data.data) {
            this.orderInfo = data.data[0];
            this.moneyPay = data.data[0].moneyPay.value;
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //上传图片
    uploadImg() {
      let request = {
        file: file
      };
      this.$store
        .dispatch("commentUploadImg", request)
        .then(data => {
          if (data.data) {

          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },

  },

  created() {
    this.getShopOrderDetail();
  },


};
</script>
<style>
  .el-rate{
    margin-right: -15px;
  }
  .el-rate__item .el-rate__icon {
    font-size: 24px;
    margin-right: 15px;
  }
</style>
<style scoped>
.main{
  width: 100%;
  background: #fff;
  position: absolute;
  top:0;
  bottom:0;
}
.box{
  padding: 12px 16px;
  margin: 5px 0;
  background: #fff;
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
  color:rgba(4,11,28,1);
  margin-left: 10px;
}
.package_name{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 17px;
  font-weight:600;
  margin-bottom:5px;
  margin-right: 10px;
}
.price{
  color:rgba(4,11,28,.5);
  font-size: 13px;
  font-weight: 400;
}
.more{
  width: 8px;
  height: 14px;
}
textarea{
  width: 100%;
  height: 150px;
  margin-top: 10px;
  resize: none;
  margin-bottom: 20px;
  border:none;
  font-size: 15px;
  color:#040B1C;
}
.img_box{
  width: 78px;
  height: 78px;
  background: #F7F7F7;
  border:1px solid #B3B3B3;
  margin-bottom: 20px
}
.img_box input{
  width: 78px;
  height: 78px;
  opacity: 0;
}
.score_box{
  color: #040B1C;
  font-size: 14px;
  padding: 20px 0;
  text-align: center;
  border-bottom: 1px solid #E6E6E6;
}
.score_box p{
  margin-bottom: 15px;
}
.btn_box{
  position: fixed;
  bottom:0;
  z-index: 100;
  width:100%;
  background: #fff;
  box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
  padding: 0 16px;
}
.btn{
  display: block;
  background: #0093FF;
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
</style>

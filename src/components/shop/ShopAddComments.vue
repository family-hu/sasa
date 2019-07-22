<template>
    <div>
      <div class="main">
        <div class="box flex-b" @click="goOrderDetail">
          <div class="name_box" v-if="orderInfo">
            <img class="img" :src="orderInfo.picUrl" alt="">
            <div class="text">
              <p style="margin-bottom:5px">{{orderInfo.prodName}}</p>
              <p>¥{{moneyPay}}</p>
            </div>
          </div>
          <img class="more" src="/static/img/arrow_right.png" alt="">
        </div>
        <div class="box">
          <textarea v-model="msg" name="" id="" placeholder="说说您对商品的评价，分享给想买的他们吧"></textarea>
          <!-- <div class="img_box"><input type="file" id="image" @change="uploadImg"></div> -->
        </div>
        <div class="flex-b score_box">
          <p>商品评价</p>
          <el-rate v-model="rateScore"></el-rate>
        </div>
      </div>
      <a href="javascript:void(0);" class="btn" @click="submitComment">发布</a>
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
    //订单详情
    goOrderDetail() {
      this.$router.push({
        path: "shopOrderDetail",
        query: {
          orderId: this.orderId
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

<style scoped>
.main{
  background: #fff;
}
.box{
  margin-left: 16px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
  padding: 12px 16px 12px 0;
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
  width: 8px;
  height: 14px;
}
textarea{
  width: 100%;
  height: 50px;
  margin-top: 10px;
  resize: none;
  margin-bottom: 20px;
  border:none;
  font-size: 14px;
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
  color: #000;
  font-size: 14px;
  padding: 20px 16px;
}
.btn{
  display: block;
  background: #0093FF;
  width: 91%;
  height: 44px;
  line-height: 44px;
  margin: 60px auto 0;
  border-radius: 2px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
</style>

<template>
  <div>
    <mt-navbar fixed v-model="selected">
      <mt-tab-item id="1" @click.native="changeTab('-1')">全部</mt-tab-item>
      <mt-tab-item id="2" @click.native="changeTab('5')">待付款</mt-tab-item>
      <mt-tab-item id="3" @click.native="changeTab('0')">待受理</mt-tab-item>
      <mt-tab-item id="4" @click.native="changeTab('2')">问诊中</mt-tab-item>
      <mt-tab-item id="5" @click.native="changeTab('3')">已完成</mt-tab-item>
      <mt-tab-item id="6" @click.native="changeTab('4')">已取消</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" style="padding-top:44px">
      <div id="1" style="width:100%">
        <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
          <order-item v-for="item in orderList" :key="item.servId.value" :orderItem="item" @cancelOrder="cancelOrder" @child="goEvaluationQuery" @click.native="toDetail(item)" ></order-item>
          <!-- 没有更多提示 -->
          <bottomloadMore v-if="loaded && orderList.length > 3"></bottomloadMore>
        </div>
        <div class="empty" v-if="empty">
            <img :src="consultationEmpty">
            <div v-if="status == '-1'">您还没有问诊订单呢</div>
            <a href="javascript:void(0);" v-if="status == '-1'" @click="goDoctorMore">去问诊</a>
            <div v-else>您还没有相关订单</div>
        </div>
      </div>
    </mt-tab-container>
    <!-- 底部查看评价 -->
    <mt-popup v-model="popupVisible" position="bottom">
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
import { mapGetters } from "vuex";
import OrderItem from "./OrderItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from '../../../static/js/imgmap.js';
export default {
  data() {
    return {
      orderList: [],
      evaInfo: {},
      orgId: this.$route.query.orgId,
      tagList: [],
      selected:'1',
      loading: false,
      empty: false,
      popupVisible: false,
      rateScore1: 5,
      rateScore2: 5,
      rateScore3: 5,
      page: 1,
      status: null,
      loaded: false //是否加载完成
    };
  },

  components: {
    orderItem: OrderItem,
    bottomloadMore : BottomloadMore
  },

  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  methods: {
    //查看评价
    goEvaluationQuery(evaId,busiId) {
      this.evaInfoGet(evaId);
      this.drawDetList(busiId);
    },
    //查看画像
    drawDetList(busiId){
      let request = {
        busiId: busiId //订单ID
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
    //查询评价
    evaInfoGet(evaId){
      let request = {
        evaId:evaId
      };
      this.$store
        .dispatch("evaInfoGet", request)
        .then(data => {
          if(data){
            this.evaInfo = data.evaObj;
            let evaDetList = data.evaObj.evaDetList;
            for(let i = 0; i < evaDetList.length; i++){
              if(evaDetList[i].evaTypeName == '服务态度'){
                this.rateScore1 = evaDetList[i].score ? parseInt(evaDetList[i].score) : 5;
              }else if(evaDetList[i].evaTypeName == '专业水平'){
                this.rateScore2 = evaDetList[i].score ? parseInt(evaDetList[i].score) : 5;
              }else if(evaDetList[i].evaTypeName == '服务效率'){
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
    //tab切换
    changeTab(status) {
      this.empty = false;
      this.page = 1;
      this.orderList = [];
      this.requestOrderList(status);
    },
    //医生列表
    goDoctorMore() {
       this.$router.push({path: "doctorOneList", query:{orgId: this.orgId}});
    },
    //订单详情
    toDetail(orderDetail) {
      // let json = JSON.stringify(orderDetail);
      // sessionStorage.setItem("orderDetail", json);
      this.$router.push({
        path: "orderDetail",
        query:{
          orderId: orderDetail.servId.value,
          userId: this.loginData.userObj.userId.value
        }
      });
    },

    loadMore() {
      if (!this.loaded) {
        this.requestOrderList(this.status);
      }
    },
    //订单列表查询
    requestOrderList(status) {
      this.$indicator.open();
      this.status = status;
      this.loading = true;
      let userId = this.loginData.userObj.userId.value;
      let request = {
        customerId: userId,
        goodsType: types.ONLINE_SERVICE,//2000102 图文问诊
        statusType: status,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId ? this.orgId : 0
      };
      let vm = this;
      this.$store
        .dispatch("orderList", request)
        .then(orderList => {
          vm.page++;
          if (orderList.length > 0) {
            for (let i = 0; i < orderList.length; i++) {
              vm.orderList.push(orderList[i]);
            }
            vm.loaded = orderList.length != 10;
          } else {
            vm.empty = true;
          }
          vm.loading = false;
        })
        .catch(error => {
          vm.loading = false;
          vm.loaded = true;
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    cancelOrder(request) {
      let vm = this;
      this.$indicator.open();
      this.$store
        .dispatch("orderStepOp", request)
        .then(data => {
          if(data.rtnCode == '1'){
            this.$toast("取消成功");
            this.empty = false;
            this.page = 1;
            this.orderList = [];
            this.requestOrderList(this.status);
          }

        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },

  },

  created() {
    this.requestOrderList('-1');//全部订单
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
ul,
li {
  padding: 0;
  list-style: none;
  margin: 0;
}
/deep/.mint-navbar .mint-tab-item{
  margin: 0 10px;
  padding: 14px 0;
}
.mint-popup-bottom{
  width: 100%;
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

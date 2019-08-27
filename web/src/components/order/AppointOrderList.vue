<template>
    <div>
      <mt-navbar fixed v-model="selected">
        <mt-tab-item id="1" @click.native="changeTab('-1')">全部</mt-tab-item>
        <mt-tab-item id="2" @click.native="changeTab('5')">待付款</mt-tab-item>
        <mt-tab-item id="3" @click.native="changeTab('1')">待服务</mt-tab-item>
        <mt-tab-item id="5" @click.native="changeTab('2')">已完成</mt-tab-item>
        <mt-tab-item id="6" @click.native="changeTab('4')">已取消</mt-tab-item>
      </mt-navbar>
      <mt-tab-container v-model="selected" style="padding-top:44px">
        <div id="1" style="width:100%">
          <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
            <appoint-order-item v-for="(item,index) in orderList" :key="index" :orderItem="item" @cancelOrder="cancelOrder" @child="goEvaluationQuery"></appoint-order-item>
            <!-- 没有更多提示 -->
            <bottomloadMore v-if="loaded && orderList.length > 3"></bottomloadMore>
          </div>
          <div class="empty" v-if="empty">
            <img :src="consultationEmpty">
            <div class="text" v-if="status == '-1'">您还没有预约订单呢</div>
            <a href="javascript:void(0);" @click="goDoctorMore" v-if="status == '-1'">去预约</a>
            <div class="text" v-else>您还没有相关订单呢</div>
          </div>
        </div>
      </mt-tab-container>
      <!-- 底部查看评价 -->
      <mt-popup v-model="popupVisible" position="bottom">
        <div class="evaluation_box">
          <p>我的评价</p>
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
          <div class="evaluation_text">{{evaInfo.comment}}</div>
        </div>
      </mt-popup>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import AppointOrderItem from "./AppointOrderItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from '../../../static/js/imgmap.js';
export default {
  data() {
    return {
      orderList: [],
      evaInfo: {},
      loading: false,
      orgId: this.$route.query.orgId,
      selected: '1',
      popupVisible: false,
      rateScore1: 5,
      rateScore2: 5,
      rateScore3: 5,
      page: 1,
      status: '-1',
      empty: false,
      loaded: false //是否加载完成
    };
  },

  components: {
    appointOrderItem: AppointOrderItem,
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
    goEvaluationQuery(evaId) {
      this.evaInfoGet(evaId)
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
            let evaDetList = data.evaObj.evaDetList
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
    //加载更多
    loadMore() {
      if (!this.loaded) {
        this.requestOrderList(this.status);
      }
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

    cancelOrder(request) {
      let vm = this;
      this.$indicator.open();
      this.$store
        .dispatch("docorderstepop", request)
        .then(data => {
          if(data.rtnCode == '1'){
            this.$toast("取消成功");
            vm.updateOrderItem(request);
          }else{
            this.$toast("取消失败");
          }

        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },

    updateOrderItem(request) {
      for (let i = 0; i < this.orderList.length; i++) {
        let orderItem = this.orderList[i];
        if (orderItem.orderid.value == request.orderId) {
          orderItem.status.value = "4";
          break;
        }
      }
    },

    requestOrderList(status) {
      this.$indicator.open();
      this.status = status;
      this.loading = true;
      let userId = this.loginData.userObj.userId.value;
      let request = {
        userid: userId,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId,
        status: status,
      };
      let vm = this;
      this.$store
        .dispatch("userOderList", request)
        .then(data => {
          vm.page++;
          if (data.orderList.length > 0) {
            for (let i = 0; i < data.orderList.length; i++) {
              vm.orderList.push(data.orderList[i]);
            }
            vm.loaded = vm.orderList.length == data.total;
            vm.loading = false;
          }else{
            this.empty = true;
          }

        })
        .catch(error => {
          vm.loading = false;
          vm.loaded = true;
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  },

  created() {
    this.requestOrderList('-1');
  }
};
</script>

<style>
  .el-rate__icon{
    font-size: 22px;
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
  margin: 0 14px;
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
  padding: 15px 0;
  border-top:1px solid #E6E6E6;
  font-size: 15px;
  color: #040B1C;
}
.flex_box{
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom:16px;
}
.evaluation_title{
  font-size: 14px;
  color: #040B1C;
  margin-right:10px;
}
</style>

<template>
    <div>
      <!-- tab -->
      <!-- 多个逗号分隔 ( 0未支付、1已支付 , 2 已退款; 10 医疗服务 服务中，11医疗服务 待评价，12医疗服务 已评价) 参数-->
      <div class="modle">
        <mt-navbar fixed v-model="selected">
          <mt-tab-item id="1" @click.native="changeTab()">全部</mt-tab-item>
          <mt-tab-item id="2" @click.native="changeTab('0')">待付款</mt-tab-item>
          <mt-tab-item id="3" @click.native="changeTab('1')">待服务</mt-tab-item>
          <mt-tab-item id="4" @click.native="changeTab('11,12')">已完成</mt-tab-item>
          <mt-tab-item id="5" @click.native="changeTab('2')">已取消</mt-tab-item>
        </mt-navbar>
        <!-- 切换主体内容 -->
        <mt-tab-container v-model="selected" style="padding-top:44px">
          <div id="1" style="width:100%">
            <!-- 全部订单 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty">
              <div v-if="!status">您还没有医疗服务订单呢</div>
              <a href="javascript:void(0);" @click="goShopping" v-if="!status && orgId && orgId != '0'">去购买</a>
              <div v-else>您还没有相关订单呢</div>
            </div>
            <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading"  infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item" @child="goShopQueryComments"></shop-order-item>
              <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded && orderList.length > 3"></bottomloadMore>
            </div>
          </div>
        </mt-tab-container>
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
import { mapGetters } from "vuex";
import ShopOrderItem from "./ShopOrderItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId ? this.$route.query.orgId : 0,
      selected:'1',
      loading: false,
      page: 1,
      loaded: false ,//是否加载完成
      orderList:[],
      status: null,
      empty: false,
      popupVisible: false,
      commentInfo: null,
      rateScore: 5
    };
  },

  components: {
    shopOrderItem: ShopOrderItem,
    bottomloadMore : BottomloadMore
  },


  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  mounted() {
  },

  methods: {
    //查看评价
    goShopQueryComments(prodId,orderId) {
      this.getCommentList(prodId,orderId);
    },
    //评价
    getCommentList(prodId,orderId) {
      const request = {
        pageParam:{
          pageNum: 1,
          pageSize: 10
        },
        appraisal:{
          resourceId: prodId, //套餐ID
          userId: this.loginData.userObj.userId.value,
          orderId: orderId,
          type:'2'
        }

      };
      this.$store.dispatch("shoppingCommentList", request).then((data) => {
        if(data.data.appraisalList.length > 0){
          this.commentInfo = data.data.appraisalList[0].description;
          this.rateScore = data.data.appraisalList[0].score.value ? parseInt(data.data.appraisalList[0].score.value) : 5;
          this.popupVisible = true
        }else{
          this.$toast('暂无评价');
        }
      })
    },
    //套餐列表
    goShopping() {
      sessionStorage.setItem('selected','shopping');
      this.$router.push({
        path: "home",
        query: {
          orgId: this.orgId,
        }
      })
    },
    //切换分类
    changeTab(status) {
      this.empty = false;
      this.page = 1;
      this.orderList = [];
      this.getShopOrderList(status)
    },
    //分页
    loadMore() {
      if (!this.loaded) {
        this.page++;
        this.getShopOrderList(this.status);
      }
    },
    //获取订单列表
    getShopOrderList(status) {
      this.$indicator.open();
      this.status = status;
      this.loading = true;
      let request = {
        pageSize: 10,
        pageNum: this.page,
        orderStatus: status ? status : null,
        orderType: '2000107',
        orgId: this.orgId ? this.orgId : null,//, '1007057917653852160'
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("shopOrderList", request)
        .then(data => {
          if (data.data.length > 0) {
            for(let i = 0; i < data.data.length; i++){
              this.orderList.push(data.data[i]);
            }
            // this.orderList = this.orderList.concat(data.data);
            this.loaded = this.orderList.length == data.total;
            this.loading = false;
          }else{
            this.empty = true;
            this.loaded = true;
          }
        })
        .catch(e => {
          this.loading = false;
          this.loaded = true;
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }

  },

  created() {
    this.getShopOrderList(this.status);
  },


};
</script>
<style>
  .el-rate__icon{
    font-size: 22px;
  }
</style>
<style scoped>
.empty{
  top:44px;
}
/deep/.mint-navbar .mint-tab-item{
  margin: 0 14px;
  padding: 14px 0;
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
</style>

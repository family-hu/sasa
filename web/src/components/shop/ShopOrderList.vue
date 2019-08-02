<template>
    <div>
      <!-- tab -->
      <div class="modle">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" @click.native="changeTab()">全部</mt-tab-item>
          <mt-tab-item id="2" @click.native="changeTab('0')">待付款</mt-tab-item>
          <mt-tab-item id="3" @click.native="changeTab('1')">待服务</mt-tab-item>
          <mt-tab-item id="4" @click.native="changeTab('11')">待评价</mt-tab-item>
          <mt-tab-item id="5" @click.native="changeTab('2')">退款</mt-tab-item>
        </mt-navbar>
        <!-- 切换主体内容 -->
        <mt-tab-container v-model="selected">
          <mt-tab-container-item id="1">
            <!-- 全部订单 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty" width="144px" height="136px">
              <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无订单</div>
            </div>
            <div v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item"></shop-order-item>
              <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded"></bottomloadMore>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <!-- 待支付 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty" width="144px" height="136px">
              <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无待支付订单</div>
            </div>
            <div  v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item"></shop-order-item>
               <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded"></bottomloadMore>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="3">
            <!-- 待服务 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty" width="144px" height="136px">
              <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无待服务订单</div>
            </div>
            <div v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item"></shop-order-item>
               <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded"></bottomloadMore>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="4">
            <!-- 待评价 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty" width="144px" height="136px">
              <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无待评价订单</div>
            </div>
            <div v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item"></shop-order-item>
               <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded"></bottomloadMore>
            </div>
          </mt-tab-container-item>
          <mt-tab-container-item id="5">
            <!-- 退款 -->
            <div class="empty" v-if="empty">
              <img :src="consultationEmpty" width="144px" height="136px">
              <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无退款订单</div>
            </div>
            <div v-else v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
              <shop-order-item  v-for="(item , index) in orderList" :key="index" :orderList="item"></shop-order-item>
               <!-- 没有更多提示 -->
              <bottomloadMore v-if="loaded"></bottomloadMore>
            </div>
          </mt-tab-container-item>
        </mt-tab-container>
      </div>
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
      orgId: this.$route.query.orgId ? this.$route.query.orgId : localStorage.getItem('orgId'),
      selected:'1',
      loading: false,
      page: 1,
      loaded: false ,//是否加载完成
      orderList:[],
      status: null,
      empty: false
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
    //切换分类
    changeTab(status) {
      this.status = status;
      this.page = 1;
      this.orderList = [];
      this.empty = true;
      this.loaded = false;
      this.loading = false;
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
            this.loaded = (this.orderList.length >= data.total);
            this.loading = false;
          }else{
            this.empty = true;
            this.loaded = true;
          }
        })
        .catch(e => {
          this.empty = true;
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

<style scoped>
/deep/.mint-navbar .mint-tab-item{
  margin: 0 14px;
  padding: 14px 0;
}
.empty {
  padding: 70px 40px;
  text-align: center;
}
</style>

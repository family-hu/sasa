<template>
  <div>
    <!-- 待支付 1 待确认2 已取消3 服务中4  已完成5 服务中或待确认的订单6 服务中或已完成的订单7 -->
    <mt-navbar fixed v-model="selected">
      <mt-tab-item id="1" @click.native="changeTab('0')">全部</mt-tab-item>
      <mt-tab-item id="2" @click.native="changeTab('1')">待付款</mt-tab-item>
      <mt-tab-item id="3" @click.native="changeTab('6')">待服务</mt-tab-item>
      <mt-tab-item id="5" @click.native="changeTab('7')">已完成</mt-tab-item>
      <mt-tab-item id="6" @click.native="changeTab('3')">已取消</mt-tab-item>
    </mt-navbar>
    <mt-tab-container v-model="selected" style="padding-top:44px">
      <div id="1" style="width:100%">
        <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
          <order-item v-for="item in orderList" :key="item.orderId.value" :orderItem="item" @cancelOrder="cancelOrder" @click.native="toDetail(item)" ></order-item>
          <!-- 没有更多提示 -->
          <bottomloadMore v-if="loaded && orderList.length > 2"></bottomloadMore>
        </div>
        <div class="empty" v-if="empty">
            <img :src="consultationEmpty">
            <div v-if="status == '0'">您还没有服务包订单呢</div>
            <a v-if="status == '0'" href="javascript:void(0);" @click="goDoctorMore">去购买</a>
            <div v-else>您还没有相关订单呢</div>
        </div>
      </div>
    </mt-tab-container>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrderItem from "./ServiceOrderItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from '../../../static/js/imgmap.js';
export default {
  data() {
    return {
      orderList: [],
      loading: false,
      selected: '1',
      orgId: this.$route.query.orgId,
      page: 1,
      empty: false,
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
    //医生列表
    goDoctorMore() {
       this.$router.push({path: "doctorOneList", query:{orgId: this.orgId}});
    },
    //加载更多
    loadMore() {
      if (!this.loaded) {
        this.page++;
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
    //获取订单
    requestOrderList(status) {
      this.$indicator.open();
      this.status = status;
      this.loading = true;
      let request = {
        planStatus: 0,
        status: status,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId
      };
      let vm = this;
      this.$store
        .dispatch("servOrderList", request)
        .then(data => {
          if (data.orderList.length > 0) {
            for (let i = 0; i < data.orderList.length; i++) {
              vm.orderList.push(data.orderList[i]);
            }
            vm.loaded = vm.orderList.length == data.total;
            vm.loading = false;
          }else{
            vm.empty = true;
          }

        })
        .catch(error => {
          vm.empty = true;
          vm.loading = false;
          vm.loaded = true;
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    //取消订单
    cancelOrder(request) {
      let vm = this;
      this.$indicator.open();
      this.$store
        .dispatch("servOrderAudit", request)
        .then(() => {
          this.$toast("取消成功");
          vm.updateOrderItem(request);
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
        if (orderItem.orderId.value == request.orderId) {
          orderItem.isEnd.value = "1";
          orderItem.cancelStatus.value = "1";
          break;
        }
      }
    }
  },

  created() {
    this.requestOrderList();
  }
};
</script>

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
</style>

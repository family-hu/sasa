<template>
  <div>
    <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
      <order-item v-for="item in orderList" :key="item.servId.value" :orderItem="item" @cancelOrder="cancelOrder" @click.native="toDetail(item)" ></order-item>
      <!-- 没有更多提示 -->
      <bottomloadMore v-if="loaded && orderList.length > 3"></bottomloadMore>
    </div>
    <div class="empty" v-if="empty">
        <img :src="consultationEmpty">
        <div>您还没有问诊订单呢</div>
        <a href="javascript:void(0);" @click="goDoctorMore">去问诊</a>
    </div>
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
      orgId: this.$route.query.orgId,
      loading: false,
      empty: false,
      page: 1,
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
    toDetail(orderDetail) {
      // let json = JSON.stringify(orderDetail);
      // sessionStorage.setItem("orderDetail", json);
      this.$router.push({
        path: "orderDetail",
        query:{
          orderId: orderDetail.servId,
          userId: this.loginData.userObj.userId.value
        }
      });
    },

    loadMore() {
      if (!this.loaded) {
        this.requestOrderList();
      }
    },

    requestOrderList() {
      this.$indicator.open();
      this.loading = true;
      let userId = this.loginData.userObj.userId.value;
      let request = {
        customerId: userId,
        goodsType: types.ONLINE_SERVICE,
        status: 0,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId
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
            vm.loaded = true;
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
        if (orderItem.servId.value == request.servId) {
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
</style>

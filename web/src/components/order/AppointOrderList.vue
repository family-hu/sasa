<template>
    <div>
      <div v-if="orderList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="50" infinite-scroll-immediate-check="false">
        <appoint-order-item ref="oItem" v-for="(item,index) in orderList" :key="index" :orderItem="item" @cancelOrder="cancelOrder" @click.native="goDetail(index)"></appoint-order-item>
        <!-- 没有更多提示 -->
        <bottomloadMore v-if="loaded && orderList.length > 3"></bottomloadMore>
      </div>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty">
        <div class="text">您还没有预约订单呢</div>
        <a href="javascript:void(0);" @click="goDoctorMore">去预约</a>
    </div>
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
      loading: false,
      orgId: this.$route.query.orgId,
      page: 1,
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
    loadMore() {
      if (!this.loaded) {
        this.requestOrderList();
      }
    },
    //医生列表
    goDoctorMore() {
       this.$router.push({path: "doctorOneList", query:{orgId: this.orgId}});
    },
    goDetail(index) {
      this.$refs.oItem[index].goDetail();
    },

    cancelOrder(request) {
      let vm = this;
      this.$indicator.open();
      this.$store
        .dispatch("docorderstepop", request)
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
        if (orderItem.orderid.value == request.orderId) {
          orderItem.status.value = "4";
          break;
        }
      }
    },

    requestOrderList() {
      this.$indicator.open();
      this.loading = true;
      let userId = this.loginData.userObj.userId.value;
      let request = {
        userid: userId,
        pageNum: this.page,
        pageSize: 10,
        orgId: this.orgId
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

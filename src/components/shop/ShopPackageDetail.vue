<template>
    <div>
      <div v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <shop-item-detail v-for="(item,index) in categoryList" :key="index" :categoryList="item"></shop-item-detail>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import ShopItemDetail from "../shop/ShopItemDetail.vue";
export default {
  data() {
    return {
      packDetailsId: this.$route.query.packDetailsId,
      categoryList:[],
      loading: false,
      page: 1,
      loaded: false ,//是否加载完成
    };
  },

  components: {
    shopItemDetail:ShopItemDetail
  },

  computed: {},

  mounted() {},

  methods: {
    //分页
    loadMore() {
      if (!this.loaded) {
        this.page++;
        this.getPackagesProductList();
      }
    },
    //套餐项目列表
    getPackagesProductList() {
      this.loading = true;
      const request = {
        packDetailsId: this.packDetailsId
      };
      this.$store
        .dispatch("packagesProductList", request)
        .then(data => {
          if (data.data) {
            this.categoryList = data.data.categoryList;
            // this.loaded = (this.categoryList.length == data.data.total.value);
            this.loading = false;
          }
        })
        .catch(error => {
          this.loading = false;
          // this.loaded = true;
          this.$toast(error.message);
        });
    },
  },

  created() {
    this.getPackagesProductList();
  }
};
</script>

<style>
  .mint-msgbox-title{
    text-align: left;
    padding-left: 20px;
    position: relative;
    color: #000;
    font-size: 17px;
    font-weight: 500;
  }
  .mint-msgbox-title::after{
    content: '';
    background: #0093FF;
    position: absolute;
    bottom: -10px;
    left: 20px;
    width: 34px;
    height: 2px;
  }
  .mint-msgbox-btns{
    display: none;
  }
  .mint-msgbox-message{
    text-align: justify;
    line-height: 20px;
    margin-top: 21px;
    color: #666;
    font-size: 15px;
  }
</style>

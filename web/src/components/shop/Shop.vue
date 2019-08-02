<template>
    <div>
      <div style="height:175px;text-align:center" v-if="orgDetailList">
        <!-- <mt-swipe @change="handleChange" :auto="5000" :showIndicators="false">
          <mt-swipe-item  v-for="(item,index) in shopList" :key="index">
              <img :src="item.imgUrl" height="175px" width="100%" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="banner_index">{{onIndex}}/{{shopList.length}}</div> -->
        <img class="image" v-lazy="orgDetailList.orgPubUrl" :src="orgDetailList.orgPubUrl" height="175px" width="100%" alt="">
      </div>

      <div class="detail_addres" v-if="orgDetailList">
        <h3>{{orgDetailList.orgNames}}</h3>
        <!-- <div class="right_img"><img src="../../../static/img/shop_icon.png" alt=""></div> -->
        <div class="tel"><img src="../../../static/img/shop_tel.png" alt=""><a style="color:#000" :href="'tel:' + orgDetailList.tel">{{orgDetailList.tel}}</a></div>
        <div class="tel addres">
          <img src="../../../static/img/shop_position.png" alt="">
          <div>{{orgDetailList.address}}</div>
          <!-- <div>武汉市江汉区中山公园对面，协和路59号，协和大厦(地铁2号线中山公园B出口）<br/><span class="distance">距您1.00km</span></div> -->
        </div>
      </div>
      <div class="screening">
        <!-- 筛选 -->
        <filtrate-item :filtrateList="filtrateList"></filtrate-item>
        <!-- 体检套餐list infinite-scroll-distance="10" -->
        <div v-if="serviceList.length > 0">
          <div class="cell_box">
            <health-service-item v-for="(item , index) in serviceList" :key="index" :healthServiceItem="item" :orgId="orgId" :orgNames="orgNames"></health-service-item>
          </div>
          <!-- 没有更多提示 -->
          <bottomloadMore v-if="loaded"></bottomloadMore>
        </div>
        <div class="empty"  v-if="empty">
          <img :src="consultationEmpty" width="144px" height="136px">
          <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无相关结果</div>
        </div>
      </div>
    </div>
</template>

<script>
import FiltrateItem from "../shop/FiltrateItem.vue";
import HealthServiceItem from "../service/HealthServiceItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import { faces } from '../../../static/js/face';
export default {
  data() {
    return {
      orgId: this.$route.query.orgId,
      orgNames: this.$route.query.orgNames,
      shopList: [
        { imgUrl: "../../../static/img/mine_bg.png" },
        { imgUrl: "../../../static/img/mine_bg.png" },
        { imgUrl: "../../../static/img/mine_bg.png" }
      ],
      filtrateList: [
        { filtrateName: "综合", sideBar: false, icon: false },
        { filtrateName: "销量", sideBar: false, icon: true },
        { filtrateName: "价格", sideBar: false, icon: true }
        // {filtrateName: '类型筛选',sideBar: true,icon:true}
      ],
      serviceList: [],
      sortType: "sales", //默认排序
      arr: null,
      orgDetailList: [],
      onIndex: 1,
      page: 1,
      loaded: false, //是否加载完成
      empty: false
    };
  },

  components: {
    healthServiceItem: HealthServiceItem,
    filtrateItem: FiltrateItem,
    bottomloadMore : BottomloadMore
  },

  computed: {
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },

  mounted() {},

  methods: {
    //分页
    loadMore() {
      if (!this.loaded) {
        this.page++;
        this.getPackagesList(this.sortType, this.arr);
      }
    },
    handleChange(index) {
      this.onIndex = index + 1;
    },
    //获取机构详情
    getOrgDetail() {
      const request = {
        orgId: this.orgId
      };
      this.$store
        .dispatch("orgDetail", request)
        .then(data => {
          if (data) {
            this.orgDetailList = data;
            this.orgNames = data.orgNames;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //健康服务--套餐列表
    getPackagesList(sortType, arr) {
      this.sortType = sortType;
      const request = {
        pageParam: {
          pageSize: 10,
          pageNum: this.page
        },
        packages: {
          orgId: "933916890231775232", // this.orgId
          packCateId: arr ? arr.packCateId : null //分类
        },
        sortType: this.sortType, //排序类型
        // sortMethod : "asc", //排序方式
        genderList: arr ? arr.genderList : null, //性别
        ageList: arr ? arr.ageList : null, //年龄
        startPrice: arr ? arr.startPrice : null, //起始价格
        endPrice: arr ? arr.endPrice : null //结束价格
      };
      this.$store
        .dispatch("packagesList", request)
        .then(data => {
          if (data.data) {
            if( data.data.list.length > 0){
              for (let i = 0; i < data.data.list.length; i++) {
                this.serviceList.push(data.data.list[i]);
              }
              this.loaded = this.serviceList.length >= data.data.total.value;
            }else{
              this.empty = true;
              this.loaded = true;
            }
          }else{
            this.empty = true
            this.loaded = true;
          }
        })
        .catch(error => {
          this.loaded = true;
          this.empty = true
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.getPackagesList(this.sortType, this.arr);
    this.getOrgDetail();
    let that = this;
    window.onscroll = function() {
      //滚动条滚动时，距离顶部的距离
      var scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
      //可视区的高度
      var windowHeight = document.documentElement.clientHeight || document.body.clientHeight;
      //滚动条的总高度
      var scrollHeight = document.documentElement.scrollHeight || document.body.scrollHeight;
      //滚动条到底部的条件
      if (scrollTop + windowHeight == scrollHeight) {
        that.loadMore();
      }
    };
  }
};
</script>

<style scoped>
.image[lazy="loading"] {
  width: 40px;
  height: 175px;
  margin: 0 auto;
  color: #ccc;
}
.page-tabbar {
  overflow: hidden;
}
.empty {
  padding: 50px 40px;
  text-align: center;
}
ul,
li,
h3,
p {
  padding: 0;
  list-style: none;
  margin: 0;
}
.cell_box {
  background: rgba(255, 255, 255, 1);
  overflow: hidden;
  padding: 0 16px;
  /* width: 100%; */
  margin-left: -20px;
}
.cell_box ul {
  height: auto;
}
.banner_index {
  position: absolute;
  top: 133px;
  right: 10px;
  width: 42px;
  height: 27px;
  line-height: 27px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  text-align: center;
}
.detail_addres {
  background: #fff;
  padding: 16px;
  position: relative;
}
.detail_addres h3 {
  color: #000;
  font-size: 20px;
  font-weight: 500;
}
.right_img {
  position: absolute;
  right: 16px;
  top: 16px;
}
.right_img img {
  width: 24px;
  height: 24px;
}
.tel {
  color: #000;
  font-size: 14px;
  font-weight: 400;
  margin-top: 10px;
}
.tel img {
  width: 15px;
  height: 15px;
  margin-right: 5px;
  position: relative;
  top: 3px;
}
.addres {
  overflow: hidden;
}
.addres img,
.addres div {
  float: left;
}
.addres div {
  width: 80%;
}
.distance {
  font-size: 11px;
  color: #b3b3b3;
  font-weight: 400;
}
.screening {
  margin-top: 10px;
  background: #fff;
  overflow: hidden;
}
</style>

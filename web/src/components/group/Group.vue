<template>
    <div>
      <div class="top_box">
        <div class="flex_title">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native="changeTitle()">关注</mt-tab-item>
            <mt-tab-item id="2" @click.native="changeTitle()">全部</mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <mt-tab-container v-model="selected" style="margin-top: 40px">
        <mt-tab-container-item id="1">
          <group-list :page="page" v-if="listFlag"></group-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <group-all-list :page="page" v-if="allFlag"></group-all-list>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import GroupList from "./GroupList.vue";
import GroupAllList from "./GroupAllList.vue";

export default {
  data() {
    return {
      // servId: this.$route.query.servId,
      orgId: this.$route.query.orgId,
      orgNames: this.$route.query.orgNames,
      groupList:[],
      selected: "1",
      page: '1',
      allFlag: false,
      listFlag: true
    };
  },
  components: {
    groupList: GroupList,
    groupAllList: GroupAllList
  },

  computed: {

  },

  methods: {
    changeTitle() {
      this.page = '1';
      if(this.selected == '1'){
        this.listFlag = true;
      }else{
        this.allFlag = true;
      }
    }
  },

  created() {

  }
};
</script>

<style scoped>
.top_box{
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 500;
}
.banner_box{
  width: 100%;
  height: 140px;
}
.banner_box img{
  width: 100%;
  height: 140px;
}
.center_box{
  position: absolute;
  top:0;
  left: 0;
  width: 100%;
  padding: 42px 16px 0 16px;
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
}
.center_box img{
  width: 60px;
  height: 60px;
  border-radius: 4px;
}
.center_txt{
  color: #fff;
  margin-left: 12px;
}
.group_name{
  font-size: 18px;
  font-weight: 500;
}
.group_desp{
  font-size: 14px;
}
.group_num span{
  font-size: 12px;
  margin-right: 15px;
}
.group_num img{
  width: 10px;
  height: 10px;
  margin-right: 5px;
  position: relative;
  top:1px;
}
.join{
  width: 50px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 13px;
  font-size: 13px;
  font-weight: 500;
}
.on{
  background: #fff;
  color: #0076FF;
}
.out{
  color:rgba(4,11,28,.4);
  background: #fff;
}
.flex_title {
  width: 100%;
  z-index: 200;
  height: 43px;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
  background: #fff;
  text-align: center;
  margin: 0 auto;
}
.mint-navbar {
  width: 100px;
  display: flex;
  margin: 0 auto;
}
.mint-navbar .mint-tab-item {
  margin: 0 13px;
}
.mint-navbar .mint-tab-item{
  padding: 11px 0
}
.release{
  display: block;
  position: fixed;
  right: 16px;
  bottom: 20%;
  width: 56px;
  height: 56px;
  z-index: 400;
}
.release img{
  width: 100%;
  height: 100%;;
}
.mint-tab-item{
  flex: none;
  position: relative;
}
.mint-tab-item{
  color:rgba(4,11,28,.6);
}
.mint-navbar .mint-tab-item.is-selected{
  border: none;
  font-size: 17px;
  color: #0076FF;
}
.mint-navbar .mint-tab-item.is-selected::after{
  content: '';
  position: absolute;
  bottom: -4px;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  height: 2px;
  background: #0076FF;
}
</style>

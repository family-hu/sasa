<template>
  <div class="page-tabbar">
    <div class="page-wrap">
      <mt-tab-container class="page-tabbar-container" v-model="selected">
        <mt-tab-container-item id="home">
          <home :orgId="orgId" @child="goTab"></home>
        </mt-tab-container-item>
        <mt-tab-container-item id="shopping">
          <shopping :orgId="orgId"></shopping>
        </mt-tab-container-item>
        <mt-tab-container-item id="group">
          <group :orgId="orgId"></group>
        </mt-tab-container-item>
        <mt-tab-container-item id="msg">
          <msg :orgId="orgId"></msg>
        </mt-tab-container-item>
        <mt-tab-container-item id="doctor" v-if="!focusEnter">
          <doctor-list></doctor-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="service" v-if="!focusEnter">
          <service-list></service-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="news" v-if="!focusEnter">
          <news-list></news-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="mine">
          <mine :orgId="orgId"></mine>
        </mt-tab-container-item>
      </mt-tab-container>
    </div>

    <mt-tabbar v-model="selected" fixed>
        <mt-tab-item id="home" @click.native="changeTitle">
          <img slot="icon" :src="homeImg">
          首页
        </mt-tab-item>
        <mt-tab-item id="shopping" @click.native="changeTitle">
          <img slot="icon" :src="shoppingImg">
          商城
        </mt-tab-item>
        <mt-tab-item id="group" @click.native="changeTitle">
          <img slot="icon" :src="groupImg">
          小组
        </mt-tab-item>
        <mt-tab-item id="msg" @click.native="changeTitle">
          <img slot="icon" :src="msgImg">
          消息
        </mt-tab-item>
        <mt-tab-item id="doctor" @click.native="changeTitle" v-if="!focusEnter">
          <img slot="icon" :src="doctorImg">
          医生
        </mt-tab-item>
        <mt-tab-item id="service" @click.native="changeTitle" v-if="!focusEnter">
          <img slot="icon" :src="serviceImg">
          服务
        </mt-tab-item>
        <mt-tab-item id="news" @click.native="changeTitle" v-if="!focusEnter">
          <img slot="icon" :src="newsImg">
          资讯
        </mt-tab-item>
        <mt-tab-item id="mine" @click.native="changeTitle">
          <img slot="icon" :src="mineImg">
          我的
        </mt-tab-item>
      </mt-tabbar>
    </div>
</template>

<script>
import DoctorList from "../components/doctor/DoctorList.vue";
import ServiceList from "../components/service/ServiceList.vue";
import NewsList from "../components/news/NewsList.vue";
import Mine from "../components/user/Mine.vue";
import Home from "../components/home/Home.vue";
import Shop from "../components/shop/Shop.vue";
import Group from "../components/group/Group.vue";
import Msg from "../components/msg/OrgMsgList.vue";
import imgMap from "../../static/js/imgmap.js";
import { mapGetters } from "vuex";

export default {
  name: "Main",
  data() {
    return {
      selected: "home", //默认首页
      orgId: this.$route.query.orgId,
      focusEnter: true, //this.$route.query.focusEnter,
      orgNames: null,
    };
  },

  components: {
    home: Home,
    doctorList: DoctorList,
    serviceList: ServiceList,
    newsList: NewsList,
    mine: Mine,
    shopping: Shop,
    group: Group,
    msg: Msg
  },

  computed: {
    ...mapGetters(["loginData", "loginUrl"]),
    homeImg() {
      if (this.selected == "home") return imgMap.house_s;
      return imgMap.house_n;
    },
    shoppingImg() {
      if (this.selected == "shopping") return imgMap.shopping_s;
      return imgMap.shopping_n;
    },
    groupImg() {
      if (this.selected == "group") return imgMap.group_s;
      return imgMap.group_n;
    },
    msgImg() {
      if (this.selected == "msg") return imgMap.msg_s;
      return imgMap.msg_n;
    },
    doctorImg() {
      return imgMap.doctor;
    },
    serviceImg() {
      return imgMap.service;
    },
    newsImg() {
      return imgMap.news;
    },
    mineImg() {
      if (this.selected == "mine") return imgMap.my_s;
      return imgMap.my_n;
    }
  },

  methods: {
    goTab(index) {
      // if(this.focusEnter) {
      //   if(index == 'doctor') {
      //     this.$router.push({path: "doctorList", query:{orgId: this.orgId}})
      //   } else if(index == 'service') {
      //     this.$router.push({path: "serviceList", query:{orgId: this.orgId}})
      //   } else if(index == 'news') {
      //     this.$router.push({path: "newsList", query:{orgId: this.orgId}})
      //   }
      // } else {
      this.selected = index;
      // }
    },
    toMine() {
      document.title = "我的";
      const userInfo = this.loginData.userObj;
      if (!userInfo) {
        // window.location.href = this.loginUrl + "autoLogin";
        this.myUtils.wxLogin();
      }
    },
    changeTitle() {
      sessionStorage.setItem("selected", this.selected);
      let title = "";
      if (this.selected == "home") {
        if (this.orgNames) {
          title = this.orgNames;
        } else {
          title = "首页";
        }
      } else if (this.selected == "shopping") {
        title = "健康商城";
      } else if (this.selected == "group") {
        title = "小组";
      } else if (this.selected == "msg") {
        title = "消息";
      } else if (this.selected == "doctor") {
        title = "专家团队";
      } else if (this.selected == "service") {
        title = "特色服务";
      } else if (this.selected == "news") {
        title = "健康资讯";
      } else if (this.selected == "mine") {
        title = "我的";
        const userInfo = this.loginData.userObj;
        if (!userInfo) {
          this.myUtils.wxLogin();
        }
      }
      document.title = title;
    },

    requestOrgInfo() {
      if (!this.orgId) return;
      let vm = this;
      let request = { orgId: this.orgId };
      this.$store.dispatch("orgDetail", request).then(orgInfo => {
        vm.orgNames = orgInfo.orgNames;
        vm.changeTitle();
      });
    }
  },
  created() {
    this.requestOrgInfo();
    let selected = sessionStorage.getItem("selected");
    if (selected != "" && selected != null && selected != undefined) {
      this.selected = selected;
    } else {
      this.selected = "home";
    }
  },

  activated() {
    const userInfo = this.loginData.userObj;
    if (userInfo) {
      const request = { userId: userInfo.userId.value };
      this.$store.dispatch("userInfoGet", request).catch(err => {
        this.$store.commit("clearUser");
        this.$store.commit("clearCache");
      });
    }
    this.changeTitle();
  }
};
</script>

<style scoped>
.page-tabbar {
  /* overflow: hidden; */
  height: auto;
}
.page-wrap {
  overflow: auto;
  height: 100%;
  padding-bottom: 55px;
  box-sizing: border-box;
  -webkit-overflow-scrolling: touch;
}
.mint-tabbar.is-fixed {
  box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.08);
}
.mint-tab-item-icon {
  width: 26px;
  height: 26px;
}
.mint-tabbar > .mint-tab-item {
  background: #fff;
}
.mint-tabbar > .mint-tab-item.is-selected {
  background: #fff;
  color: #0076ff;
}
.mint-tab-item-label {
  font-size: 10px;
  color: rgba(4, 11, 28, 0.7);
}
</style>

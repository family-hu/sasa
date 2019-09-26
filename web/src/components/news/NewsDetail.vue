<template>
    <div v-if="newsDetail != ''">
      <div class="head_bar flex-b">
        <div class="flex_box" @click="backHome">
          <img src="/static/img/bar_back_home@2x.png" alt="">
          <span>{{homeNames}}</span>
        </div>
        <div>
          <img @click="focusDoc" src="/static/img/bar_ewm@2x.png" alt="">
          <img @click="backMine" src="/static/img/bar_back_mine@2x.png" alt="">
        </div>
      </div>
      <div class="placeholder_div"></div>
      <!-- 有视频时显示 -->
      <div class="video_box" v-if="videoNews">
        <video id="video" controls="controls" @click="video" x5-playsinline="" playsinline="" webkit-playsinline="" :src="videoUrls" :poster="newsDetail.photoUrl">
          <source :src="videoUrls" type="video/mp4">
          <!-- <source src="myvideo.ogv" type="video/ogg"></source>
          <source src="myvideo.webm" type="video/webm"></source> -->
        </video>
        <div v-if="shadeVideo" class="shade_video" @click="video">
          <img src="/static/img/play@2x.png" alt="">
        </div>
      </div>
      <div class="main">
        <div class="title">{{newsDetail.title}}</div>
        <div class="title_box">
          <img :src="orgImg" alt="">
          <div>
            <p class="title_name">{{newsDetail.orgName}}</p>
            <div class="title_time">{{newsDetail.timePublish}}</div>
          </div>
        </div>
      </div>
      <!-- 有视频时显示 -->
      <div class="head_box" v-if="videoNews">
      </div>
      <div class="main">
        <h4 v-if="videoNews">详情</h4><!-- 有视频时显示 -->
        <div class="center" v-if="videoNews">
          {{newsDetail.videoDesp}}
        </div>
        <div class="center" style="margin-top: -12px;" v-else v-html="newsDetail.content">
          {{newsDetail.content}}
        </div>
      </div>
      <div class="news_share" @click="share"></div>
      <div class="work_btn" @click="working">
        <img src="/static/img/work_icon.png" alt="">
      </div>
      <!-- 没有更多提示 -->
      <bottomloadMore v-if="showTip"></bottomloadMore>
      <!-- 关注二维码 -->
      <div class="doctorCode" v-if="codeShade">
        <img :src="'data:image/jpeg;base64,'+docCode" alt="">
        <p>长按识别，关注公众号</p>
      </div>
      <!-- 底部工作台 -->
      <div class="shade" v-if="work || codeShade" @click="closeWork"></div>
      <div class="dialog_box" :class=" work ? 'dialog-fade-in' : 'dialog-fade-out'">
        <div class="center_box">
          <dl @click="backHome">
            <dt><img src="/static/img/work_home.png" alt=""></dt>
            <dd>首页</dd>
          </dl>
          <dl @click="focusDoc">
            <dt><img src="/static/img/work_public.png" alt=""></dt>
            <dd>进入公众号</dd>
          </dl>
          <dl @click="backMine" v-if="!timestampCustomServe">
            <dt><img src="/static/img/work_mine.png" alt=""></dt>
            <dd>我的</dd>
          </dl>
          <dl @click="backMsg" v-if="!timestampCustomServe">
            <dt>
              <div class="msg_box">
                <img src="/static/img/work_msg.png" alt="">
                <span v-if="unreadNum > 0" class="hot_dot">{{unreadNum}}</span>
              </div>
            </dt>
            <dd>消息</dd>
          </dl>
        </div>
        <a class="close_btn" href="javascript:void(0);" @click="closeWork">关闭</a>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      newsDetail: {},
      timestampCustomServe: this.$route.query.timestampCustomServe, //微页面标识
      orgNames: this.$route.query.orgNames, //微页面页面名称
      pageUrl: this.$route.query.pageUrl, //微页面返回URL
      newsId: this.$route.query.newsId,
      videoNews: false,
      showTip: false,
      proUserId: this.$route.query.proUserId
        ? this.$route.query.proUserId
        : null, //分享者userid
      docCode: "",
      codeShade: false,
      work: false,
      unreadNum: "",
      videoUrls: "",
      shadeVideo: true
    };
  },
  components: {
    bottomloadMore: BottomloadMore
  },
  computed: {
    ...mapGetters(["loginData", "appId"]),
    orgImg() {
      if (this.newsDetail.orgUrl) return this.newsDetail.orgUrl;
      return imgMap.orgImg;
    },
    //导航机构名称
    homeNames() {
      if(this.timestampCustomServe){ //微页面
        return this.orgNames
      }else{
        return this.newsDetail.orgName
      }
    }
  },
  mounted() {
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.newsDetail);
    }, 1000);
  },
  //加载前获取当前URL，解决iOS重定向路由
  beforeRouteEnter(to, from, next) {
    console.log("beforeRouteEnter");
    next(vm => {
      if (!window.localStorage.getItem("isReload")) {
        window.localStorage.setItem("isReload", window.location.href);
        // 微信分享需要重新设置URL
        window.location.href = window.location.href;
      }
    });
  },
  methods: {
    //点击视频
    video() {
      let video = document.getElementById("video");
      if (video.paused) {
        video.play();
        this.shadeVideo = false
      } else {
        video.pause();
        this.shadeVideo = true
      }
      let that = this;
      video.addEventListener('pause',function(){
        that.shadeVideo = true
      })
    },
    //开启工作台弹窗
    working() {
      this.work = true;
    },
    //关闭工作台弹窗
    closeWork() {
      this.work = false;
      this.codeShade = false;
    },
    //返回消息
    backMsg() {
      sessionStorage.setItem("selected", "msg");
      this.$router.push({
        path: "home",
        query: {
          orgId: this.newsDetail.orgId,
          orgNames: this.newsDetail.orgName
        }
      });
    },
    //返回首页
    backHome() {
      if(this.timestampCustomServe){ //返回微页面
        window.location.href = this.pageUrl
      }else{
        sessionStorage.setItem("selected", "home");
        this.$router.push({
          path: "home",
          query: {
            orgId: this.newsDetail.orgId,
            orgNames: this.newsDetail.orgName
          }
        })
      }
    },
    //返回我的
    backMine() {
      this.$router.push({
        path: "mine",
        query: {
          orgId: this.newsDetail.orgId,
          orgNames: this.newsDetail.orgName
        }
      });
    },
    //关注公众号
    focusDoc() {
      let request = {
        busiId: this.newsDetail.orgId,
        qrType: "1004100114"
      };
      let vm = this;
      this.$store
        .dispatch("generateqrcode", request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.codeShade = true;
            vm.docCode = data.img;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //未读消息数量
    requestMsg() {
      const request = {
        orgId: this.newsDetail.orgId,
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("sysOrgModeList", request)
        .then(data => {
          if (data) {
            this.unreadNum = data.unreadNum.value;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //分享关联
    busiPageShareViewLog() {
      let userId = this.loginData.userObj.userId.value; //当前用户
      let request = {
        proUserId: this.proUserId ? this.proUserId : userId, //分享者ID
        busiType: "资讯",
        userId: userId,
        orgId: this.newsDetail.orgId,
        title: this.newsDetail.title
      };
      this.$store
        .dispatch("busiPageShareViewLog", request)
        .then(data => {
          if (data.rtnCode == "1") {
            console.log("关联成功");
          } else {
            console.log(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //分享
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let shareUrlUserId =
        window.location.href.split("#")[0] +
        "&proUserId=" +
        this.loginData.userObj.userId.value;
      console.log(shareUrlUserId, "==shareUrlUserId");
      let dataForWeixin = {
        title: data.title, // 分享标题
        desc: data.contentWords, // 分享描述
        link: shareUrlUserId, // 分享链接
        imgUrl: data.photoUrl
          ? data.photoUrl
          : "http://yun.sinoylb.com/static/img/share@2x.png" // 分享图标
      };
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //分享资讯海报
    share() {
      this.$router.push({
        path: "shareNews",
        query: {
          newsId: this.newsId
        }
      });
    },
    //获取资讯详情
    getNewsDetail() {
      this.$indicator.open();
      let request = {
        newsId: this.newsId
      };
      this.$store
        .dispatch("newsDetail", request)
        .then(data => {
          this.newsDetail = data.data;
          if(this.newsDetail.newsStyle == '1012106'){
            this.videoNews = true
          }
          if (this.newsDetail.contentResUrls) {
            this.videoUrls = this.newsDetail.contentResUrls[0];
          }
          this.requestMsg();//未读消息数量
          //绑定关系
          if (!this.loginData.tid) {
            this.myUtils.wxLogin();
          }else{
            if(!this.proUserId){ //没有分享者ID不关联
              return false;
            }
            this.busiPageShareViewLog();
          }
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  },
  created() {
    if (!this.loginData.tid) {
      this.myUtils.wxLogin();
    } else {
      this.getNewsDetail(); //获取资讯详情
      setTimeout(() => {
        this.showTip = true;
      }, 2000);
    }
  }
};
</script>

<style scoped>
.video_box {
  width: 100%;
  height: 211px;
  position: relative;
}
video {
  width: 100%;
  height: 100%;
}
.shade_video {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
}
.shade_video img {
  width: 39px;
  height: 39px;
}
.head_bar {
  width: 100%;
  height: 43px;
  border-bottom: 1px solid #eee;
  padding: 0 11px 0 16px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 600;
}
.head_bar img {
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.head_bar span {
  max-width: 150px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.flex_box {
  display: flex;
  align-items: center;
}
.placeholder_div {
  width: 100%;
  height: 44px;
}
.doctorCode {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -85px;
  margin-top: -185px;
  width: 170px;
  height: 170px;
  z-index: 1000;
  text-align: center;
}
.doctorCode img {
  width: 170px;
  height: 170px;
}
.doctorCode p {
  font-size: 15px;
  color: #fff;
  margin-top: 10px;
}
.main {
  padding: 16px;
  background: #fff;
}
.head_box {
  width: 100%;
  height: 10px;
  background: #f8f8f8;
}
.title {
  font-weight: 500;
  color: rgba(4, 11, 28, 1);
  font-size: 20px;
}
.title_box {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.title_box img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.title_name {
  margin-left: 5px;
  font-size: 13px;
  color: #0076ff;
  /* width: 150px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap; */
}
.title_time {
  color: #b3b3b3;
  font-size: 10px;
  margin-left: 5px;
}
h4 {
  font-size: 16px;
  font-weight: 600;
  color: rgba(0, 0, 0, 1);
  margin-bottom: 20px;
}
.center {
  width: 100%;
}
.center p {
  font-size: 15px;
  color: rgba(4, 11, 28, 0.8);
  line-height: 25px;
  text-align: justify;
}

.center img {
  width: 100%;
  height: 100%;
  margin: 15px 0;
}
.news_share {
  position: fixed;
  right: 16px;
  bottom: 150px;
  width: 56px;
  height: 56px;
  background: url("../../../static/img/news_share.png") no-repeat;
  background-size: 100% 100%;
}
.work_btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #fff;
  position: fixed;
  right: 16px;
  bottom: 80px;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0px 0px 8px 0px rgba(0, 0, 0, 0.1);
}
.work_btn img {
  width: 24px;
  height: 24px;
}
@keyframes dialog-fade-in {
  0% {
    height: 0;
  }
  100% {
    height: 208px;
  }
}

@keyframes dialog-fade-out {
  0% {
    height: 208px;
  }
  100% {
    height: 0;
  }
}
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 700;
}
.dialog_box {
  width: 100%;
  height: 0px;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 800;
  display: none;
}
.dialog-fade-in {
  display: block;
  animation: dialog-fade-in 0.3s;
  animation-fill-mode: forwards;
}
.dialog-fade-out {
  display: none;
  animation: dialog-fade-out 0.5s;
  animation-fill-mode: forwards;
}
.close_btn {
  display: block;
  width: 100%;
  height: 55px;
  line-height: 55px;
  text-align: center;
  border-top: 1px solid #e6e6e6;
  font-size: 15px;
  color: #040b1c;
  position: absolute;
  bottom: 0;
  left: 0;
}
.center_box {
  padding: 4px 10px 10px 0;
}
.center_box dl {
  text-align: center;
  width: 33%;
  float: left;
  margin-top: 20px;
}
.center_box dl img {
  width: 24px;
  height: 24px;
}
.msg_box {
  position: relative;
  width: 40px;
  margin: 0 auto;
}
.hot_dot {
  position: absolute;
  right: 0;
  top: -5px;
  background: #ff0000;
  color: #fff;
  font-size: 11px;
  padding: 0 3px;
  border-radius: 50%;
  height: 18px;
  width: 18px;
  line-height: 18px;
}
</style>

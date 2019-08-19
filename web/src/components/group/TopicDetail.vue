<template>
  <div id="dialogue_box">
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

          <!-- Container that holds slides.
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

              <!--  Controls are self-explanatory. Order can be changed. -->

              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

              <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
              <!-- element will get class pswp__preloader--active when preloader is running -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>
    </div>
    <div style="padding-bottom:60px">
      <div class="topic_box">
        <div class="flex_out">
          <div class="flex_in">
            <img class="head_img" :src="imgUrl" alt="">
            <div>
              <p class="nick">{{topicItem.nick}}</p>
              <p class="time_create">{{topicItem.time_create}}</p>
            </div>
          </div>
        </div>
        <p class="descdata" v-html="topicItem.descdata">{{topicItem.descdata}}</p>
        <div class="imgList_box" id="imgs">
          <img class="imgList image" v-lazy="item"  v-for="(item,index) in topicItem.imgList" :key="index" :src="item" alt="" @click="toBigPic(index)">
        </div>
        <div v-if="topicItem.groupName" class="group_back" @click="goGroupDetail">{{topicItem.groupName}}<img src="/static/img/group_back.png" alt=""></div>
        <div class="flex-b">
          <div class="num_box">
            <span @click="goAddsupport" disabled="flag"><img src="/static/img/supportNum.png" alt="">{{supportNum}}</span>
            <span><img src="/static/img/commentNum.png" alt="">{{commentNum}}</span>
          </div>
          <div class="topic_share" @click="share"><img src="/static/img/topic_share.png" alt=""></div>
        </div>
      </div>
      <div class="flex_title">
        <mt-navbar v-model="selected">
          <mt-tab-item id="1" @click.native="changeTitle()">全部回复({{groupListAll}})</mt-tab-item>
          <mt-tab-item id="2" @click.native="changeTitle()">只看医生</mt-tab-item>
        </mt-navbar>
      </div>
      <mt-tab-container v-model="selected">
        <mt-tab-container-item id="1">
          <ul style="background:#fff;" v-if="groupList.length > 0">
            <group-detail-item v-for="(item,index) in groupList" :key="index"  :groupDetailItem="item"></group-detail-item>
          </ul>
          <div class="empty" v-if="empty">
            <img :src="consultationEmpty">
            <div>暂无回复</div>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <ul style="background:#fff;" v-if="groupList.length > 0">
            <group-detail-item v-for="(item,index) in groupList" :key="index"  :groupDetailItem="item"></group-detail-item>
          </ul>
          <div class="empty" v-if="empty">
            <img :src="consultationEmpty">
            <div>暂无回复</div>
          </div>
        </mt-tab-container-item>
      </mt-tab-container>
      <div class="reply_box">
        <div class="flex_box" v-if="!blur">
          <input type="text"  placeholder="写回复" placeholder-style="color:rgba(4,11,28,.5);" @click="inputClick">
          <div class="flex_box" style="padding-top: 2px;">
            <span class="flex_box" @click="goAddsupport"><img class="support_img" src="/static/img/supportNum@2x.png" alt=""><p>{{supportNum}}</p></span>
            <span @click="share"><img src="/static/img/commentNum@2x.png" alt=""></span>
          </div>
        </div>
        <div class="flex_box input_blur" v-else>
          <input type="text" v-model="addcomment" placeholder="写回复" @blur="inputBlur" placeholder-style="color:rgba(4,11,28,.5);">
          <a href="javascript:void(0);" @click="submitComment">发布</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
import GroupDetailItem from "./GroupDetailItem.vue";

export default {
  data() {
    return {
      groupid: this.$route.query.groupid,
      orgNames: this.$route.query.orgNames,
      orgId: this.$route.query.orgId,
      selected: "1",
      topicItem: [],
      groupList: [],
      groupListAll: "0",
      con_id: this.$route.query.con_id,
      addcomment: "",
      blur: false,
      support: null,
      supportNum: "0",
      flag: true,
      empty: false,
      loading: false,
      page: 1,
      loaded: false //是否加载完成
    };
  },

  components: {
    groupDetailItem: GroupDetailItem
  },

  computed: {
    ...mapGetters(["loginData"]),
    //头像
    imgUrl() {
      if (this.topicItem.headImg) return this.topicItem.headImg;
      return imgMap.defaultAva;
    },
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
    commentNum() {
      if (this.topicItem.commentNum) return this.topicItem.commentNum.value;
      return "0";
    }
  },
  mounted() {
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.topicItem);
    }, 1000);
  },

  methods: {
    // 加载更多
    loadMore() {
      if (!this.loaded) {
        this.page++;
        if (this.selected == "1") {
          this.requestCommentlist(false);
        } else {
          this.requestCommentlist(true);
        }
      }
    },
    //医生主页
    goDocdetail(item) {
      this.$router.push({
        path: "doctorDetail",
        query: { userId: item.userid.value }
      })
    },
    //点击图片放大
    toBigPic(pos) {
      var pswpElement = document.querySelectorAll(".pswp")[0];
      var items = [];
      var aDiv = document.getElementById("imgs");
      if (aDiv.hasChildNodes()) {
        for (var i = 0; i < aDiv.children.length; i++) {
          var img = aDiv.children;
          var item = {
            src: img[i].src,
            w: img[i].naturalWidth,
            h: img[i].naturalHeight
          };
          items.push(item);
          // console.log(i + "===child====" + (item.src));
          // console.log(i + "===child====" + (item.w));
          // console.log(i + "===child====" + (item.h));
        }
      }
      // define options (if needed)
      var options = {
        // history & focus options are disabled on CodePen
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,
        index: pos,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };

      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    },
    //分享
    wxShareCallback(data) {
      console.log(data, "data");
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
        title: "有一篇好的帖子分享给你", // 分享标题
        desc: this.topicItem.descdata, // 分享描述
        link: shareUrl, // 分享链接
        imgUrl:
          data.imgList.length > 0
            ? data.imgList[0]
            : "http://yun.sinoylb.com/static/img/share@2x.png" // 分享图标 帖子图片
      };
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //分享
    share() {
      this.$toast("请点击右上角分享");
    },
    //点赞
    goAddsupport() {
      this.flag = false;
      //判断是否登录
      if (this.loginData.userObj.userId.value) {
        this.requestAddsupport();
      } else {
        this.myUtils.wxLogin();
      }
    },
    requestAddsupport() {
      this.support = !this.support;
      let request = {
        userid: this.loginData.userObj.userId.value,
        con_id: this.con_id,
        groupid: this.groupid,
        support: this.support
      };
      this.$store
        .dispatch("addsupport", request)
        .then(data => {
          console.log(data);
          if (data.rtnCode == "1" && this.support == true) {
            this.$toast("点赞成功");
            this.supportNum = parseInt(this.supportNum) + 1;
          } else {
            this.$toast("取消点赞");
            this.supportNum = parseInt(this.supportNum) - 1;
          }
          setTimeout(function() {
            this.flag = true;
          }, 3000);
        })
        .catch(error => {
          this.$toast(error.message);
          setTimeout(function() {
            this.flag = true;
          }, 3000);
        });
    },
    //回复框样式
    inputBlur() {
      if(this.addcomment == ''){
        this.blur = false;
      }else{
        this.blur = true;
      }
      this.scrollToBottom();
    },
    //回复框样式
    inputClick() {
      this.blur = true;
      this.scrollToBottom();
    },
    //失去焦点时，滚动到之前到位置
    scrollToBottom() {
      // this.$nextTick(function() {
      //   var div = document.getElementById("dialogue_box");
      //   div.scrollTop = div.scrollHeight;
      // });
      setTimeout(function() {
        var scrollHeight = document.documentElement.scrollTop || document.body.scrollTop || 0;
        window.scrollTo(0, Math.max(scrollHeight - 1, 0));
      }, 100);
    },
    //发布回复
    submitComment() {
      this.blur = false;
      this.scrollToBottom();
      if (this.addcomment == "") {
        return this.$toast("请输入评论");
      }
      //判断是否登录
      if (this.loginData.userObj.userId.value) {
        this.requestAddcomment();
      } else {
        this.myUtils.wxLogin();
      }
    },
    //评论
    requestAddcomment() {
      let request = {
        userid: this.loginData.userObj.userId.value,
        con_id: this.con_id,
        groupid: this.groupid,
        descdata: this.addcomment
      };
      this.$store
        .dispatch("addcomment", request)
        .then(data => {
          console.log(data);
          if (data.rtnCode == "1") {
            this.$toast("评论成功");
            this.addcomment = "";
            //刷新评论
            this.page = 1;
            this.groupList = [];
            this.selected = "1";
            this.requestCommentlist(false);
            this.requestTopicList();
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //话题列表
    requestTopicList() {
      if (this.loginData.tid) {
        let request = {
          userid: this.loginData.userObj.userId.value,
          // groupid: this.groupid,
          contentid: this.con_id
        };
        let vm = this;
        this.$store
          .dispatch("bbssubjectlist", request)
          .then(data => {
            if (data) {
              vm.topicItem = data.data[0];
              vm.supportNum = data.data[0].supportNum.value;
              vm.support = data.data[0].isSupport;
            }
          })
          .catch(error => {
            vm.$toast(error.message);
          });
      } else {
        this.myUtils.wxLogin();
      }
    },
    //评论回复列表
    requestCommentlist(onlyDoc) {
      this.$indicator.open();
      this.empty = false
      let request = {
        con_id: this.con_id,
        onlyDoc: onlyDoc,
        pageNum: this.page,
        pageSize: 10
      };
      this.$store
        .dispatch("bbscommentlist", request)
        .then(data => {
          if (data.data.length > 0) {
            for(let i = 0; i < data.data.length; i++){
              this.groupList.push(data.data[i]);
            }
            if (onlyDoc == false) {
              this.groupListAll = data.total.value;
            }
            this.loaded = this.groupList.length >= data.total.value;
            this.loading = false;
          }else{
            this.empty = true;
          }
        })
        .catch(error => {
          this.loading = false;
          this.loaded = true;
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },
    changeTitle() {
      this.groupList = [];
      this.page = 1;
      if (this.selected == "1") {
        this.requestCommentlist(false);
      } else {
        this.requestCommentlist(true);
      }
    },
    goGroupDetail() {
      this.$router.push({
        path: "groupDetail",
        query: {
          groupid: this.groupid,
          orgNames: this.orgNames,
          orgId: this.orgId
        }
      });
    }
  },
  created() {
    this.requestCommentlist(false);
    this.requestTopicList();
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
.empty{
  position: relative;
  background: none
}

.image[lazy="loading"] {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  color: #ccc;
}
.topic_box {
  padding: 16px;
  background: #fff;
  margin-bottom: 10px;
}
.flex_out {
  display: flex;
  justify-content: space-between;
}
.flex_in {
  display: flex;
  align-items: center;
}
.head_img {
  width: 36px;
  height: 36px;
  border-radius: 50%;
  margin-right: 12px;
}
.nick {
  color: rgba(4, 11, 28, 0.6);
  font-size: 14px;
}
.time_create {
  color: rgba(4, 11, 28, 0.24);
  font-size: 12px;
}
.isdocComment {
  color: #0076ff;
  font-size: 13px;
}
.descdata {
  color: #040b1c;
  font-size: 16px;
  margin-top: 10px;
  text-align: justify;
}
.imgList_box {
  /* display: flex; */
  margin-left: -10px;
}
.imgList {
  max-width: 100%;
  max-height: 150px;
  margin-top: 10px;
  /* border: 1px solid #ccc; */
  margin-left: 10px;
}
.num_box img {
  width: 14px;
  height: 14px;
  margin-top: 10px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.num_box span {
  margin-right: 20px;
  margin-top: 10px;
  color: #040b1c;
  font-size: 13px;
}
.topic_share {
  width: 30px;
  height: 30px;
  text-align: right;
}
.topic_share img {
  width: 14px;
  height: 14px;
  margin-top: 14px;
}
.flex_title {
  width: 100%;
  z-index: 200;
  height: 44px;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
  background: #fff;
  padding: 0 16px;
  box-sizing: border-box;
}
.mint-navbar {
  width: 100%;
  display: flex;
}
.mint-tab-item {
  flex: none;
  position: relative;
}
.mint-navbar .mint-tab-item.is-selected {
  border: none;
  color: #0076ff
}
/deep/ .mint-tab-item-label{
  font-size: 15px;
}
/deep/ .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label{
  font-size: 16px;
}
.mint-navbar .mint-tab-item.is-selected::after {
  content: "";
  position: absolute;
  bottom: 0;
  left: 50%;
  margin-left: -10px;
  width: 20px;
  height: 2px;
  background: #0076ff;
}
.mint-navbar .mint-tab-item {
  margin-right: 25px;
}
.mint-navbar .mint-tab-item {
  padding: 13px 0;
}
/deep/.mint-tab-item-label {
  font-size: 16px !important;
  color: #040b1c !important;
}
.reply_box {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 2px rgba(4, 11, 28, 0.06);
  padding-top: 13px;
  box-sizing: border-box;
  z-index: 9999;
}
.reply_box input {
  background: rgba(248, 248, 248, 1);
  border-radius: 4px;
  padding: 0 10px;
  width: 226px;
  height: 34px;
  margin-left: 22px;
  margin-right: 4px;
  font-size: 14px;
  color: #040b1c;
  box-sizing: border-box;
}
.flex_box {
  display: flex;
  align-items: center;
}
.flex_box img {
  width: 24px;
  height: 24px;
}
.flex_box span {
  margin-left: 14px;
}
.flex_box p {
  margin: 0 5px;
}
.support_img {
  position: relative;
  top: -2px;
}
.input_blur input {
  width: 296px;
  margin-left: 16px;
}
.input_blur a {
  color: #0076ff;
  font-size: 16px;
  font-weight: 500;
  margin-left: 10px;
  height: 40px;
  line-height: 40px;
}
.group_back{
  display: inline-block;
  padding: 2px 10px;
  background:rgba(4,11,28,.05);
  border-radius: 17px;
  color: #0076FF;
  font-size: 14px;
  margin-top: 10px;
}
.group_back img{
  width: 6px;
  height: 10px;
  margin-left: 5px;
}
</style>

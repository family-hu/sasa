<template>
    <div>
      <div class="head_bar flex-b">
        <div class="flex_box" @click="backHome">
          <img src="/static/img/bar_back_home@2x.png" alt="">
          <span>{{orgNames}}</span>
        </div>
        <div>
          <!-- <img @click="focusDoc" src="/static/img/bar_ewm@2x.png" alt="">l -->
          <img @click="backMine" src="/static/img/bar_back_mine@2x.png" alt="">
        </div>
      </div>
      <div class="top_box" v-if="groupList">
        <div class="banner_box">
          <img src="/static/img/BJ@2x.png" alt="">
          <div class="center_box">
            <div class="flex-b">
              <img :src="groupImg" alt="">
                <div class="center_txt">
                  <p class="group_name">{{groupList.name}}</p>
                  <p class="group_desp">{{groupList.desc}}</p>
                  <div class="group_num">
                    <span><img src="/static/img/member.png" alt="">{{memNum}}</span>
                    <span><img src="/static/img/topic.png" alt="">{{subjectNum}}</span>
                  </div>
                </div>
            </div>
            <button class="join out" v-if="groupList.isfollow" @click="goIsfollow" href="javascript:void(0);" :disabled="isFav">已加入</button>
            <button class="join on" v-else  href="javascript:void(0);" @click="goIsfollow" :disabled="isFav">+加入</button>
          </div>
        </div>
        <div class="flex_title">
          <mt-navbar v-model="selected">
            <mt-tab-item id="1" @click.native="changeTitle()">话题</mt-tab-item>
            <mt-tab-item id="2" @click.native="changeTitle()">成员</mt-tab-item>
          </mt-navbar>
        </div>
      </div>
      <!-- 发布帖子 -->
      <a v-if="selected == '1'" class="release" href="javascript:void(0);" @click="goReleasePost">
        <img src="/static/img/release@2x.png" alt="">
      </a>
      <mt-tab-container v-model="selected" style="margin-top: 44px;" v-if="groupList">
        <mt-tab-container-item id="1">
          <topic-list :groupid="groupid" v-if="topic"></topic-list>
        </mt-tab-container-item>
        <mt-tab-container-item id="2">
          <member-list :groupid="groupid" v-if="member"></member-list>
        </mt-tab-container-item>
      </mt-tab-container>
      <!-- 关注医生二维码 -->
      <div class="shade" v-if="codeShade" @click="other_hide"> </div>
      <div class="doctorCode" v-if="codeShade">
        <img :src="docCode" alt="">
        <p>长按识别，关注公众号</p>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import TopicList from "./TopicList.vue";
import MemberList from "./MemberList.vue";

export default {
  data() {
    return {
      drId: this.$route.query.docid,
      groupid: this.$route.query.groupid,
      orgId: this.$route.query.orgId,
      orgNames: this.$route.query.orgNames,
      groupList:[],
      selected: "1",
      flag:true,
      isFav:false,
      isfollow: null,
      topic: true,
      member: false,
      codeShade: false,
      docCode: ''
    };
  },
  components: {
    topicList: TopicList,
    memberList: MemberList
  },

  computed: {
    ...mapGetters(["loginData"]),
    //小组头像
    groupImg() {
      if(this.groupList.img) return this.groupList.img;
      return imgMap.groupDoc;
    },
    memNum() {
      if(this.groupList.memNum) return this.groupList.memNum.value;
      return '0';
    },
    subjectNum() {
      if(this.groupList.subjectNum) return this.groupList.subjectNum.value;
      return '0';
    }
  },

  mounted () {
   // setTimeout模拟异步数据
  //  setTimeout(() => {
  //   this.flag = true;
  //   this.groupid = this.groupList.groupid.value;
  //  }, 1000)

    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.groupList);
    }, 1000)
  },
  methods: {
    changeTitle() {
      this.page = '1';
      if(this.selected == '1'){
        this.topic = true;
      }else{
        this.member = true;
      }
    },
    wxShareCallback(data) {
      console.log(data,'data');
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
          title: '推荐你加入' + data.name, // 分享标题
          desc: data.desc, // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: data.img ? data.img : 'http://yun.sinoylb.com/static/img/share@2x.png', // 分享图标
      }
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //加入小组
    goIsfollow() {
      this.isFav = true;
      let type = this.groupList.isfollow ? false : true;
      if(this.isFav){
        let request = {
          groupid: this.groupid,
          userid: this.loginData.userObj.userId.value,
          follow: type
        };
        let vm = this;
        this.$store
          .dispatch("addGroupmem", request)
          .then(data => {
            if (data.rtnCode == '1') {
              this.groupList.isfollow = type;
              if(type == true){
                this.$toast('已加入小组');
              }else{
                this.$toast('已取消加入小组');
              }
            }
            setTimeout(() => {
              this.isFav = false;
            }, 2000)
          })
          .catch(error => {
            this.$toast(error.message);
          });
      }
    },
    //发帖
    goReleasePost() {
      if(this.loginData.userObj.userId.value){
        this.$router.push({
          path: "releasePost",
          query: {
            groupid: this.groupid
          }
        })
      }else{
        this.myUtils.wxLogin();
      }

    },
    //获取小组信息
    requestGroupList() {
      let request = {
        docid: this.docid,
        userid: this.loginData.userObj.userId.value,
        groupId: this.groupid,
      };
      let vm = this;
      this.$store
        .dispatch("bbsgrouplist", request)
        .then(data => {
          if(data){
            this.groupList = data[0];
            this.orgNames = data[0].orgNames;
            this.orgId = data[0].orgId.value;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //返回首页
    backHome() {
      this.$router.push({
        path: "home",
        query: {
          orgId: this.orgId,
          orgNames: this.orgNames
        }
      });
    },
    //返回我的
    backMine() {
      this.$router.push({
        path: "mine",
        query: {
          orgId: this.orgId,
          orgNames: this.orgNames
        }
      });
    },
    //关注医生
    focusDoc() {
      let request = { docid: [this.drId] };
      let vm = this;
      this.$store
        .dispatch("doctorCode", request)
        .then(data => {
          if(data.docList){
            this.codeShade = true;
            vm.docCode = data.docList[0].codeimage;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //点击空白关闭弹出层
    other_hide() {
      this.codeShade = false;
    },
  },

  created() {
    if(this.loginData.userObj.userId.value){
      this.requestGroupList();
    }else{
      this.myUtils.wxLogin();
    }
  }

};
</script>

<style scoped>
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 700;
}
.head_bar{
  width: 100%;
  height: 43px;
  border-bottom: 1px solid #eee;
  padding: 0 11px 0 16px;
  background: #fff;
  position: fixed;
  top: 0;
  z-index: 600;
}
.head_bar img{
  width: 20px;
  height: 20px;
  margin-right: 5px;
}
.head_bar span{
  max-width: 150px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.flex_box{
  display: flex;
  align-items: center;
}
.doctorCode{
  position: fixed;
  top:50%;
  left: 50%;
  margin-left: -85px;
  margin-top: -85px;
  width: 170px;
  height: 170px;
  z-index: 1000;
  text-align:center;
}
.doctorCode img{
  width: 170px;
  height: 170px;
}
.doctorCode p{
  font-size:15px;
  color:#fff;
  margin-top:10px;
}
.top_box{
  position: relative;
  top: 44px;
  width: 100%;
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
  width: 200px;
}
.group_name{
  font-size: 18px;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.group_desp{
  font-size: 14px;
  color:rgba(255,255,255,.8);
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
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
button{
  margin: 0;
  padding: 0;
  border: none;
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
  height: 44px;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
  background: #fff;
}
.mint-navbar {
  width: 30%;
  display: flex;
}
.mint-navbar .mint-tab-item {
  margin: 0 13px;
}
.mint-navbar .mint-tab-item{
  padding: 13px 0
}
/deep/.mint-tab-item-label {
  font-size: 16px !important;
  color: #040B1C !important;
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
</style>

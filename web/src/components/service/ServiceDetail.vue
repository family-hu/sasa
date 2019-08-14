<template>
    <div>
      <div class="flex_title">
        <div class="head_bar flex-b">
          <div class="flex_box" @click="backHome">
            <img src="/static/img/bar_back_home@2x.png" alt="">
            <span>{{orgName}}</span>
          </div>
          <div>
            <!-- <img @click="focusDoc" src="/static/img/bar_ewm@2x.png" alt=""> -->
            <img @click="backMine" src="/static/img/bar_back_mine@2x.png" alt="">
          </div>
        </div>
        <mt-navbar v-model="selected">
          <a href="#overview"><mt-tab-item id="overview">服务概述</mt-tab-item></a>
          <a href="#detail"><mt-tab-item id="detail">服务详情</mt-tab-item></a>
          <a href="#content"><mt-tab-item id="content">服务内容</mt-tab-item></a>
        </mt-navbar>
      </div>
      <div class="main">
        <img class="servImgBg" :src="servImgUrl" alt="">
        <div class="center">
          <div class="box" id="overview">
            <div class="flex-b">
              <p class="title">{{serviceDetail.servName}}</p>
              <span class="price">{{serviceDetail.price}}元</span>
            </div>
            <div class="desp">{{serviceDetail.desp}}</div>
            <div class="tag">
              <span v-for="(tag,index) in tags" :key="index">{{tag}}</span>
            </div>
            <div class="flex-b">
              <p class="name">服务有效期</p>
              <p class="time">{{days}}天</p>
            </div>
            <div class="flex-b">
              <p class="name">适用人群</p>
              <p class="time">{{serviceDetail.ptName }}</p>
            </div>
            <div class="flex-b">
              <p class="name">适用范围</p>
              <p class="time">{{serviceDetail.scopeCustom }}</p>
            </div>
          </div>
          <div class="box" id="detail">
            <h3 class="title middle">服务详情</h3>
            <div class="html_css" v-html="serviceDetail.useProcess">{{serviceDetail.useProcess}}</div>
          </div>
          <div class="box" id="content">
            <h3 class="title middle">服务内容</h3>
            <div>
              <el-collapse  accordion>
                <el-collapse-item :name="index+1" v-for="(item , index) in serviceDetail.servItemList" :key="index">
                  <template slot="title">
                    <!-- <div> -->
                      <em class="list_num">{{index+1}}</em>
                      {{item.servItemName}}
                      <span class="servItemNum">x{{item.servItemNum.value}}</span>
                    <!-- </div> -->
                    <div class="servItemPrice">¥{{item.servItemPrice.value}}/次</div>
                  </template>
                  <div class="collapse_text">{{item.servItemContend}}</div>
                </el-collapse-item>
              </el-collapse>
            </div>
          </div>
          <div class="box">
            <h3 class="title middle">关于医生</h3>
            <div class="doc_box">
              <img :src="docImg" alt="">
              <div>
                <p class="title">{{serviceDetail.acceptName}}</p>
                <p v-if="orgName">{{orgName}}</p>
                <p>{{title}}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="btn_box">
        <a href="javascript:void(0);" class="btn" @click="goBuy">立即购买</a>
      </div>
      <!-- 关注医生二维码 -->
      <div class="shade" v-if="codeShade" @click="other_hide"> </div>
      <div class="doctorCode" v-if="codeShade">
        <img :src="docCode" alt="">
        <p>长按识别，关注公众号</p>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      drId:this.$route.query.drId,
      servId: this.$route.query.servId,
      orgId: this.$route.query.orgId,
      serviceDetail: [],
      selected: "overview",
      codeShade: false,
      docCode: ""
      // activeName: '1'
    };
  },

  computed: {
    servImgUrl() {
      if (this.serviceDetail.servImgUrl) return this.serviceDetail.servImgUrl;
      return imgMap.orgPubImg;
    },
    //医生头像
    docImg() {
      let imgUrl = imgMap.docRectMale;
      if (this.serviceDetail.basUserObj) {
        imgUrl = this.serviceDetail.basUserObj.photoUrl;
      } else {
        if (this.serviceDetail.basUserObj) {
          let gender = this.serviceDetail.basUserObj.gender.value;
          if (gender == "0") {
            imgUrl = imgMap.docRectFeMale;
          }
        }
      }
      return imgUrl;
    },
    orgImg() {
      if (this.serviceDetail.orgObj) return this.serviceDetail.orgObj.photoUrl;
      return imgMap.orgImg;
    },
    title() {
      if (!this.serviceDetail.basUserObj) return "";
      return (
        this.serviceDetail.basUserObj.titlesName +
        " " +
        this.serviceDetail.basUserObj.departmentName
      );
    },
    orgName() {
      if (!this.serviceDetail.orgObj) return "";
      return this.serviceDetail.orgObj.orgNames;
    },
    days() {
      if (!this.serviceDetail.days) return "";
      return this.serviceDetail.days.value;
    },
    //标签分解
    tags() {
      if (this.serviceDetail.tags) {
        let tags = this.serviceDetail.tags.split(",");
        if (tags && tags.length > 3) {
          tags = tags.splice(0, 3);
        }
        return tags;
      }
      return [];
    }
  },
  mounted() {
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.serviceDetail);
    }, 1000);
  },
  methods: {
    //分享
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
        title: data.servName, // 分享标题
        desc: "好友给你推荐了" + data.servName, // 分享描述
        link: shareUrl, // 分享链接
        imgUrl: data.servImgUrl
          ? data.servImgUrl
          : "http://yun.sinoylb.com/static/img/share@2x.png" // 分享图标
      };
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //标签颜色
    tagColor(index) {
      let remain = index % 3;
      if (remain == 0) return "#0076FF";
      if (remain == 1) return "#FF001F";
      return "#00B48C";
    },
    servInfoGet() {
      let vm = this;
      this.$indicator.open();
      let request = { servId: this.servId };
      this.$store
        .dispatch("servInfoGet", request)
        .then(serviceDetail => {
          vm.serviceDetail = serviceDetail;
          document.title = serviceDetail.acceptName ? serviceDetail.acceptName + "的服务包" : "服务包详情";
          this.orgId = serviceDetail.orgObj.orgId.value;
          this.orgNames = serviceDetail.orgObj.orgNames;
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    },

    goBuy() {
      if (this.serviceDetail.servId) {
        this.$router.push({
          path: "serviceSubmitPay",
          query: {
            servId: this.servId,
            acceptUser: this.serviceDetail.acceptId.value,
            orgId: this.serviceDetail.orgObj.orgId.value
          }
        });
      }
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
          if (data.docList) {
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
    }
  },

  created() {
    this.servInfoGet();
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
  z-index: 300;
}
.doctorCode {
  position: fixed;
  top: 50%;
  left: 50%;
  margin-left: -85px;
  margin-top: -85px;
  width: 170px;
  height: 170px;
  z-index: 1000;
  text-align:center;
}
.doctorCode img {
  width: 170px;
  height: 170px;
}
.doctorCode p{
  font-size:15px;
  color:#fff;
  margin-top:10px;
}
.head_bar {
  width: 100%;
  height: 43px;
  border-bottom: 1px solid #eee;
  padding: 0 11px 0 16px;
  background: #fff;
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
.mint-navbar {
  width: 100%;
  display: flex;
}
.flex_title {
  position: fixed;
  top: 0;
  width: 100%;
  z-index: 200;
}
.flex_title a {
  flex: 1;
}
.mint-navbar .mint-tab-item {
  padding: 14px 0;
}
/deep/ .mint-navbar .mint-tab-item.is-selected .mint-tab-item-label {
  color: #0076ff;
  font-weight: 500;
}
/deep/ .mint-navbar .mint-tab-item.is-selected {
  border: none;
}
/deep/ .mint-tab-item-label {
  font-size: 16px !important;
  color: rgba(4, 11, 28, 0.67);
}
.main {
  margin-top: 42px;
}
.servImgBg {
  width: 100%;
  height: 137px;
}
.center {
  position: absolute;
  top: 120px;
  padding: 32px 16px 60px;
  width: 100%;
  box-sizing: border-box;
}
.box {
  background: #fff;
  padding: 16px;
  box-shadow: 0px 0px 7px 1px rgba(4, 11, 28, 0.06);
  border-radius: 4px;
  margin-bottom: 10px;
}
.title {
  font-size: 18px;
  color: #040b1c;
  font-weight: 600;
}
.middle {
  text-align: center;
  margin-bottom: 10px;
}
.price {
  font-size: 16px;
  color: #ff0000;
}
.desp {
  font-size: 14px;
  color: #040b1c;
  opacity: 0.5;
}
.tag {
  margin-top: 5px;
}
.tag span {
  display: inline-block;
  color: #0076ff;
  border: 1px solid rgba(0, 118, 255, 0.5);
  padding: 0 5px;
  font-size: 10px;
  border-radius: 12px;
  margin-bottom: 10px;
  margin-right: 5px;
}
.name {
  font-size: 14px;
  color: #040b1c;
  opacity: 0.5;
}
.time {
  color: #040b1c;
  font-size: 14px;
}
.html_css {
  text-align: justify;
}
.html_css img {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto;
}
.el-collapse {
  border: none;
}
.collapse_text {
  color: rgba(4, 11, 28, 0.5);
}
/deep/ .el-collapse-item__content {
  padding-bottom: 16px !important;
}
/* /deep/ .el-collapse-item__wrap,.el-collapse-item__header{
    border-bottom: none !important;
  } */
.list_num {
  width: 18px;
  height: 18px;
  background: #0076ff;
  border-radius: 50%;
  color: #fff;
  font-size: 14px;
  font-weight: 600;
  margin-right: 10px;
  line-height: 18px;
  text-align: center;
  padding-right: 3px;
  box-sizing: border-box;
}
.servItemNum {
  font-size: 16px;
  color: #0076ff;
  margin-left: 5px;
}
.doc_box {
  display: flex;
}
.doc_box img {
  width: 63px;
  height: 63px;
  margin-right: 10px;
}
.btn_box {
  position: fixed;
  bottom: 0px;
  width: 100%;
  padding: 10px 16px;
  box-sizing: border-box;
  background: #fff;
  box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
}
.btn_box .btn {
  display: block;
  text-align: center;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  border-radius: 20px;
  background: #0076ff;
  font-size: 16px;
  font-weight: 600;
}
.servItemPrice {
  position: absolute;
  right: 55px;
  color: rgba(4, 11, 28, 0.5);
  font-size: 14px;
}
</style>

<template>
  <div>
    <div class="imageWrapper">
      <img class="real_pic" :src="dataURL"/>
      <slot>
         <div class="bg_box" id="imageWrapper" v-if="imageWrapper">
          <div class="center_box" ref="center">
            <img class="doc_img" :src="docImg"  alt="">
            <div class="text_box">
              <div class="item_box">
                <div class="doc_name">{{doctorName}}<span class="doc_title">{{doctorTitle}}</span></div>
                <div class="doc_title">{{deptName}}</div>
                <div class="doc_desp">{{diseaseList}}</div>
              </div>
              <div class="dovline">
                <div class="line"></div>
              </div>
              <div class="bottom_box flex-b">
                <div class="flex_left">
                  <img :src="headImg" alt="">
                  <div>
                    <p class="user_name">{{userName}}<span>给您推荐一位名医</span></p>
                    <p class="txt">长按识别二维码</p>
                  </div>
                </div>
                <div class="code"><img :src="docCode" alt=""></div>
              </div>
            </div>
          </div>
        </div>
      </slot>
    </div>

    <div class="bottom_btn" @click="share">
      长按上面图片保存，分享给朋友，<span>更多分享方式</span>
      <img src="../../../static/img/more@2x.png" alt="">
    </div>
    <!-- 底部弹窗 -->
    <div class="shade" v-if="show" @click="other_hide"></div>
    <div class="dialog_box" :class=" show ? 'dialog-fade-in' : 'dialog-fade-out'">
      <h3>分享方式</h3>
      <div class="flex_item">
        <span class="title tit_w">方法一</span>
        <span>
          <div class="flex_box">
            <p class="title">微信内直接分享</p>
            <div class="desp_txt">点击微信右上角三个点“…”</div>
            <div class="desp_txt">通过【发送给朋友】【分享到朋友圈】分享</div>
          </div>
        </span>
      </div>
      <div class="flex_item">
        <span class="title tit_w">方式二</span>
        <span>
          <div class="flex_box">
            <div style="display:flex">
              <span class="title">复制以下链接，转发该医生</span>
              <button class="copyBtn" :data-clipboard-text = "shareDoc" type="text">复制地址</button>
            </div>
            <div class="desp_txt">http://yun.sinoylb.com/doctorD...</div>
          </div>
        </span>
      </div>
      <div class="doc_Btn" @click="shareDoctorDetail">医生主页</div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Clipboard from 'clipboard';
import html2canvas from 'html2canvas';
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      drId: this.$route.query.drId,
      dataURL: '',
      doctorDetail: [],
      shareDoc: window.location.href.split("#")[0],
      docCode: '',
      show: false,
      imageWrapper: true
    };
  },
  components: {},
  computed: {
    ...mapGetters(["loginData"]),
    headImg() {
      let img;
      let userObj = this.loginData.userObj;
      if (userObj.photoUrl) {
        img = userObj.photoUrl;
      } else {
        img = imgMap.defaultAva;
      }
      return img;
    },
    userName() {
      let name;
      let userObj = this.loginData.userObj;
      if (userObj.userName) {
        name = userObj.userName;
      } else {
        name = userObj.nickName;
      }
      return name;
    },
    doctorName() {
      if (this.doctorDetail.userName) return this.doctorDetail.userName;
      if (this.doctorDetail.nickName) return this.doctorDetail.nickName;
      return "";
    },
    deptName() {
      if (!this.doctorDetail.userId) return "";
      let title = this.doctorDetail.orgNames;
      let departmentName = this.doctorDetail.departmentName;
      if (departmentName) {
        title += "       " + departmentName;
      }
      return title;
    },
    //医生标签
    doctorTitle() {
      if (!this.doctorDetail.userId) return "";
      let title = this.doctorDetail.titlesName;;
      let officeTypeName = this.doctorDetail.officeTypeName;
      if (officeTypeName && officeTypeName == "无级别") officeTypeName = "";
      if (officeTypeName) {
        title += " | " + officeTypeName;
      }
      return title;
    },
    //擅长疾病
    diseaseList() {
      if (this.doctorDetail.despSkill) return this.doctorDetail.despSkill;
      return '';
    },
    //医生头像
    docImg() {
      let imgUrl = '';
      if (this.doctorDetail.photoUrl) {
        imgUrl = this.doctorDetail.photoUrl;
      } else {
        if (this.doctorDetail.gender) {
          let gender = this.doctorDetail.gender.value;
          if (gender == "0") {
            imgUrl = imgMap.docRectFeMale;
          } else {
            imgUrl = imgMap.docRectMale;
          }
        }else{
          imgUrl = imgMap.docRectMale
        }
      }
      return imgUrl;
    }
  },
  mounted() {
    //分享医生
    this.shareDoc = 'http://yun.sinoylb.com/doctorDetail?userId=' + this.drId;
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.doctorDetail);
    }, 1000);
    setTimeout(() => {
      //页面生成图片
      this.toImage();
    }, 1000);

  },
  //加载前获取当前URL，解决iOS重定向路由
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (!window.localStorage.getItem("isReload")) {
        window.localStorage.setItem("isReload", window.location.href);
        // 微信分享需要重新设置URL
        window.location.href = window.location.href;
      }
    });
  },
  methods: {
    toImage() {
      let imageWrapper =  document.getElementById("imageWrapper");
        html2canvas(imageWrapper,{
            backgroundColor: null,
            useCORS: true, //开启跨域配置
            allowTaint: true,//允许跨域图片
        }).then((canvas) => {
            let dataURL = canvas.toDataURL('image/jpeg', 1.0);
            this.dataURL = dataURL;
        });
    },
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
        title: data.userName + "  " + data.departmentName, // 分享标题
        desc: data.despSkill ? data.despSkill : "好友给你推荐了一位名医", // 分享描述
        link: shareUrl, // 分享链接
        imgUrl: data.photoUrl
          ? data.photoUrl
          : "http://yun.sinoylb.com/static/img/share@2x.png" // 分享图标 医生头像
      };
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },

    //点击空白关闭弹出层
    other_hide() {
      this.show = false;
    },
    //显示底部弹窗
    showDetail() {
      this.show = true;
    },

    //分享
    share() {
      this.show = true
    },
    shareDoctorDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          userId: this.drId
        }
      });
    },
    //获取医生详情
    expertDetail() {
      let request = { userIds: [this.drId] };
      let vm = this;
      this.$store
        .dispatch("expertDetailGet", request)
        .then(doctorList => {
          if (doctorList && doctorList.length > 0) {
            vm.doctorDetail = doctorList[0];
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //获取医生二维码
    getDoctorCode() {
      let request = { docid: [this.drId] };
      let vm = this;
      this.$store
        .dispatch("doctorCode", request)
        .then(data => {
          if(data.docList){
            vm.docCode = data.docList[0].codeimage;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },

  created() {
    if (!this.loginData.tid) {
      this.myUtils.wxLogin();
    }else{
      this.expertDetail();
      this.getDoctorCode();
    }
    //初始化复制
    let clipboard = new Clipboard('.copyBtn');

    setTimeout(() => {
      //隐藏html页面
      this.imageWrapper = false;
    }, 2500);
  }
};
</script>

<style scoped>
@keyframes dialog-fade-in {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 1;
  }
}

@keyframes dialog-fade-out {
  0% {
    opacity: 1;
  }
  100% {
    opacity: 0;
  }
}
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
  opacity: 0;
}
.dialog_box {
  width: 100%;
  height: auto;
  background: #fff;
  position: fixed;
  bottom: 0;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 300;
  opacity: 0;
}
.dialog-fade-in {
  display: block;
  animation: dialog-fade-in 0.5s;
  animation-fill-mode: forwards;
}
.dialog-fade-out {
  display: none;
  animation: dialog-fade-out 0.5s;
  animation-fill-mode: forwards;
}
.bg_box {
  position: fixed;
  width: 100%;
  height: 100%;
  top: 0;
  bottom: 0;
  background: rgb(48, 56, 78);
  padding: 8% 8% 70px 8%;
}
.center_box {
  width: 100%;
  height: 100%;
  background: #fff;
  box-shadow: 0px 0px 7px 3px rgba(4, 11, 28, 0.03);
}
.doc_img {
  width: 100%;
  height: 55%;
}
.text_box {
  padding: 5px 15px 0 15px;
  position: relative;
  width: 100%;
  height: 45%;
  box-sizing: border-box;
}
.dovline {
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 1px;
}
.dovline .line {
  background: rgba(4, 11, 28, 0.1);
  margin: 0 15px;
}
.dovline::after {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(48, 56, 78);
  position: absolute;
  right: -10px;
  top: -10px;
}
.dovline::before {
  content: "";
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: rgb(48, 56, 78);
  position: absolute;
  left: -10px;
  top: -10px;
}
.item_box div {
  margin-bottom: 4px;
}
.doc_name {
  font-size: 19px;
  font-weight: 600;
  color: #040b1c;
}
.doc_name span {
  margin-left: 5px;
}
.doc_title {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.75);
}
.doc_desp{
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
  max-height: 38px;
  overflow: hidden;
  /* word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden; */
}
.bottom_box{
  position: absolute;
  bottom: 10%;
  width: 90%;
}
.bottom_box img{
  width: 40px;
  height: 40px;
  margin-right: 10px;
}
.flex_left{
  display: flex;
  align-items: center;
}
.user_name{
  font-size: 13px;
  color: #040B1C;
  font-weight: 500
}
.user_name span{
  font-weight: 400;
  color:rgba(4,11,28,.75);
  margin-left: 5px;
}
.txt{
  color:rgba(4,11,28,.5);
  font-size: 13px;
}
.code{
  width: 60px;
  height: 60px;
}
.code img{
  width: 60px;
  height: 60px;
}
.bottom_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  line-height: 56px;
  background: #0076ff;
  color: #fff;
  font-size: 15px;
  text-align: center;
}
.bottom_btn span{
  font-weight: 500;
}
.bottom_btn img{
  width: 7px;
  height: 11px;
}
.dialog_box{
  padding: 30px 16px 70px;
}
.dialog_box h3{
  font-weight: 600;
  font-size: 17px;
  color: #040B1C;
  width: 100%;
  text-align: center;
  margin-bottom: 25px;
}
.flex_item{
  display: flex;
  margin-bottom: 20px;
}
.flex_box{
  margin-left: 14px;
}
.flex_item .title{
  font-weight: 500;
  font-size: 16px;
  color: #040B1C;
}
.flex_item .tit_w{
  width: 15%
}
.flex_box .desp_txt{
  font-size: 15px;
  color:rgba(4,11,28,.5);
  margin-top: 5px;
}
.text_d{
  padding-right: 50px;
  word-break: break-all;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;
  overflow: hidden;
}
.copyBtn{
  width: 68px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  border-radius: 15px;
  color: #fff;
  font-size: 12px;
  border: 1px solid #0076FF;
  color: #0076FF;
  background: #fff;
  margin-left: 10px;
}
.doc_Btn{
  position: absolute;
  bottom: 20px;
  left: 50%;
  margin-left:-125px;
  width: 250px;
  height: 44px;
  line-height: 44px;
  text-align: center;
  border-radius: 22px;
  color: #fff;
  font-size: 16px;
  font-weight: 600;
  background: #0076FF;
}
.real_pic{
  width: 100%;
  height: 100%;
}
</style>

<template>
  <div>
    <div style="padding-bottom:50px;positon:relative">
      <div class="head_bar flex-b">
        <div class="flex_box" @click="backHome">
          <img src="/static/img/bar_back_home@2x.png" alt="">
          <span>{{doctorDetail.orgNames}}</span>
        </div>
        <div>
          <!-- <img @click="focusDoc" src="/static/img/bar_ewm@2x.png" alt=""> -->
          <img @click="backMine" src="/static/img/bar_back_mine@2x.png" alt="">
        </div>
      </div>
      <div class="placeholder_div"></div>
      <!-- 公告 -->
      <div class="advertising" v-if="doctorDetail.notice">
        <img :src="noticeImg"/>
        <!-- <marquee direction=left behavior=scroll scrollamount=10 ><em>{{ doctorDetail.notice }}</em></marquee> -->
        <span class="notice">{{ doctorDetail.notice }}</span>
      </div>
      <!-- 医生详情 -->
      <div class="doctor_box">
        <div class="bg_img">
          <img  :src="docImg" alt="">
          <p class="shade_bg"></p>
        </div>
        <div class="detail_box">
          <div class="doc_item1">
            <div style="padding-top:17px">
              <div class="doctor_name">{{doctorDetail.userName}}<img src="/static/img/tag@2x.png" alt=""></div>
              <p class="doc_title">{{doctorDetail.departmentName}}  {{doctorDetail.titlesName}}</p>
            </div>
            <div class="doc_head"><img :src="docImg" alt=""></div>
          </div>
          <div class="doc_title doc_txt" v-if="doctorDetail.despSkill">擅长：{{doctorDetail.despSkill}}</div>
          <div class="doc_item2 flex-b">
            <div class="item_box">
              <!-- <p style="margin-right:10px"><em>12</em>年从业</p> -->
              <p class="score">
                <em>{{docScore}}</em>
                <el-rate v-model="docScore" disabled text-color="#ff9900"  allow-half></el-rate>
              </p>

            </div>
            <div class="doc_detail" @click="docSynopsis">医生简介 &gt;</div>
          </div>
        </div>
      </div>
      <!-- 服务内容 -->
      <div class="server_box">
        <div class="headerText">服务内容</div>
        <ul>
          <li @click="showDetail" v-if="isTalk">
            <img src="/static/img/pic@2x.png" alt="">
            <div class="item_right">
              <div class="flex-b">
                <p class="both_txt">图文问诊</p>
                <p class="timer"><span>{{talkPrice}}</span>元/次</p>
              </div>
              <p>使用图文、语音与医生沟通</p>
            </div>
          </li>
          <!-- <li>
            <img src="/static/img/phone@2x.png" alt="">
            <div class="item_right">
              <div class="flex-b">
                <p class="both_txt">电话问诊</p>
                <p class="timer"><span>128</span>元/次</p>
              </div>
              <p>预约时间与医生进行电话问诊</p>
            </div>
          </li> -->
          <li v-if="isSubscribe" @click="goAppoint">
            <img src="/static/img/face@2x.png" alt="">
            <div class="item_right">
              <div class="flex-b">
                <p class="both_txt">面诊预约</p>
                <p class="timer">立即预约</p>
              </div>
              <p>预约时间与医生进行面对面沟通</p>
            </div>
          </li>
          <li @click="goReport">
            <img src="/static/img/report.png" alt="">
            <div class="item_right">
              <div class="flex-b">
                <p class="both_txt">诊后报到</p>
                <p class="timer">免费报到</p>
              </div>
              <p>关注病情变化</p>
            </div>
          </li>
        </ul>
        <!-- <div class="more_server">更多服务<img src="/static/img/updown.png" alt=""></div> -->
      </div>
      <!-- 小组 -->
      <div class="team_box" v-if="groupList.length > 0">
        <div class="headerText">他的小组</div>
        <ul>
          <li @click="goDetail(item)" v-for="(item,index) in groupList" :key="index">
            <img :src="item.img" width="60px" alt="">
            <div style="width:240px">
              <p class="team_name">{{item.name}}</p>
              <p class="team_text">{{item.desc}}</p>
              <div class="record_box">
                <p><img src="/static/img/member@2x.png" alt="">{{item.memNum.value}}</p>
                <p><img src="/static/img/topic@2x.png" alt="">{{item.subjectNum.value}}</p>
              </div>
            </div>
          </li>
        </ul>
      </div>
      <!-- 擅长服务 -->
      <div class="team_box" v-if="isService">
        <div class="flex-b">
          <div class="headerText">擅长服务</div>
          <a v-if="listLen > 2" href="javascript:void(0);" @click="scanAll" class="more">更多<img src="/static/img/more.png" alt=""></a>
        </div>
         <service-item v-for="(item,index) in serviceList" :key="index" :serviceItem="item" @click.native="toDetail(item)" ></service-item>
      </div>
      <!-- 评价 -->
      <div class="team_box">
        <div class="flex-b">
          <div class="headerText">患者评价<span>({{total}})</span></div>
          <div class="goods">好评率{{avgScore}}%</div>
        </div>
        <div v-if="evaList.length > 0">
          <!-- <div class="eva_title">
            <span v-for="(item,index) in evaTag" :key="index" v-on:click="addClass(index,$event)" v-bind:class="{ on:index==current}">{{item.name}}<em>{{item.num}}</em></span>
          </div> -->
          <eva-item v-for="item in evaList" :key="item.evaId.value" :evaItem="item" ></eva-item>
          <div class="more" style="text-align: center;padding-bottom:10px" @click="toEvaList">更多评价<img src="/static/img/more.png" alt=""></div>
        </div>
        <div v-else>
          <p class="no_evaList">暂时还没有用户评价</p>
          <!-- <p class="no_evaList">暂时还没有用户评价，快来分享<br/>你的线下就医经历，<a href="javascript:void(0);" @click="goAddComments">发布评价&gt;</a></p> -->
        </div>
      </div>
      <div class="bottom_box">
        <h3>严格质控 双重审核</h3>
        <p>医联邦长期合作医院 医联邦审核推荐医生</p>
      </div>
    </div>
    <!-- 咨询悬浮按钮 -->
    <a v-if="toChatStatus" @click="toChatHelper" href="javascript:void(0);" class="flex_btn">咨询<br/>医助</a>
    <img class="star" :src="focusImg" @click="focusChange" v-if="false">
    <img class="share" :src="shareImg" @click="share" v-if="false"/>
    <!-- 底部咨询按钮 -->
    <div class="bottom_talk">
      <div class="bottom_left">
        <div class="item_talk" @click="share">
          <img :src="shareImg" alt="">
          <p>分享</p>
        </div>
        <div class="item_talk" @click="focusChange">
          <img :src="focusImg" alt="">
          <p>关注</p>
        </div>
      </div>
      <a v-if="isTalk" href="javascript:void(0);" class="btn1" @click="showDetail" >向{{doctorDetail.userName}}医生问诊</a>
      <a v-else href="javascript:void(0);" class="btn1 btn2">向{{doctorDetail.userName}}医生问诊</a>
    </div>
    <!-- 图文问诊，底部弹出框 -->
    <div class="shade" v-if="show || codeShade" @click="other_hide"></div>
    <div class="dialog_box" :class=" show ? 'dialog-fade-in' : 'dialog-fade-out'">
      <a class="close_btn" href="javascript:void(0);" @click="other_hide">X</a>
      <div class="names">{{doctorDetail.userName}} <span>{{doctorDetail.titlesName}}</span></div>
      <div class="type_title"><img src="/static/img/tip@2x.png" alt="">已选择图文咨询</div>
      <div class="choose_title">选择服务类型</div>
      <div class="flex_class">
        <div class="on">
          <p class="type_name">图文咨询</p>
          <p class="type_price">{{talkPrice}}元/次</p>
        </div>
        <!-- <div>
          <p class="type_name">电话咨询</p>
          <p class="type_price">50元/5分钟起</p>
        </div>
        <div>
          <p class="type_name">视频咨询</p>
          <p class="type_price">50元/5分钟起</p>
        </div>-->
      </div>
      <p class="txt">图文咨询医生会在24小时内回复您</p>
      <div class="ok_btn" :class=" show ? '' : 'hide'">
        <a href="javascript:void(0);" @click="goPay">确定</a>
      </div>
    </div>
    <!-- 关注医生二维码 -->
    <div class="doctorCode" v-if="codeShade">
      <img :src="docCode" alt="">
      <p>长按识别，关注公众号</p>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as type from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";
import ServiceItem from "../service/ServiceItem.vue";
import EvaItem from "./EvaItem.vue";
export default {
  data() {
    return {
      doctorDetail: {},
      serviceList: [],
      serviceItemList: [],
      evaList: [],
      groupList: [],
      drId: this.$route.query.userId,
      helperId: '',
      groupId: '',
      total: 0,
      avgScore: "100",
      current: 0,
      evaTag: [
        { name: "全部", num: "108" },
        { name: "学识渊博", num: "20" },
        { name: "妙手仁心，值得推荐", num: "14" },
        { name: "态度很好", num: "12" },
        { name: "回复及时", num: "8" }
      ],
      docScore: 5,
      show: false,
      listLen:'0',
      toChatStatus: false,
      talkList: [],
      isTalk: false,
      isSubscribe: false,
      isVoice: false,
      isVideo: false,
      isService: false,
      docCode: '',
      codeShade: false,
    };
  },
  components: {
    serviceItem: ServiceItem,
    evaItem: EvaItem
  },
  computed: {
    ...mapGetters(["loginData"]),
    talkPrice() {
      if(this.talkList.price){
        return this.talkList.price.value
      }else{
        return '0'
      }
    },
    doctorName() {
      if (this.doctorDetail.userName) return this.doctorDetail.userName;
      if (this.doctorDetail.nickName) return this.doctorDetail.nickName;
      return "";
    },
    deptName() {
      if (!this.doctorDetail.userId) return "";
      if (this.doctorDetail.department.value == type.COUNTRY_ALL_DEPART) {
        //乡村全科
        if (this.doctorDetail.deptDesp) {
          return this.doctorDetail.deptDesp;
        } else {
          if (this.doctorDetail.departmentName) {
            return this.doctorDetail.departmentName;
          }
        }
      } else {
        if (this.doctorDetail.departmentName) {
          return this.doctorDetail.departmentName;
        }
      }
      return "";
    },
    //医生标签
    doctorTitle() {
      if (!this.doctorDetail.userId) return "";
      let title = this.doctorDetail.orgNames;
      let officeTypeName = this.doctorDetail.officeTypeName;
      if (officeTypeName && officeTypeName == "无级别") officeTypeName = "";
      if (officeTypeName) {
        title += " | " + officeTypeName;
      }
      return title;
    },
    //医生简介
    despPerson() {
      if (this.doctorDetail.despPerson) return this.doctorDetail.despPerson;
      return "无";
    },
    //收藏图片
    focusImg() {
      if (this.isFocus) return imgMap.focusLookImg;
      return imgMap.unfocusLookImg;
    },
    //分享图片
    shareImg() {
      return imgMap.shareImg;
    },
    //擅长疾病
    diseaseList() {
      return this.doctorDetail.diseaseList;
    },
    //医生头像
    docImg() {
      let imgUrl = imgMap.docRectMale;
      if (this.doctorDetail.photoUrl) {
        imgUrl = this.doctorDetail.photoUrl;
      } else {
        if (this.doctorDetail.gender) {
          let gender = this.doctorDetail.gender.value;
          if (gender == "0") {
            imgUrl = imgMap.docRectFeMale;
          }
        }
      }
      return imgUrl;
    },
    groupImg() {
      if (this.groupList.img) return this.groupList.img;
      // return imgMap.unfocusLookImg;
    },
    //公告图片
    noticeImg() {
      return imgMap.notice;
    },
    //是否收藏
    isFocus() {
      if (this.doctorDetail.isFav) {
        if (this.doctorDetail.isFav.value == "1") return true;
      }
      return false;
    }
  },
  mounted() {
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.doctorDetail);
    }, 1000)

  },
  //加载前获取当前URL，解决iOS重定向路由
  beforeRouteEnter (to, from , next) {
    console.log('beforeRouteEnter');
    next( vm => {
      if (!window.localStorage.getItem( 'isReload' )) {
        window.localStorage.setItem( 'isReload' , window.location.href)
        // 微信分享需要重新设置URL
        window.location.href = window.location.href
      }
    })
  },
  methods: {
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
          title: data.userName +'  '+ data.departmentName, // 分享标题
          desc: data.despSkill ? data.despSkill : '好友给你推荐了一位名医', // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: data.photoUrl ? data.photoUrl : 'http://yun.sinoylb.com/static/img/share@2x.png', // 分享图标 医生头像
      }
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //返回首页
    backHome() {
      this.$router.push({
        path: "home",
        query: {
          orgId: this.doctorDetail.orgId.value,
          orgNames: this.doctorDetail.orgNames
        }
      });
    },
    //返回我的
    backMine() {
      this.$router.push({
        path: "mine",
        query: {
          orgId: this.doctorDetail.orgId.value,
          orgNames: this.doctorDetail.orgNames
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
    //小组详情
    goDetail(item) {
      this.$router.push({
        path: "groupDetail",
        query: {
          docid: this.drId,
          groupid: item.groupid.value,
          orgId: this.doctorDetail.orgId.value,
          orgNames: this.doctorDetail.orgNames
        }
      });
    },
    //服务列表
    // getServiceList(orgId) {
    //   if (this.loginData.tid) {
    //     let request = {
    //       orgId: orgId,
    //       userId: this.loginData.userObj.userId.value,
    //       goodsType: 0,
    //     };
    //     this.$store
    //       .dispatch("serviceList", request)
    //       .then(data => {
    //         if(data){
    //           this.serviceItemList = data;
    //         }
    //       })
    //       .catch(e => {
    //         this.$toast(e.message);
    //       });
    //   } else {
    //     this.myUtils.wxLogin();
    //   }
    // },
    //去支付
    goPay() {
      this.show = false;
      this.$router.push({
        path: "chatSubmitPay",
        query: {
          drId: this.drId,
          snapId:this.talkList.snapId.value,
          price: this.talkList.price.value,
          orgId: this.doctorDetail.orgId.value,
          type: '图文咨询',
          docName: this.doctorName
        }
      });
    },
    //创建订单
    getShopOrderCreate() {
      const request = {
        compId: this.serviceCompanyId
          ? this.serviceCompanyId
          : localStorage.getItem("serviceCompanyId"),
        orderType: "2000107", //医疗服务
        userId: this.$store.getters.loginData.userObj.userId.value,
        orgId: localStorage.getItem("orgId") // '1007057917653852160'
      };
      this.$store
        .dispatch("shopOrderCreate", request)
        .then(data => {
          if (data) {
            this.orderId = data.data.orderId.value;
            if (!this.msgList) {
              this.getUserMsgSave(); //保持用户信息
              return false;
            } else if (this.orderId) {
              //订单创建成功返回的ID
              this.$router.push({
                path: "shopPayList",
                query: {
                  userName: this.userName,
                  // gender : this.radio,
                  // mobile : this.phone,
                  // cardNo : this.cardNo,
                  orderId: this.orderId,
                  totalPrice: this.totalPrice
                }
              });
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //去评价
    goAddComments() {
      // this.$router.push({
      //   path: "consultationCommentAdd",
      //   query: { }
      // });
    },
    //点击空白关闭弹出层
    other_hide() {
      this.show = false;
      this.codeShade = false;
    },
    //显示底部弹窗
    showDetail() {
      this.show = true;
    },
    //医生简介
    docSynopsis() {
      this.$router.push({
        path: "doctorSynopsis",
        query: { drId: this.drId }
      });
    },
    //评论title切换
    addClass: function(index, event) {
      this.current = index;
    },
    //分享
    share() {
      this.$router.push({
        path: "shareDoctor",
        query: { drId: this.drId }
      });
      // window.location.href = "http://smanager.sinoylb.com/m/doc_code2.aspx?docid=" + this.drId + "&userid=" + this.loginData.userObj.userId.value;
    },
    //服务包详情
    toDetail(serviceDetail) {
      this.$router.push({
        path: "serviceDetail",
        query: {
          servId: serviceDetail.servId.value,
          orgId: this.doctorDetail.orgId.value,
          orgNames: this.doctorDetail.orgNames,
          drId: this.drId
        }
      });
    },

    //关注
    focusChange() {
      if (this.loginData.tid) {
        //已登录
        let status = this.isFocus ? 0 : 1;
        let request = {
          busiId: this.drId,
          busiType: 1000100105,
          opTable: 1,
          opType: 1014102,
          status: status
        };
        this.$store
          .dispatch("busiLog", request)
          .then(data => {
            if(data.rtnCode == '1'){
              this.doctorDetail.isFav.value = status;
            }
          })
          .catch(e => {
            this.$toast(e.message);
          });
      } else {
        this.myUtils.wxLogin();
      }
    },

    //面诊预约
    goAppoint() {
      this.$router.push({
        path: "doctorAppoint",
        query: { userId: this.$route.query.userId }
      });
    },
    //诊后报到
    goReport() {
      if (this.loginData.tid && this.doctorDetail.userId) {
        //已登录
        this.$indicator.open();
        let request = { drId: this.drId };
        this.$store
          .dispatch("perRegistAdd", request)
          .then(data => {
            this.$router.push({
              path: "report",
              query: {
                docName: this.doctorName,
                drId: this.drId,
                orgId: this.doctorDetail.orgId.value
              }
            });
          })
          .catch(e => {
            this.$toast(e.message);
          })
          .finally(() => {
            this.$indicator.close();
          });
      } else {
        this.myUtils.wxLogin();
      }
    },
    //咨询医助
    getImhelper() {
      let request = {
        docId: this.drId
      };
      this.$store.dispatch("imhelper", request).then(data => {
        this.helperId = data.helperId.value;//助理ID
        if(this.helperId != '' && this.helperId != null && this.helperId != undefined){
          this.imHelperOpen();
        }
        if(data.status == '0'){
          this.toChatStatus = true
        }else{
          this.toChatStatus = false
        }
      }).catch(e => {
        this.$toast(e.message);
      })
    },
    //医患开启助手群聊
    imHelperOpen() {
      let request = {
        docId: this.drId,
        userId: this.loginData.userObj.userId.value,
        helperId: this.helperId
      };
      this.$store
        .dispatch("imHelperOpen", request)
        .then(data => {
          if (data.groupId) {
            this.groupId = data.groupId.value; //群组ID
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //问诊
    toChat() {
      this.$router.push({
        path: "chat",
        query: {
          docId: this.drId,
          drName: this.doctorName,
          friendHeadUrl: this.doctorDetail.photoUrl,
          gender: this.doctorDetail.gender.value
        }
      });
    },
    //问诊-医生助理
    toChatHelper() {
      this.$router.push({
        path: "chat",
        query: {
          docId: this.drId,
          drName: this.doctorName,
          friendHeadUrl: this.doctorDetail.photoUrl,
          gender: this.doctorDetail.gender.value,
          groupId: this.groupId
        }
      });
    },
    //定制服务-服务包
    scanAll() {
      // if (!this.doctorDetail.isServPage) return;
      this.$router.push({
        path: "serviceList",
        query: { acceptId: this.drId }
      });
    },
    //更多评价
    toEvaList() {
      this.$router.push({ path: "evaList", query: { drId: this.drId } });
    },
    //评价列表
    getEvaList() {
      let evaRequest = {
        busiId: 0,
        busiType: 1000106105,
        userTo: this.drId,
        pageNum: 1,
        pageSize: 1
      };
      let vm = this;
      this.$store
        .dispatch("evaList", evaRequest)
        .then(data => {
          vm.evaList = data.evaList;
          vm.total = data.total;
          vm.docScore = data.avgScore == 0 ? 5 : Number(data.avgScore);
          if (data.avgScore == "0") {
            vm.avgScore = "100";
            return false;
          } else {
            vm.avgScore = Number.isInteger((data.avgScore / 5) * 100)
              ? (data.avgScore / 5) * 100
              : ((data.avgScore / 5) * 100).toFixed(2);
          }
        })
        .catch(error => {
          this.$toast(error.message);
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
            //title
            document.title = doctorList[0].userName + doctorList[0].titlesName;
            let serviceStatus = doctorList[0].servList;
            if(serviceStatus){
              for(let i = 0; i < serviceStatus.length; i++){
                let type = serviceStatus[i].type.value
                switch (type) {
                  case "2000104":
                    //图文咨询
                    this.isTalk = true;
                    this.talkList = serviceStatus[i];
                    break;
                  case "2000109":
                    //视频咨询
                    this.isVideo = true;
                    break;
                  case "2000108":
                    //语言咨询
                    this.isVoice = true;
                  case "1000112":
                    //个性化服务-服务包
                    this.isService = true;
                    break;
                  case "1000113":
                    //在线预约
                    this.isSubscribe = true;
                    break;
                  default:
                    break;
                }
              }
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //获取医生小组
    requestGroupList() {
      if(this.loginData.tid){
        let request = {
          userid: this.loginData.userObj.userId.value,
          docid: this.drId,
        }
        let vm = this;
        this.$store
          .dispatch("bbsgrouplist", request)
          .then(data => {
            if(data){
              this.groupList = data
            }
        })
        .catch(error => {
          this.$toast(error.message);
        })
      }else{
        this.myUtils.wxLogin();
      }

    },
    //获取服务包列表
    requestServiceList() {
      let serviceListRequest = {
        acceptId: this.drId,
        ishowDraft: 0,
        orgId: 0,
        pageNum: 1,
        pageSize: 10
      };
      let vm = this;
      this.$store
        .dispatch("servInfoList", serviceListRequest)
        .then(serviceList => {
          vm.listLen = serviceList.length;
          if(serviceList.length <= 2){
            for(let i = 0; i < serviceList.length; i++){
              vm.serviceList.push(serviceList[i])
            }
          }else{
            for(let i = 0; i < 2; i++){
              vm.serviceList.push(serviceList[i])
            }
          }

        })
        .catch(error => {
          this.$toast(error.message);
        });
    },

  },

  created() {
    this.getEvaList();
    this.expertDetail();
    this.requestServiceList();
    this.requestGroupList();
    this.getImhelper();
  }


};
</script>

<style scoped>
/deep/ .el-rate{
  height: 14px;
}
/deep/ .el-rate__icon{
  font-size: 14px
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
.placeholder_div{
  width: 100%;
  height: 44px;
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
.hide{
  display: none;
}
.doctor_box {
  width: 100%;
  height: 160px;
  position: relative;
  margin-bottom: 6px;
}
.doctor_box .bg_img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 160px;
  text-align: center;
  z-index: 1;
}
.doctor_box .bg_img img{
  width: 100%;
  height: 160px;
  filter: blur(28px);
}
.shade_bg{
  position: absolute;
  top:0;
  bottom: 0;
  width: 100%;
  height: 160px;
  background: rgba(0, 0, 0, 0.5);
  z-index: 2;
}
.doctor_box .detail_box {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  width: 100%;
  height: 160px;
  padding: 0 16px;
  box-sizing: border-box;
}
.doctor_name {
  font-size: 22px;
  color: #fff;
  font-weight: 600;
}
.doctor_name img {
  width: 18px;
  height: 18px;
  margin-left: 5px;
  position: relative;
  top: 3px;
}
.doc_item1 {
  display: flex;
  justify-content: space-between;
  padding-top: 15px;
}
.doc_head {
  width: 60px;
  height: 60px;
  line-height: 60px;
  border-radius: 50%;
  border: 2px solid #fff;
  text-align: center;
}
.doc_head img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
}
.doc_title {
  font-size: 14px;
  color: #fff;
  margin-top: 2px;
  opacity: 0.9;
}
.doc_txt {
  margin-top: 2px;
  width: 100%;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  word-break: break-all;
}
.doc_item2 {
  margin-top: 10px;
}
.item_box {
  display: flex;
}
.item_box p {
  font-size: 12px;
  color: #fff;
}
.item_box p em {
  font-size: 21px;
  color: #fff;
  font-weight: 600;
  margin-right: 5px;
}
.score {
  display: flex;
  align-items: center;
  /* margin-left: 10px; */
}
.score em{
  margin-right: 5px;
}
.score img {
  width: 12px;
  height: 12px;
}
.doc_detail {
  font-size: 12px;
  color: #fff;
  width: 68px;
  height: 20px;
  line-height: 20px;
  border-radius: 12px;
  border: 1px solid #fff;
  text-align: center;
}
.server_box {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
}
.headerText {
  font-weight: 600;
  font-size: 19px;
  color: #222222;
  padding: 10px 0;
  color: #040b1c;
}
.headerText span {
  font-size: 14px;
}
.more {
  color: #0d1529;
  font-size: 12px;
  opacity: 0.5;
}
.more img {
  width: 10px;
  height: 10px;
}
.server_box ul {
  margin-top: 6px;
}
.server_box li {
  display: flex;
  width: 100%;
  padding: 18px 15px;
  box-sizing: border-box;
  background: #f8f8f8;
  margin-bottom: 10px;
  align-items: center;
}
.server_box li img {
  width: 32px;
  height: 32px;
  margin-right: 12px;
}
.server_box li .both_txt {
  font-size: 16px;
  color: #040b1c;
  font-weight: 500;
  opacity: 1;
}
.server_box li p {
  font-size: 13px;
  color: #040b1c;
  opacity: 0.5;
}
.server_box li .item_right {
  width: 100%;
}
.server_box li .timer {
  color: #0076ff;
  font-size: 12px;
  opacity: 1;
}
.server_box li .timer span {
  font-size: 16px;
  font-weight: 500;
}
.more_server {
  color: #040b1c;
  font-size: 12px;
  text-align: center;
  padding-bottom: 10px;
  opacity: 0.5;
}
.more_server img {
  width: 10px;
  height: 10px;
  margin-left: 4px;
}
.team_box {
  padding: 0 16px;
  background: #fff;
  margin-bottom: 10px;
  overflow: hidden;
}
.team_box li {
  width: 100%;
  padding: 10px;
  box-sizing: border-box;
  box-shadow: 0px 0px 7px 1px rgba(4, 11, 28, 0.06);
  border-radius: 4px;
  display: flex;
  /* align-items: center; */
  margin-bottom: 10px;
}
.team_box li img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 10px;
}
.good_service li img {
  width: 72px;
  height: 72px;
  border-radius: 0;
}
.record_box {
  display: flex;
  margin-top: 5px;
}
.record_box p {
  font-size: 10px;
  color: #0076ff;
  margin-right: 12px;
}
.record_box p img {
  width: 10px;
  height: 10px;
  margin-right: 5px;
}
.team_name {
  font-size: 16px;
  color: #040b1c;
  font-weight: 500;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.team_text {
  font-size: 13px;
  color: #040b1c;
  margin-top: 5px;
  opacity: 0.5;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.service_tag span {
  margin-right: 10px;
  border-radius: 12px;
  border: 1px solid #0076ff;
  color: #0076ff;
  padding: 0 5px;
}
.goods {
  color: #0076ff;
  font-size: 13px;
}
.eva_box {
  padding: 0;
}
.bottom_box {
  margin: 20px 0;
  text-align: center;
  color: #040b1c;
  font-size: 12px;
}
.bottom_box p {
  opacity: 0.6;
}
.bottom_box h3 {
  font-size: 15px;
  font-weight: 500;
  margin-bottom: 8px;
}
.eva_title {
  margin-bottom: 10px;
}
.eva_title span {
  display: inline-block;
  padding: 7px 8px;
  background: rgba(4, 11, 28, 0.04);
  border-radius: 14px;
  color: rgba(4, 11, 28, 0.5);
  margin-right: 10px;
  margin-top: 10px;
}
.eva_title span.on {
  background: #0076ff;
  color: #fff;
}
.eva_title span em {
  margin-left: 3px;
}
.no_evaList {
  padding: 25px 70px;
  font-size: 14px;
  color: rgba(4, 11, 28, 0.5);
  text-align: center;
}
.no_evaList a {
  color: rgba(0, 118, 255, 1);
}
.flex_btn {
  position: fixed;
  bottom: 150px;
  right: 20px;
  width: 56px;
  height: 56px;
  background: linear-gradient(
    280deg,
    rgba(0, 106, 255, 1) 0%,
    rgba(0, 147, 255, 1) 100%
  );
  color: #fff;
  font-size: 15px;
  border-radius: 50px;
  text-align: center;
  padding-top: 7px;
  box-sizing: border-box;
}
.bottom_talk {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  display: flex;
  background: #fff;
  z-index: 200;
}
.bottom_left {
  width: 40%;
  padding-right: 30px;
  padding-left: 10px;
  box-sizing: border-box;
  display: flex;
  align-items: center;
}
.item_talk {
  text-align: center;
  margin-left: 30px;
}
.item_talk img {
  width: 22px;
  height: 22px;
}
.item_talk p {
  font-size: 10px;
}
.btn1 {
  font-size: 16px;
  color: #ffffff;
  background-color: #0076ff;
  height: 50px;
  line-height: 50px;
  text-align: center;
  width: 60%;
  font-weight: 600;
}
.btn2{
  background: #ccc;
}

.advertising {
  position: relative;
  padding: 10px 20px;
  display: flex;
  background: #fff;
}
.advertising img {
  width: 17px;
  height: 17px;
  margin-top: 6px;
}
.notice {
  width: 92%;
  height: 30px;
  line-height: 30px;
  margin-left: 10px;
  font-size: 14px;
  color: #040b1c;
  display: flex;
}
.notice em {
  display: inline-block;
  width: 100%;
  height: 30px;
  line-height: 30px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
  margin-right: 20px;
}
@keyframes dialog-fade-in {
  0% {
    height: 0;
  }
  100% {
    height: 361px;
  }
}

@keyframes dialog-fade-out {
  0% {
    height: 361px;
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
  display: none
}
.dialog-fade-in {
  display: block;
  animation: dialog-fade-in 0.5s;
  animation-fill-mode: forwards;
  /* height: 361px;
  transition: all 0.5s liner !important;
  transform: translateY(0); */
}
.dialog-fade-out {
  display: none;
  animation: dialog-fade-out 0.5s;
  animation-fill-mode: forwards;
  /* height: 0;
  transform: translateY(100%);
  transition: all 0.5s liner !important; */
}
.close_btn {
  display: block;
  float: right;
  width: 40px;
  height: 40px;
  line-height: 40px;
  text-align: right;
  font-size: 14px;
  color: #000;
}
.names {
  margin-top: 22px;
  font-size: 19px;
  color: #040b1c;
  margin-bottom: 10px;
  font-weight: 600;
}
.names span {
  font-size: 14px;
  opacity: 0.5;
}
.tpye_title {
  padding-bottom: 12px;
  font-size: 15px;
  color: #0076ff;
  border-bottom: 1px solid rgba(4, 11, 28, 0.1);
}
.type_title img {
  width: 16px;
  height: 16px;
  margin-right: 5px;
  position: relative;
  top: 3px;
}
.choose_title {
  font-size: 15px;
  color: #040b1c;
  font-weight: 500;
  margin-top: 12px;
}
.flex_class {
  display: flex;
  margin-left: -10px;
  margin-top: 10px;
  text-align: center;
}
.flex_class div {
  margin-left: 10px;
  width: 108px;
  height: 65px;
  border-radius: 2px;
  border: 1px solid rgba(4, 11, 28, 0.12);
  background: #fff;
}
.type_name {
  font-size: 16px;
  color: #040b1c;
  margin-top: 12px;
}
.type_price {
  color: #ff0000;
  font-size: 13px;
}
.flex_class div.on {
  border: 1px solid rgba(0, 118, 255, 1);
  background: rgba(0, 118, 255, 0.1);
}
.flex_class div.on .type_name {
  color: #0076ff;
}
.txt {
  font-size: 14px;
  color: rgba(4, 11, 28, 0.5);
  margin-top: 10px;
}
.ok_btn {
  position: absolute;
  bottom: 20px;
  width: 100%;
  left: 0;
  padding: 0 16px;
  box-sizing: border-box;
  z-index: 100;
}
.ok_btn a {
  width: 100%;
  display: block;
  height: 40px;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: #0076ff;
  font-size: 16px;
  font-weight: 600;
  border-radius: 20px;
}
</style>

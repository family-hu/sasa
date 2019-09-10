<template>
    <div>
      <div class="head_bar flex-b" v-if="showBar">
        <div class="flex_box" @click="backHome">
          <img src="/static/img/bar_back_home@2x.png" alt="">
          <span>{{orgNames}}</span>
        </div>
        <div>
          <img @click="focusDoc" src="/static/img/bar_ewm@2x.png" alt="">
          <img @click="backMine" src="/static/img/bar_back_mine@2x.png" alt="">
        </div>
      </div>
      <!-- <div style="height:264px">
        <mt-swipe @change="handleChange" :auto="5000" :showIndicators="false">
          <mt-swipe-item  v-for="(item,index) in shopList.imagePath" :key="index">
              <img :src="item" height="264px" width="100%" alt="">
            </mt-swipe-item>
        </mt-swipe>
        <div class="banner_index"><b>{{onIndex}}</b>/{{shopList.imagePath.length}}</div>
      </div> -->
      <div style="margin-top:44px;text-align: center">
        <img class="image" v-lazy="bannerImg" :src="bannerImg" height="281px" width="100%" alt="">
      </div>
      <div class="goods_detail">
        <div class="price_box">
          <div class="price">
            <span class="now">¥{{sellPrice}}</span>
            <del class="old">门市价:¥{{crossLinePrice}}</del>
          </div>
          <!-- <div class="point">{{shopScore}}分</div> -->
          <div v-if="!browse" style="height: 26px;">
            <div v-if="moneyComm > 0" class="share_tip" @click="shareGet"><img src="../../../static/img/price.png" alt="">分享赚¥{{moneyComm}}</div>
            <div v-else class="share_tip" @click="shareGet"><img src="../../../static/img/price.png" alt="">分享</div>
          </div>
        </div>
        <div class="package_name">{{shopList.name}}</div>
        <div class="package_explain">{{shopList.highLight}}</div>
        <!-- <div class="package_tag">
          <span v-for="(item,index) in shopList.labelList" :key="index">{{item}}</span>
        </div> -->
        <div class="service_tag">
          <div class="tag_box"><img src="../../../static/img/shop_refund.png" alt="">随时退</div>
          <div class="tag_box"><img src="../../../static/img/shop_change.png" alt="">随时改</div>
          <div class="tag_box"><img src="../../../static/img/shop_quality.png" alt="">品质保障</div>
        </div>
      </div>
      <div class="detail_addres">
        <div class="flex-b" style="margin-bottom:8px;">
          <h3>{{companyList.name}}</h3>
          <a :href="'tel:'+companyList.phone" class="right_img"><img src="../../../static/img/shop_tel_big.png" alt=""></a>
        </div>
        <div class="tel">营业时间：{{companyList.workingHours}}</div>
        <div class="tel addres">
          <div>地址：{{companyList.detailsAddr}}</div>
          <!-- <div>{{companyList.detailsAddr}}<br/><span class="distance">距您1.00km</span></div> -->
        </div>
      </div>
      <div class="package_box">
        <div id="fixedBar" :class=" barFixed == true ? 'boxFixed' : ''">
          <ul class="tab_box">
            <li class="filtrate_list" v-for="(item,index) in tabList" :key="index" :class="{'on':current == index}" @click="addClass(index,item)">
              <a :href="'#href-'+index">{{item}}</a>
            </li>
          </ul>
        </div>
        <div>
          <div id="href-0" class="package_item">
            <p class="title"><span>套餐介绍</span></p>
            <div class="package_img" v-html="shopList.description">{{shopList.description}}</div>
          </div>
          <div id="href-1" class="package_item">
            <p class="title"><span>包含项目</span></p>
            <shop-item-detail v-for="(categoryList,index) in categoryList" :key="index" :categoryList="categoryList"></shop-item-detail>
          </div>
          <div id="href-2" class="package_item">
            <p class="title"><span>机构介绍</span></p>
            <div class="html_css" v-html="companyList.introduction">{{companyList.introduction}}</div>
          </div>
          <div id="href-3" class="package_item">
            <div class="flex-b">
              <p class="title"><span>用户评价</span><em>好评率{{goodsRate}}%</em></p>
              <a href="javascript:void(0);" @click="allComments" class="more">查看全部({{commentListLen}})<img src="/static/img/more.png" alt=""></a>
            </div>
            <div class="line-s"></div>
            <!-- 评论区域 -->
            <div class="comments_box" v-for="(item,index) in commentList" :key="index">
              <div class="flex-b comments_list">
                <div class="flex_left">
                  <img class="icon" v-if="item.photoPath" :src="item.photoPath">
                  <img class="icon" v-else :src="userImg">
                  <div>
                    <span class="namecs">{{item.nickName}}</span>
                    <el-rate v-model="rateScore" disabled text-color="#FF7A00" score-template="{value}" allow-half></el-rate>
                  </div>
                </div>
                <div class="times">{{item.createTime}}</div>
              </div>
              <div class="titlecs"> {{item.description}}</div>
              <p class="item_tag">{{item.resourceName}}</p>
            </div>
            <!-- 评论区域 end-->
          </div>
          <div id="href-4" class="package_item" v-if="shopList.precautions">
            <!-- <p class="title"><span>注意事项</span></p>
            <div class="line-s"></div>
            <div class="attention">
              <p>1、体检前24小时避免辛辣油腻食品、饮酒及过度劳累。</p>
              <p>2、体检当日晨应禁食、水，抽血不宜超过上午10：30。</p>
              <p>3、高血压、心脏病、糖尿病、等慢性病患者，可以喝一口白开水吃药，到检后需告知医生。</p>
            </div> -->
            <div class="physical" v-html="shopList.precautions">{{shopList.precautions}}</div>
            <!-- <img class="physical" src="/static/img/physical@2x.png" alt=""> -->
          </div>
        </div>
        <!-- 没有更多提示 -->
        <bottomloadMore></bottomloadMore>
      </div>

      <div class="btn_box" v-if="!browse">
        <a href="tel:13723261797" class="service"><img src="../../../static/img/shop_service.png" alt=""><P>客服</P></a>
        <a class="appointment" @click="appointment" href="javascript:void(0);">立即预约</a>
      </div>
      <!-- 注册 -->
      <div class="shade" @click="clickShade" v-if="show"></div>
      <div class="dialog_box" v-if="show" :class=" show ? 'dialog-fade-in' : 'dialog-fade-out'">
        <mt-field placeholder="请输入手机号" placeholder-style="color:rgba(4,11,28,.3);" type="number" v-model="phone" @input.native="change($event, 1)"></mt-field>
        <mt-field label="" placeholder="输入验证码" type="number" v-model="code" @input.native="change($event, 2)">
          <mt-button plain size="small" type="primary" @click.native="getCode" :disabled="codeDisable" ref="code">获取验证码</mt-button>
        </mt-field>
        <div class="mint_btn_box">
          <mt-button size="large" type="primary" @click.native="login" :disabled="disable">登录</mt-button>
        </div>
      </div>
      <!-- 启动工作台按钮 -->
      <div class="work_btn" @click="working">
        <img src="/static/img/work_icon.png" alt="">
      </div>
      <!-- 关注二维码 -->
      <div class="doctorCode" v-if="codeShade">
        <img :src="'data:image/jpeg;base64,'+docCode" alt="">
        <p>长按识别，关注公众号</p>
      </div>
      <!-- 底部工作台 -->
      <div class="shade_work" v-if="work || codeShade" @click="closeWork"></div>
      <div class="dialog_work_box" :class=" work ? 'dialog-top-in' : 'dialog-top-out'">
        <div class="center_box">
          <dl @click="backHome">
            <dt><img src="/static/img/work_home.png" alt=""></dt>
            <dd>首页</dd>
          </dl>
          <dl @click="focusDoc">
            <dt><img src="/static/img/work_public.png" alt=""></dt>
            <dd>进入公众号</dd>
          </dl>
          <dl @click="backMine">
            <dt><img src="/static/img/work_mine.png" alt=""></dt>
            <dd>我的</dd>
          </dl>
          <dl @click="backMsg">
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
import { mapGetters } from 'vuex'
import { MessageBox } from "mint-ui";
import imgMap from "../../../static/js/imgmap.js";
import ShopItemDetail from "../shop/ShopItemDetail.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import * as types from "../../constant/ConstantConfig.js";
import { faces } from "../../../static/js/face.js";
export default {
  data() {
    return {
      proUserId: this.$route.query.proUserId ? this.$route.query.proUserId : null, //分享者userid
      fromUserId: this.$route.query.fromUserId, //分销推广者ID
      orgId: this.$route.query.orgId,
      orgNames: this.$route.query.orgNames,
      packDetailsId: this.$route.query.packDetailsId,
      serviceCompanyId: this.$route.query.serviceCompanyId,
      shopName: this.$route.query.shopName,
      shopList: [],
      crossLinePrice: "",
      sellPrice: "",
      shopScore: "",
      categoryList: [],
      companyList: [],
      commentList: [],
      tabList: ["套餐介绍", "包含项目", "机构介绍", "用户评价", "注意事项"],
      current: 0,
      onIndex: 1,
      rateScore: 0,
      isAddItem: false, //是否加项
      loading: false,
      page: 1,
      loaded: false, //是否加载完成
      barFixed: false, //是否固定导航
      showBar: true, //头部导航
      moneyComm: "0",
      show: false,
      phone: "",
      code: "",
      key: "",
      disable: true,
      codeDisable: false,
      intervalId: -1,
      isCode: this.$route.query.code,
      jvUserId: null,
      ifRegist: null,
      browse: this.$route.query.browse, //预览
      commentListLen: "0",
      work: false,
      unreadNum: '',
      codeShade: false
    };
  },
  components: {
    shopItemDetail: ShopItemDetail,
    bottomloadMore : BottomloadMore
  },

  computed: {
    ...mapGetters(["loginData", "otherSysUserId","appId"]),
    bannerImg() {
      if (this.shopList.imagePath) {
        return this.shopList.imagePath;
      }
    },
    userImg() {
      return imgMap.defaultAva;
    },
    goodsRate() {
      return 100;
      // if(this.commentList.length > 0){
      //   let len = this.commentList.length;
      //   let score = 0;
      //   for(let i = 0; i < len; i++){
      //     score += this.commentList.score[i];
      //   }
      //   return parseInt(score/len*10)
      // }else{
      //   return 100
      // }
    }
  },

  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    if (this.browse == "true") {
      //预览
      return false;
    } else {
      //调用分享
      setTimeout(() => {
        this.wxShareCallback(this.shopList);
      }, 1000);
    }
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
      sessionStorage.setItem('selected','msg');
      this.$router.push({
        path: "home",
        query: {
          orgId: this.orgId,
          orgNames: this.orgNames
        }
      });
    },
    //返回首页
    backHome() {
      sessionStorage.setItem('selected','home');
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
    //关注公众号
    focusDoc() {
      let request = {
        busiId: this.orgId,
        qrType: '1004100114'
      };
      let vm = this;
      this.$store
        .dispatch("generateqrcode", request)
        .then(data => {
          if (data.rtnCode == '1') {
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
        orgId: this.orgId,
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("sysOrgModeList", request)
        .then(data => {
          if(data){
            this.unreadNum = data.unreadNum.value;
          }

        })
        .catch(error => {
          this.$toast(error.message);
        })
    },
    clickShade() {
      this.show = false;
    },
    //分享立赚
    shareGet() {
      window.location.href =
        "http://gzh.1010psy.com/promoteDetails?initUserId=" +
        this.loginData.userObj.userId.value +
        "&orgId=" +
        this.orgId +
        "&prodId=" +
        this.packDetailsId;
    },
    //分享
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let shareUrlUserId = window.location.href.split("#")[0] + "&proUserId=" + this.loginData.userObj.userId.value;
      console.log(shareUrlUserId, "==shareUrlUserId");
      let dataForWeixin = {
        title: data.name, // 分享标题
        desc: '好友' + this.loginData.userObj.userName + "给你推荐了" + this.orgNames + '的医疗服务' + data.name, // 分享描述
        link: shareUrlUserId, // 分享链接
        imgUrl: data.imagePath
          ? data.imagePath
          : "http://yun.sinoylb.com/static/img/share@2x.png" // 分享图标
      };
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    handleChange(index) {
      this.onIndex = index + 1;
    },
    addClass(index, item) {
      if (this.current == index) {
        return false;
      }
      this.current = index;
    },
    //立即预约
    appointment() {
      //分销登录/注册
      if (this.ifRegist == "0") { //未绑定手机号
        //显示注册
        this.show = true;
        return false;
      } else {
        if (this.isAddItem == true) {
          this.$router.push({
            path: "addItem",
            query: {
              packDetailsId: this.packDetailsId,
              serviceCompanyId: this.serviceCompanyId,
              orgId: this.orgId
            }
          });
        } else {
          this.$router.push({
            path: "confirmOrder",
            query: {
              idList: null,
              packDetailsId: this.packDetailsId,
              serviceCompanyId: this.serviceCompanyId,
              orgId: this.orgId
            }
          });
        }
      }
    },
    //全部评价
    allComments() {
      this.$router.push({
        path: "shopCommentList",
        query: { resourceId: this.packDetailsId }
      });
    },
    //套餐详情
    getPackagesDetail() {
      const request = {
        packages: {
          packDetailsId: this.packDetailsId
        },
        sortType: "price"
      };
      this.$store
        .dispatch("packagesDetail", request)
        .then(data => {
          if (data.data) {
            this.shopList = data.data.packages;
            this.crossLinePrice = data.data.packages.crossLinePrice.value;
            this.sellPrice = data.data.packages.sellPrice.value;
            this.shopScore = data.data.packages.score.value;
            this.orgId = data.data.packages.orgId;
            // console.log(this.orgId,'==this.orgId');
            // this.isAddItem = data.data.packages.isAddItem == "1" ? true : false; //判断是否跳转加项
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //服务单位
    getServiceCompany() {
      const request = {
        serviceCompany: {
          serviceCompanyId: this.serviceCompanyId
        }
      };
      this.$store
        .dispatch("serviceCompany", request)
        .then(data => {
          if (data.data) {
            this.companyList = data.data.company;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //套餐项目列表
    getPackagesProductList() {
      const request = {
        packDetailsId: this.packDetailsId
      };
      this.$store
        .dispatch("packagesProductList", request)
        .then(data => {
          if (data.data) {
            this.categoryList = data.data.categoryList;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //评价列表
    getCommentList() {
      const request = {
        pageParam: {
          pageNum: 1,
          pageSize: 1
        },
        appraisal: {
          resourceId: this.packDetailsId,
          type: "2"
        }
      };
      this.$store
        .dispatch("shoppingCommentList", request)
        .then(data => {
          if (data.data.appraisalList) {
            this.commentList = data.data.appraisalList;
            this.commentListLen = data.data.total.value;
            if (data.data.appraisalList != "") {
              this.rateScore = parseFloat(
                data.data.appraisalList[0].score.value
              );
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //商品分销信息查询
    getJvFinProdSalesInfo() {
      const request = {
        orgId: this.orgId,
        salesType: "1",
        userId: this.loginData.userObj.userId.value,
        prodId: this.packDetailsId
      };
      this.$store
        .dispatch("jvFinProdSalesInfo", request)
        .then(data => {
          if (data) {
            this.moneyComm = data.moneyComm.value;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    // 监听滚动事件
    handleScroll() {
      let scrollTop =
        window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop;
      let offsetTop = document.querySelector("#fixedBar").offsetTop;
      if (scrollTop > offsetTop) {
        this.barFixed = true;
        this.showBar = false;
      } else {
        this.barFixed = false;
        this.showBar = true;
      }
    },
    //分销注册
    getUserRegister() {
      const request = {
        account: this.phone,
        otherSysType: "0",
        otherSysUserId: this.jvUserId,
        pwd: this.code
      };
      this.$store
        .dispatch("jvUserRegister", request)
        .then(data => {
          if (data) {
            if (data.rtnCode == "1") {
              clearInterval(this.intervalId);
              this.$toast("注册成功");
              this.show = false;
              //跳转下一页
              if (this.isAddItem == true) {
                this.$router.push({
                  path: "addItem",
                  query: {
                    packDetailsId: this.packDetailsId,
                    serviceCompanyId: this.serviceCompanyId,
                    orgId: this.orgId
                  }
                });
              } else {
                this.$router.push({
                  path: "confirmOrder",
                  query: {
                    idList: null,
                    packDetailsId: this.packDetailsId,
                    serviceCompanyId: this.serviceCompanyId,
                    orgId: this.orgId
                  }
                });
              }
            } else {
              this.$toast("验证码错误或已过期");
            }
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //分销注册验证码
    getCode() {
      if (!this.phone) {
        this.$toast("请输入手机号");
      } else {
        if (!this.checkPhone(this.phone)) {
          this.$toast("请输入正确的手机号");
        } else {
          this.codeDisable = true;
          //发送验证码
          const request = {
            mobile: this.phone,
            smsVerifyType: "1000100103",
            userId: this.loginData.userObj.userId.value
          };
          this.$store
            .dispatch("jvUserPhoneCode", request)
            .then(data => {
              if (data.rtnCode == "1") {
                let time = 60;
                let vm = this;
                this.intervalId = setInterval(() => {
                  time--;
                  if (time <= 0) {
                    vm.codeDisable = false;
                    vm.$refs.code.$el.innerHTML = "获取验证码";
                    clearInterval(this.intervalId);
                    this.intervalId = 0;
                    return false;
                  } else {
                    vm.$refs.code.$el.innerHTML = time + "S";
                  }
                }, 1000);
              }
            })
            .catch(e => {
              this.$toast(e.message);
              this.codeDisable = false;
            });
        }
      }
    },
    change(value, type) {
      if (type == 1) {
        this.phone = value.target.value;
      } else if (type == 2) {
        this.code = value.target.value;
      }
      this.disable = !this.phone || !this.code;
    },
    checkPhone(phone) {
      let reg = /^1[0-9]{10}$/;
      return reg.test(phone);
    },
    //注册登录
    login() {
      if (!this.checkPhone(this.phone)) {
        this.$toast("请输入正确的手机号");
      } else {
        if (this.code == null || this.code.length == 0) {
          this.$toast("请先获取验证码");
          return;
        }
        this.getUserRegister();
      }
    },
    //判断是否需要注册
    isRegister() {
      const request = {
        userId: this.loginData.userObj.userId.value,
        otherAppId: this.appId
      };
      let method = "jvCheckUserHasMobile";
      this.$store
        .dispatch(method, request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.jvUserId = data.data.otherSysUserId;
            this.ifRegist = data.data.ifRegist.value;
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //分享关联
    busiPageShareViewLog() {
      let userId = this.loginData.userObj.userId.value; //当前用户
      let request = {
        proUserId: this.proUserId ? this.proUserId : userId, //分享者ID
        busiType: "商城套餐",
        userId: userId,
        orgId: this.orgId,
        title: this.shopName ? this.shopName : this.shopList.name
      };
      this.$store
        .dispatch("busiPageShareViewLog", request)
        .then(data => {
          if (data.rtnCode == "1") {
            console.log('关联成功');
          }else{
            console.log(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
  },

  created() {
    this.getPackagesDetail();
    this.getServiceCompany();
    this.getPackagesProductList();
    this.getCommentList();
    if (this.browse == "true") {
      //预览
      return false;
    } else {
      if (!this.loginData.tid) {
        this.myUtils.wxLogin();
      } else {
        this.getJvFinProdSalesInfo();//分销详情
        this.requestMsg(); //获取未读消息
        //判断是否注册
        this.isRegister();
        //分销关联ID
        if (this.fromUserId) {
          localStorage.setItem("fromUserId", this.fromUserId);
        }

        if(!this.proUserId){ //没有分享者ID不关联
          return false;
        }

        this.busiPageShareViewLog();//分享关联

      }
    }
  },

  destroyed() {
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>


<style>
.image[lazy="loading"] {
  width: 40px;
  height: 281px;
  margin: 0 auto;
  color: #333;
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
.mint-msgbox-title {
  text-align: left;
  padding-left: 20px;
  position: relative;
  color: #000;
  font-size: 17px;
  font-weight: 500;
}
.mint-msgbox-title::after {
  content: "";
  background: #0076ff;
  position: absolute;
  bottom: -10px;
  left: 20px;
  width: 34px;
  height: 2px;
}
.mint-msgbox-btns {
  display: none;
}
.mint-msgbox-message {
  text-align: justify;
  line-height: 20px;
  margin-top: 21px;
  color: #666;
  font-size: 15px;
}
</style>
<style scoped>
.barFixed {
  position: fixed;
  top: 0;
  width: 100%;
}
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
.dialog-fade-in {
  animation: dialog-fade-in 0.5s;
  animation-fill-mode: forwards;
}
.dialog-fade-out {
  animation: dialog-fade-out 0.5s;
  animation-fill-mode: forwards;
}
.shade {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 300;
}
.dialog_box {
  position: fixed;
  top: 50%;
  left: 50%;
  width: 300px;
  height: 249px;
  margin-left: -150px;
  margin-top: -125px;
  background: #fff;
  border-radius: 4px;
  z-index: 400;
  padding: 40px 30px 30px;
  box-sizing: border-box;
}
.mint_btn_box button {
  width: 240px;
  height: 40px;
  background: #0076ff;
  border-radius: 20px;
  margin: 30px auto 0;
}
/deep/ .mint-button-text {
  font-size: 16px;
  font-weight: 600;
}
/deep/ .mint-button--primary.is-plain {
  border: none;
}
/deep/ .mint-button--primary.is-plain .mint-button-text {
  font-size: 13px;
  color: #0076ff;
  font-weight: 400;
}
/deep/ .mint-cell-wrapper {
  background-image: none;
}
/deep/ .mint-cell {
  border-bottom: 1px solid rgba(4, 11, 28, 0.05);
}
.dialog_box input {
  color: #040b1c;
  font-size: 16px;
}
.share_tip {
  min-width: 80px;
  height: 26px;
  line-height: 26px;
  text-align: center;
  font-size: 12px;
  padding: 0 5px;
  background-color: rgba(0, 118, 255, 0.1);
  border-top-left-radius: 12px;
  border-bottom-left-radius: 12px;
  color: rgba(0, 118, 255, 1);
  position: absolute;
  right: 0;
}
.share_tip img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
  margin-right: 3px;
}
.html_css {
  padding: 16px;
  text-align: justify;
  color: #222;
  overflow: hidden;
  overflow-x: auto;
}
.html_css img {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto;
}
.boxFixed {
  position: fixed;
  top: 0;
  z-index: 200;
  background: #fff;
  width: 100%;
}

ul,
li,
h3,
p {
  padding: 0;
  list-style: none;
  margin: 0;
}
.banner_index {
  position: absolute;
  top: 229px;
  right: 10px;
  width: 48px;
  height: 22px;
  line-height: 22px;
  background: rgba(0, 0, 0, 0.18);
  color: #fff;
  text-align: center;
  border-radius: 11px;
  font-weight: 400;
  font-size: 14px;
}
.banner_index b {
  font-size: 18px;
  margin-right: 2px;
}
.goods_detail {
  padding: 0 16px;
  background: #fff;
}
.price_box {
  padding-top: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}
.now {
  font-size: 18px;
  color: #f0240e;
  font-weight: bold;
}
.old {
  margin-left: 5px;
  color: #b3b3b3;
  font-size: 14px;
  font-weight: 400;
}
.point {
  color: #0076ff;
  font-size: 14px;
  font-weight: 400;
}
.package_name {
  color: #040b1c;
  font-size: 17px;
  font-size: 500;
  margin-top: 4px;
}
.package_explain {
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
  font-weight: 400;
  margin-top: 3px;
}
.package_tag {
  margin-top: 7px;
}
.package_tag span {
  display: inline-block;
  min-width: 45px;
  height: 16px;
  line-height: 16px;
  border: 1px solid #0076ff;
  border-radius: 2px;
  margin-right: 3px;
  margin-bottom: 5px;
  color: #0076ff;
  font-size: 11px;
  font-weight: 400;
  text-align: center;
}
.service_tag {
  display: flex;
  margin-top: 15px;
  padding-bottom: 10px;
  box-sizing: border-box;
  justify-content: space-between;
}
.tag_box {
  flex: 1;
  padding-left: 16px;
  color: #040b1c;
  font-size: 12px;
}
.tag_box img {
  width: 15px;
  height: 15px;
  position: relative;
  top: 3px;
  margin-right: 5px;
}
.detail_addres {
  background: #fff;
  padding: 16px;
  position: relative;
  margin-top: 10px;
}
.detail_addres h3 {
  color: #040b1c;
  font-size: 16px;
  font-weight: 500;
}
.right_img img {
  width: 18px;
  height: 16px;
}
.tel {
  color: rgba(4, 11, 28, 0.75);
  font-size: 13px;
  font-weight: 400;
  margin-top: 5px;
  width: 100%;
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
.package_box {
  margin-top: 10px;
  padding-bottom: 53px;
}
.tab_box {
  display: flex;
  padding: 0 10px;
  box-sizing: border-box;
  border-bottom: 1px solid rgba(216, 216, 216, 0.6);
  background: #fff;
}
.tab_box li {
  flex: 1;
  padding: 10px 0;
  font-size: 14px;
  color: #666;
  font-weight: 500;
  text-align: center;
}
.tab_box li a {
  color: #666;
}
.tab_box li.on {
  border-bottom: 2px solid #0076ff;
}
.tab_box li.on a {
  color: #0076ff;
}
.package_item {
  background: #fff;
  margin-bottom: 10px;
}
.boxFixedTop {
  padding-top: 50px;
}
.package_img {
  width: 100%;
  height: auto;
  padding: 19px 16px;
  box-sizing: border-box;
  overflow: hidden;
  overflow-x: auto;
}
.package_img .g-wrap {
  width: 100% !important;
}
.package_img img {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto;
}
.package_img table {
  width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  height: 400px !important;
  overflow: hidden !important;
  overflow-y: auto !important;
  font-size: 12px !important;
}
.package_img table td {
  line-height: normal !important;
}
.title {
  padding: 18px 16px 0 16px;
  display: flex;
  align-items: center;
}
.title em {
  font-size: 10px;
  color: #b3b3b3;
  margin-left: 4px;
}
.title span {
  border-left: 8px solid #0076ff;
  font-size: 16px;
  color: #000;
  font-weight: 500;
  height: 16px;
  padding-left: 3px;
  display: block;
  line-height: 14px;
}
.item_box {
  background: #fff;
}
.item_box h3 {
  height: 20px;
  width: 91%;
  background: #eeeeee;
  color: #666666;
  font-size: 13px;
  text-align: center;
  line-height: 20px;
  margin: 0 auto;
}
.more {
  color: #0076ff;
  font-size: 12px;
  padding: 18px 16px 0 16px;
}
.more img {
  width: 8px;
  height: 8px;
  margin-left: 3px;
}
.comments_box {
  background: #fff;
  padding: 16px;
}
.comments_list {
  width: 100%;
}
.flex_left {
  display: flex;
  align-items: center;
}
.icon {
  width: 27px;
  height: 27px;
  border-radius: 50%;
  margin-right: 10px;
}
.namecs {
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
}
.times {
  color: #b3b3b3;
  font-size: 12px;
}
.titlecs {
  font-size: 14px;
  color: rgba(34, 34, 34, 1);
  margin-top: 18px;
  word-break: break-all;
}
.item_tag {
  margin-top: 15px;
  font-size: 12px;
  color: #b3b3b3;
}
.attention {
  padding: 16px;
}
.attention p {
  font-size: 13px;
  color: #666;
  height: 24px;
}
.btn_box {
  position: fixed;
  bottom: 0;
  display: flex;
  width: 100%;
  height: 53px;
}
.service {
  display: block;
  width: 19%;
  height: auto;
  background: #fff;
  text-align: center;
  padding-top: 8px;
  color: #666;
  font-size: 11px;
}
.service img {
  width: 22px;
  height: 19px;
}
.appointment {
  width: 81%;
  height: 53px;
  line-height: 53px;
  text-align: center;
  background: #0076ff;
  font-size: 16px;
  color: #fff;
  font-weight: 500;
}
.physical {
  width: 100%;
  height: auto;
}
@keyframes dialog-top-in {
  0% {
    height: 0;
  }
  100% {
    height: 208px;
  }
}

@keyframes dialog-top-out {
  0% {
    height: 208px;
  }
  100% {
    height: 0;
  }
}
.shade_work {
  position: fixed;
  top: 0;
  bottom: 0;
  width: 100%;
  background: rgba(0, 0, 0, 0.5);
  z-index: 700;
}
.dialog_work_box {
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
.dialog-top-in {
  display: block;
  animation: dialog-top-in 0.3s;
  animation-fill-mode: forwards;
}
.dialog-top-out {
  display: none;
  animation: dialog-top-out 0.5s;
  animation-fill-mode: forwards;
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
}
.work_btn img {
  width: 24px;
  height: 24px;
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

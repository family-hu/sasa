<template>
    <div style="padding-bottom:50px">
      <!-- banner -->
      <div class="banner">
        <div class="shade"></div>
        <img :src="deptList.deptImgUrl" alt="">
        <div class="details_box">
          <div class="depart_name">{{deptList.deptName}} <img src="../../../static/img/deptName.png" alt=""></div>
          <ul class="tag_list">
            <li v-for="(item , index) in deptList.tagList" :key="index">{{item.nameCn}}</li>
          </ul>
        </div>
      </div>
      <!-- 专家团队 -->
      <div class="doctor_team">
        <div class="title">专家团队<span>大牌专家亲自领衔的专业团队</span></div>
        <div class="team_list">
          <ul  :style="'width:'+ doctorList.length * 152 +'px;'" >
            <li v-for="(item , index) in doctorList" :key="index" >
                <img v-if="item.photoUrl" class="head" :src="item.photoUrl" alt="">
                <img v-else class="head" :src="doctorImg" alt="">
                <p class="name">{{item.userName}}</p>
                <p class="tag">{{item.departmentName}}</p>
                <p class="tag">{{item.titlesName}}</p>
                <button type="button" class="guanzu yiguanzu" v-if="item.isfollow"  @click="addFav(item,index)" :disabled="isFav">已关注</button>
                <button type="button" class="guanzu"  v-else  @click="addFav(item,index)" :disabled="isFav">＋关注</button>
            </li>
          </ul>
        </div>
        <!-- <div class="more" @click="queryAllDoctor">查看全部医生</div> -->
      </div>
      <!-- tab -->
      <div class="modle">
        <div class="modle_title">科室介绍</div>
        <div class="html_css"  v-html="deptList.desp">{{deptList.desp}}</div>
        <!-- <mt-navbar v-model="selected">
          <mt-tab-item id="1">科室介绍</mt-tab-item>
          <mt-tab-item id="2">特色服务</mt-tab-item>
        </mt-navbar> -->
        <!-- 切换主体内容 -->
        <!-- <mt-tab-container v-model="selected" style="margin-top: 10px;">
          <mt-tab-container-item id="1">
            <img :src="deptList.deptImgUrl" alt="">
          </mt-tab-container-item>
          <mt-tab-container-item id="2">
            <health-service-item v-for="(item , index) in serviceList" :key="index" :healthServiceItem="item"></health-service-item>
          </mt-tab-container-item>
        </mt-tab-container> -->
      </div>
      <a v-if="deptList.phone != ''" :href="'tel:'+deptList.phone" class="cell_doctor">立即联系</a>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import HealthServiceItem from "../service/HealthServiceItem.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId,
      deptId: this.$route.query.deptId,
      title:  this.$route.query.title,
      deptList: [],
      doctorList: [],
      selected: "1",
      isFav: false,
      loading: false,
      page: 1,
      loaded: false //是否加载完成
    };
  },

  computed: {
    ...mapGetters(["loginData"]),
    doctorImg() {
      return imgMap.defaultAva;
    },

  },

  components: {
    healthServiceItem: HealthServiceItem
  },

  mounted() {
    //调用分享
    setTimeout(() => {
      this.wxShareCallback(this.deptList);
    }, 1000)
  },

  methods: {
    wxShareCallback(data) {
      let shareUrl = window.location.href.split("#")[0];
      let dataForWeixin = {
          title: data.deptName, // 分享标题
          desc: this.title +' '+ data.deptName, // 分享描述
          link: shareUrl, // 分享链接
          imgUrl: data.deptImgUrl ? data.deptImgUrl : 'http://16health.com/static/img/share@2x.png', // 分享图标
      }
      this.wxapi.wxShare(shareUrl, dataForWeixin);
    },
    //查看全部医生
    queryAllDoctor() {
      this.$router.push({
        path: "doctorOneList",
        query: {
          orgId: this.$route.query.orgId
        }
      })
    },
    //特色科室
    // requestServiceList(deptId) {
    //   let request = {
    //     orgId: this.orgId,
    //     deptType: 1030101,
    //     deptId: deptId
    //   };
    //   let vm = this;
    //   this.$store
    //     .dispatch("getDeptList", request)
    //     .then(dataList => {
    //       vm.deptList = dataList[0];
    //       document.title = dataList[0].deptName;
    //     })
    //     .catch(error => {
    //       vm.$toast(error.message);
    //     });
    // },
    //医生列表-专家团队
    requestDoctorList() {
      let request = {
        deptId: this.deptId,
        userId: this.loginData.userObj.userId.value,
        pageNum: this.page,
        pageSize: 10
      };
      this.$store
        .dispatch("deptget", request)
        .then(data => {
          if(data.deptObj){
            this.deptList = data.deptObj;
            document.title = data.deptObj.deptName;
            if (data.deptObj.drList) {
              for (let i = 0; i < data.deptObj.drList.length; i++) {
                this.doctorList.push(data.deptObj.drList[i]);
              }
            }
          }

        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //关注
    addFav(item,index) {
      this.isFav = true;
      //防止多次点击
      if(this.isFav){
        let status = item.isfollow ? '0' :'1'
        let request = {
          busiId: item.userId.value,
          busiType: 1000100105,
          opTable: 1,
          opType: 1014102,
          status: status
        };
        this.$store
          .dispatch("busiLog", request)
          .then(data => {
            this.doctorList[index].isfollow = !item.isfollow;
            setTimeout(() => {
              this.isFav = false;
            }, 1000)

          })
          .catch(e => {
            this.$toast(e.message);
            this.isFav = true;
          });
        }

    }
  },

  created() {
    const userInfo = this.loginData.userObj;
    if (!userInfo) {
      this.myUtils.wxLogin();
    } else {
      // this.requestServiceList(this.deptId);
      this.requestDoctorList();
    }
  }
};
</script>

<style scoped>
button{
  border: none;
}
.html_css {
  padding: 0 16px 16px !important;
  text-align: justify;
  box-sizing: border-box;
  font-size: 14px;
}
.html_css img {
  max-width: 100% !important;
  margin: 0 !important;
  padding: 0 !important;
  height: auto;
}
.html_css p{
  margin-bottom: 10px !important;
  font-size: 14px !important;
}
.modle_title {
  text-align: center;
  font-size: 14px;
  color: #010101;
  line-height: 50px;
  background: #fff;
}
.banner {
  position: relative;
  height: 180px;
}
.shade{
  width: 100%;
  height: 180px;
  background:rgba(0,0,0,.4);
  position: absolute;
  z-index: 2;
  top: 0;
}
.banner img {
  width: 100%;
  height: 180px;
  position: absolute;
  z-index: 1;
  top: 0;
}
.details_box {
  position: absolute;
  bottom: 16px;
  padding: 0 16px;
  z-index: 3;
}
.depart_name {
  color: #fff;
  font-size: 16px;
  font-weight: 500;
}
.depart_name img {
  margin-left: 5px;
  width: 65px;
  height: 16px;
  position: relative;
  top: 2px;
}
.tag_list {
  display: flex;
  margin-top: 5px;
}
.tag_list li {
  border: 1px solid #fff;
  text-align: center;
  color: #fff;
  font-size: 10px;
  font-weight: 400;
  opacity: 0.5;
  margin-right: 5px;
  border-radius: 2px;
  padding: 2px 5px;
}
.doctor_team {
  background: #fff;
  padding: 20px 0 16px 16px;
}
.doctor_team .title {
  font-size: 16px;
  color: #222;
  font-weight: 500;
  display: flex;
  align-items: center;
}
.doctor_team .title span {
  font-size: 12px;
  color: #7a8093;
  font-weight: 400;
  border-left: 1px solid #7a8093;
  padding-left: 5px;
  height: 14px;
  line-height: 14px;
  display: block;
  margin-left: 5px;
}
.team_list {
  width: 100%;
  margin-top: 14px;
  box-sizing: border-box;
  overflow-y: hidden;
  overflow-x: auto;
}
.team_list ul {
  width: auto;
  height: 180px;
  overflow: hidden;
  background: #fff;
}
.team_list li {
  float: left;
  width: 145px;
  height: 180px;
  border-radius: 5px;
  background: #f8f8fa;
  margin-right: 7px;
  text-align: center;
}
.more {
  margin-top: 16px;
  text-align: center;
  font-size: 12px;
  color: #7a8093;
  font-weight: 400;
}
.head {
  display: block;
  width: 45px;
  height: 45px;
  border-radius: 50%;
  margin: 18px auto 0;
}
.name {
  min-height: 20px;
  color: #000;
  font-size: 14px;
  font-weight: 500;
  margin: 5px 0;
}
.tag {
  min-height: 17px;
  font-size: 12px;
  color: #7a8093;
  font-weight: 400;
  margin-bottom: 4px;
}
.guanzu {
  display: block;
  width: 68px;
  height: 28px;
  text-align: center;
  color: #fff;
  font-size: 13px;
  font-weight: 500;
  background: #0093ff;
  margin: 0 auto;
}
.yiguanzu {
  background: #b3b3b3;
}
.modle {
  margin-top: 10px;
  position: relative;
  background: #fff;
}
.mint-navbar {
  width: 50%;
  margin: 0 auto;
}
.mint-tab-item {
  padding: 10px 0;
}
.cell_doctor {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 50px;
  background: #0093ff;
  color: #fff;
  font-size: 16px;
  line-height: 50px;
  text-align: center;
}
</style>

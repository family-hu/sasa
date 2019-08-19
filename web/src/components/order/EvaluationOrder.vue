<template>
  <div class="main">
    <div class="box flex-b"  v-if="doctorDetail" @click="goDoctorDetail">
      <div class="name_box">
        <img class="img" :src="doctorDetail.photoUrl" alt="">
        <div class="text">
          <p class="package_name">{{doctorDetail.name}}</p>
          <p class="price">{{doctorDetail.desp}}</p>
        </div>
      </div>
      <img class="more" src="/static/img/arrow_right.png" alt="">
    </div>
    <div style="background: #f7f7f7;height:10px;width:100%"></div>
    <h3 class="evaluation_box">对医生进行评价</h3>
    <div class="dialog_box">
      <div class="flex_box">
        <p class="evaluation_title">服务态度</p>
        <div class="rate_box">
          <el-rate v-model="evaluationServerScore"  text-color="#FF7A00" :colors="['#FF7A00','#FF7A00','#FF7A00']"></el-rate>
        </div>
      </div>
      <div class="flex_box">
        <p class="evaluation_title">医生专业</p>
        <div class="rate_box">
          <el-rate v-model="evaluationMajorScore" text-color="#FF7A00" :colors="['#FF7A00','#FF7A00','#FF7A00']"></el-rate>
        </div>
      </div>
      <div class="flex_box">
        <p class="evaluation_title">回复时效</p>
        <div class="rate_box">
          <el-rate v-model="evaluationTimeScore"  text-color="#FF7A00" :colors="['#FF7A00','#FF7A00','#FF7A00']"></el-rate>
        </div>
      </div>
      <div class="evaluation_tag">
          <span  v-for="(item, index) in tagList" :data-index="index" @click="setListCheck(index)" :key="index" :class="item.check == true ? 'on' : ''">{{ item.dictName }}</span>
      </div>
      <div class="textarea_box">
        <textarea v-model="text" placeholder="写其他意见和建议" placeholder-style="color:rgba(4,11,28,.3);"></textarea>
      </div>
    </div>
    <div class="evaluation_btn_box" v-if="tagList.length > 0" @click="submitDraw">
      <a href="javascript:void(0);" class="evaluation_btn">提交评价</a>
    </div>
    <div class="evaluation_btn_box" v-else @click="submitEvaInfo">
      <a href="javascript:void(0);">提交评价</a>
    </div>
  </div>

</template>

<script>
import { mapGetters } from "vuex";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId,
      servId: this.$route.query.servId,
      docId: this.$route.query.docId,
      evaluationServerScore: 5, //服务态度
      evaluationMajorScore: 5, //医生专业
      evaluationTimeScore: 5, //回复时效
      evaluationScore: 5,
      text: "",
      tagListCheck: [],
      tagList: [],
      doctorDetail: this.$route.query.doctorDetail ? JSON.parse(this.$route.query.doctorDetail):''
    };
  },
  props: ["orderItem"],

  computed: {
    ...mapGetters(["loginData"])
  },

  methods: {
    //医生详情
    goDoctorDetail() {
      this.$router.push({
        path: "doctorDetail",
        query: {
          docId: this.docId,
        }
      });
    },
    //标签切换
    setListCheck: function(idx) {
      let check = this.tagList[idx].check;
      this.tagList[idx].check = check === true ? false : true;
    },
    //评价标签
    getTagList() {
      let request = {
        // dictType: 1020,
        upId: 1020101
      };
      let vm = this;
      this.$store
        .dispatch("dictList", request)
        .then(data => {
          if (data.dictList) {
            let tagList = data.dictList;
            for (let i = 0; i < tagList.length; i++) {
              tagList[i].check = false;
            }
            this.tagList = tagList;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //提交画像-对医生都评价标签
    submitDraw() {
      let drawList = [];
      for (let i = 0; i < this.tagList.length; i++) {
        const draw = this.tagList[i];
        if (this.tagList[i].check == true) {
          const itemRequest = {
            drawObj: this.docId,
            drawType: draw.dictId.value,
            busiType: types.PER_DRAW, //用户给医生评价
            // detBusiType: types.PERREGIST_DRAW,
            busiId: this.servId,
            detBusiId: this.servId
          };
          drawList.push(itemRequest);
        }
      }
      if (drawList.length == 0) {
        return this.$toast("请选择标签对医生进行评价吧");
      }
      let request = {
        drawList: drawList
      };
      this.$store
        .dispatch("busiDraw", request)
        .then(data => {
          if (data.rtnCode == 1) {
            this.submitEvaInfo();
          } else {
            this.$toast(data.rtnMsg);
          }
          this.show = false;
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //提交评论
    submitEvaInfo() {
      let request = {
        busiId: this.servId, //业务编号
        busiType: 2000104, //业务类型
        orgId: this.orgId, //机构
        userFrom: this.loginData.userObj.userId.value, //评价人
        userTo: this.docId, //被评价人
        evaDetList: [
          {
            evaType: 2002101, //服务态度
            score: this.evaluationServerScore
          },
          {
            evaType: 2002102, //专业水平
            score: this.evaluationMajorScore
          },
          {
            evaType: 2002103, //服务效率
            score: this.evaluationTimeScore
          }
        ],
        comment: this.text //评语
      };
      let vm = this;
      this.$store
        .dispatch("commitBusiEva", request)
        .then(data => {
          if (data.rtnCode == 1) {
            this.$toast("评价成功");
            this.$router.go(-1);
          } else {
            this.$toast(data.rtnMsg);
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },
  created() {
    this.getTagList();
  }
};
</script>
<style>
.el-rate {
  height: auto;
}
.el-rate__item .el-rate__icon {
  font-size: 24px;
  margin-right: 20px;
}
</style>
<style scoped>
.main{
  width: 100%;
  background: #fff;
  position: absolute;
  top:0;
  bottom:0;
}
.box{
  padding: 16px;
  background: #fff;
}
.name_box{
  display: flex;
  align-items: center;
}
.img{
  width: 81px;
  height: 60px;
}
.text{
  color:rgba(4,11,28,1);
  margin-left: 10px;
}
.package_name{
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  font-size: 17px;
  font-weight:600;
  margin-bottom:5px;
  margin-right: 10px;
}
.price{
  color:rgba(4,11,28,.5);
  font-size: 13px;
  font-weight: 400;
}
.more{
  width: 8px;
  height: 14px;
}
.dialog_box {
  width: 100%;
  height: auto;
  background: #fff;
  padding: 16px;
  box-sizing: border-box;
}
.evaluation_title {
  text-align: center;
  font-size: 14px;
  color: #040B1C;
}
.rate_box {
  text-align: center;
  margin-left:20px;
}
.el-rate__text {
  display: block;
  margin-top: 10px;
  font-size: 12px;
  opacity: 0.75;
}
.evaluation_tag {
  margin-top: 35px;
  margin-left: -5px;
  overflow: hidden;
}
.evaluation_tag span {
  float: left;
  border: 1px solid rgba(216, 216, 216, 0.3);
  border-radius: 14px;
  padding: 5px 10px;
  background: #fff;
  margin-left: 25px;
  margin-bottom: 15px;
  min-width: 80px;
  box-sizing: border-box;
  text-align: center;
  font-size: 13px;
  color: rgba(4, 11, 28, 0.5);
}
.evaluation_tag span.on {
  border: 1px solid rgba(0, 118, 255, 0.4);
  background: rgba(0, 118, 255, 0.1);
  color: rgba(4, 11, 28, 0.8);
}
.textarea_box {
  width: 100%;
  height: 143px;
  border-top: 1px solid rgba(216, 216, 216, 0.4);
  margin-top: 5px;
}
.textarea_box textarea {
  border: none;
  resize: none;
  width: 100%;
  height: 143px;
  padding: 10px 0;
  font-size: 15px;
  color: rgba(4, 11, 28, 1);
  background: #fff;
}
.evaluation_btn_box{
  position: fixed;
  bottom:0;
  z-index: 100;
  width:100%;
  background: #fff;
  box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
  padding: 0 16px;
}
.evaluation_btn{
  display: block;
  background: #0093FF;
  margin: 10px 0;
  height: 40px;
  line-height: 40px;
  border-radius: 20px;
  color: #fff;
  font-size: 16px;
  text-align: center;
}
.evaluation_box{
  width:100%;
  text-align:center;
  padding-top:18px;
  color:#040B1C;
  font-size:14px;
  font-weight:400;
  background:#fff;
  padding-bottom:10px;
}
.flex_box{
  display:flex;
  align-items: center;
  margin-bottom: 20px;

}
</style>

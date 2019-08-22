<template>
    <div class="main">
      <div class="cell flex-b">
        <span class="text">头像</span>
        <div class="flex_box">
          <div class="photoUrl lab">
            <el-upload
              class="avatar-uploader"
              action="123"
              :show-file-list="false"
              :before-upload="beforeUpload">
              <img v-if="photoUrl" :src="photoUrl" class="avatar photoUrl">
            </el-upload>
          </div>
          <img class="more" src="../../../static/img/mine_more.png" alt="">
        </div>
      </div>
        <div class="cell flex-b">
          <span class="text">姓名</span>
          <input class="lab" placeholder="请输入姓名" type="text" v-model="userName">
        </div>
        <div class="cell flex-b">
          <span class="text">性别</span>
          <div class="flex_box">
            <input placeholder="请选择性别" readonly class="lab" @click.stop="showSex = true" v-model="userSex"/>
            <img class="more" src="../../../static/img/mine_more.png" alt="">
          </div>
        </div>
        <div class="cell flex-b">
          <span class="text">生日</span>
          <div class="flex_box">
            <input class="lab" placeholder="请选择日期" readonly  @click.stop="openDatePicker" v-model="userBirth">
            <img class="more" src="../../../static/img/mine_more.png" alt="">
          </div>
        </div>
        <div class="cell" style="border-bottom:none;">
          <div class="flex-b">
            <span v-if="mobile" class="text">已绑定手机号</span>
            <span v-else class="text">绑定手机号</span>
            <input class="lab" type="number" placeholder="输入11位手机号" @blur="checkMobile" v-model="mobile">
          </div>
        </div>
        <div class="submit_btn">
          <a @click="submitMsg" href="javascript:void(0);">保存</a>
        </div>
        <!-- 选择日期 -->
        <div @touchmove.prevent>
          <mt-datetime-picker
          lockScroll="true"
          ref="datePicker"
          type="date"
          v-model="dateVal"
          year-format="{value}年"
          month-format="{value}月"
          date-format="{value}日"
          @confirm="handleChange"
          :startDate="startDate"
          :endDate="endDate">
          </mt-datetime-picker>
        </div>
      <!-- 选择性别 -->
      <div @touchmove.prevent>
        <mt-actionsheet :actions="sexs" v-model="showSex" cancel-text=""></mt-actionsheet>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../constant/ConstantConfig.js";
import imgmap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      dateVal: '', // 默认是当前日期
      selectedValue: "",
      docId: this.$route.query.docId,
      sexs: [],
      userSex: "",
      userBirth: "",
      photoUrl: "",
      mobile: "",
      userName: "",
      showSex: false,
      fileImg: null,
      startDate: new Date('1900-1-1'),
      endDate: new Date()
    };
  },
  mounted() {
    this.sexs = [
      {
        name: "男",
        method: this.choseMale
      },
      {
        name: "女",
        method: this.choseFemale
      }
    ];
  },

  methods: {
    beforeUpload(file) {
      this.fileImg = file;
      //自定义上传图片，转base64
      let reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = e => {
        let _file = e.target.result;
        this.photoUrl = _file;
        this.fileUpload();
      };
      return false; // 阻止Upload的默认上传
    },
    // 上传图片
    fileUpload() {
      let reg = /^data:image\/(jpeg|png|gif);base64,/;
      if (reg.test(this.photoUrl)) {
        this.photoUrl = this.photoUrl.replace(reg, "");
      }
      let request = {
        fileName: this.fileImg.name, //文件名
        fileExt: "jpg", //文件后缀
        recType: 1004100100, //文件类型-头像
        fileType: 1, //附件类型
        busiId: this.loginData.userObj.userId.value,
        orgId: 0,
        fileData: this.photoUrl
      };
      this.$store
        .dispatch("fileUpload", request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.photoUrl = data.fileUrl;
            this.$toast("上传成功");
          } else {
            this.$toast(data.rtnMsg);
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    choseMale() {
      this.userSex = "男";
    },
    choseFemale() {
      this.userSex = "女";
    },
    handleChange(value) {
      this.userBirth = value.format("yyyy-MM-dd");
    },
    openDatePicker() {
      if (this.userBirth) {
        this.dateVal = this.userBirth;
      } else {
        this.dateVal = new Date();
      }
      this.$refs["datePicker"].open();
    },
    checkPhone(phone) {
      let reg = /^1[0-9]{10}$/;
      return reg.test(phone);
    },
    //校验手机号
    checkMobile() {
      if (!this.checkPhone(this.mobile) && this.mobile) {
        this.$toast("请输入正确的手机号");
        return false;
      }
    },
    //提交信息
    submitMsg() {
      if (!this.checkPhone(this.mobile) && this.mobile) {
        this.$toast("请输入正确的手机号");
        return false;
      } else {
        this.$indicator.open();
        let request = {
          userid: this.loginData.userObj.userId.value,
          docid: this.docId,
          gender:
            this.userSex == "男" ? "1" : this.userSex == "女" ? "0" : "-1",
          userName: this.userName,
          birth: this.userBirth,
          mobile: this.mobile
        };
        this.$store
          .dispatch("userUpdate", request)
          .then(() => {
            this.$toast("提交成功");
            this.$router.go(-1);
            // this.getUserInfo();
          })
          .catch(e => {
            this.$toast(e.message);
          })
          .finally(() => {
            this.$indicator.close();
          });
      }
    },
    //更新用户信息
    getUserInfo() {
      const userId = this.loginData.userObj.userId.value;
      this.$store.dispatch("userInfoGet", { userId: userId }).then(data => {
        this.userName = data.userName ? data.userName : data.nickName;
        this.userSex = data.gender.value == "1" ? "男" : "女";
        this.userBirth = data.birth;
        this.mobile = data.mobile ? data.mobile : "";
        this.photoUrl = data.photoUrl ? data.photoUrl : imgmap.mine_headImg;
      });
    }
  },
  computed: {
    ...mapGetters(["loginData"])
  },
  created() {
    const userObj = this.loginData.userObj;
    if (userObj) {
      this.getUserInfo();
    } else {
      this.myUtils.wxLogin();
    }
  }
};
</script>
<style>
.mint-actionsheet {
  overflow: hidden;
  padding-bottom: 40px;
  background: #fff; /*解决ios自带按钮底部遮挡*/
}
</style>
<style scoped>
.main {
  background: #fff;
  position: absolute;
  top: 0;
  width: 100%;
  z-index: 100;
}
.cell {
  margin: 0 16px;
  line-height: 54px;
  border-bottom: 1px solid #e6e6e6;
}
.cell .text {
  font-size: 15px;
  color: rgba(4, 11, 28, 0.75);
}
.photoUrl {
  width: 44px;
  height: 44px;
  border-radius: 50%;
}
.lab {
  text-align: right;
  font-size: 15px;
  color: #040b1c;
  position: relative;
}
.file_box {
  position: absolute;
  right: 0;
  top: 0;
  opacity: 0;
}
.submit_btn {
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 60px;
  background: rgba(255, 255, 255, 1);
  box-shadow: 0px 0px 14px 2px rgba(0, 0, 0, 0.08);
  padding: 10px 16px;
  z-index: 200;
}
.submit_btn a {
  display: block;
  width: 100%;
  height: 40px;
  line-height: 40px;
  color: #fff;
  background: #0076ff;
  border-radius: 20px;
  text-align: center;
  font-size: 16px;
  font-weight: 600;
}
.flex_box {
  display: flex;
  align-items: center;
}
.more {
  width: 11px;
  height: 11px;
  margin-left: 5px;
}
</style>

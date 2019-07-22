<template>
    <div>
      <div class="box">
        <div class="list">
          <span class="span">姓名</span><input v-model="userName" type="text" placeholder="请输入姓名"  placeholder-style="color:#CCCCCC">
        </div>
        <div class="list">
          <span class="span">性别</span>
            <el-radio v-model="radio" label="1" @change="radioVal">男</el-radio>
            <el-radio v-model="radio" label="0" @change="radioVal">女</el-radio>
        </div>
        <div class="list">
          <span class="span">手机号</span><input v-model="phone" type="number" placeholder="请输入手机号" placeholder-style="color:#CCCCCC">
        </div>
        <div class="list">
          <span class="span">身份证</span><input v-model="cardNo" type="number" placeholder="请输入身份证号" placeholder-style="color:#CCCCCC">
        </div>
      </div>


      <div class="btn_bottom flex-b">
        <a class="next_btn" @click="goSave" href="javascript:void(0);">保存</a>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      title: this.$route.query.title,
      msgList: this.$route.query.msgList,
      idList: this.$route.query.idList,
      radio:'0',
      userName:'',
      phone:'',
      cardNo:''
    };
  },

  components: {

  },


  computed: {

  },

  mounted() {
  },

  methods: {
    radioVal() {
      console.log(this.radio);
    },
    checkPhone(phone) {
      let reg = /^1[0-9]{10}$/;
      return reg.test(phone);
    },
    checkCardNo(cardNo){
      let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return idcardReg.test(cardNo);
    },
    goSave() {
      if(!this.userName){
        this.$toast('请输入体检人姓名');
        return false;
      }else if(!this.checkPhone(this.phone)){
        this.$toast('请输入正确的手机号');
        return false;
      }else if(!this.checkCardNo(this.cardNo)){
        this.$toast('请输入正确的身份证号');
        return false;
      }else{
        if(this.msgList){
          this.getUserMsgUpdate();
        }else{
          this.getUserMsgSave();
        }
      }
    },
    //预约信息保存
    getUserMsgSave() {
      const request = {
        reservationUser: {
          userId : this.$store.getters.loginData.userObj.userId.value, //用户ID
          userName : this.userName,
          gender : this.radio,
          mobile : this.phone,
          cardNo : this.cardNo
        }
      };
      this.$store.dispatch("userMsgSave", request).then((data) => {
        if(data.rtnCode == '1'){//信息保存成功
          this.$router.push({
            path: "medicalManList",
            query:{
              idList: this.idList
            }
          })
        }else{
          this.$toast(data.rtnMsg);
        }
      }).catch(error => {
        this.$toast(error.message);
      })
    },
    //预约信息更新-编辑
    getUserMsgUpdate() {
      const request = {
        reservationUser: {
          reserUserInfoId: JSON.parse(this.msgList).reserUserInfoId.value, //预约用户信息ID
          userName : this.userName,
          gender : this.radio,
          mobile : this.phone,
          cardNo : this.cardNo
        }
      };
      this.$store.dispatch("userMsgUpdate", request).then((data) => {
        if(data.rtnCode == '1'){//信息编辑成功
          this.$router.push({
            path: "medicalManList",
            query:{
              idList: this.idList
            }
          })
        }else{
          this.$toast(data.rtnMsg);
        }
      }).catch(error => {
        this.$toast(error.message);
      })
    },

  },

  created() {
    document.title = this.title;
    if(this.msgList){
      let msgList = JSON.parse(this.msgList);
      this.userName = msgList.userName;
      this.radio = msgList.gender;
      this.phone = msgList.mobile;
      this.cardNo = msgList.cardNo;

    }

  },


};
</script>

<style scoped>
  .box{
    margin-bottom: 15px;
    background: #fff
  }
  .list{
    padding: 16px;
    border-bottom: 1px solid rgba(238,238,238,.6);
  }
  .list .span{
    font-size: 16px;
    color: #333;
    width: 20%;
    display: inline-block
  }
  .list input{
    font-size: 16px;
    color: #333;
    max-width: 50%;
  }

  .btn_bottom{
    position: fixed;
    bottom:33px;
    height: 44px;
    width: 100%;
    background: #fff;
    box-sizing: border-box;
  }
  .next_btn{
    display: block;
    width: 91%;
    height: 44px;
    margin: 0 auto;
    background: #0093FF;
    line-height: 44px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
    border-radius: 2px;
  }

</style>

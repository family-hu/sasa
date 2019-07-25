<template>
  <div>
    <div class="cell">
      <div class="flex-b">
        <div class="flex_left">
          <div>
            <ul v-if="orgMsgList.modeId == '8107103' && msgImg.length >= '1' && msgImg.length <= 9">
              <li class="list" v-for="(item,index) in msgImg" :key="index" ><img :src="item"></li>
            </ul>
            <img v-else class="img" :src="msgImg">
          </div>
          <div class="text_box">
            <div class="namecs">{{orgMsgList.name}}<span class="tagChat" v-if="isTalk">问诊中</span></div>
            <div class="titlecs">{{orgMsgList.content}}</div>
          </div>
        </div>
        <span class="time">{{msgTime}}</span>
      </div>
      <div class="other_line"></div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";

export default {
  data() {
    return {
      isTalk: false
    };
  },
  props: {
    orgMsgList: {}
  },

  computed: {
    ...mapGetters(['loginData']),
    msgTime(){
      let timerDate = this.orgMsgList.time;
          timerDate = timerDate.substring(0,19);
          timerDate = timerDate.replace(/-/g,'/');
      let timerStatus = parseInt(new Date(timerDate).getTime()/1000); //消息时间
      let timestamp = parseInt(Date.parse(new Date())/1000); //当前时间
      let data = timestamp - timerStatus;
      if( data >= 86400 && data <= 259200){ //超过1天小于三天
        timerDate = parseInt(data/86400) + '天前'
      }else if(data >= 3600 && data <= 86400){ //超过1小时小于24小时
        timerDate = parseInt(data/3600) + '小时前'
      }else if(data >= 600 && data <= 3600){ //超过10分钟小于1小时
        timerDate = parseInt(data/600) + '分钟前'
      }else if(data < 600){ //小于10分钟
        timerDate = '刚刚'
      }else{
        timerDate = new Date(Date.parse(timerDate)).format('MM-dd');
      }

      return timerDate
    },
    msgImg(){
      let img = imgMap.noticeMsg;
      let arr = this.orgMsgList.headImgList;
      let headImg;
      if(arr.length > 9){
        headImg = arr.slice(0,9);
      }else{
        headImg = arr;
      }

      if(this.orgMsgList.modeId.value == '8107100'){ //系统消息
        img = imgMap.systemMsg
      }else if(this.orgMsgList.modeId.value == '8107101'){ //医院消息
        if(headImg != '' && headImg.length == 1){
          img = headImg
        }else{
          img = imgMap.systemMsg
        }
      }else if(this.orgMsgList.modeId.value == '8107102'){ //医生消息
        if(headImg != '' && headImg.length == 1){
          img = headImg
        }else{
          img = imgMap.familyDoc
        }
      }else if(this.orgMsgList.modeId.value == '8107103'){ //群聊消息
        if(headImg.length >= 1 && headImg.length <= 9){
          img = headImg
        }else{
          img = imgMap.groupDocPatient
        }
      }else if(this.orgMsgList.modeId.value == '8107104'){ //系统通知消息-订单
        img = imgMap.noticeMsg
      }
      return img
    }
  },

  methods: {
    //获取会话状态
    requestImStatus() {
      let request = {
        docId: this.targetId,
        userId: this.loginData.userObj.userId.value
      };
      let vm = this;
      this.$store
        .dispatch("imStatus", request)
        .then(data => {
          if (data.rtnCode == "1") {
            this.isTalk = data.isTalk;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },
  created(){
    this.requestImStatus();
  }
};
</script>

<style scoped>
  .cell{
    background:rgba(255,255,255,1);
  }
  .cell .flex-b{
    padding: 15px 16px;
  }
  .flex_left{
    display: flex;
    align-items: center;
  }
  .text_box{
    margin-left: 10px;
    max-width: 210px;
  }
  .namecs{
    font-size:17px;
    color:#040B1C;
    font-weight:500;
    margin-bottom: 2px;
  }
  .tagChat{
    display: inline-block;
    width: 34px;
    height: 15px;
    border-radius: 2px;
    border:1px solid #FF0000;
    margin-left: 5px;
    color: #FF0000;
    font-size: 10px;
  }

  .titlecs{
    font-size:14px;
    color:rgba(4,11,28,.4);
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .time{
    font-size:12px;
    color:rgba(4,11,28,.2);
  }

  .img{
    width: 50px;
    height: 50px;
  }
  .img_mini{
    width: 17px;
    height: 17px;
    float: left;
  }
  .other_line{
    margin-left: 60px;
    height: 1px;
    background:rgba(4,11,28,.1);
  }
  /* 群头像 */
  ul{
    display: block;
    width: 51px;
    height: 52px;
    border-radius: 2px;
    background: #E6E6E6
}
ul li{
    display: inline-block;
    width: 17px;
    height: 17px;
    float: left;
    overflow: hidden;
    list-style: none;
}
ul li img{
    width: 100%;
    height: 100%;
}
/*1ä¸ª*/
li:only-child{
    width: 100%;
    height: 100%;
}
/*2ä¸ª*/
li:first-child:nth-last-child(2),
li:first-child:nth-last-child(2) + li{
    width: 50%;
    height: 50%;
}
li:first-child:nth-last-child(2) + li {
    margin-left: 50%;
}
/*3ä¸ª*/
li:first-child:nth-last-child(3),
li:first-child:nth-last-child(3) ~ li {
    width: 50%;
    height: 50%;
}
li:first-child:nth-last-child(3) {
    margin-left: 25%;
}
li:first-child:nth-last-child(3) ~ li {
    float: left;
}
/*4ä¸ª*/
li:first-child:nth-last-child(4),
li:first-child:nth-last-child(4) ~ li {
    width: 50%;
    height: 50%;
    float: left;
}
/*5/6ä¸ª*/
li:first-child:nth-last-child(5),
li:first-child:nth-last-child(6){
    width:66.666666%;
    height:66.666666%;
}
li:first-child:nth-last-child(5) ~ li,
li:first-child:nth-last-child(6) ~ li {
    width:33.3333333333%;
    height:33.333333333333%;
}
/* 7ä¸ª 8ä¸ª 9ä¸ª */
li:first-child:nth-last-child(7),
li:first-child:nth-last-child(8),
li:first-child:nth-last-child(9),
li:first-child:nth-last-child(7) ~ li,
li:first-child:nth-last-child(8) ~ li,
li:first-child:nth-last-child(9) ~ li {
    width: 33.333333333333%;
    height: 33.333333333333%;
}
li:first-child:nth-last-child(7) {
    margin-left:33.3333333%;
    margin-right: 33.333333%;
}
li:first-child:nth-last-child(8) {
    margin-left: 16.666666%;
}
.list {
    border: none;
    border-radius: 87% 91% 98% 100%;
    -webkit-transition: all .35s;
    transition: all .35s;
    overflow: hidden;
}
.list:hover {
    border-radius: 95% 70% 100% 80%;
    transform: rotate(-2deg);
}
.list:nth-child(2n+1) {
    border-radius: 59% 52% 56% 59%;
    transform: rotate(-6deg);
}
.list:nth-child(2n+1):hover {
    border-radius: 51% 67% 56% 64%;
    transform: rotate(-4deg);
}
.list:nth-child(3n+2) {
    border-radius: 84% 94% 83% 72%;
    transform: rotate(5deg);
}
.list:nth-child(3n+2):hover {
    border-radius: 69% 64% 53% 70%;
    transform: rotate(0deg);
}
.list:nth-child(5n+3) {
    border-radius: 73% 100% 82% 100%;
    transform: rotate(7deg);
}
.list:nth-child(5n+3):hover {
    border-radius: 73%;
    transform: rotate(7deg);
}
.list:nth-child(7n+5) {
    border-radius: 93% 90% 85% 78%;
    transform: rotate(-2deg);
}
.list:nth-child(7n+5):hover {
    border-radius: 53% 70% 85% 68%;
    transform: rotate(-2deg);
}
.list:nth-child(11n+7) {
    border-radius: 68% 68% 83% 53%;
    transform: rotate(-2deg);
}
.list:nth-child(11n+7):hover {
    border-radius: 58% 98% 78% 83%;
    transform: rotate(3deg);
}
</style>

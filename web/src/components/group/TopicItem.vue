<template>
  <div>
    <div class="topic_box">
      <div class="flex_out">
        <div class="flex_in" v-if="!group">
          <img class="group_head_img" :src="groupImg" alt="">
          <div>
            <p class="group_nick">{{topicItem.groupName}}</p>
          </div>
        </div>
        <div class="flex_in" v-else>
          <img class="head_img" :src="headImg" alt="">
          <div>
            <p class="nick">{{topicItem.nick}}</p>
            <p class="time_create">{{topicItem.time_create}}</p>
          </div>
        </div>
        <div class="isdocComment" v-if="topicItem.isdocComment && group">医生已回复</div>
      </div>
      <p class="descdata">{{topicItem.descdata}}</p>
      <div class="imgList_box">
        <img class="imgList" v-lazy="item" v-for="(item,index) in topicItem.imgList" :key="index" :src="item" alt="">
      </div>
      <div class="flex-b">
        <div class="num_box">
          <span><img src="/static/img/supportNum.png" alt="">{{topicItem.supportNum.value}}</span>
          <span><img src="/static/img/commentNum.png" alt="">{{topicItem.commentNum.value}}</span>
        </div>
        <div class="topic_share"><img src="/static/img/topic_share.png" alt=""></div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../../constant/ConstantConfig.js';
  import imgMap from '../../../static/js/imgmap.js';

  export default {
    props: {
      topicItem: {},
      group:null
    },

    computed: {
      //头像
      headImg() {
        if (this.topicItem.headImg) return this.topicItem.headImg;
        return imgMap.defaultAva;
      },
      groupImg() {
        if (this.topicItem.groupImg) return this.topicItem.groupImg;
        return imgMap.defaultAva;
      },


    },

    methods: {

    }

  }
</script>

<style scoped>
  .topic_box{
    padding: 16px;
    background: #fff;
    margin-bottom: 10px;
  }
  .flex_out{
    display: flex;
    justify-content: space-between;
  }
  .flex_in{
    display: flex;
    align-items: center;
  }
  .head_img{
    width: 36px;
    height: 36px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .nick{
    color:rgba(4,11,28,.6);
    font-size: 14px;
  }
  .time_create{
    color:rgba(4,11,28,.24);
    font-size: 12px;
  }
  .isdocComment{
    color: #0076FF;
    font-size: 13px;
  }
  .descdata{
    color: #040B1C;
    font-size: 15px;
    margin-top: 10px;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .imgList_box{
    display: flex;
    margin-top: 10px;
    margin-left: -10px;
  }
  .imgList{
    max-width: 106px;
    max-height: 106px;
    margin-left: 10px;
    border: 1px solid #ccc;
  }
  .num_box img{
    width: 14px;
    height: 14px;
    margin-top: 10px;
    position: relative;
    top:3px;
    margin-right: 5px;
  }
  .num_box span{
    margin-right: 20px;
    margin-top: 10px;
    color: #040B1C;
    font-size: 13px;
  }
  .topic_share{
    width: 30px;
    height: 30px;
    text-align: right;
  }
  .topic_share img{
    width: 14px;
    height: 14px;
    margin-top: 14px;
  }
  .group_head_img{
    width: 20px;
    height: 20px;
    margin-right: 10px;
  }
  .group_nick{
    color:rgba(4,11,28,.5);
    font-size: 14px;
  }
</style>

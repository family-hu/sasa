<template>
  <div>
    <div class="topic_box">
      <div class="flex_out">
        <div class="flex_in">
          <img class="head_img" :src="imgUrl" alt="">
          <div>
            <p class="nick">{{groupDetailItem.nick}}<span v-if="groupDetailItem.titlesName">{{groupDetailItem.titlesName}}</span></p>
            <p class="time_create">{{groupDetailItem.time_create}}</p>
          </div>
        </div>
      </div>
      <p class="descdata">{{groupDetailItem.descdata}}</p>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
  import * as types from '../../constant/ConstantConfig.js';
  import imgMap from '../../../static/js/imgmap.js';

  export default {
    props: {
      groupDetailItem: {},
    },

    computed: {
      //头像
      imgUrl() {
        if (this.groupDetailItem.headImg) return this.groupDetailItem.headImg;
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
    width: 40px;
    height: 40px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .nick{
    color:rgba(4,11,28,.8);
    font-size: 14px;
  }
  .time_create{
    color:rgba(4,11,28,.32);
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
    text-align: justify;
    padding-left: 52px;
    /* display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis; */
  }
  .nick span{
    margin-left: 10px;
    color:rgba(34,34,34,.8);
    font-size: 12px;
  }
  .line{
    margin: 0 16px;
    height: 1px;
    background: rgba(4,11,28,.1);
    box-sizing: border-box;
  }
</style>

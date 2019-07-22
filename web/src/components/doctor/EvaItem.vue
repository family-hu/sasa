<template>
  <div>
    <div style="background: white; padding: 15px 0">
      <img class="icon" :src="userImg">
      <div style="padding-left: 50px;">
        <div>
          <span class="namecs">{{ userName }}</span>
          <span class="titlecs" style="float: right;opacity:.3;">{{ evaItem.busiName }}&nbsp;{{ evaItem.timeCreate | dataFormat }}</span>
          <el-rate v-model="score" :color="['#FF7A00']" disabled text-color="#ff9900" score-template="{value}" allow-half></el-rate>
          <!-- <span class="jibing" v-for="(draw,index) in evaItem.drawList" :key="index">{{ draw }}</span> -->
        </div>

        <div class="titlecs">{{ evaItem.comment | commentFilter }} </div>
      </div>

    </div>
  </div>

</template>

<script>
  import imgMap from '../../../static/js/imgmap.js';
    export default {
        props: ['evaItem'],
        computed: {
          userImg() {
            if(this.evaItem.userSendObj) {
              if(this.evaItem.userSendObj.photoUrl) {
                return this.evaItem.userSendObj.photoUrl;
              }
            }
            return imgMap.defaultAva
          },
          userName() {
            if(this.evaItem.userSendObj) {
              if (this.evaItem.userSendObj.nickName) return this.evaItem.userSendObj.nickName;
              if (this.evaItem.userSendObj.userName) return this.evaItem.userSendObj.userName;
            }
            return '-'
          },
          score() {
            return parseFloat(this.evaItem.score.value);
          }
        },

      filters: {
          dataFormat(str) {
            let date = new Date(Date.parse(str.replace(/-/g,"/"))).format('MM-dd');
            return date;
          },
         commentFilter(comment) {
            if(!comment) return "无评价内容";
            return comment;
         }
      }

    }
</script>

<style scoped>
  /deep/ .el-rate__icon,.el-icon-star-on{
    font-size: 10px;
    /* color: #FF7A00 !important; */
  }
  .icon{
    width: 40px;
    height: 40px;
    border-radius: 50%;
    float: left;
  }

  .titlecs{
    font-size:14px;
    color:#040B1C;
    text-align: justify;
  }

  .namecs{
    font-size:16px;
    color: #040B1C;
    opacity: .6;
  }

  .jibing{
    display: inline-block;
    font-size: 14px;
    padding: 0 9px;
    text-align: center;
    margin-right: 15px;
    line-height: 30px;
    color: #222222;
    white-space:nowrap;
    margin-top: 10px;
  }

</style>

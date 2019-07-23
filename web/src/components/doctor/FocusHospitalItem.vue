<template>
    <div>
      <div class="cell flex-b">
        <div class="flex_left">
          <img class="img" :src="hospitalDetail.photoUrl">
          <div class="text_box">
            <div>
              <span class="namecs">{{ hospitalDetail.orgNames }}</span>
            </div>
            <span class="titlecs">{{ hospitalDetail.address }}</span>
          </div>
        </div>
        <div class="msg_img" @click.stop="toMsg"><img :src="msgImg" alt=""></div>
      </div>
      <hr class="full-line">
    </div>
</template>

<script>
  import imgMap from "../../../static/js/imgmap.js";
    export default {
        props: ['hospitalDetail'],
        computed: {
          msgImg() {
            if(this.hospitalDetail.mesNum > 0){
              return imgMap.msgDot;
            }
            return imgMap.msgTip;
          }
        },
        methods: {
          toMsg() {
            this.$router.push({
              path: "home",
              query: {
                selected: 'msg',
                orgId: this.hospitalDetail.orgId.value,
                orgNames: this.hospitalDetail.orgNames
              }
            });
          },
        }
    }
</script>

<style scoped>
  .cell{
    background:rgba(255,255,255,1);
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
  }

  .titlecs{
    font-size:14px;
    color:rgba(4,11,28,.5);
  }

  .img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
  }
  .msg_img{
    width: 40px;
    height: 40px;
    line-height: 60px;
    text-align: right;
  }
  .msg_img img{
    width: 22px;
    height: 20px;
  }
</style>

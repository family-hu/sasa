<template>
    <div style="background: white;">

      <div class="flex-b" style="padding: 13px 16px">
        <div class="item_box item_left">
          <img width="69px" height="69px" :src="docImg">
          <div>
            <div class="namecs">{{ reportItem.userName }}</div>
            <div class="titlecs" >疾病：{{ sickName }}</div>
            <div class="titlecs" style="margin-top:2px">{{ time }}</div>
          </div>
        </div>

        <div class="item_box item_right">
          <span class="titlecs" style="font-size:16px">{{ reportStatus }}</span>
          <img :src="arrowImg"/>
        </div>
      </div>

      <hr class="full-line" />

    </div>
</template>

<script>
    import imgMap from '../../../static/js/imgmap.js';
    export default {
        props: ['reportItem'],

        computed: {
          docImg() {
            let imgUrl = imgMap.docMale;
            if (this.reportItem.photoUrl) {
              imgUrl = this.reportItem.photoUrl;
            } else {
              if(this.reportItem.gender) {
                let gender = this.reportItem.gender.value;
                if(gender == "0") {
                  imgUrl = imgMap.docFeMale;
                }
              }
            }
            return imgUrl;
          },

          sickName() {
              if(this.reportItem.disease) return this.reportItem.disease;
              return '暂无';
          },

          time() {
              if(this.reportItem.bd_time) return this.reportItem.bd_time;
              return this.reportItem.gz_time;
          },

          reportStatus() {
              if(this.reportItem.bd_time) return '已报到';
              return '未报到';
          },

          arrowImg() {
            return imgMap.arrowRight;
          },

        }
    }
</script>

<style scoped>
  .item_box{
    display: flex;
    align-items: center;
  }
  .item_left img{
    margin-right: 15px;
  }
  .namecs{
    font-size:16px;
    font-weight: 500;
    color: #000000;
  }

  .titlecs{
    font-size:14px;
    font-weight:normal;
    color:#B3B3B3;
  }
  .item_right img{
    width: 12px;
    height: 16px;
    margin-left: 8px;
  }
</style>

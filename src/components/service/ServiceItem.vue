<template>
  <div>
      <!-- <div class="cell" style="position: relative">
          <img width="76px" height="76px" :src="servImgUrl">

          <div style="float: right; margin-top: 24px;">
            <div class="money">￥{{ serviceItem.price }}</div>
            <div class="moneyold">￥{{ serviceItem.priceOri }}</div>
          </div>

          <div style="display: inline-block; position: absolute; margin-left: 10px; margin-right: 80px;">
              <div class="namecs">{{ serviceItem.servName }}</div>
              <div class="accept">{{ acceptName }}<span v-html="space"></span>{{ orgNames }}</div>
              <div class="shanchang">使用范围：{{ serviceItem.scopeCustom }}</div>
          </div>

        <div style="margin-left: 90px;">
          <span v-for="(tag,index) in tags" class="label"  :style="{color: tagColor(index), 'border-color': tagColor(index) }" :key="index">{{tag}}</span>
        </div>

     </div>
    <hr class="full-line"> -->
    <div class="team_box good_service">
      <div class="li">
        <img :src="servImgUrl" alt="">
        <div style="width:235px">
          <p class="team_name">{{ serviceItem.servName }}</p>
          <p class="team_text">{{ serviceItem.desp}}</p>
          <div class="record_box service_tag">
            <span v-for="(tag,index) in tags" :style="{color: tagColor(index), 'border-color': tagColor(index) }" :key="index">{{tag}}</span>
          </div>
          <div v-if="showPrice" class="price">¥{{serviceItem.price}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../../constant/ConstantConfig.js';
  import imgMap from '../../../static/js/imgmap.js';

  export default {
    props: {
      serviceItem: {},
      showPrice:''
    },

    computed: {
      //服务包图片
      servImgUrl() {
        if (this.serviceItem && this.serviceItem.servImgUrl) {
          return this.serviceItem.servImgUrl;
        }
        if(this.serviceItem && this.serviceItem.servTyp){
          if (this.serviceItem.servType.value == types.PACK_PERSON) {
            return imgMap.packPerson;
          } else if (this.serviceItem.servType.value == types.PACK_TEAM) {
            return imgMap.packTeam;
          }
        }
        return imgMap.packDept;
      },

      acceptName() {
        if(this.serviceItem.servId) {
          if (this.serviceItem.servType.value == types.PACK_PERSON || this.serviceItem.servType.value == types.PACK_TEAM) {
            return this.serviceItem.acceptName;
          }
        }
        return '';
      },

      space() {
        if(this.acceptName) return "&nbsp;&nbsp;";
        return '&nbsp;';
      },

      orgNames() {
        if(!this.serviceItem.servId)  return '';
        if(this.serviceItem.orgObj) return this.serviceItem.orgObj.orgNames;
      },
      //标签分解
      tags() {
        if(this.serviceItem.tags) {
          let tags = this.serviceItem.tags.split(",");
          if(tags && tags.length > 3) {
            tags = tags.splice(0, 3);
          }
          return tags;
        }
        return [];
      }
    },

    methods: {
      //标签颜色
      tagColor(index) {
        let remain = index % 3;
        if(remain == 0) return "#0076FF";
        if(remain == 1) return "#FF001F";
        return "#00B48C";
      }
    }

  }
</script>

<style scoped>
  .good_service .li {
    width: 100%;
    padding: 10px;
    box-sizing: border-box;
    box-shadow: 0px 0px 7px 1px rgba(4, 11, 28, 0.06);
    border-radius: 4px;
    display: flex;
    /* align-items: center; */
    margin-bottom: 10px;
  }
  .good_service .li img {
    width: 72px;
    height: 72px;
    border-radius: 0;
    margin-right: 10px;
  }
  .record_box {
    display: flex;
    margin-top: 5px;
  }
  .record_box p {
    font-size: 10px;
    color: #0076ff;
    margin-right: 10px;
  }
  .record_box p img {
    width: 10px;
    height: 10px;
    margin-right: 3px;
  }
  .team_name {
    font-size: 16px;
    color: #040b1c;
    font-weight: 500;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .team_text {
    font-size: 13px;
    color: #040b1c;
    margin-top: 5px;
    opacity: .5;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .service_tag span {
    margin-right: 10px;
    border-radius: 12px;
    border: 1px solid #0076ff;
    color: #0076ff;
    padding: 0 5px;
    background: #fff;
  }
  .price{
    font-size: 15px;
    color: #FF0000;
    margin-top: 4px;
  }


</style>

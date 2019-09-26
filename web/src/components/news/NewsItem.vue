<template>
    <div>
      <!-- 纯文本 -->
      <div v-if="text" class="list_box">
        <div style="width:100%">
          <div class="name" style="width:100%"> {{ newsItem.title }}</div>
          <div>
            <span class="text">{{ getSrcName }}</span>
            <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
          </div>
        </div>
      </div>
      <!-- 小图+文本 -->
      <div v-if="txtSmallImg" class="list_box">
        <div>
          <div class="name name3" style="width:225px"> {{ newsItem.title }}</div>
          <div class="small_box">
            <span class="text text_hidden">{{ getSrcName }}</span>
            <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
          </div>
        </div>
        <img class="imgnews" :src="imgSrc">
      </div>
      <!-- 大图+文本 -->
      <div v-if="txtBiglImg" class="list_box2">
        <div>
          <div class="name" style="wudth:225px;height:auto;margin-bottom:10px"> {{ newsItem.title }}</div>
          <img class="big_img" :src="imgSrc">
          <div>
            <span class="text">{{ getSrcName }}</span>
            <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
          </div>
        </div>
      </div>
      <!-- 三张图+文本 -->
      <div v-if="txtThreelImg" class="list_box2">
        <div class="name" style="wudth:100%;height:auto;margin-bottom:10px"> {{ newsItem.title }}</div>
        <div class="small_img">
          <div v-for="(item , index) in imgList" :key="index">
            <img :src="item">
          </div>
        </div>
        <div>
          <span class="text">{{ getSrcName }}</span>
          <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
        </div>
      </div>
      <!-- 纯图 -->
      <div v-if="onlyImg" class="list_box2">
        <div class="name" style="wudth:225px;height:auto;margin-bottom:10px"> {{ newsItem.title }}</div>
        <img class="big_img" :src="imgSrc">
        <div class="flex-b">
          <span class="text">{{ getSrcName }}</span>
          <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
        </div>
      </div>
      <!-- 视频+文本 -->
      <div v-if="onlyVedio" class="list_box2">
        <div>
          <div class="name" style="wudth:225px;height:auto;margin-bottom:10px"> {{ newsItem.title }}</div>
          <div class="big_img">
            <img class="big_img" :src="imgSrc">
            <div class="shade">
              <img src="/static/img/play@2x.png" alt="">
            </div>
          </div>
          <div>
            <span class="text">{{ getSrcName }}</span>
            <span class="time" v-if="newsItem.pubTime">{{ newsItem.pubTime | dataFormat }}</span>
          </div>
        </div>
      </div>

    </div>
</template>

<script>
import * as types from "../../constant/ConstantConfig.js";
export default {
  props: {
    newsItem: {},
    imgSrcList: []
  },

  filters: {
    dataFormat(str) {
      let date = new Date(Date.parse(str.replace(/-/g, "/"))).format(
        "yyyy-MM-dd"
      );
      return date;
    }
  },

  computed: {
    // 纯文本：1012101
    text() {
      if (this.newsItem.newsStyle == "1012101") {
        return true;
      } else {
        return false;
      }
    },
    //单小图：1012102
    txtSmallImg() {
      if (this.newsItem.newsStyle == "1012102") {
        return true;
      } else {
        return false;
      }
    },
    //单大图：1012103
    txtBiglImg() {
      if (this.newsItem.newsStyle == "1012103") {
        return true;
      } else {
        return false;
      }
    },
    // 三张图：1012104
    txtThreelImg() {
      if (this.newsItem.newsStyle == "1012104") {
        return true;
      } else {
        return false;
      }
    },
    // 纯图： 1012105
    onlyImg() {
      if (this.newsItem.newsStyle == "1012105") {
        return true;
      } else {
        return false;
      }
    },
    // 视频：1012106
    onlyVedio() {
      if (this.newsItem.newsStyle == "1012106") {
        return true;
      } else {
        return false;
      }
    },

    getSrcName() {
      if (this.newsItem.newsId) {
        if (this.newsItem.srcType.value == types.NEWS_SOURCE_HEALTH) {
          if (this.newsItem.authorObj) {
            return this.newsItem.authorObj.authorName;
          }
        } else if (this.newsItem.srcType.value == types.NEWS_SOURCE_COMPANY) {
          if (this.newsItem.orgObj != null) {
            return this.newsItem.orgObj.orgNames;
          }
        }
      }
      return this.newsItem.srcName;
    },
    imgSrc() {
      if (this.newsItem.newsId) {
        let resList = this.newsItem.resList;
        if (resList && resList.length > 0) {
          for (let i = 0; i < resList.length; i++) {
            let srcItem = resList[i];
            if (srcItem.recType.value == types.REC_NEWS_LIST_IMAGE) {
              return srcItem.imgUrl;
            }
          }
        }
      }
    },
    imgList() {
      if (this.newsItem.newsId) {
        let resList = this.newsItem.resList;
        if (resList && resList.length > 0) {
          let imgSrcList = [];
          for (let i = 0; i < resList.length; i++) {
            let srcItem = resList[i];
            if (srcItem.recType.value == types.REC_NEWS_LIST_IMAGE) {
              imgSrcList.push(srcItem.imgUrl);
            }
          }
          return imgSrcList;
        }
      }
    }

  },
  methods: {

  },
  created() {

  }
};
</script>

<style scoped>
.list_box {
  display: flex;
  justify-content: space-between;
  padding: 16px;
  background: #fff;
  margin-bottom: 10px;
}
.list_box2 {
  padding: 16px;
  background: #fff;
  margin-bottom: 10px;
}
.shade{
  position: absolute;
  top:0;
  bottom: 0;
  left: 0;
  right: 0;
  background: rgba(0, 0, 0, .3);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center
}
.shade img{
  width: 39px;
  height: 39px;
}

.imgnews {
  color: white;
  width: 108px;
  height: 80px;
  margin-left: 10px;
}
.big_img{
  width: 100%;
  height: 200px;
  margin-bottom: 10px;
  position: relative;
}
.name {
  font-weight: 400;
  font-size: 16px;
  color: #222222;
  height: 66px;
  margin-bottom: 4px;
}
.name3{
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.small_box{
  display: flex;
  justify-content: space-between;
}
.text {
  color: #B3B3B3;
  font-size: 12px;
}
.text_hidden{
  width: 130px;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.time {
  color: #B3B3B3;
  font-size: 12px;
  float: right;
}
.small_img{
  display: flex;
  margin-bottom: 10px;
}
.small_img img{
  width: 108px;
  height: 80px;
  margin-right: 10px
}
</style>

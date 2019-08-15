<template>
    <div v-if="newsDetail">
      <div class="main">
        <div class="title">{{newsDetail.title}}</div>
        <div class="title_box">
          <img :src="orgImg" alt="">
          <p class="title_name">{{newsDetail.orgName}}</p>
          <p class="title_time">{{newsDetail.timePublish}}</p>
        </div>
        <div class="center" v-html="newsDetail.content">
          {{newsDetail.content}}
        </div>
      </div>
      <div class="news_share" @click="share"></div>
      <!-- 没有更多提示 -->
      <bottomloadMore></bottomloadMore>
    </div>
</template>

<script>
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from '../../../static/js/imgmap.js';
export default {
  data() {
    return {
      newsDetail: {},
      newsId: this.$route.query.newsId
    };
  },
  components: {
    bottomloadMore: BottomloadMore
  },
  computed: {
    orgImg() {
      if (this.newsDetail.orgUrl) return this.newsDetail.orgUrl;
      return imgMap.orgImg;
    }
  },
  methods: {
    //分享资讯
    share() {
      this.$router.push({
        path: "shareNews",
        query: {
          newsId: this.newsId
        }
      });
    },
    //获取资讯详情
    getNewsDetail() {
      this.$indicator.open();
      let request = {
        newsId: this.newsId
      };
      this.$store
        .dispatch("newsDetail", request)
        .then(data => {
          this.newsDetail = data.data;
        })
        .catch(e => {
          this.$toast(e.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  },
  created() {
    this.getNewsDetail();
  }
};
</script>

<style scoped>
.main {
  padding: 16px;
  background: #fff;
}
.title {
  font-weight: 500;
  color: rgba(4, 11, 28, 1);
  font-size: 20px;
}
.title_box {
  margin-top: 15px;
  display: flex;
  align-items: center;
}
.title_box img {
  width: 34px;
  height: 34px;
  border-radius: 50%;
}
.title_name {
  margin-left: 5px;
  font-size: 13px;
  color: #0076ff;
  width: 150px;
  height: 20px;
  overflow: hidden;
  text-overflow: ellipsis;
  word-break: break-all;
  white-space: nowrap;
}
.title_time {
  color: #b3b3b3;
  font-size: 10px;
  margin-left: 5px;
}
.center {
  margin-top: 20px;
  width: 100%;
}
.center p {
  font-size: 15px;
  color: rgba(4, 11, 28, 0.8);
  line-height: 25px;
  text-align: justify;
}

.center img {
  width: 100%;
  height: 100%;
  margin: 15px 0;
}
.news_share {
  position: fixed;
  right: 16px;
  bottom: 150px;
  width: 56px;
  height: 56px;
  background: url("../../../static/img/news_share.png") no-repeat;
  background-size: 100% 100%;
}
</style>

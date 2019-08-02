<template>
    <div>
      <div class="empty" v-if="commentList.length == 0">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无评价</div>
      </div>
        <div v-else class="package_item" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
          <!-- 评论区域 -->
          <div class="comments_box" v-for="(item,index) in commentList" :key="index">
            <div class="flex-b comments_list">
              <div class="flex_left">
                <img class="icon" v-if="item.photoPath" :src="item.photoPath">
                <img class="icon" v-else :src="userImg">
                <div>
                  <span class="namecs">{{item.nickName}}</span>
                  <el-rate v-model="rateScore" disabled text-color="#ff9900" score-template="{value}" allow-half></el-rate>
                </div>
              </div>
              <div class="times">{{item.createTime}}</div>
            </div>
            <div class="titlecs"> {{item.description}}</div>
            <p class="item_tag">{{item.resourceName}}</p>
          </div>
          <!-- 评论区域 end-->
          <!-- 没有更多提示 -->
          <bottomloadMore v-if="loaded"></bottomloadMore>
        </div>

    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
export default {
  data() {
    return {
      resourceId: this.$route.query.resourceId,
      rateScore:'0',
      commentList:[],
      loading: false,
      page: 1,
      loaded: false ,//是否加载完成
    };
  },

  components: {
    bottomloadMore : BottomloadMore
  },

  computed: {
    userImg() {
      return imgMap.defaultAva
    },
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  mounted() {

  },

  methods: {
    loadMore() {
      if(!this.loaded) {
        this.page++;
        this.getCommentList();
      }
    },
    //评价列表
    getCommentList() {
      this.loading = true;
      const request = {
        pageParam:{
          pageNum: 1,
          pageSize: 10
        },
        appraisal:{
          resourceId: this.resourceId,
          type:'2'
        }

      };
      this.$store.dispatch("shoppingCommentList", request).then((data) => {
        if(data){
          for(let i = 0; i < data.data.appraisalList.length;i++){
            this.commentList.push(data.data.appraisalList[i]);
            this.rateScore = parseInt(data.data.appraisalList[i].score.value);
          }
          this.loaded = (this.commentList.length == data.data.total.value);
          this.loading = false;
        }
      }).catch(error => {
        this.loading = false;
        this.loaded = true;
        this.$toast(error.message);
      })
    },
  },

  created() {
    this.getCommentList();
  },


};
</script>

<style scoped>
ul,
li , h3 ,p {
  padding: 0;
  list-style: none;
  margin: 0;
}

.package_item{
  background: #fff;
  /* margin-bottom: 10px; */
  border-bottom: 1px solid rgba(216, 216, 216, .6);
}
.comments_box{
  background: #fff;
  padding: 16px;
}
.comments_list{
  width: 100%;
}
.flex_left{
  display: flex;
  align-items: center;
}
.icon{
  width: 27px;
  height: 27px;
  border-radius: 50%;
  margin-right: 10px
}
.namecs{
  font-size:14px;
  color:rgba(34,34,34,1);
}
.times{
  color: #B3B3B3;
  font-size: 12px;
}
.titlecs{
  font-size:14px;
  color:rgba(34,34,34,1);
  margin-top: 18px;
}
.item_tag{
  margin-top: 15px;
  font-size: 12px;
  color: #B3B3B3;
}
.empty {
  padding: 50px 40px;
  text-align: center;
}
</style>

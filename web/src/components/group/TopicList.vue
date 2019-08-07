<template>
    <div>
      <div v-if="topicList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <topic-item v-for="(item,index) in topicList" :key="index"  :topicItem="item" :group="group" @click.native="toDetail(index,item)" ></topic-item>
        <!-- 没有更多提示 -->
        <bottomloadMore v-if="loaded && topicList.length > 2"></bottomloadMore>
      </div>
      <div class="empty"  v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无话题</div>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import TopicItem from './TopicItem.vue';
  import BottomloadMore from "../../customComponents/BottomloadMore.vue";
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          topicList: [],
          orgId: this.$route.query.orgId,
          orgNames: this.$route.query.orgNames,
          group: true,
          loading: false,
          page: 1,
          empty: false,
          loaded: false,   //是否加载完成
        }
      },

      props: ['groupid'],

      computed: {
        ...mapGetters(["loginData"]),
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },

      },

      components: {
        topicItem: TopicItem,
        bottomloadMore : BottomloadMore
      },

      methods:{
        //话题详情
        toDetail(index,item) {
          this.$router.push({
            path: "topicDetail",
            query: {
              groupid: this.groupid,
              con_id: item.con_id.value,
              orgNames: this.orgNames,
              orgId: this.orgId
            }
          })
        },
        //加载更多
        loadMore() {
          if(!this.loaded) {
            this.page++;
            this.requestTopicList();
          }
        },
        //话题列表
        requestTopicList() {
          this.$indicator.open();
          this.loading = true;
          let request = {
            userid: this.loginData.userObj.userId.value,
            groupid: this.groupid,
            pageNum: this.page,
            pageSize: 10
          };
          let vm = this;
          this.$store
            .dispatch("bbssubjectlist", request)
            .then(data => {
              if(data.data.length > 0){
                for(let i = 0; i < data.data.length; i++){
                  vm.topicList.push(data.data[i]);
                }
                vm.loaded = vm.topicList.length == data.total;
                vm.loading = false;
              }else{
                this.empty = true;
              }

            })
            .catch(error => {
              vm.loading = false;
              vm.loaded = true;
              vm.$toast(error.message);
            })
            .finally(() => {
              this.$indicator.close();
            });
        }


      },

      created() {
        if(this.loginData.userObj.userId.value){
          this.requestTopicList();
        }else{
          this.myUtils.wxLogin();
        }
      }
    }
</script>

<style scoped>
  .empty{
    top:228px;
  }
  ul,li{ padding:0;list-style:none; margin: 0}

  .org{
    color: white;
    font-weight: 400;
    font-size: 15px;
    position: absolute;
    line-height: 23px;
    text-shadow: 2px 2px 10px black;
    left:55px;
    top: 50px;
  }

  .icon{
    width: 32px;
    height: 32px;
    left: 16px;
    border-radius: 50%;
    overflow: hidden;
    position: absolute;
    top: 60px;
  }
</style>

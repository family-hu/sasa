<template>
    <div>
      <ul v-if="topicList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <topic-item v-for="(item,index) in topicList" :key="index"  :topicItem="item" :group="group" @click.native="toDetail(index,item)" ></topic-item>
      </ul>
      <div class="empty"  v-if="topicList.length == 0">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无话题</div>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import TopicItem from './TopicItem.vue';
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
        topicItem: TopicItem
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
              if(data){
                for(let i = 0; i < data.data.length; i++){
                  vm.topicList.push(data.data[i]);
                }
                vm.loaded = vm.topicList.length == data.total;
                vm.loading = false;
              }

            })
            .catch(error => {
              vm.loading = false;
              vm.loaded = true;
              vm.$toast(error.message);
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
  .empty {
    padding: 50px 40px;
    text-align: center;
  }
</style>

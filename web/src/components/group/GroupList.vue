<template>
    <div>
      <div v-if="topicList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <topic-item v-for="(item,index) in topicList" :key="index"  :topicItem="item" :group="group" @click.native="toDetail(index,item)" ></topic-item>
        <!-- 没有更多提示 -->
        <bottomloadMore v-if="loaded && topicList.length > 3"></bottomloadMore>
      </div>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无关注小组</div>
        <!-- <p class="empty">{{groupTotal}}个小组等你来玩，<br/> 立即选择加入吧！</p> -->
        <!-- <div class="hot_group">
          <h3>热门小组</h3>
          <group-item v-for="(item,index) in groupList" :key="index"  :groupItem="item" @click.native="toDetail(item)" ></group-item>
        </div> -->
        <!-- <div class="change_group"><img src="/static/img/fresh@2x.png" alt="">换一批</div> -->
      </div>
    </div>
</template>
<script>
  import { mapGetters } from "vuex";
  import TopicItem from './TopicItem.vue';
  import GroupItem from './GroupItem.vue';
  import BottomloadMore from "../../customComponents/BottomloadMore.vue";
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          orgId:this.$route.query.orgId,
          orgNames: this.$route.query.orgNames,
          // acceptId: this.$route.query.acceptId,
          // orgInfo: {},
          topicList: [],
          groupList:[],
          group: false,
          groupTotal: [],
          loading: false,
          empty: false,
          loaded: false,   //是否加载完成
        }
      },
      props: ['page'],
      computed: {
        ...mapGetters(["loginData"]),
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },

      },

      components: {
        topicItem: TopicItem,
        groupItem: GroupItem,
        bottomloadMore : BottomloadMore
      },

      methods:{
        //话题详情
        toDetail(index,item) {
          this.$router.push({
            path: "topicDetail",
            query: {
              groupid: item.groupid.value,
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
        //获取小组 - 热门
        requestGroupList() {
          this.loading = true;
          let request = {
            userid: this.loginData.userObj.userId.value,
            pageNum: this.page,
            pageSize:10
          };
          let vm = this;
          this.$store.dispatch("bbsgrouplist", request).then((data) => {
            this.groupTotal = data.total;
            // vm.loaded = vm.groupList.length == data.total;
            vm.loading = false;
          }).catch(error => {
            vm.loading = false;
            // vm.loaded = true;
            this.$toast(error.message);
          });
        },
        //话题列表
        requestTopicList() {
          this.$indicator.open();
          this.loading = true;
          let request = {
            orgId: this.orgId,
            userid: this.loginData.userObj.userId.value,
            // groupid: this.groupid,
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
              this.empty = true;
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
    top:44px
  }
  .hot_group{
    background: #fff;
    width: 100%;
  }
  .hot_group h3{
    width: 100%;
    padding-top: 14px;
    color: #040B1C;
    font-size: 15px;
    font-weight: 500;
    text-align: center;
  }
  .change_group {
    width: 100%;
    text-align: center;
    background: #fff;
    padding:15px 0;
    color: #0076FF;
    font-size: 13px;
  }
  .change_group img{
    width: 13px;
    height: 13px;
    position: relative;
    top: 3px;
    margin-right: 5px;
  }
</style>

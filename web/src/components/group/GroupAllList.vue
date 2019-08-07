<template>
    <div>
      <!-- <div class="seach_box"><input type="text" placeholder="搜索你感兴趣的小组" placeholder-style="color:rgba(4,11,28,.4);"></div> -->
      <ul v-if="groupList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <group-item v-for="(item,index) in groupList" :key="index"  :groupItem="item"></group-item>
      </ul>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无小组</div>
      </div>
    </div>
</template>
<script>
  import { mapGetters } from 'vuex';
  import TopicItem from './TopicItem.vue';
  import GroupItem from './GroupItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          orgId: this.$route.query.orgId,
          orgNames: this.$route.query.orgNames,
          groupList:[],
          loading: false,
          empty: false,
          loaded: false,   //是否加载完成
        }
      },
      props: ['page'],
      computed: {
        ...mapGetters(['loginData']),
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },

      },

      components: {
        topicItem: TopicItem,
        groupItem: GroupItem
      },

      methods:{
        //加载更多
        loadMore() {
          //暂时未做分页，返回无total
          // if(!this.loaded) {
          //   this.paga++;
          //   this.requestGroupList();
          // }
        },

        requestGroupList() {
          this.$indicator.open();
          this.loading = true;
          let request = {
            userid: this.loginData.userObj.userId.value,
            orgId: this.orgId,
            // pageNum: this.page,
            // pageSize:10
          };
          let vm = this;
          this.$store.dispatch("bbsOrgGroupList", request).then((data) => {
            if(data.length > 0){
              this.groupList = data;
              // vm.loaded = vm.groupList.length == data.total;
              vm.loading = false;
            }else{
              this.empty = true;
            }

          }).catch(error => {
            this.empty = true;
            vm.loading = false;
            // vm.loaded = true;
            this.$toast(error.message);
          })
          .finally(() => {
            this.$indicator.close();
          });
        },

      },

      created() {
        if(this.loginData.userObj.userId.value){
          this.requestGroupList();
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
  .seach_box{
    width: 100%;
    background: #fff;
    padding: 16px 16px 0 16px;
    box-sizing: border-box;
  }
  .seach_box input{
    width: 100%;
    height: 36px;
    line-height: 36px;
    padding: 0 15px;
    color: #040B1C;
    font-size: 14px;
    background:rgba(4,11,28,.0575);
    border-radius: 4px;
    box-sizing: border-box;
  }
</style>

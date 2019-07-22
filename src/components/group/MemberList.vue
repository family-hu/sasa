<template>
    <div>
      <div class="main_list">
        <h3 class="ser_title">服务团队（{{docNum}}）</h3>
        <div class="doc_list" v-for="(item,index) in docList" :key="index">
          <img @click="goDocdetail(item)" v-if="item.headImg" :src="item.headImg" alt="">
          <img @click="goDocdetail(item)" v-else :src="docImgUrl" alt="">
          <div>
            <p class="doc_name">{{item.nick}}<span v-if="item.teamleader">队长</span></p>
            <p class="doc_desp">{{item.departmentName}} | {{item.titlesName}}</p>
          </div>
        </div>
      </div>
      <div class="main_list">
        <h3 class="ser_title">患者（{{memNum}}）</h3>
        <!-- <ul v-if="memberList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false"> -->
          <member-item v-for="(item,index) in memberList" :key="index"  :memberItem="item"></member-item>
        <!-- </ul> -->
      </div>

      <!-- <div class="empty"  v-if="memberList.length == 0">
        <img :src="consultationEmpty" width="144px" height="136px">
        <div style="font-size: 15px;margin-top: 10px;color:#b3b3b3">暂无成员</div>
      </div> -->
    </div>
</template>

<script>
  import MemberItem from './MemberItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          memberList: [],
          docList: [],
          loading: false,
          page: 1,
          loaded: false,   //是否加载完成
        }
      },

      props:['groupid'],

      computed: {
        //头像
        docImgUrl() {
          return imgMap.defaultAva;
        },
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },
        //服务人数
        docNum() {
          if (this.docList.length > 0) return this.docList.length;
          return '0';
        },
        //患者人数
        memNum() {
          if (this.memberList.length > 0) return this.memberList.length;
          return '0';
        }

      },

      components: {
        memberItem: MemberItem
      },

      methods:{
        // loadMore() {
        //   if(!this.loaded) {
        //     this.page++;
        //     this.requestMemberList();
        //   }
        // },
        //成员列表
        requestMemberList() {
          this.loading = true;
          let request = {
            groupid: this.groupid,
          };
          let vm = this;
          this.$store
            .dispatch("bbsgroupmemlist", request)
            .then(data => {
              if(data){
                let arr = data.docdata;
                vm.docList = arr.sort(this.compare('teamleader'));

                for(let i = 0; i < data.userdata.length; i++){
                  vm.memberList.push(data.userdata[i]);
                }
                // vm.loaded = vm.memberList.length == data.total;
                vm.loading = false;
              }

            })
            .catch(error => {
              vm.loading = false;
              // vm.loaded = true;
              vm.$toast(error.message);
            });
        },
        compare(property){
          return function(a,b){
            var value1 = a[property];
            var value2 = b[property];
            return value1 < value2;
          }
        },
        goDocdetail(item) {
          this.$router.push({
            path: "doctorDetail",
            query: { userId: item.userid.value }
          });
        }

      },

      created() {
        if(this.groupid){
          this.requestMemberList();
        }


      }
    }
</script>

<style scoped>
  .empty {
    padding: 50px 40px;
    text-align: center;
  }
  .ser_title{
    font-size: 16px;
    color: #040B1C;
    font-weight: 500;
    padding-top: 16px;
  }
  .doc_list{
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    border-bottom:1px solid rgba(4,11,28,.1);
  }
  .doc_list:last-child{
    border: none;
  }
  .doc_list img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .main_list{
    padding: 0 16px;
    background: #fff;
    margin-bottom: 10px;
  }
  .doc_name{
    color: #040B1C;
    font-size: 16px;
    font-weight: 500;
    margin-bottom: 2px;
  }
  .doc_name span{
    background:rgba(0,118,255,.06);
    border-radius: 12px;
    color: #0076FF;
    font-size: 10px;
    margin-left: 10px;
    padding: 0 7px;
    position: relative;
    top:-1px;
  }
  .doc_desp{
    color:rgba(4,11,28,.5);
    font-size: 13px;
  }
</style>

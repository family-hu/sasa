<template>
    <div>
      <img width="100%" height="122px" :src="orgPubImg" v-if="orgId">
      <img width="30px" height="30px" class="icon" :src="orgImg" v-if="orgId">
      <p class="org" v-if="orgId">{{ orgInfo.orgNames }}</p>

      <ul style="padding: 0 16px" v-if="serviceList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
        <service-item v-for="item in serviceList" :key="item.servId.value" :showPrice="true" :serviceItem="item" @click.native="toDetail(item)" ></service-item>
      </ul>
      <div class="empty"  v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无服务包</div>
      </div>
    </div>
</template>

<script>
  import ServiceItem from './ServiceItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          orgId: this.$route.query.orgId,
          acceptId: this.$route.query.acceptId,
          orgInfo: {},
          serviceList: [],
          loading: false,
          page: 1,
          empty: false,
          loaded: false,   //是否加载完成
        }
      },

      computed: {
        orgPubImg() {
          if(this.orgInfo.orgPubUrl) return this.orgInfo.orgPubUrl;
          return imgMap.orgPubImg;
        },
        orgImg() {
          if(this.orgInfo.photoUrl) return this.orgInfo.photoUrl;
          return imgMap.orgImg;
        },
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },

      },

      components: {
        serviceItem: ServiceItem
      },

      methods:{
        toDetail(serviceDetail) {
          this.$router.push({path: "serviceDetail", query: { servId: serviceDetail.servId.value}})
        },

        loadMore() {
          if(!this.loaded) {
            this.requestServiceList();
          }
        },

        requestServiceList() {
          this.$indicator.open();
          this.loading = true;
          let request = {acceptId:this.acceptId, ishowDraft:0, orgId: this.orgId, pageNum: this.page, pageSize:10};
          let vm = this;
          this.$store.dispatch("servInfoList", request).then((serviceList) => {
            vm.page++;
            if(serviceList.length > 0) {
              for(let i = 0; i < serviceList.length; i++) {
                vm.serviceList.push(serviceList[i]);
              }
              vm.loaded = (serviceList.length != 10);
              vm.loading = false;
            } else {
              this.empty = true;
            }
          }).catch(error => {
            vm.loading = false;
            vm.loaded = true;
            this.$toast(error.message);
          })
          .finally(() => {
            this.$indicator.close();
          });
        },

        requestOrgInfo() {
           let vm = this;
           let request = {orgId: this.orgId};
            this.$store.dispatch("orgDetail", request).then((orgInfo) => {
              vm.orgInfo = orgInfo;
            }).catch(error => {
              this.$toast(error.message);
            });
        }

      },

      created() {
        this.requestServiceList();
        if(this.orgId) {
          this.requestOrgInfo();
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
</style>

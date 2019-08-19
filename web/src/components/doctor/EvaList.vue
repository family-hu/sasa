<template>
  <div>
    <ul class="eva_box" v-if="evaList.length > 0" v-infinite-scroll="loadMore" infinite-scroll-disabled="loading" infinite-scroll-distance="10" infinite-scroll-immediate-check="false">
      <eva-item v-for="item in evaList" :key="item.evaId.value" :evaItem="item" ></eva-item>
    </ul>
    <div class="empty" v-if="evaList.length == 0">
      <img :src="consultationEmpty">
      <div>暂无评价</div>
    </div>
  </div>
</template>

<script>
  import EvaItem from './EvaItem.vue';
  import imgMap from '../../../static/js/imgmap.js';
    export default {
      data() {
        return {
          evaList: [],
          loading: false,
          page: 1,
          loaded: false,   //是否加载完成
          drId: this.$route.query.drId,
        }
      },
      components: {
        evaItem: EvaItem
      },
      computed: {
        consultationEmpty() {
          return imgMap.consultationEmpty;
        },
      },
      methods:{
        loadMore() {
          if(!this.loaded) {
            this.requestEvaList();
          }
        },

        requestEvaList() {
          this.loading = true;
          let request = {busiId:0, busiType:1000106105, userTo:this.drId, pageNum: this.page, pageSize:10}
          let vm = this;
          this.$store.dispatch("evaList", request).then((data) => {
            vm.page++;
            if(data.evaList) {
              for(let i = 0; i < data.evaList.length; i++) {
                vm.evaList.push(data.evaList[i]);
              }
            }
            vm.loaded = vm.evaList.length == data.total;
            vm.loading = false;
          }).catch(error => {
            vm.loading = false;
            vm.loaded = true;
            this.$toast(error.message);
          });
        }
      },
      created() {
        this.requestEvaList();
      }
    }
</script>

<style scoped>
  ul,li{ padding:0;list-style:none; margin: 0}
  .eva_box{
    padding: 0 16px;
    background: #fff;
  }
</style>

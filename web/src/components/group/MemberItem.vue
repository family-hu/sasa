<template>
  <div>
    <div class="doc_list">
      <img :src="memImgUrl" alt="">
      <div>
        <p class="doc_name">{{memberItem.nick}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import * as types from '../../constant/ConstantConfig.js';
  import imgMap from '../../../static/js/imgmap.js';

  export default {
    props: {
      memberItem: {},
    },

    computed: {
      //头像
      memImgUrl() {
        if (this.memberItem.headImg) return this.memberItem.headImg;
        return imgMap.defaultAva;
      },



    },

    methods: {

    }

  }
</script>

<style scoped>
  .doc_list{
    margin-top: 10px;
    display: flex;
    align-items: center;
    padding-bottom: 16px;
    border-bottom:1px solid rgba(4,11,28,.1);
  }
  .doc_list img{
    width: 50px;
    height: 50px;
    border-radius: 50%;
    margin-right: 12px;
  }
  .doc_name{
    color: #040B1C;
    font-size: 16px;
    font-weight: 500;
  }

</style>

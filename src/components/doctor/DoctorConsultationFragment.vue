<template>
  <div>
    <focus-doctor-list></focus-doctor-list>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex';
  import FocusDoctorList from './FocusDoctorList.vue';
  import imgMap from '../../../static/js/imgmap.js';
  export default {
    data() {
      return {
      }
    },
    components: {
      focusDoctorList: FocusDoctorList,
    },
    computed: {
      ...mapGetters(['loginData', 'loginUrl']),
    },
    created() {
      // const userInfo = this.loginData.userObj;
      // if(!userInfo) {
      //   this.myUtils.wxLogin();
      // }
    }
  }
</script>

<style scoped>
/deep/ .mint-navbar .mint-tab-item{
  font-size: 14px;
  font-weight: 600;
}
</style>

<template>
    <div>
      <div v-if="doctorList.length > 0">
        <doctor-item v-for="doctorDetail in doctorList" :key="doctorDetail.userId.value" :doctorDetail="doctorDetail"></doctor-item>
        <!-- 没有更多提示 -->
        <bottomloadMore v-if="doctorList.length > 3"></bottomloadMore>
      </div>
      <div class="empty empty_tab_top" v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无关注医生，请扫码医生二维码进行关注</div>
      </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import DoctorItem from "./FocusDoctorItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      doctorList: [],
      orgId: this.$route.query.orgId,
      empty: false
    };
  },

  components: {
    doctorItem: DoctorItem,
    bottomloadMore : BottomloadMore
  },
  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },
  methods: {
    requestDoctorList() {
      this.$indicator.open();
      let request = {
        busiType: 1000100105,
        favType: 1014102,
        userId: this.loginData.userObj.userId.value
      };
      let vm = this;
      this.$store
        .dispatch("myFavList", request)
        .then(data => {
          if (data.expertList.length > 0) {
            for (let i = 0; i < data.expertList.length; i++) {
              vm.doctorList.push(data.expertList[i]);
            }
          }else{
            vm.empty = true;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        })
        .finally(() => {
          this.$indicator.close();
        });
    }
  },

  created() {
    const userInfo = this.loginData.userObj;
    if (userInfo) {
      this.requestDoctorList();
    } else {
      this.myUtils.wxLogin();
    }
  }
};
</script>

<style scoped>
</style>

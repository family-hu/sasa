<template>
    <div>
      <div class="empty" v-if="empty">
        <img :src="consultationEmpty">
        <div>暂无关注医院，请扫码医生二维码进行关注</div>
      </div>
      <div v-if="hospitalList.length > 0">
        <focus-hospital-item v-for="hospital in hospitalList" :key="hospital.orgId.value" :hospitalDetail="hospital" @click.native="toHospital(hospital)"></focus-hospital-item>
        <!-- 没有更多提示 -->
        <bottomloadMore v-if="hospitalList.length > 6"></bottomloadMore>
      </div>
    </div>
</template>
 <script>
import { mapGetters } from "vuex";
import FocusHospitalItem from "./FocusHospitalItem.vue";
import BottomloadMore from "../../customComponents/BottomloadMore.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      hospitalList: [],
      empty: false
    };
  },

  components: {
    focusHospitalItem: FocusHospitalItem,
    bottomloadMore : BottomloadMore
  },
  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },
  methods: {
    toHospital(hospital) {
      sessionStorage.setItem('selected','home');
      this.$router.push({
        path: "home",
        query: {
          orgId: hospital.orgId.value,
          focusEnter: true,
          orgNames: hospital.orgNames
        }
      });
    },

    requestHospitalList() {
      this.$indicator.open();
      let vm = this;
      const request = {
        busiType: 1000100103,
        favType: 1014102,
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("myFavList", request)
        .then(data => {
          if (data.orgList.length > 0) {
            for (let i = 0; i < data.orgList.length; i++) {
              vm.hospitalList.push(data.orgList[i]);
            }
          }else{
            this.empty = true;
          }
        })
        .catch(error => {
          this.empty = true;
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
      this.requestHospitalList();
    } else {
      this.myUtils.wxLogin();
    }
  }
};
</script>

<style scoped>
</style>

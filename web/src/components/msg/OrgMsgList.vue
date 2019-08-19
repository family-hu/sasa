<template>
    <div>
        <div v-if="orgMsgList.length > 0">
          <org-msg-item v-for="(message,index) in orgMsgList" :key="index" :index="index" :orgMsgList="message" @click.native="toDetail(message)"></org-msg-item>
        </div>
        <div class="empty" v-if="empty">
          <img :src="consultationEmpty">
          <div>暂无消息记录</div>
        </div>
    </div>
</template>

<script>
import { mapGetters } from "vuex";
import OrgMsgItem from "./OrgMsgItem.vue";
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      orgMsgList: [],
      orgId: this.$route.query.orgId,
      empty: false
    };
  },

  components: {
    orgMsgItem: OrgMsgItem
  },
  computed: {
    ...mapGetters(["loginData"]),
    consultationEmpty() {
      return imgMap.consultationEmpty;
    }
  },

  methods: {
    //消息列表
    toDetail(item) {
      this.$router.push({
        path: "doctorMsgList",
        query: {
          orgId: this.orgId,
          modeId: item.modeId.value,
          title: item.modeDesc,
          targetId:item.targetId.value
        }
      });
    },
    requestMsgList() {
      this.$indicator.open();
      let vm = this;
      const request = {
        orgId: this.orgId,
        userId: this.loginData.userObj.userId.value
      };
      this.$store
        .dispatch("sysOrgModeList", request)
        .then(data => {
          if (data.mesList.length > 0) {
            for (let i = 0; i < data.mesList.length; i++) {
              vm.orgMsgList.push(data.mesList[i]);
            }
          }else{
            this.empty = true;
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
    this.requestMsgList();
  }
};
</script>

<style scoped>
  .page-wrap{
    overflow: auto
  }
</style>


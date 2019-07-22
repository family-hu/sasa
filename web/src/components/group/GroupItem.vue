<template>
  <div>
    <div class="topic_box">
      <div class="flex_in" @click="toDetail">
          <img class="head_img" v-lazy="imgUrl" :src="imgUrl" alt="">
          <div style="width:80%">
            <p class="nick">{{groupItem.name}}</p>
            <p class="descdata">{{groupItem.desc}}</p>
            <div class="group_num">
              <span><img src="/static/img/member@2x.png" alt="">{{memNum}}</span>
              <span><img src="/static/img/topic@2x.png" alt="">{{subjectNum}}</span>
            </div>
          </div>
      </div>
      <div>
        <a v-if="groupItem.isfollow" class="join_btn in_join_btn"  href="javascript:void(0);">已加入</a>
        <a v-else class="join_btn" @click="goIsfollow" :disabled="isFav" href="javascript:void(0);">+加入</a>
      </div>
    </div>
    <div class="line"></div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";

export default {
  data() {
    return {
      isFav: false,
      orgId: this.$route.query.orgId,
      orgNames: this.$route.query.orgNames
    };
  },
  props: {
    groupItem: {}
  },

  computed: {
    ...mapGetters(['loginData']),
    //头像
    imgUrl() {
      if (this.groupItem.img) return this.groupItem.img;
      return imgMap.defaultAva;
    },
    memNum() {
      if (this.groupItem.memNum) return this.groupItem.memNum.value;
      return "0";
    },
    subjectNum() {
      if (this.groupItem.subjectNum) return this.groupItem.subjectNum.value;
      return "0";
    }
  },

  methods: {
    //小组详情
    toDetail() {
      this.$router.push({
        path: "groupDetail",
        query: {
          groupid: this.groupItem.groupid.value,
          orgId: this.orgId,
          orgNames: this.orgNames
        }
      });
    },
    //加入小组
    goIsfollow() {
      this.isFav = true;
      let type = true;
      if (this.isFav) {
        let request = {
          groupid: this.groupItem.groupid.value,
          userid: this.loginData.userObj.userId.value,
          follow: type
        };
        let vm = this;
        this.$store
          .dispatch("addGroupmem", request)
          .then(data => {
            if (data.rtnCode == "1") {
              this.groupItem.isfollow = type;
              if (type == true) {
                this.$toast("已加入小组");
              }
            }
            setTimeout(() => {
              this.isFav = false;
            }, 2000);
          })
          .catch(error => {
            this.$toast(error.message);
          });
      }
    }
  }
};
</script>

<style scoped>
.topic_box {
  padding: 16px;
  display: flex;
  justify-content: space-between;
  background: #fff;
}
.flex_in {
  display: flex;
  align-items: center;
  width: 80%;
}
.head_img {
  width: 60px;
  height: 60px;
  border-radius: 4px;
  margin-right: 12px;
}
.nick {
  color: #040b1c;
  font-size: 16px;
}
.descdata {
  color: rgba(4, 11, 28, 0.5);
  font-size: 14px;
  margin-top: 3px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
}
.line {
  margin: 0 16px;
  height: 1px;
  background: rgba(4, 11, 28, 0.1);
  box-sizing: border-box;
}
.group_num {
  margin-top: 3px;
}
.group_num span {
  color: #0076ff;
  margin-right: 12px;
}
.group_num img {
  width: 10px;
  height: 10px;
  margin-right: 5px;
  position: relative;
  top: 1px;
}
.join_btn {
  display: block;
  width: 50px;
  height: 26px;
  background: #0076ff;
  color: #fff;
  font-size: 12px;
  font-weight: 500;
  padding: 0px 5px;
  box-sizing: border-box;
  text-align: center;
  line-height: 26px;
  border-radius: 13px;
}
.in_join_btn {
  color: rgba(4, 11, 28, 0.4);
  font-size: 12px;
  background: #fff;
}
</style>

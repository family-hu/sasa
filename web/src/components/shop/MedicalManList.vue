<template>
    <div>
      <div class="container">
        <div style="overflow: hidden;">
          <div class="list-item"  v-for="(item,index) in msgList" :key="index" data-type="0">
            <div class="list-box" @touchstart.capture="touchStart" @touchend.capture="touchEnd">
                <div class="list flex-b">
                  <div style="width:80%" v-if="from == 'mine' && from">
                    <p class="name">{{item.userName}}<span v-if="item.gender == '0'">女</span><span v-if="item.gender == '1'">男</span></p>
                    <p class="phone">手机号：{{item.mobile}}</p>
                    <p class="code">身份证：{{item.cardNo}}</p>
                  </div>
                  <div style="width:80%" v-else @click="selectedList(index)">
                    <p class="name">{{item.userName}}<span v-if="item.gender == '0'">女</span><span v-if="item.gender == '1'">男</span></p>
                    <p class="phone">手机号：{{item.mobile}}</p>
                    <p class="code">身份证：{{item.cardNo}}</p>
                  </div>
                  <div class="editor" @click="editor(index)">编辑</div>
                </div>
            </div>
            <div class="delete" @click="deleteItem" :data-index="index">删除</div>
          </div>
      </div>
     </div>
      <a href="javascript:void(0);" class="add_btn" @click="add">新增体检人信息</a>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      //商城
      idList: this.$route.query.idList,
      packDetailsId: this.$route.query.packDetailsId,
      serviceCompanyId: this.$route.query.serviceCompanyId,
      //来源
      from: this.$route.query.from,
      //服务包
      orgId: this.$route.query.orgId,
      acceptUser: this.$route.query.acceptUser,
      servId: this.$route.query.servId,
      busiId: this.$route.query.busiId,
      // startX: 0, //触摸位置
      // endX: 0, //结束位置
      // moveX: 0, //滑动时的位置
      // disX: 0, //移动距离
      startX: 0,
      endX: 0,
      // deleteSlider: "",
      msgList: []
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    //滑动开始
    touchStart(e) {
      // 记录初始位置
      this.startX = e.touches[0].clientX;
    },
    //滑动结束
    touchEnd(e) {
      // 当前滑动的父级元素
      let parentElement = e.currentTarget.parentElement;
      // 记录结束位置
      this.endX = e.changedTouches[0].clientX;
      // 左滑
      if (parentElement.dataset.type == 0 && this.startX - this.endX > 30) {
        this.restSlide();
        parentElement.dataset.type = 1;
      }
      // 右滑
      if (parentElement.dataset.type == 1 && this.startX - this.endX < -30) {
        this.restSlide();
        parentElement.dataset.type = 0;
      }
      this.startX = 0;
      this.endX = 0;
    },
    //判断当前是否有滑块处于滑动状态
    checkSlide() {
      let listItems = document.querySelectorAll(".list-item");
      for (let i = 0; i < listItems.length; i++) {
        if (listItems[i].dataset.type == 1) {
          return true;
        }
      }
      return false;
    },
    //复位滑动状态
    restSlide() {
      let listItems = document.querySelectorAll(".list-item");
      // 复位
      for (let i = 0; i < listItems.length; i++) {
        listItems[i].dataset.type = 0;
      }
    },
    //删除
    deleteItem(e) {
      console.log(e);
      console.log("刪除");
      // 当前索引
      let index = e.currentTarget.dataset.index;
      // 复位
      this.restSlide();
      // 删除
      this.getUserMsgDelete(index);
    },
    //预约信息删除
    getUserMsgDelete(index) {
      const request = {
        reservationUser: {
          reserUserInfoId: this.msgList[index].reserUserInfoId.value
        }
      };
      this.$store
        .dispatch("userMsgDelete", request)
        .then(data => {
          if(data.rtnCode == '1'){//信息删除成功
            this.msgList.splice(index, 1);
            this.$toast('删除成功');
            this.getUserMsgList();//更新信息列表
          }else{
            this.$toast(data.rtnMsg);
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
    //编辑
    editor(index) {
      this.$router.push({
        path: "medicalManItem",
        query: {
          title: "编辑联系人",
          msgList: JSON.stringify(this.msgList[index]),
          idList: this.idList,
          packDetailsId: this.packDetailsId,
          serviceCompanyId: this.serviceCompanyId,
          from: this.from,
          orgId: this.orgId,
          acceptUser: this.acceptUser,
          servId: this.servId,
          busiId: this.busiId,
        }
      });
    },
    //新增
    add() {
      this.$router.push({
        path: "medicalManItem",
        query: {
          title: "新增联系人" ,
          idList: this.idList,
          packDetailsId: this.packDetailsId,
          serviceCompanyId: this.serviceCompanyId,
          from: this.from,
          orgId: this.orgId,
          acceptUser: this.acceptUser,
          servId: this.servId,
          busiId: this.busiId
        }
      });
    },
    //选中地址
    selectedList(index) {
      if(this.from == 'service'){//服务包
        this.$router.push({
          path: "serviceSubmitPay",
          query: {
            msgList: JSON.stringify(this.msgList[index]),
            orgId: this.orgId,
            acceptUser: this.acceptUser,
            servId: this.servId,
            busiId: this.busiId
          }
        });
      }else{
        this.$router.push({//商城
          path: "confirmOrder",
          query: {
            msgList: JSON.stringify(this.msgList[index]),
            idList: this.idList,
            packDetailsId: this.packDetailsId,
            serviceCompanyId: this.serviceCompanyId,
          }
        });
      }

    },
    //预约信息列表
    getUserMsgList() {
      const request = {
        reservationUser: {
          userId: this.$store.getters.loginData.userObj.userId.value
        }
      };
      this.$store
        .dispatch("userMsgList", request)
        .then(data => {
          if (data) {
            this.msgList = data.data.reservationUserList;
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    }
  },

  created() {
    this.getUserMsgList();
    console.log(this.from,'==this.from');
  }
};
</script>

<style scoped>
body {
  margin: 0 auto !important;
}
.container {
  padding-bottom: 53px;
}

.list-item {
  position: relative;
  height: 91px;
  -webkit-transition: all 0.2s;
  transition: all 0.2s;
}

.list-item[data-type="0"] {
  transform: translate3d(0, 0, 0);
}

.list-item[data-type="1"] {
  transform: translate3d(-80px, 0, 0);
}

.list-item:after {
  content: " ";
  position: absolute;
  left: 0;
  bottom: 0;
  right: 0;
  height: 1px;
  border-bottom: 1px solid rgba(238, 238, 238, 0.6);
  color: #ccc;
  -webkit-transform-origin: 0 100%;
  transform-origin: 0 100%;
  -webkit-transform: scaleY(0.5);
  transform: scaleY(0.5);
  z-index: 2;
}

.list-box {
  background: #fff;
  display: flex;
  align-items: center;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  justify-content: flex-end;
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  font-size: 0;
  padding: 10px 0;
}

.list-item .delete {
  width: 91px;
  line-height: 91px;
  height: 100%;
  background: #ff0000;
  font-size: 14px;
  color: #fff;
  text-align: center;
  position: absolute;
  top: 0;
  right: -91px;
}
.list {
  padding: 12px 16px;
  box-sizing: border-box;
  width: 100%;
}
.name {
  font-size: 16px;
  color: #222;
}
.name span {
  margin-left: 13px;
}
.phone,
.code {
  font-size: 13px;
  color: #666;
  margin-top: 6px;
}
.editor {
  display: block;
  font-size: 14px;
  color: #b3b3b3;
  height: 36px;
  width: 40px;
  line-height: 36px;
  padding-left: 10px;
  border-left: 1px solid rgba(238, 238, 238, 0.6);
}
.add_btn {
  display: block;
  position: fixed;
  bottom: 0;
  width: 100%;
  color: #fff;
  font-size: 16px;
  font-weight: 500;
  background: #0093ff;
  height: 53px;
  line-height: 53px;
  text-align: center;
  z-index: 1000;
}
</style>

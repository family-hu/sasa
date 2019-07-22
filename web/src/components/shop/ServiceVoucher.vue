<template>
  <div>
    <div class="main" v-if="consumeList">
      <p>姓名：{{consumeList.name}}</p>
      <p>性别：{{consumeList.genderTxt}}</p>
      <p>手机号：{{consumeList.mobile}}</p>
      <p>身份证：{{consumeList.cardId}}</p>
      <div class="flex-b box">
        <div class="num">券码：{{consumeList.serviceCode}}</div>
        <div class="state">{{consumeList.serviceStatusTxt}}</div>
      </div>
    </div>
    <div class="query_packer" v-if="productList.length > 0">
      <table>
        <thead>
          <td width="30%"><div>项目包</div></td>
          <td width="30%"><div>单项目</div></td>
          <td width="20%"><div>已使用次数</div></td>
          <td width="20%"><div>剩余次数</div></td>
        </thead>
        <tbody>
          <tr v-for="(item,index) in productList" :key="index">
            <td width="30%" class="item item2"><div>{{item.name}}</div></td>
            <td width="30%" class="item item2">
              <tr class="items" v-for="(items,index) in item.projectList" :key="index">
                <td><div>{{items.projectName}}</div></td>
              </tr>
            </td>
            <td width="20%" class="last_item">
              <tr class="items items2" v-for="(items,index) in item.projectList" :key="index">
                <td><div>{{items.executionAmount.value}}</div></td>
              </tr>
            </td>
            <td width="20%" class="last_item">
              <tr class="items items2" v-for="(items,index) in item.projectList" :key="index">
                <td><div>{{items.surplusAmount.value}}</div></td>
              </tr>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      consumeList: [],
      orderId: this.$route.query.orderId,
      productList:[],
    };
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    //确认信息-订单详情
    getShopOrderDetail() {
      let request = {
        orderId: this.orderId
      };
      this.$store
        .dispatch("shopOrderList", request)
        .then(data => {
          if (data.data[0]) {
            this.consumeList = data.data[0].consumeList[0];
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },
    //查询单项目次数列表
    getProjectAmountList() {
      let request = {
        orderId: this.orderId
      };
      this.$store
        .dispatch("projectAmountList", request)
        .then(data => {
          if (data.data) {
            this.productList = data.data.productList;
          }
        })
        .catch(e => {
          this.$toast(e.message);
        });
    },

  },

  created() {
    this.getShopOrderDetail();
    this.getProjectAmountList();
  }
};
</script>
<style scoped>
.query_packer{
  background: #fff;
  padding: 10px 16px 16px 16px;
}
table{
  border-collapse: collapse;
  font-size:14px;
  border:1px solid #E6E6E6;
  width: 100%;
}
table td div{
  padding: 8px;
}
table thead td div{
  padding: 0 8px;
}
.item2{
  border-top: 1px solid #E6E6E6;
}
.item{
  border-right: 1px solid #E6E6E6;
  border-bottom: 1px solid #E6E6E6;
}
.items{
  display: block;
  border-bottom: 1px solid #E6E6E6;
}
.items2{
  display: flex;
  justify-content: center;
}
.items:last-child{
  border-bottom: none;
}
.last_item{
  border-right: 1px solid #E6E6E6;
  border-top: 1px solid #E6E6E6;
}
.last_item:first-child{
  border-top:none;
}
table thead td{
  background:rgba(4,11,28,.1);
  height:44px;
  font-weight:500;
  color:rgba(0,0,0,1);
}
tbody tr{
  border-collapse: collapse;
}
tbody tr td{
  /* padding: 8px; */
  color:rgba(34,34,34,1);
  border-collapse: collapse;
}
tbody tr td div{
  width: 100%;
  height: 100%;
}
.main {
  background: #fff;
  padding: 19px 16px 16px 16px;
  box-sizing: border-box;
}
.main p {
  font-size: 13px;
  color: #666;
  margin-bottom: 10px;
}
.box {
  margin-top: 14px;
  border-top: 1px solid rgba(238, 238, 238, 0.6);
  padding: 14px 16px 0 0;
}
.num {
  font-size: 13px;
  color: #666;
}
.state {
  color: #0093ff;
  font-size: 13px;
}
</style>

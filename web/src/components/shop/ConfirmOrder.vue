<template>
    <div>
      <div class="box">
        <div class="list_box flex-b">
          <div style="width: 88%">
            <div class="list list2">
              <span class="span">体检人</span><input type="text" v-model="userName" placeholder="请输入体检人姓名" placeholder-style="color:#CCCCCC">
            </div>
            <div class="list list2" style="border-bottom: none">
              <span class="span">性别</span>
              <el-radio v-model="radio" label="1">男</el-radio>
              <el-radio v-model="radio" label="0">女</el-radio>
            </div>
          </div>
          <div class="medical_man" @click="medicalMan">
            <img src="/static/img/add_contact.png" alt="">
            <p>选择体检人</p>
          </div>
        </div>
        <div class="list">
          <span class="span">手机号</span><input type="number" v-model="phone" placeholder="请输入手机号" placeholder-style="color:#CCCCCC">
        </div>
        <div class="list">
          <span class="span">身份证</span><input type="number" v-model="cardNo" placeholder="请输入身份证号" placeholder-style="color:#CCCCCC">
        </div>
      </div>
      <div class="box box2 flex-b">
        <div class="coupons">优惠券</div>
        <div class="state">无可用</div>
      </div>
      <div class="box2">
        <div class="flex-b">
          <div class="item_name">{{packageName}}</div>
          <div class="price">¥{{sellPrice}}</div>
        </div>
        <div class="flex-b" style="margin-top:10px"  v-for="(item,index) in addList" :key="index">
          <div>
            <p class="add">加项：</p>
            <p class="item_name">{{item.name}}</p>
          </div>
          <div class="price">¥{{item.sellPrice.value}}</div>
        </div>
      </div>

      <div class="btn_bottom">
        <div class=" flex-b">
          <div>
            <p class="total">合计：<span class="red_color">¥{{totalPrice}}</span></p>
            <p class="choose"  v-if="idList">已选择加项<span class="red_color">{{idList.length}}</span>项</p>
            <p class="choose"  v-else>已选择加项<span class="red_color">0</span>项</p>

          </div>
          <a class="next_btn" @click="goPay" href="javascript:void(0);">去支付</a>
        </div>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      idList: this.$route.query.idList,
      msgList: this.$route.query.msgList,
      packDetailsId: this.$route.query.packDetailsId,
      serviceCompanyId: this.$route.query.serviceCompanyId,
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : localStorage.getItem("orgId"),
      radio:'0',
      addList:[],
      cardNo:'',
      phone:'',
      userName:'',
      sellPrice:0,
      addPriceTotal:0,
      prevRouter:null,
      orderId:'',//创建订单返回的ID
      packageName: ''
    };
  },

  components: {

  },


  computed: {
    totalPrice(){
      if(this.addPriceTotal == '0'){
        return this.sellPrice
      }
      // return parseFloat(this.sellPrice) + parseFloat(this.addPriceTotal);
      return this.add_minus(this.sellPrice, +this.addPriceTotal).toFixed(2);
    }
  },

  mounted() {
  },

  methods: {
    add_minus(nub1, nub2){
      let len1, len2, m;

      try{len1 = nub1.toString().split('.')[1].length;}catch(e){len1 = 0;}
      try{len2 = nub2.toString().split('.')[1].length;}catch(e){len2 = 0;}
      m = 10**Math.max(len1, len2);

      return (nub1*m+nub2*m)/m;
    },
    sum(arr){
      return eval(arr.join('+'));
    },
    radioVal() {
      console.log(this.radio);
    },
    checkPhone(phone) {
      let reg = /^1[0-9]{10}$/;
      return reg.test(phone);
    },
    checkCardNo(cardNo){
      let idcardReg = /^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$|^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}([0-9]|X)$/;
      return idcardReg.test(cardNo);
    },
    goPay() {
      if(!this.userName){
        this.$toast('请输入体检人姓名');
        return false;
      }else if(!this.checkPhone(this.phone)){
        this.$toast('请输入正确的手机号');
        return false;
      }else if(!this.checkCardNo(this.cardNo)){
        this.$toast('请输入正确的身份证号');
        return false;
      }else{
        //创建订单
        this.getShopOrderCreate();
      }

    },
    medicalMan() {
      this.$router.push({
        path: "medicalManList",
        query:{
          idList: this.idList
        }
      })
    },
    //创建订单
    getShopOrderCreate() {
      let goodsList = [];

      if(this.idList != null && this.idList != undefined && this.idList != ''){
        for(let i = 0; i < this.idList.length; i++){

          goodsList.push({
            prodId : this.idList[i],
            prodType: '2'
          });

        }

      }
      // console.log(goodsList,'==goodsList');
      let packDetailsId = this.packDetailsId ? this.packDetailsId : localStorage.getItem('packDetailsId');
      let packId = {
        prodId: packDetailsId,
        prodType: '1'
      }
      goodsList.unshift(packId);
      console.log(this.serviceCompanyId,'==this.serviceCompanyId');
      const request = {
        compId: this.serviceCompanyId ? this.serviceCompanyId : localStorage.getItem('serviceCompanyId'),
        orderType: '2000107', //医疗服务
        prodList: goodsList ? goodsList : null,
        // prodList: [
        //   {
        //     prodId: goodsList, //商品ID
        //     prodType: '1' //套餐
        //   }
        // ],
        userId: this.$store.getters.loginData.userObj.userId.value,
        orgId: this.orgId,// '1007057917653852160'
        fromUserId: localStorage.getItem('fromUserId') ? localStorage.getItem('fromUserId') : null
      };
      this.$store.dispatch("shopOrderCreate", request).then((data) => {
        if(data){
          console.log(this.msgList,'===this.msgList');
          this.orderId = data.data.orderId.value;
          if(!this.msgList){
            this.getUserMsgSave();//保持用户信息
            return false;
          }else if(this.orderId){ //订单创建成功返回的ID
            this.$router.push({
              path: "shopPayList",
              query:{
                packageName: this.packageName,
                userName: this.userName,
                gender : this.radio,
                mobile : this.phone,
                cardNo : this.cardNo,
                orderId : this.orderId,
                // packDetailsId: this.packDetailsId ? this.packDetailsId : localStorage.getItem('packDetailsId'),
                //this.addPriceTotal == '0' ? this.sellPrice : this.add_minus(this.sellPrice, +this.addPriceTotal).toFixed(2)
                totalPrice: this.totalPrice
              }
            })
          }

        }
      }).catch(error => {
        this.$toast(error.message);
      })
    },
    //获取已选加项列表
    getQueryAddProductList() {

      // let arr = list != '' ? list.split(',') : null;

      let idList = typeof(this.idList);
      // console.log(idList,'==type');
      if(idList == 'string'){
        this.idList = [this.idList];
      }
      const request = {
        idList: this.idList ? this.idList : null

      };
      this.$store.dispatch("queryAddProductList", request).then((data) => {
        if(data){
          let priceList = [];
          this.addList = data.data.productList;
          for(let i = 0; i < data.data.productList.length; i++){
            priceList.push(parseFloat(data.data.productList[i].sellPrice.value));
            this.addPriceTotal = this.sum(priceList);
          }

        }
      }).catch(error => {
        this.$toast(error.message);
      })
    },
    //预约信息保存
    getUserMsgSave() {
      const request = {
        reservationUser: {
          userId : this.$store.getters.loginData.userObj.userId.value,
          userName : this.userName,
          gender : this.radio,
          mobile : this.phone,
          cardNo : this.cardNo
        }
      };
      this.$store.dispatch("userMsgSave", request).then((data) => {
        if(data.rtnCode == '1'){//信息保存成功
          this.$router.push({
            path: "shopPayList",
            query:{
              packageName: this.packageName,
              userName: this.userName,
              gender : this.radio,
              mobile : this.phone,
              cardNo : this.cardNo,
              orderId : this.orderId,
              // packDetailsId: this.packDetailsId ? this.packDetailsId : localStorage.getItem('packDetailsId'),
              totalPrice: this.totalPrice
            }
          })
        }else{
          this.$toast(data.msg);
        }
      }).catch(error => {
        this.$toast(error.message);
      })
    },
    //套餐详情
    getPackagesDetail() {
      const request = {
        packages:{
            packDetailsId: this.packDetailsId ? this.packDetailsId : localStorage.getItem('packDetailsId')
        },
        sortType : "price",
      };
      this.$store.dispatch("packagesDetail", request).then(data => {
        if (data.data) {
          this.sellPrice = data.data.packages.sellPrice.value;
          this.packageName = data.data.packages.name;
        }
      }).catch(error => {
        this.$toast(error.message);
      });
    },


  },

  created() {
    this.getPackagesDetail();
    //本地存储，防止填写预约信息，URL信息丢失
    if(this.idList != ''){
      // localStorage.setItem('idList',this.idList);
      this.getQueryAddProductList();
    }
    if(this.packDetailsId){
      localStorage.setItem('packDetailsId',this.packDetailsId);
    }
    console.log(JSON.stringify(this.serviceCompanyId),'==this.serviceCompanyId111');
    if(this.serviceCompanyId){
      localStorage.setItem('serviceCompanyId',this.serviceCompanyId);
    }
    //返回当前页面，获取预约信息，默认赋值
    if(this.msgList){
      let msgList = JSON.parse(this.msgList);
      this.userName = msgList.userName;
      this.radio = msgList.gender;
      this.phone = msgList.mobile;
      this.cardNo = msgList.cardNo;
    }

  },


};
</script>

<style scoped>
  .box2{
    padding: 16px;
    background: #fff;
  }
  .state{
    font-size: 16px;
    color: #B3B3B3;
  }
  .coupons{
    font-size: 16px;
    color: #333;
  }
  .item_name{
    font-size: 14px;
    color: #333;
  }
  .price{
    color: #F0240E;
    font-size: 14px;
  }
  .add{
    color: #B3B3B3;
    font-size: 14px;
  }
  .box{
    margin-bottom: 15px;
    background: #fff
  }
  .list_box{
    width: 100%;
    border-bottom: 1px solid rgba(238,238,238,.6);
  }
  .medical_man{
    width: 30%;
    text-align: center;
    padding: 0 5%;
  }
  .medical_man img{
    width: 34px;
    height: 34px;
    margin-bottom: 5px;
  }
  .medical_man p{
    color: #000;
    font-size: 12px;
  }
  .list{
    padding: 16px;
    border-bottom: 1px solid rgba(238,238,238,.6);
  }
  .list2{
    padding-right: 0;
    border-right: 1px solid rgba(238,238,238,.6);
  }
  .list .span{
    font-size: 16px;
    color: #333;
    width: 20%;
    display: inline-block
  }
  .list2 .span{
    width: 26%;
  }
  .list input{
    font-size: 16px;
    color: #333;
    max-width: 50%;
  }

  .btn_bottom{
    position: fixed;
    bottom: 0;
    height: 50px;
    width: 100%;
    background: #fff;
    padding-left: 12px;
    box-sizing: border-box;
  }
  .total{
    font-size: 14px;
    color: #222;
  }
  .total span{
    font-size: 18px;
    font-weight: 500;
  }
  .choose{
    font-size: 11px;
    color: #222;
  }
  .red_color{
    color: #F0240E
  }
  .next_btn{
    display: block;
    width: 118px;
    height: 50px;
    background: #0093FF;
    line-height: 50px;
    text-align: center;
    color: #fff;
    font-size: 16px;
    font-weight: 500;
  }

</style>

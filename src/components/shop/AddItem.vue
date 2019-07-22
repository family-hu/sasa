<template>
    <div>
      <div class="title_tip">您可根据个人需求，自愿选择加项/升级,添加的检查项将直接归到原来的体检套餐内。</div>
      <div class="item_list">
        <div class="list" v-for="(item,index) in addList" :key="index">
          <div class="radio_box">
           <!-- <el-radio v-model="radio" :label="index" @change="radioVal"></el-radio> -->
          <el-checkbox-group v-model="checkList">
            <el-checkbox :label="index" @change="radioVal(index,$event)"></el-checkbox>
          </el-checkbox-group>
           <div class="flex-b" style="width:100%">
              <div>
                <p class="name">{{item.name}}</p>
                <p class="detail">{{item.description}}</p>
              </div>
              <div>
                <p class="old"><del>¥{{item.originalPrice.value}}</del></p>
                <p class="new">¥{{item.sellPrice.value}}</p>
              </div>
             </div>
          </div>
          <div class="val_list" v-for="(items,index) in item.projectList" :key="index">
            <p v-if="items.description" class="shop_detail_icon" @click="open(index,items)">{{items.name}}<img src="/static/img/shop_detail_icon.png" alt=""></p>
            <p v-else class="shop_detail_icon">{{items.name}}</p>
          </div>
        </div>
      </div>
      <div class="btn_bottom flex-b">
        <div>
          <p class="total">合计：<span class="red_color">¥{{totalPrice}}</span></p>
          <p class="choose">已选择加项<span class="red_color">{{checkList.length}}</span>项</p>
        </div>
        <a class="next_btn" @click="nextBtn" href="javascript:void(0);">下一步</a>
      </div>
    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {
      orgId: this.$route.query.orgId
        ? this.$route.query.orgId
        : localStorage.getItem("orgId"),
      packDetailsId: this.$route.query.packDetailsId,
      serviceCompanyId: this.$route.query.serviceCompanyId,
      checkList:[],
      addList:[],
      idList:[],
      totalPrice:0,
    };
  },

  components: {

  },

  watch:{

  },

  computed: {

  },

  mounted() {
  },

  methods: {
    open(index,items) {
      MessageBox({
        title: items.name,
        message:items.description,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    add_minus(nub1, nub2){
      let len1, len2, m;

      try{len1 = nub1.toString().split('.')[1].length;}catch(e){len1 = 0;}
      try{len2 = nub2.toString().split('.')[1].length;}catch(e){len2 = 0;}
      m = 10**Math.max(len1, len2);

      return (nub1*m+nub2*m)/m;
    },
    radioVal(index,e) {
      let indexOn = e; //是否选中
      if(indexOn == true){
        this.idList.push(this.addList[index].packProdId.value);
        this.totalPrice = this.add_minus(this.totalPrice, +this.addList[index].sellPrice.value).toFixed(2);
      }else{
        for(let i = 0; i < this.idList.length; i++){
          if(this.addList[index].packProdId.value == this.idList[i]){
            this.idList.splice(i, 1);
          }
        }
        this.totalPrice = this.add_minus(this.totalPrice, -this.addList[index].sellPrice.value).toFixed(2);

      }

    },
    nextBtn() {
      this.$router.push({
        path: "confirmOrder",
        query:{
          idList: this.idList,
          packDetailsId: this.packDetailsId,
          serviceCompanyId: this.serviceCompanyId
        }
      })
    },
    //加项列表
    getAddPackagesProductList() {
      this.loading = true;
      const request = {
        pageParam:{
          pageNum: 1,
          pageSize: 10
        },
        packagesProduct:{
          orgId: this.orgId,//,'1087171373522001920'
        },
        packDetailsId: this.packDetailsId

      };
      this.$store.dispatch("addPackagesProductList", request).then((data) => {
        if(data){
          if(data.data.productList == ''){
            this.$router.push({
              path: "confirmOrder",
              query:{
                idList:  null,
                packDetailsId: this.packDetailsId,
                serviceCompanyId: this.serviceCompanyId
              }
            })
          }else{
            this.addList = data.data.productList;
            this.loaded = (this.addList.length == data.data.total.value);

          }
          this.loading = false;

        }
      }).catch(error => {
        this.loading = false;
        this.loaded = true;
        this.$toast(error.message);
      })
    },
    //套餐详情
    getPackagesDetail() {
      const request = {
        packages:{
          packDetailsId: this.packDetailsId
        },
        sortType : "price",
      };
      this.$store
        .dispatch("packagesDetail", request)
        .then(data => {
          if (data.data) {
            this.totalPrice = parseFloat(data.data.packages.sellPrice.value);
          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },
  },

  created() {
    this.getAddPackagesProductList();
    this.getPackagesDetail();
    this.radio = 0;
  },


};
</script>
<style>
  .mint-msgbox-title{
    text-align: left;
    padding-left: 20px;
    position: relative;
    color: #000;
    font-size: 17px;
    font-weight: 500;
  }
  .mint-msgbox-title::after{
    content: '';
    background: #0093FF;
    position: absolute;
    bottom: -10px;
    left: 20px;
    width: 34px;
    height: 2px;
  }
  .mint-msgbox-btns{
    display: none;
  }
  .mint-msgbox-message{
    text-align: justify;
    line-height: 20px;
    margin-top: 21px;
    color: #666;
    font-size: 15px;
  }
</style>

<style scoped>
  /deep/ .el-checkbox__label{
    display:  none
  }
  /deep/ .el-checkbox-group{
    margin-right: 15px;
  }
  /deep/ .el-checkbox__inner{
    border-radius: 50%;
  }

  .title_tip{
    width: 100%;
    background: #E5F4FF;
    padding: 10px 18px;
    color: #33AAFF;
    font-size: 12px;
    box-sizing: border-box;
    line-height: 16px
  }
  .item_list{
    padding: 10px 16px 50px 16px;
  }
  .list{
    background: #fff;
    margin-bottom: 10px;
    padding: 12px 0;
  }
  .radio_box{
    display: flex;
    align-items: center;
    padding: 0 12px 8px;
    border-bottom: 1px solid rgba(238,238,238,.6);
  }
  .name{
    font-size: 16px;
    color: #000;
    font-weight: 500;
  }
  .detail{
    font-size: 12px;
    color: #666;
  }
  .old{
    font-size: 12px;
    color: #B3B3B3;
  }
  .new{
    color: #FF0000;
    font-size: 14px;
    font-size: 500;
  }
  .val_list{
    padding: 0 12px;
  }
  .shop_detail_icon{
    margin-top: 22px;
    font-size: 15px;
    color: #000;
  }
  .shop_detail_icon img{
    width: 18px;
    height: 18px;
    position: relative;
    top:4px;
    left: 9px;
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

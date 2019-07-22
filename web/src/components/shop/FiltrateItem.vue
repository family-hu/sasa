<template>
  <div>
    <!-- 筛选 -->
    <ul class="filtrate">
      <li class="filtrate_list" v-for="(item,index) in filtrateList" :key="index" @click="addClass(index,item)">
          <a :class="{'on':current == index}" href="javascript:void(0);">{{item.filtrateName}}<em v-if="item.icon"></em></a>
      </li>
    </ul>
    <!-- 侧滑面板 -->
    <div class="shade filtrate_shade" v-if="sideBar" @click="shade"></div>
    <div class="side_bar filtrate_side_bar" v-if="sideBar" :class="{'on': sideBar}">
      <div class="bar_box">
        <h3>分类</h3>
        <div class="bar_list">
          <span v-for="(item,index) in classifyList" :key="index" @click="addClass2(index,item)" :class="{'on':current2 == index}">{{item.name}}</span>
        </div>
        <h3>年龄</h3>
        <div class="bar_list">
          <span v-for="(item,index) in ageList" :key="index" @click="addClass3(index,item)" :class="{'on':current3 == index}">{{item.name}}</span>
        </div>
        <h3>性别</h3>
        <div class="bar_list">
          <span v-for="(item,index) in sexList" :key="index" @click="addClass4(index,item)" :class="{'on':current4 == index}">{{item.name}}</span>
        </div>
        <h3>价格区间（元）</h3>
        <div class="bar_list">
          <span v-for="(item,index) in priceList" :key="index" @click="addClass5(index,item)" :class="{'on':current5 == index}">{{item.priceNameStart}}{{item.priceNameEnd}}</span>
        </div>
      </div>
      <div class="btn" @click="submitBtn">确定</div>
    </div>
  </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
export default {
  data() {
    return {
      current: 0,
      current2:null,
      current3:null,
      current4:null,
      current5:null,
      sideBar: false,
      classifyList: [
        // {classifyName: '都市精英'},
        // {classifyName: '入职体检'},
        // {classifyName: '婚检孕检'},
        // {classifyName: '基因检测'},
        // {classifyName: '肠胃健康'},
        // {classifyName: '专项筛查'}
      ],
      ageList:[
        // {ageName: '儿童'},
        // {ageName: '中青年'},
        // {ageName: '中老年'}
      ],
      sexList:[
        // {sexName: '男性'},
        // {sexName: '女性'}
      ],
      priceList:[
        {priceNameStart: '0',priceNameEnd: '-500'},
        {priceNameStart: '500',priceNameEnd: '-800'},
        {priceNameStart: '800以上'}
      ],
      arr:{},
      packCateId: null, //分类ID
      genderList: null, //性别
      ageList2 : null, //年龄
      startPrice : null, //起始价格
      endPrice : null //结束价格
    };
  },
  props: ["filtrateList"],

  computed: {},
  methods: {
    addClass(index,item){
      if(this.current == index && this.sideBar == true){
        return false
      }
      this.current = index;　
      if(item.sideBar){
        this.sideBar = true;
      }
      let type = item.filtrateName == '销量' ? 'sales' : item.filtrateName == '价格' ? 'price' : 'price';
      if(item.filtrateName != '类型筛选'){
        this.$parent.page = 1;
        this.$parent.serviceList = [];
        this.$parent.getPackagesList(type,this.arr);
      }
      　　
    },
    shade() {
      this.sideBar =false;
    },
    addClass2(index,item){
      if(this.current2 == index){
        this.current2 = null;
        this.packCateId = null;
        return false;
      }
      this.current2 = index;
      this.packCateId = item.id.value;
    },
    addClass3(index,item){
      if(this.current3 == index){
        this.current3 = null;
        this.ageList2 = null;
        return false;
      }
      this.current3 = index;
      this.ageList2 = item.dictId.value;　
    },
    addClass4(index,item){
      if(this.current4 == index){
        this.current4 = null;
        this.genderList = null;
        return false;
      }
      this.current4 = index;
      this.genderList = item.dictId.value;
    },
    addClass5(index,item){
      if(this.current5 == index){
        this.current5 = null;
        this.startPrice = null;
        this.endPrice = null;
        return false;
      }
      this.current5 = index;
      this.startPrice = item.priceNameStart,
      this.endPrice = item.priceNameEnd.match(/-(\S*)/)[1];
    },
    submitBtn() {
      this.sideBar =false;
      let arr = {
        packCateId: this.packCateId, //分类ID
        genderList: [this.genderList], //性别
        ageList : [this.ageList2], //年龄
        startPrice : this.startPrice, //起始价格
        endPrice : this.endPrice //结束价格
      }

      if(!this.packCateId && !this.genderList && !this.ageList2 && !this.startPrice){
        return false;
      }else{
        this.$parent.page = 1;
        this.$parent.serviceList = [];
        this.$parent.getPackagesList('price',arr);
      }
    },
    //分类
    getQueryByType() {
      const request = {
        type: "FLLX003"
      };
      this.$store
        .dispatch("queryByType", request)
        .then(data => {
          if (data.data) {
            this.classifyList = data.data.list;
          }
        })
        .catch(error => {

          this.$toast(error.message);
        });
    },
    //性别和年龄
    getQueryByCodeList() {
      const request = {
        codeList: ["GENDERLIST","AGELIST"]
      };
      this.$store
        .dispatch("queryByCodeList", request)
        .then(data => {
          if (data.data) {
            for(let i = 0; i< data.data.dictionaryList.length; i++){
              let code = data.data.dictionaryList[i].code;
              if(code == 'AGELIST'){
                this.ageList = data.data.dictionaryList[i].children;
              }
              if(code == 'GENDERLIST'){
                this.sexList = data.data.dictionaryList[i].children;
              }
            }

          }
        })
        .catch(error => {
          this.$toast(error.message);
        });
    },

  },
  created() {
    this.getQueryByType();
    this.getQueryByCodeList();
  }
};
</script>
<style>
  .filtrate_shade{
    z-index: 999998 !important;
  }
  .filtrate_side_bar{
    z-index: 999999 !important;
  }
  .page-wrap{
    -webkit-overflow-scrolling:inherit
  }
</style>

<style scoped>
/*自定义筛选*/
.filtrate{
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  padding: 10px 0;
}
.filtrate_list {
  padding: 0 20px;
}
.filtrate_list a {
  color: #000;
  font-size: 15px;
  font-weight: 400;
}
.filtrate_list a.on {
  color: #0093ff;
}
.filtrate_list em {
  width: 0;
  height: 0;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #b3b3b3;
  position: relative;
  top: 15px;
  left: 4px;
}
.filtrate_list a.on em {
  border-top: 5px solid #0093ff;
}
/* 侧滑面板 */
.shade{
  position: fixed;
  width: 100%;
  height: 100%;
  top:0;
  bottom: 0;
  background: #000;
  opacity: .5;
  z-index: 999998;
}
.side_bar{
  position: fixed;
  width: 77%;
  height: 100%;
  right: 0;
  bottom: 0;
  background: #fff;
  z-index: 999999;
  transform:translate(100%,0);
  transition: all 0.3s ease-in-out 0s,transform 0.3s ease-in-out;
}
.side_bar.on{
  transform:translate(0,0);
  transition: all 0.3s ease-in-out 0s,transform 0.3s ease-in-out;
}
.bar_box{
  padding: 10px 0 0 11px;
}
.bar_box h3{
  font-size: 14px;
  color: #000;
  font-weight: 400;
  margin-top: 10px;
}
.bar_box span{
  display: block;
  width: 80px;
  height: 32px;
  line-height: 32px;
  text-align: center;
  background: #F7F7F7;
  color: #000;
  font-size: 12px;
  font-weight: 400;
  float: left;
}
.bar_list{
  margin-top: 10px;
  margin-left: -10px;
  overflow: hidden;
}
.bar_list span{
  margin-left: 10px;
  margin-bottom: 10px;
}
.bar_list span.on{
  width: 78px;
  height: 30px;
  line-height: 30px;
  border: 1px solid #0093FF;
  background: #E5F4FF;
  color: #0093FF;
}
.btn{
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 53px;
  line-height: 53px;
  text-align: center;
  font-weight: 500;
  font-size: 16px;
  color: #fff;
  background: #0093FF;
}
</style>

<template>
    <div>

        <!-- <div  class="package_item"> -->
          <div class="item_box">
            <!-- <h3>{{categoryList.name}}</h3> -->
            <ul class="item_list">
              <li v-for="(item,index) in categoryList.productList" :key="index">
                <div class="title_box">
                  <p class="item_name">{{item.name}}</p>
                  <div class="shop_detail_icon" v-if="item.description" @click="open(item,index)"><img src="../../../static/img/shop_detail_icon.png" alt=""></div>
                </div>
                <div class="title_box" style="margin-top:5px" v-for="(items,index) in item.projectList" :key="index">
                  <span class="item_span">{{items.name}}</span>
                  <span class="shop_icon" v-if="items.description" @click="openChild(items,index)"><img src="../../../static/img/shop_detail_icon.png" alt=""></span>
                </div>
              </li>
            </ul>
          </div>
        <!-- </div> -->

    </div>
</template>

<script>
import { MessageBox } from "mint-ui";
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {};
  },
  props: {
    categoryList: {}
  },

  components: {},

  computed: {},

  mounted() {},

  methods: {
    open(item,index) {
      MessageBox({
        title: item.name,
        message: item.description,
        showCancelButton: false,
        showConfirmButton: false
      });
    },
    openChild(items,index) {
      MessageBox({
        title: items.name,
        message: items.description,
        showCancelButton: false,
        showConfirmButton: false
      });
    }
  },

  created() {}
};
</script>

<style scoped>
ul,
li,
h3,
p {
  padding: 0;
  list-style: none;
  margin: 0;
}
.item_box {
  background: #fff;
}
.item_box h3 {
  height: 20px;
  width: 91%;
  background: #eeeeee;
  color: #666666;
  font-size: 13px;
  text-align: center;
  line-height: 20px;
  margin: 0 auto;
}
.item_list li {
  padding: 16px 0;
  margin: 0 16px;
  border-bottom: 1px solid rgba(230,230,230,1);
}
.item_list .title_box {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.item_list li:last-child {
  border: none;
}
.item_name {
  font-size: 15px;
  color: #040B1C;
  font-weight:500;
}
.item_detail {
  font-size: 13px;
  color: #666;
  margin-top: 8px;
}
.shop_detail_icon img {
  width: 18px;
  height: 18px;
}
.shop_icon img {
  width: 14px;
  height: 14px;
  position: relative;
  top: 3px;
}
.item_span {
  color:rgba(4,11,28,.75);
  font-size: 14px;
}
</style>

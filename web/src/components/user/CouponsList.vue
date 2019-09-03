<template>
    <div>
      <div class="empty empty_tab_top">
        <img :src="consultationEmpty">
        <div>您暂时还没有优惠券哦</div>
      </div>
    </div>
</template>

<script>
import imgMap from "../../../static/js/imgmap.js";
import * as types from "../../constant/ConstantConfig.js";
export default {
  data() {
    return {

    };
  },

  components: {

  },


  computed: {
    consultationEmpty() {
      return imgMap.consultationEmpty;
    },
  },

  mounted() {

  },

  methods: {

  },

  created() {

  },


};
</script>

<style scoped>

</style>

<template>
  <div id="dialogue_box" v-if="reportImg">
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">

        <!-- Background of PhotoSwipe.
             It's a separate element as animating opacity is faster than rgba(). -->
        <div class="pswp__bg"></div>

        <!-- Slides wrapper with overflow:hidden. -->
        <div class="pswp__scroll-wrap">

          <!-- Container that holds slides.
              PhotoSwipe keeps only 3 of them in the DOM to save memory.
              Don't modify these 3 pswp__item elements, data is added later on. -->
          <div class="pswp__container">
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
            <div class="pswp__item"></div>
          </div>

          <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
          <div class="pswp__ui pswp__ui--hidden">

            <div class="pswp__top-bar">

              <!--  Controls are self-explanatory. Order can be changed. -->

              <div class="pswp__counter"></div>

              <button class="pswp__button pswp__button--close" title="Close (Esc)"></button>

              <button class="pswp__button pswp__button--zoom" title="Zoom in/out"></button>

              <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
              <!-- element will get class pswp__preloader--active when preloader is running -->
              <div class="pswp__preloader">
                <div class="pswp__preloader__icn">
                  <div class="pswp__preloader__cut">
                    <div class="pswp__preloader__donut"></div>
                  </div>
                </div>
              </div>
            </div>

            <div class="pswp__share-modal pswp__share-modal--hidden pswp__single-tap">
              <div class="pswp__share-tooltip"></div>
            </div>

            <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)">
            </button>

            <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)">
            </button>

            <div class="pswp__caption">
              <div class="pswp__caption__center"></div>
            </div>

          </div>

        </div>
    </div>
    <div id="imgs" class="img_box" v-for="(item , index) in reportImg" :key="index">
      <img v-lazy="item" :src="item" alt="" @click="toBigPic(index)">
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import * as types from "../../constant/ConstantConfig.js";
import imgMap from "../../../static/js/imgmap.js";

export default {
  data() {
    return {
      reportImg:this.$route.query.reportImg ? JSON.parse(this.$route.query.reportImg) : ''
    };
  },

  components: {
  },

  computed: {
    ...mapGetters(["loginData"]),
  },
  mounted() {

  },

  methods: {
    //点击图片放大
    toBigPic(pos) {
      var pswpElement = document.querySelectorAll(".pswp")[0];
      var items = [];
      var aDiv = document.getElementById("imgs");
      if (aDiv.hasChildNodes()) {
        for (var i = 0; i < aDiv.children.length; i++) {
          var img = aDiv.children;
          var item = {
            src: img[i].src,
            w: img[i].naturalWidth,
            h: img[i].naturalHeight
          };
          items.push(item);
          // console.log(i + "===child====" + (item.src));
          // console.log(i + "===child====" + (item.w));
          // console.log(i + "===child====" + (item.h));
        }
      }
      // define options (if needed)
      var options = {
        // history & focus options are disabled on CodePen
        // history & focus options are disabled on CodePen
        history: false,
        focus: false,
        index: pos,
        showAnimationDuration: 0,
        hideAnimationDuration: 0
      };

      var gallery = new PhotoSwipe(
        pswpElement,
        PhotoSwipeUI_Default,
        items,
        options
      );
      gallery.init();
    },


  },
  created() {

  }
};
</script>

<style scoped>
.image[lazy="loading"] {
  width: 40px;
  height: 40px;
  margin: 0 auto;
  color: #ccc;
}
.img_box{
  padding: 16px;
}
.img_box img{
  width: 100%;
  height: auto;
}
</style>

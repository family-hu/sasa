<template>
  <div id="app">
    <keep-alive :include="cacheName">
      <router-view v-if="$route.meta.keepAlive"></router-view>
    </keep-alive>
    <router-view v-if="!$route.meta.keepAlive"></router-view>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  export default {
    data() {
      return {

      }
    },
    computed: {
      ...mapGetters(['cacheName',"loginData"])
    },

    watch: {
      $route(to, from) {
        //调用分享
        if(this.$route.path === '/doctorDetail' || this.$route.path === '/main' || this.$route.path === '/healthServiceDetail' || this.$route.path === '/healthServiceDetail' || this.$route.path === '/topicDetail' || this.$route.path === '/home' || this.$route.path === '/featuresDepartment' || this.$route.path === '/serviceDetail' || this.$route.path === '/groupDetail') {
          return false
        }else{
          console.log('默认');
          setTimeout(() => {
            this.wxShareCallback();
          }, 1000)
        }
      }
    },
    // beforeRouteEnter(to, from, next) {
    //   //调用分享
    //   if(to.path != '/doctorDetail' || to.path != '/main' || to.path != '/healthServiceDetail' || to.path != '/healthServiceDetail' || to.path != '/topicDetail' || to.path != '/home' || to.path != '/featuresDepartment' || to.path != '/serviceDetail' || to.path != '/groupDetail') {
    //     console.log('默认分享');
    //     setTimeout(() => {
    //       this.wxShareCallback();
    //     }, 1000)
    //   }
    //   next();
    // },
    methods:{
      wxShareCallback() {
        let shareUrl = window.location.href.split("#")[0];
        let dataForWeixin = {
            title: document.title, // 分享标题
            desc: '看病足不出户', // 分享描述
            link: shareUrl, // 分享链接
            imgUrl: 'http://yun.sinoylb.com/static/img/share@2x.png', // 分享图标 医生头像
        }
        this.wxapi.wxShare(shareUrl, dataForWeixin);
      },
    },
    created() {
      // if(!this.loginData.tid){
      //   this.myUtils.wxLogin();
      // }
    }
  }
</script>

<style>
  body{
    font-family: PingFang-SC-Medium,"微软雅黑",PingFangSC-Regula
  }
  ul,
  li,p,h3 {
    padding: 0;
    list-style: none;
    margin: 0;
  }
  input{
    border: none
  }
  a{
    text-decoration: none;
    transition: all 0.3s linear 0s;
  }

  body {
    background-color: #f8f8f8;
    margin: 0;
    font-size:12px;
    font-weight: 400;
    /*overflow-x: hidden;*/
  }

  .page-header-main {
    margin-top: 40px;
  }
  .pswp{
    z-index: 100000;
  }
  .flex-b{
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .full-line {
    background-color: #eee;
    height: 1px;
    border: 0;
    margin: 0 16px;
  }

  .line-m {
    background-color: #eee;
    height: 1px;
    border: 0;
    margin: 10px 16px;
  }
  .line-s {
    background-color: rgba(216, 216, 216, .6);
    height: 1px;
    border: 0;
    margin-top: 16px;
  }

  .line {
    background-color: #e6e6e6;
    height: 1px;
    margin: 0 16px 0 11px;
    border: 0;
  }

  .fl{float: left;}
  .fr{float: right;}

  .mint-popup-4 {
    width: 100%;
  }

  .toolbar {
    background-color: white;
  }

  .toolbar-left {
    float: left;
    margin: 16px 0 0 16px;
    color:#888
  }
  .toolbar-right {
    float:right;
    margin: 16px 16px 0 0;
    color:#0093ff
  }

  /* .mint-tab-item-label {
    color: inherit;
    font-size: 14px;
    line-height: 1
  } */
  .filtrate_shade{
    z-index: 10000;
  }
  .filtrate_side_bar{
    z-index: 20000;
  }
  .mint-tabbar.is-fixed{
    z-index: 9999;
  }
/*加载中 icon.....  */
.loading{
  width: 100%;
  margin: 0 auto;
  /* position: absolute;
  left: 50%;
  top:50%;
  z-index: 200;
  margin-left: -150px;
  margin-top: -60px; */
  /* background: #000;
  opacity: .5; */
}

.spinner {
  width: 100%;
  text-align: center;
  margin-top: 20px;
}

.spinner > div {
  width: 10px;
  height: 10px;
  /* background-color: #67CF22; */
  /* background-color: #21A3FF; */
  background-color: #ccc;
  border-radius: 100%;
  display: inline-block;
  -webkit-animation: bouncedelay 1.4s infinite ease-in-out;
  animation: bouncedelay 1.4s infinite ease-in-out;
  /* Prevent first frame from flickering when animation starts */
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

.spinner .bounce1 {
  -webkit-animation-delay: -0.32s;
  animation-delay: -0.32s;
}

.spinner .bounce2 {
  -webkit-animation-delay: -0.16s;
  animation-delay: -0.16s;
}

@-webkit-keyframes bouncedelay {
  0%, 80%, 100% { -webkit-transform: scale(0.0) }
  40% { -webkit-transform: scale(1.0) }
}

@keyframes bouncedelay {
  0%, 80%, 100% {
    transform: scale(0.0);
    -webkit-transform: scale(0.0);
  } 40% {
    transform: scale(1.0);
    -webkit-transform: scale(1.0);
  }
}

  /* 默认样式 */
  button,input,select,textarea{vertical-align:baseline;*vertical-align:middle;-webkit-appearance:none; border-radius: 0;}
  button,input{line-height:normal;*overflow:visible;}
  button,input[type="button"],input[type="reset"],input[type="submit"]{cursor:pointer;-webkit-appearance:none;overflow:visible;width:auto;*width:1;}
  input[type="checkbox"],input[type="radio"]{box-sizing:border-box;}
  input[type="checkbox"]{vertical-align:bottom;*vertical-align:baseline;}
  input[type="radio"]{vertical-align:text-bottom;}
  input{_vertical-align:text-bottom;}
  input[type="search"]{-webkit-box-sizing:content-box;-moz-box-sizing:content-box;box-sizing:content-box;-webkit-appearance:textfield;}
  button::-moz-focus-inner,input::-moz-focus-inner{padding:0;border:0;}
  textarea{overflow:auto;vertical-align:top;-webkit-appearance: none;}
  input:focus,textarea:focus,select:focus{outline-width:0;}
  ul,li{ list-style-type: none;}
  a,a:active,a:hover{outline:0;}
  a:focus{outline:0;}
  a,a:link{text-decoration:none;}
  a:hover{text-decoration:none;}
  a:visited{text-decoration:none;}
  *,*:before,*:after{-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;}
  body,dl,dd,ul,ol,figure,h1,h2,h3,h4,h5,h6,p,pre,blockquote,form,fieldset,legend,input,button,select,textarea{margin:0;padding:0;}
</style>

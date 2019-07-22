<template>
  <div>
    <div class="main">
      <textarea class="textarea" v-model="textareaVal" placeholder="正文，添加图片或文字" placeholder-style="color:rgba(34,34,34,.5)"></textarea>
      <div class="upImg">
        <el-upload
          action="111"
          list-type="picture-card"
          :on-preview="handlePictureCardPreview"
          :on-remove="handleRemove" :before-upload="beforeUpload"  :auto-upload="false"  :on-change="chooseImg" :limit="3" :on-exceed="handleExceed" multiple>
          <i class="el-icon-plus"></i>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible">
          <img width="100%" :src="dialogImageUrl" alt="">
        </el-dialog>
      </div>
    </div>
    <div class="up_release">
      <button type="button" @click="submitRelease" :disabled="disabled">发布</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from "vuex";
  import * as types from '../../constant/ConstantConfig.js';
  import imgMap from '../../../static/js/imgmap.js';

  export default {
    data() {
      return {
        groupid: this.$route.query.groupid,
        textareaVal: '',
        msgImg:'',
        fileList:[],
        dialogImageUrl: '',
        dialogVisible: false,
        disabled: false
      };
    },

    props: {
      topicItem: {},
    },

    computed: {
      ...mapGetters(["loginData"]),
    },

    methods: {
      beforeUpload (file,fileList) {
        console.log(file,'==file');
        //自定义上传图片，转base64
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = e => {
          let _file = e.target.result
          console.log(_file,'==_file');
          // this.$api.post({
          //   'data': Base64.encode(_file)
          // }).then( res => {
          //     // 上传成功
          // })
        }
        return false // 阻止Upload的默认上传
      },
      beforeUpload1(file){
        //自定义上传文件
        // let fd = new FormData();
        // fd.append('files',file);//传文件
        // fd.append('id',this.srid);//传其他参数
        // axios.post('/api/up/file',fd).then(function(res){
        //         alert('成功');
        // })
        // return false  //屏蔽了action的默认上传
      },
      //监听图片list状态
      chooseImg(file,fileList) {
        var This = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          let result = [];
              result.push(this.result);
          // let png = 'data:image/png;base64,';
          // let jpeg = 'data:image/jpeg;base64,';
          let reg =  /^data:image\/(jpeg|png|gif);base64,/;
          for(let i = 0; i < result.length; i++){
            if(reg.test(result[i])){
              This.fileList.push(result[i].replace(reg,''));
            }
          }

        }
      },
      //删除
      handleRemove(file, fileList) {
        var This = this;
        var reader = new FileReader();
        reader.readAsDataURL(file.raw);
        reader.onload = function(e){
          let result = this.result;
          let reg =  /^data:image\/(jpeg|png|gif);base64,/;
          if(reg.test(result)){
            result = result.replace(reg,'');
          }
          for(let i = 0; i < This.fileList.length; i++){
            if(result == This.fileList[i]){
               This.fileList.splice(i, 1);
            }
          }
        }
      },
      //点击已上传图片
      handlePictureCardPreview(file,fileList) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      handleExceed(files, fileList) {
        this.$toast('最多可上传3张图片哦');
      },
      //发布
      submitRelease() {
        this.disabled = true;
        if(this.textareaVal == '' && this.fileList == ''){
          this.$toast('请输入内容');
          setTimeout(() => {
            this.disabled = false;
          },3000)
          return false;
        }else{
          this.requestAddtcontent();
        }
      },
      //发帖子
      requestFileUploadBatch() {
        let request = {
          fileName: 'file',
          fileExt: 'jpg',
          recType: 1004100904,
          orgId: 0,
          busiId: this.msgImg,
          fileList: this.fileList
        };
        this.$store
          .dispatch("fileUploadBatch", request)
          .then(data => {
            if(data){
              if (data.rtnCode == '1') {
                this.$toast('发布成功');
                setTimeout(() => {
                  this.disabled = false
                },3000)
                this.$router.go(-1);
              }
            }
          })
          .catch(error => {
            this.$toast(error.message);
          });
      },
      //获取图片ID
      requestAddtcontent() {
        let request = {
          userid: this.loginData.userObj.userId.value,
          groupid: this.groupid,
          descdata: this.textareaVal
        };
        this.$store
          .dispatch("addtcontent", request)
          .then(data => {
            if(data.rtnCode == '1'){
              if(this.fileList != '' && this.fileList != null && this.fileList != undefined){
                this.msgImg = data.rtnMsg;
                this.requestFileUploadBatch();
              }else{
                this.$toast('发布成功');
                setTimeout(() => {
                  this.disabled = false;
                },3000)
                this.$router.go(-1);
              }
            }
          })
          .catch(error => {
            this.$toast(error.message);
          });
      },
      //blob 转 base64
      blobToBase64(blob) {
        return new Promise((resolve, reject) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            resolve(e.target.result);
          };
          // readAsDataURL
          fileReader.readAsDataURL(blob);
          fileReader.onerror = () => {
            reject(new Error('文件流异常'));
          };
        });
      },


    },

    created() {

    }

  }
</script>

<style scoped>
  /deep/ .el-dialog{
    width: 100%;
    position: absolute;
    top:10%;
    margin-top: 0px !important;
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item{
    width: 72px;
    height: 72px;
    float: left;
  }
  /deep/ .el-upload--picture-card{
    width: 72px;
    height: 72px;
    line-height: 80px;
    border:1px solid rgba(34,34,34,.08);
  }
  /deep/ .el-upload-list--picture-card .el-upload-list__item-status-label{
    background: #0076FF;
    display: none
  }
  .main{
    position: absolute;
    width: 100%;
    top:0;
    bottom: 60px;
    padding: 20px 16px;
    background: #fff;
    box-sizing: border-box;
  }
  .textarea{
    resize: none;
    border: none;
    color:rgba(34,34,34,1);
    font-size: 14px;
    width: 100%;
    height: 75%;
  }
  .upImg{
    position: absolute;
    bottom: 30px;
    left: 16px;
    /* width: 72px;
    height: 72px;
    background: url('/static/img/add@2x.png') no-repeat;
    background-size: 100% 100%; */
  }
  .upImg input{
    width: 72px;
    height: 72px;
    opacity: 0;
  }
  .up_release{
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 60px;
    box-shadow:0px 0px 14px 2px rgba(0,0,0,0.08);
    background: #fff;
    padding: 10px 24px;
    box-sizing: border-box;
  }
  .up_release button{
    border: none;
    margin: 0;
    padding: 0;
    display: block;
    width: 100%;
    height: 100%;
    background: #0076FF;
    border-radius: 20px;
    color: #fff;
    text-align: center;
    font-size: 16px;
    font-weight: 600;
    padding: 10px 0;
    box-sizing: border-box;
  }
</style>

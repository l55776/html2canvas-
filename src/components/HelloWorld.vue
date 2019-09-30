<template>
  <div class="container" ref=container>
    <div class="chagnan" v-if="dataURL" onselectstart="return false">
      <img class="icon-vs" src="../assets/shou.png" alt="" />
      <p>长按截图</p>
    </div>
    <img v-if="dataURL" width="100%" class="real_pic" :src="dataURL" />

    <div ref="imageWrapper" v-if="!dataURL">
      <div class='detail-top'>
        <div class='photo'>
          <div class='photoitem'>
            <!-- <img :src="startImg" mode="aspectFill" /> -->
            <van-uploader v-model="sfileList" :max-count="1" />

          </div>
          <div class='photoitem'>
            <!-- <img :src="endImg" mode="aspectFill" /> -->
            <van-uploader v-model="efileList" :max-count="1" />
          </div>
          <div class='vs'>
            <img src='../assets/vs.png' />
          </div>
        </div>
        <div class='contentdetail'>
          <div class='contentdetail-item'>
            <div class='number'>{{reqdata.rv1}}天</div>
            <div class='title'> 用时</div>
          </div>
          <div class='contentdetail-item'>
            <div class='number'>{{reqdata.rv2}}公斤</div>
            <div class='title'> 减重</div>
          </div>
          <div class='contentdetail-item'>
            <div class='number'>{{reqdata.rv3}}公斤</div>
            <div class='title'> 减脂</div>
          </div>
        </div>

        <div class='beforafter'>
          <div class=' beforafteritem'>
            <div class='number'>减脂前</div>
            <div class='title'>{{reqdata.date1}}</div>
          </div>
          <div class=' beforafteritem'>
            <div class='number'>减脂后</div>
            <div class='title'> {{reqdata.date2}}</div>
          </div>
        </div>
      </div>

      <div class='Contrast'>
        <div class='Contrastitem'>
          <div class='Contrastitem-li'>
            <div class='Contrastitem-liitme' v-for="(item,i) in reqdata.list" :key="i">
              <div>{{item.title}}</div>
              <div> {{item.value1}}{{item.unit}}</div>
            </div>
          </div>
        </div>

        <div class='Contrastitem'>
          <div class='Contrastitem-li Contrastitem-right'>
            <div class='Contrastitem-liitme' v-for="(item,i) in reqdata.list" :key="i">
              <div style="text-align:left">{{item.title}}</div>
              <div> {{item.value2}}{{item.unit}}</div>
              <!-- {{item.arrow=="up"?"active2":"active1"}} -->
              <div v-bind:class="{'active2':item.arrow=='up','active1':item.arrow!='up'}"> {{item.arrow=="up"?"上升":"下降"}}{{item.compareValue}}% </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='submit' v-if="!dataURL">
      <div class='share1' @click="openPopup">
        <div>
          <img src="../assets/download.png" />
        </div>
        <div>保存到相册 </div>
      </div>
      <!-- <div class='share'>
        <div open-type='share' class=" wxshare btn-share">分享</div>
      </div> -->
    </div>

    <div type="primary" @click="cancelFun" v-if="dataURL" class="mtbtn"> 取消返回</div>
  </div>

</template>
<script src='./js/html2canvas.js'></script>

<script>
import html2canvas from 'html2canvas'
import axios from 'axios'
import { Toast } from 'vant';
export default {
  name: 'HelloWorld',
  data() {
    return {
      dataURL: '',
      reqdata: [],
      startImg: '',
      endImg: '',
      sfileList: [],
      efileList: []
    }
  },

  created() {
    this.requset()
    // this.startImg = this.$route.query.startImg
    // this.endImg = this.$route.query.endImg

    // console.log(this.endImg)


  },


  methods: {
    afterRead(file) {
      // 此时可以自行将文件上传至服务器
      console.log(file);
    },
    scrollTop() {
      document.body.scrollTop = 0
      document.documentElement.scrollTop = 0;
    },
    requset() {
      var url = '/compare/appApi/dataModel/compare?param1=184&param2=185'
      // this.$axios.get('/compare/compare?param1=5d6a3342ba39c80068b965e3&param2=5d67bc79d5de2b006dfe5157')
      this.$axios.get(url)
        .then((res) => {
          console.log(res)
          res.data.rv1 = (res.data.rv1*1).toFixed(2)
          res.data.rv2 = (res.data.rv2*1).toFixed(2)
          res.data.rv3 = (res.data.rv3*1).toFixed(2)
          // res.data[0].rv1 = (res.data[0].rv1).toFixed(2)
          // res.data[0].rv2 = (res.data[0].rv2).toFixed(2)
          // res.data[0].rv3 = (res.data[0].rv3).toFixed(2)
          // this.reqdata = res.data[0]
          this.reqdata = res.data
        })
    },

    cancelFun() {
      this.stepIndex = 1
      this.dataURL = ''
      this.images = []
    },

    openPopup() {
      Toast.loading({
        mask: true,
        message: '加载中...'
      });
      this.scrollTop()
      var copyDom = this.$refs.imageWrapper //要保存的dom
      var width = copyDom.offsetWidth //dom宽
      var height = copyDom.offsetHeight //dom高
      console.log(width, height)
      var scale = 6 //放大倍数

      html2canvas(this.$refs.imageWrapper, {
        scale,
        width: width,
        height: height + 10,
        useCORS: true,
        backgroundColor: "#f5f5f5",
        taintTest: true, // 在渲染前测试图片
      }).then(canvas => {
        console.log(canvas)
        Toast.clear
        let dataURL = canvas.toDataURL('image/png')
        this.dataURL = dataURL
        // var alink = document.createElement("a");
        // alink.href = dataURL;
        // alink.download = "pic"; //图片名
        // alink.click();
        // console.log(alink)


        // let aLink = document.createElement('a')
        // let blob = this.base64ToBlob(dataURL)
        // let evt = document.createEvent('HTMLEvents')
        // evt.initEvent('click', true, true)
        // aLink.download = '标题.jpg'
        // aLink.href = (URL.createObjectURL(blob)).slice(30, 100)

        // // var URL = URL.createObjectURL(blob)
        // // var a = URL.slice(7, 19)
        // // console.log(a)

        // aLink.click()

      })

    },
    base64ToBlob(code) {
      let parts = code.split(';base64,')
      let contentType = parts[0].split(':')[1]
      let raw = window.atob(parts[1])
      let rawLength = raw.length
      let uInt8Array = new Uint8Array(rawLength)
      for (let i = 0; i < rawLength; ++i) {
        uInt8Array[i] = raw.charCodeAt(i)
      }
      return new Blob([uInt8Array], { type: contentType })

    },


  },

}
</script>

<style >
.chagnan {
  text-align: center;
  position: fixed;
  top: 30%;
  right: 20px;
  z-index: 88888;
}

.chagnan p {
  color: #ccc;
  font-size: 22px;
}

.chagnan img {
  margin: 0 auto;
  animation: myfirst 2s linear infinite;
  width: 40px;
}

.mtbtn {
  position: fixed;
  bottom: 10px;
  height: 40px;
  left: 5%;
  width: 90%;
  background: #09bb07;
  border-radius: 10px;
  color: #fff;
  line-height: 40px;
}

.container {
  background: #f5f5f5;
}

.detail-top {
  width: 100%;
  padding: 8.5px 8.5px 0;
  box-sizing: border-box;
}
.photo {
  width: 100%;
  height: 287px;
  display: flex;
  justify-content: space-between;
  position: relative;
}

.photoitem {
  width: 49%;
  background: #666;
  height: 100%;
  border-radius: 10px;
  position: relative;
}

.van-uploader {
  width: 100% !important;
  height: 100% !important;
  text-align: center;
  position: absolute;
  top: 0;
  left: 0;
}
.van-uploader__wrapper {
  width: 100% !important;
  height: 100% !important;
  overflow: hidden;
}
.van-uploader__upload {
  width: 100% !important;
  height: 100% !important;
  margin: 0;
}
.van-uploader__preview {
  width: 100%;
  margin: 0;
}
.van-uploader__preview-image {
  width: 100% !important;
  height: 100% !important;
  margin: 0;
}
.van-uploader__preview-image img {
  background-size: cover;
}
.van-uploader__preview-delete {
  top: 0;
  bottom: unset;
}

.photoitem img {
  width: 100%;
  height: 100%;
  border-radius: 10px;
}
.vs {
  height: 50px;
  width: 50px;
  background: #09bb07;
  border-radius: 50%;
  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}

.vs img {
  width: 100%;
  height: 100%;
}

.contentdetail {
  height: 67px;
  width: 100%;
  margin-top: 17px;
  background: #fff;
  display: flex;
  justify-content: space-between;
  padding: 15px;
  box-sizing: border-box;
}

.contentdetail-item {
  width: 33.3%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
  border-right: 1px solid #f5f5f5;
}

.contentdetail-item:nth-child(3) {
  border-right: none;
}

.contentdetail-item .number,
.beforafteritem .number {
  font-size: 18px;
  color: #333;
  font-weight: bold;
}
.contentdetail-item .title,
.beforafteritem .title {
  font-size: 13px;
  color: #666;
}

.beforafter {
  display: flex;
  height: 81px;
  width: 100%;
  justify-content: space-between;
  padding: 20px 0px;
  box-sizing: border-box;
}

.beforafteritem {
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  text-align: center;
}

/* ---Contrast------------------------------------------ */
.Contrast {
  width: 100%;
  display: flex;
  justify-content: space-around;
  margin-bottom: 17px;
}
.Contrastitem {
  width: 48%;
  height: auto;
  border-radius: 10px;
  background: #fff;
  padding: 0 12px;
  box-sizing: border-box;
}

.Contrastitem-li {
  width: 100%;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  box-sizing: border-box;
}

.Contrastitem-liitme {
  width: 100%;
  height: 41px;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #f5f5f5;
  line-height: 41px;
}

.Contrastitem-liitme div:nth-child(1) {
  color: #666;
  font-size: 10px;
}

.Contrastitem-liitme div:nth-child(2) {
  color: #333;
  font-size: 10px;
  font-weight: bold;
}

.Contrastitem-right .Contrastitem-liitme div {
  width: 33.3%;
  text-align: center;
}

.Contrastitem-right .Contrastitem-liitme div:nth-child(3) {
  margin: 10.5px 0;
  width: 45px;
  height: 20px;
  color: #fff;
  background: #ccc;
  line-height: 20px;
  font-size: 8.5px;
  border-radius: 5px;
}

.active1 {
  background: #09bb07 !important;
}

.active2 {
  background: #f60437 !important;
}

.submit {
  width: 100%;
  height: 77px;
  background: #fff;
  display: flex;
  justify-content: space-between;
}
.share1 {
  width: 50%;
  display: flex;
  flex-direction: column;
  margin: auto;
  text-align: center;
  font-size: 10px;
  color: #666;
}

.share1 img {
  width: 31px;
  height: 31px;
  margin: auto;
}
.share {
  width: 50%;
  position: relative;
}

.wxshare {
  width: 154px;
  height: 48px;
  background: #09bb07;
  border-radius: 5px;
  color: #fff;
  text-align: center;
  line-height: 48px;

  position: absolute;
  margin: auto;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
}
</style>

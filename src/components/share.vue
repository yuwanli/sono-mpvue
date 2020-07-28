<template>
  <div class="modal" @click="hide">
    <div class="modal_content" @click.stop>
      <canvas id="canvas" class="canvas" canvas-id="share"></canvas>
      <div class="btn" @click="btnClick">点击保存图片</div>
    </div>
  </div>
</template>

<script>
import {generateShareImg, saveCanvasImg} from 'src/utils/index'
export default {
  data () {
    return {
      cartNum: 1
    }
  },
  props: {
    detail: {
      type: Object,
      default: {}
    },
    icon: {
      type: String,
      default: ''
    }
  },
  created () {
    console.log('created')
    generateShareImg('share', this.detail, this.icon)
  },
  methods: {
    hide () {
      console.log('hide click')
      this.$emit('hideShare')
    },
    async btnClick () {
      console.log('>>> btnClick')
      await saveCanvasImg({
        x: 0,
        y: 0,
        width: 548 * wx.ratio,
        height: 730 * wx.ratio,
        destWidth: 548,
        destHeight: 730,
        canvasId: 'share'
      })
      wx.showToast({
        title: '图片保存成功',
        icon: 'success'
      })
      this.hide()
    }
  }

}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
.modal{
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 9999;
  background-color: rgba(0,0,0,0.8);
  &_content{
    position: absolute;
    top: 50%;
    left: 50%;
    box-sizing: border-box;
    padding: 40/@bs 16/@bs;
    width: 580/@bs;
    height: 900/@bs;
    background-color: #fff;
    transform: translate(-50%,-50%);
    .canvas{
      overflow: hidden;
      width: 548/@bs;
      height: 730/@bs;
      border: 1px solid #d1d1d1;
      background-color: #fff;
    }
    .btn{
      margin: 35/@bs auto;
      width: 540/@bs;
      height: 60/@bs;
      border-radius: 60/@bs;
      background-color: #ff434c;
      color: #d1d1d1;
      text-align: center;
      font-size: 24/@bs;
      line-height: 60/@bs;
    }
  }
}
</style>

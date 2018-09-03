<template>
  <div class="loading" v-show="hasMore">
    <div v-show="hasMore" class="load-spinner"></div>
    <p>{{hasMore ? loadingText : noMoreText}}</p>
  </div>
</template>

<script>
export default {
  props: {
    loadingText: {
      type: String,
      default: '加载中...'
    },
    noMoreText: {
      type: String,
      default: '无更多内容'
    },
    hasMore: {
      type: Boolean,
      default: true
    }
  },
  created () {
    console.log('111')
  },
  mounted () {
    console.log('111222')
  }
}
</script>



<style lang="less" scoped>
@import '~src/utils/less/var.less';
.loading{
  height: 80/@bs;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  width: 640/@bs;
  p{
    font-size: 24/@bs;
    color: #c5c5c5;
  }
}
.load-spinner{
    border: 5/@bs solid transparent;
    border-top-color: rgb(204, 204, 204);
    border-left-color: rgb(204, 204, 204);
    border-bottom-color: rgb(204, 204, 204);
    height: 30/@bs;
    width: 30/@bs;
    animation: loading .8s infinite linear;
    border-radius: 50%;
    margin-right: 15/@bs;
}
@keyframes loading {
    0% {
        -webkit-transform: rotate(0deg);
        transform: rotate(0deg)
    }

    to {
        -webkit-transform: rotate(1turn);
        transform: rotate(1turn)
    }
}
</style>

<template>
  <div class="container no-header">
    <!-- <button open-type="contact" @contact="handleContact">1111</button> -->
    <div class="status">
      <image class="status__bg" src="/assets/images/info_bg.png"></image>
      <div class="status__text">{{status[info.order_status-1]}}</div>
      <div class="status__tips">{{statusTips[info.order_status-1]}}</div>
    </div>
    <div class="common">
      <div class="common-item_text">{{info.user_name}}<span class="common-item_text-margin">{{info.user_mobile}}</span></div>
      <div class="common-item_text">地址：{{info.user_address}}</div>
    </div>
    <div class="common">
      <div class="common-item">
        <div class="common-item_name">订单号码：</div>
        <div class="common-item_detial"><span style="color:#2c75e2">{{info.order_sn}}</span><span @click="copy" class="copy">复制</span></div>
      </div>
      <div class="common-item">
        <div class="common-item_name">下单时间：</div>
        <div class="common-item_detial">{{info.timeStr}}</div>
      </div>
    </div>

    <div class="item">
      <div class="item_title">商品信息</div>
      <div class="item_detail">
        <div class="item_detail-name">
            <span class="goods">商品：{{info.good_name}}</span>
            <button :plain="true" open-type="contact" class="btn">联系客服</button>

        </div>
        <div class="item_detail-box">
          <div class="picBox" :style="'background-image:url('+info.good_img+')'"></div>
          <div class="desc">
            <div class="time">下单时间：{{info.timeStr}}</div>
            <div class="price">
              <div class="price_left">
                合计:<span style="color: #ff434c">{{info.order_amount}}</span>
              </div>
              <!-- <button :plain="true" open-type="contact" class="contact">联系客服</button> -->
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="logo">南屋北舍</div>
  </div>
</template>

<script>
import {base} from 'src/mixins/base.js'
import store from 'src/store'
export default {
  data () {
    return {
      status: [
        '未支付', '已取消', '待发货', '已发货', '已完成', '已完成'
      ],
      statusTips: [
        '请尽快完成支付',
        '您的订单已取消',
        '我们会尽快为您安排发货',
        '订单已发货，请注意查收',
        '您的订单已完成',
        '您的订单已完成'
      ],
      info: {}
    }
  },
  computed: {
    userInfo: () => {
      return store.state.user || {user: {}}
    }
  },
  mixins: [base],
  onLoad () {
    // this.init()
    const infoStr = wx.getStorageSync('sono_order_info')
    this.info = JSON.parse(infoStr)
    console.log(this.info)
  },
  onShow () {

  },
  methods: {
    handleContact (e) {
      console.log(e)
    },
    copy () {
      wx.setClipboardData({
        data: this.info.order_sn
      })
    }
  }
}
</script>

<style lang="less" scoped>
@import '~src/utils/less/var.less';
// .container{
//   background-color: #ebebeb;
// }
.logo{
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  height: 70/@bs;
  background-color: #ebebeb;
  color: rgba(0,0,0,0.5);
  text-align: center;
  font-size: 20/@bs;
  line-height: 70/@bs;
}
.contact{
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: center;
  margin-left: 30/@bs;
  padding: 5/@bs 20/@bs;
  height: 40/@bs;
  border: 1/@bs solid #ebebeb;
  border-radius: 20/@bs;
  background:none;
  box-shadow: none;
  font-size: 20/@bs;
  line-height: 40/@bs;

  appearance: none;
  -webkit-appearance: none;
}
.status{
  position: relative;
  z-index: 10;
  box-sizing: border-box;
  padding: 60/@bs 30/@bs;
  height: 190/@bs;
  &__bg{
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: -1;
    width: 640/@bs;
    height: 190/@bs;
  }
  &__text{
    color: #fff;
    font-size: 24/@bs;
    line-height: 36/@bs;

  }
  &__tips{
    margin-top: 10/@bs;
    color: #fff;
    font-size: 18/@bs;
    line-height: 36/@bs;
  }
}
.common{
  padding: 30/@bs 30/@bs;
  border-bottom: 10/@bs solid #ebebeb;
  &-item{
    display: flex;
    align-items: center;
    flex-direction: row;
    height: 40/@bs;
    font-size: 20/@bs;
    line-height: 40/@bs;
    &_text{
      color: #262626;
      text-align: left;
      font-size: 20/@bs;
      line-height: 36/@bs;
       &-margin{
        margin-left: 30/@bs;
      }
    }
    &_name{
      flex: 0 0 116/@bs;
      color: #262626;
      text-align: left;
    }
    &_detail{
      display: flex;
      align-items: center;
      flex-direction: row;
      color: #000;
    }
  }
}
.copy{
  margin-left: 30/@bs;
  padding: 8/@bs 24/@bs;
  border: 1/@bs solid #ff434c;
  color: #ff434c;
  font-size: 20/@bs;
}
.order{
  padding: 10/@bs 20/@bs;
  border-bottom: 10/@bs solid #ebebeb;
}
.item{
  padding: 10/@bs 30/@bs;
  &_title{
    border-bottom: 1/@bs solid #aaa;
    color: #262626;
    font-size: 24/@bs;
    line-height: 62/@bs;
  }
  &_detail{
    &-box{
      display: flex;
      align-items: center;
      height: 120/@bs;
      .picBox{
        margin-right: 20/@bs;
        width: 120/@bs;
        height: 120/@bs;
        border-radius: 4/@bs;
        background-color: #ebebeb;
        background-position: center;
        background-size: cover;
        background-repeat: no-repeat;
      }
      .desc{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        height: 120/@bs;
        .time{
          margin-top: 10/@bs;
          color: #8d8d8d;
          font-size: 20/@bs;
          line-height: 30/@bs;
        }
        .price{
          display: flex;
          align-items: center;
          flex-direction: row;
          font-size: 24/@bs;
        }
      }
    }
    &-name{
      display: flex;
      overflow: hidden;
      align-items: center;
      justify-content: space-between;
      margin: 10/@bs auto 20/@bs;
      font-size: 24/@bs;
      line-height: 30/@bs;
      .goods{
        flex: 1;
        margin-right: 15/@bs;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
      .btn{
        display: flex;
        align-items: center;
        flex: 0 0 116/@bs;
        flex-direction: row;
        justify-content: center;
        box-sizing: border-box;
        margin-left: 30/@bs;
        padding: 0;
        height: 36/@bs;
        border: none;
        border-radius: 0;
        background-color: #ff434c;
        box-shadow: none;
        color: #fff;
        text-align: center;
        font-size: 20/@bs;
        line-height: 36/@bs;

        appearance: none;
        -webkit-appearance: none;
      }
    }

  }
}
</style>

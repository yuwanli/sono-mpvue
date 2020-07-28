import store from '../store/index'

function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  const t1 = [year, month, day].map(formatNumber).join('/')
  const t2 = [hour, minute, second].map(formatNumber).join(':')

  return `${t1} ${t2}`
}

export const wxFun2Async = (name, obj = {}, completeCallBack) => {
  return new Promise((resolve, reject) => {
    if (!wx[name]) {
      reject(new Error(`函数名有误--${name}`))
      return
    }
    wx[name]({
      ...obj,
      success (res) {
        resolve(res)
      },
      fail (err) {
        console.log('error', err)
        reject(err)
      },
      complete () {
        if (completeCallBack && typeof completeCallBack === 'function') {
          completeCallBack()
        }
      }
    })
  })
}

const drawText = (ctx, str, leftWidth, initHeight, lineHeight, maxWidth) => {
  let lineWidth = 0
  let lastSubStrIndex = 0 // 每次开始截取的字符串的索引

  for (let i = 0; i < str.length; i++) {
    lineWidth += ctx.measureText(str[i]).width
    if (lineWidth > maxWidth) {
      ctx.fillText(str.substring(lastSubStrIndex, i), leftWidth, initHeight) // 绘制截取部分
      initHeight += lineHeight // 16为字体的高度
      lineWidth = 0
      lastSubStrIndex = i
    }
    if (i === str.length - 1) {
      ctx.fillText(str.substring(lastSubStrIndex, i + 1), leftWidth, initHeight)
    }
  }
}

const downloadFileAsync = async (src) => {
  const res = await wxFun2Async('downloadFile', {
    url: src
  })
  return res
}

let ratio = 0
export const generateShareImg = async (canvasId, obj, qrcode) => {
  if (!ratio) {
    const res = await wxFun2Async('getSystemInfo', {})
    ratio = res.windowWidth / 640
    wx.ratio = ratio
  }

  wx.showToast({
    title: '开始'
  })
  const [image, imageInfo, avatar] = await Promise.all([
    downloadFileAsync(obj.thumb),
    wxFun2Async('getImageInfo', {
      src: obj.thumb
    }),
    downloadFileAsync(store.state.user.user.self_img)
  ]).catch(err => {
    console.error(err)
    return false
  })

  const fs = wx.getFileSystemManager()
  const path = `${wx.env.USER_DATA_PATH}/sono_code_${obj.good_id}.jpeg`

  const generate = (path) => {
    wx.showLoading({
      title: '图片生成中',
      mask: true
    })
    const context = wx.createCanvasContext(canvasId)
    context.setFillStyle('#ffffff')
    context.fillRect(0, 0, 548 * ratio, 730 * ratio)
    context.save()
    context.drawImage(image.tempFilePath, 0, 37 * imageInfo.width / 548, imageInfo.width, imageInfo.width * 474 / 548, 0, 0, 548 * ratio, 474 * ratio)
    context.beginPath()
    context.setFillStyle('rgba(0,0,0,0.5)')
    context.fillRect(0 * ratio, 364 * ratio, 548 * ratio, 110 * ratio)
    context.save()
    context.beginPath()
    context.arc(84 * ratio, 420 * ratio, 44 * ratio, 0, 2 * Math.PI)
    context.clip()
    context.drawImage(avatar.tempFilePath, 40 * ratio, 376 * ratio, 88 * ratio, 88 * ratio)
    context.restore()

    context.setFillStyle('#ffffff')
    context.setFontSize(30 * ratio)
    context.setTextAlign('left')
    context.fillText(store.state.user.user.nick_name, 150 * ratio, 410 * ratio)
    context.setFillStyle('#d3fb48')
    context.fillText('推荐了好物', 150 * ratio, 454 * ratio)
    context.setFillStyle('#d31e1f')
    context.font = `bold ${34 * ratio}px`
    context.fillText('¥ 783.55', 40 * ratio, 540 * ratio)

    context.setLineDash([2 * ratio, 5 * ratio], 20 * ratio)
    context.setStrokeStyle('#d1d1d1')
    context.beginPath()
    context.moveTo(40 * ratio, 565 * ratio)
    context.lineTo(350 * ratio, 565 * ratio)
    context.stroke()

    context.setTextAlign('left')
    context.setFontSize(28 * ratio)
    context.setFillStyle('#000000')

    drawText(context, obj.title, 45 * ratio, 610 * ratio, 46 * ratio, 310 * ratio)
    context.drawImage(path, 380 * ratio, 500 * ratio, 135 * ratio, 135 * ratio)

    context.setTextAlign('center')
    context.fillText('长按抢购', 447 * ratio, 680 * ratio)

    context.draw()
    wx.hideLoading()
    return true
  }

  fs.writeFile({
    filePath: path,
    data: wx.base64ToArrayBuffer(qrcode.replace(new RegExp('^data:image/jpeg;base64,', 'g'), '')),
    encoding: 'binary',
    success (res) {
      generate(path)
    },
    fail (error) {
      console.log('writeFile error', error)
    }
  })
}

export const saveCanvasImg = async (obj) => {
  const res = await wxFun2Async('canvasToTempFilePath', obj).catch(err => {
    console.error(err)
  })
  await wxFun2Async('saveImageToPhotosAlbum', {
    filePath: res.tempFilePath
  }).catch(err => {
    console.error(err)
  })
  return true
}

export default {
  wxFun2Async,
  generateShareImg,
  saveCanvasImg,
  formatNumber,
  formatTime
}

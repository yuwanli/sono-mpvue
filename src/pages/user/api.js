import {ajax} from 'src/utils/ajax'

export const getUserInfo = () => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'user/info',
      method: 'POST'
    }).then(res => {
      resolve(res)
    })
  })
}
export const getOrderList = (data) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/list',
      method: 'POST',
      data: {
        ...data
      }
    }).then(res => {
      resolve(res)
    })
  })
}

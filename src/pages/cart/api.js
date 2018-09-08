import {ajax} from 'src/utils/ajax'

export const getCartList = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/list',
      method: 'POST'
    }).then(res => {
      resolve(res)
    })
  })
}

export const addOrder = (data) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/add',
      method: 'POST',
      data: {
        ...data
      }
    }).then(res => {
      resolve(res)
    })
  })
}

export const deleteCart = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/del',
      method: 'POST',
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

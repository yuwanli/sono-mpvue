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

export const addOrder = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'order/add',
      method: 'POST',
      data: {
        address_id: id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

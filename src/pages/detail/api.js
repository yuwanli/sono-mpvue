import {ajax} from 'src/utils/ajax'

export const getDetail = (id) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'good/detail',
      method: 'POST',
      data: {
        id
      }
    }).then(res => {
      resolve(res)
    })
  })
}

export const cartAdd = (data) => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'cart/add',
      method: 'POST',
      data: {
        ...data
      }
    }).then(res => {
      resolve(res)
    })
  })
}

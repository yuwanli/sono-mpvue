import {ajax} from 'src/utils/ajax'

export const getIndexList = () => {
  return new Promise((resolve, reject) => {
    ajax({
      sono: 'good/recommend',
      method: 'POST',
      query: {
        page: 1,
        num: 10
      }
    }).then(res => {
      resolve(res)
    })
  })
}

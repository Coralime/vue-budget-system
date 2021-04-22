import request from '@/utils/request'

export function getUserList(params) {
  return request({
    // baseURL: 'http://localhost:8081/', // 覆盖式写法
    url: '/vue-budget-system/user/manage/list',
    method: 'get',
    params
  })
}

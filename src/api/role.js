import request from '@/utils/request'

export function getRoleList(params) {
  return request({
    // baseURL: 'http://localhost:8081/', // 覆盖式写法
    url: '/vue-budget-system/role/role_list',
    method: 'get',
    params
  })
}

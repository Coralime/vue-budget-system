const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{ // 随机生成20条记录
    role_id: '@id',
    'role_name|1': ['管理员', '预算员', '一把手', '复核'],
    remark: '@sentence(10, 20)',
    creater: 'name',
    create_time: '@datetime'
  }]
})

module.exports = [
  {
    url: '/vue-budget-system/role/role_list',
    type: 'get',
    response: config => {
      const items = data.items
      return {
        code: 20000,
        data: {
          total: items.length,
          list: items
        }
      }
    }
  }
]

const Mock = require('mockjs')

const data = Mock.mock({
  'items|20': [{ // 随机生成20条记录
    user_code: '@id',
    user_name: '@name',
    province_name: '总公司',
    province_code: '1',
    profit_center: '北京分公司',
    profit_center_code: '1',
    branch_name: '武汉市分公司',
    branch_code: '1',
    cost_center: '成本中心1',
    cost_center_code: '1',
    branch_label: '总公司-北京分公司-武汉市分公司',
    role_name: ['管理员', '一把手', '分管总'],
    start_time: '@datetime',
    end_time: '@datetime',
    operater: '@name'
  }]
})

module.exports = [
  {
    url: '/vue-budget-system/user/manage/list',
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

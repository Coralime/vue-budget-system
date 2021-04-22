<template>
  <div class="app-container">
    <el-card class="box-card">
      <!--button功能区-->
      <div style="margin-bottom: 20px">
        <el-row :gutter="20">
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-button type="info" style="width: 100%" icon="el-icon-document-add" @click="batchAddUser">批量导入用户
              </el-button>
            </div>
          </el-col>
          <el-col :span="5">
            <div class="grid-content bg-purple">
              <el-button type="info" style="width: 100%" icon="el-icon-download" @click="downloadTemplate">下载模板
              </el-button>
            </div>
          </el-col>
        </el-row>
      </div>
      <!--addUserForm表单提交区-->
      <div>
        <el-form :model="addUserForm" :rules="rules" ref="addUserFormRef" label-width="100px" style="width: 100%">
          <el-form-item label="工号" prop="user_code" class="css-el-form-item-label">
            <el-input v-model="addUserForm.user_code"></el-input>
          </el-form-item>
          <el-form-item label="姓名" prop="user_name" class="css-el-form-item-label">
            <el-input v-model="addUserForm.user_name"></el-input>
          </el-form-item>
          <el-form-item label="机构" prop="province_name" class="css-el-form-item-label">
            <el-select
              v-model="addUserForm.province_name"
              placeholder="请选择机构"
              class="css-el-select"
              @change="handleProvinceChange">
              <el-option
                v-for="item in options_province"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="利润中心" prop="profit_center" class="css-el-form-item-label">
            <el-select
              v-model="addUserForm.profit_center"
              placeholder="请选择利润中心"
              class="css-el-select"
              @focus="handleProfitCenterFocus">
              <el-option
                v-for="item in options_profit_center"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="县支公司" prop="branch_name" class="css-el-form-item-label">
            <el-select
              v-model="addUserForm.branch_name"
              class="css-el-select"
              placeholder="请选择县支公司"
              @focus="handleBranchFocus">
              <el-option
                v-for="item in options_branch_name"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="成本中心" prop="cost_center" class="css-el-form-item-label">
            <el-select
              v-model="addUserForm.cost_center"
              placeholder="请选择成本中心"
              class="css-el-select"
              @focus="handleCostCenterFocus">
              <el-option
                v-for="item in options_cost_center"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="生效时间" prop="start_time" class="css-el-form-item-label">
            <el-date-picker
              type="date"
              placeholder="选择生效时间"
              v-model="addUserForm.start_time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="失效时间" prop="end_time" class="css-el-form-item-label">
            <el-date-picker
              type="date"
              placeholder="选择失效时间"
              v-model="addUserForm.end_time"
              format="yyyy 年 MM 月 dd 日"
              value-format="yyyy-MM-dd"
              style="width: 100%;">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="角色" prop="role_name" class="css-el-form-item-label">
            <el-select
              v-model="addUserForm.role_name"
              placeholder="请选择角色"
              class="css-el-select"
              multiple
              :multiple-limit=3>
              <el-option
                v-for="item in options_role"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
          <!--提交与重置-->
          <el-form-item>
            <el-button type="primary" @click="submitForm('addUserFormRef')">立即提交</el-button>
            <el-button @click="resetForm('addUserFormRef')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'UserAdd',
    data() {
      return {
        addUserForm: {
          user_code: '', // 工号
          user_name: '', // 姓名
          province_name: '', // 机构（省级公司）
          profit_center: '', // 利润中心（市级公司）
          branch_name: '', // 县支公司（县级公司）
          cost_center: '', // 成本中心（部门）
          start_time: '', // 生效时间
          end_time: '', // 失效时间
          role_name: [] // 角色名
        },
        // 机构
        options_province: [],
        // 利润中心
        options_profit_center: [],
        // 县支公司
        options_branch_name: [],
        // 成本中心
        options_cost_center: [],
        // 角色
        options_role: [{
          value: '1',
          label: '管理员'
        }, {
          value: '2',
          label: '一把手'
        }, {
          value: '3',
          label: '预算岗'
        }, {
          value: '4',
          label: '财务复核'
        }, {
          value: '5',
          label: '复核'
        }, {
          value: '6',
          label: '分管总'
        }, {
          value: '7',
          label: '财务部门总'
        }, {
          value: '8',
          label: '部门总'
        }, {
          value: '9',
          label: '部门复核'
        }, {
          value: '10',
          label: '经办'
        }],
        // 验证规则
        rules: {
          user_code: [
            { required: true, message: '请输入工号！', trigger: 'blur' },
            { min: 8, max: 8, message: '长度在 8 个字符！', trigger: 'blur' }
          ],
          user_name: [
            { required: true, message: '请输入姓名！', trigger: 'blur' },
            { min: 2, max: 4, message: '长度在 2-4 个字符！', trigger: 'blur' }
          ],
          province_name: [
            { required: true, message: '请选择一个机构！', trigger: 'change' }
          ],
          profit_center: [
            { required: true, message: '请选择一个利润中心！', trigger: 'change' }
          ],
          branch_name: [
            { required: true, message: '请选择一个县支公司！', trigger: 'change' }
          ],
          cost_center: [
            { required: true, message: '请选择一个成本中心！', trigger: 'change' }
          ],
          start_time: [
            { required: true, message: '请选择一个生效时间！', trigger: 'blur' }
          ],
          end_time: [
            { required: true, message: '请选择一个失效时间！', trigger: 'blur' }
          ],
          role_name: [
            { required: true, message: '请为该用户选择至少一个角色！', trigger: 'blur' }
          ]
        }
      }
    },
    created() {
      this.getProvinceData()
    },
    methods: {
      // 批量导入用户
      batchAddUser() {
        alert('批量导入用户')
      },
      // 下载模板文件
      downloadTemplate() {
        alert('下载模板文件')
      },
      // 新增用户提交
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('-----新增用户提交----')
            console.log(this.addUserForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      },
      // 重置表单
      resetForm(formName) {
        this.$refs[formName].resetFields()
      },
      // -----下拉框级联控制------
      // 数据初始化
      getProvinceData() {
        this.options_province = [{
          value: '1',
          label: '总公司'
        }, {
          value: '2',
          label: '研发中心'
        }, {
          value: '3',
          label: '数据中心'
        }, {
          value: '4',
          label: '省级分公司'
        }]
      },
      getProfitCenterData() {
        this.options_profit_center = [{
          value: '1',
          label: '北京分公司'
        }, {
          value: '2',
          label: '江苏省分公司'
        }, {
          value: '3',
          label: '广东省分公司'
        }, {
          value: '4',
          label: '福建省分公司'
        }, {
          value: '5',
          label: '湖北省分公司'
        }]
      },
      getBranchData() {
        this.options_branch_name = [{
          value: '1',
          label: '武汉市分公司'
        }, {
          value: '2',
          label: '宜昌市分公司'
        }, {
          value: '3',
          label: '黄冈市分公司'
        }, {
          value: '4',
          label: '恩施市分公司'
        }, {
          value: '5',
          label: '咸宁市分公司'
        }]
      },
      getCostCenterData() {
        this.options_cost_center = [{
          value: '1',
          label: '成本中心1'
        }, {
          value: '2',
          label: '成本中心2'
        }, {
          value: '3',
          label: '成本中心3'
        }, {
          value: '4',
          label: '成本中心4'
        }, {
          value: '5',
          label: '成本中心5'
        }]
      },
      // 级联控制
      handleProvinceChange(value, lable) {
        console.log('处理机构focus事件')
      },
      handleProfitCenterFocus() {
        if (this.addUserForm.province_name === '') {
          this.$message.warning('请选择一个机构！')
        } else {
          this.getProfitCenterData()
        }
      },
      handleBranchFocus() {
        if (this.addUserForm.profit_center === '') {
          this.$message.warning('请选择一个利润中心！')
        } else {
          this.getBranchData()
        }
      },
      handleCostCenterFocus() {
        if (this.addUserForm.branch_name === '') {
          this.$message.warning('请选择一个县支公司！')
        } else {
          this.getCostCenterData()
        }
      }
    }
  }
</script>

<style lang="scss" scoped>
  .box-card {
    /*margin: 5px 0;*/
  }

  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple {
    background: #d3dce6;
  }

  .css-el-select {
    width: 100%;
  }

  .css-el-form-item-label {
    background-color: #F5F7FA;
    /*border: 1px solid #C6C6C6*/
  }
</style>

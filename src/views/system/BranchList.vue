<template>
  <div class="app-container">
    <el-card class="box-card">
      <!--机构层级-->
      <el-row :gutter="20" style="margin: 10px 0">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="province_name" placeholder="请选择机构">
              <el-option
                v-for="item in options_province"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="profit_center" placeholder="请选择利润中心">
              <el-option
                v-for="item in options_profit_center"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="branch_name" placeholder="请选择县支公司">
              <el-option
                v-for="item in options_branch_name"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="cost_center" placeholder="请选择成本中心">
              <el-option
                v-for="item in options_cost_center"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!--查询区域-->
      <el-row :gutter="20" style="margin: 10px 0">
        <!--按钮功能区域-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div style="display: flex;justify-content: center">
              <el-button type="info" style="width: 100%" icon="el-icon-search" @click="fetchBranchList">查询</el-button>
              <el-button type="info" style="width: 100%" icon="el-icon-position" @click="exportBranchList">导出</el-button>
            </div>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple">
            <div style="display: flex;justify-content: center">
              <el-button type="danger" style="width: 100%;" @click="handleBatchDelete">批量删除<i
                class="el-icon-delete el-icon--right"></i></el-button>
            </div>
          </div>
        </el-col>
      </el-row>
      <!-- 机构列表区 -->
      <el-table :data="branch_list" border stripe style="margin: 10px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="机构代码" prop="province_code"></el-table-column>
        <el-table-column label="机构名称" prop="province_name"></el-table-column>
        <el-table-column label="利润中心代码" prop="profit_center_code"></el-table-column>
        <el-table-column label="利润中心名称" prop="profit_center_name"></el-table-column>
        <el-table-column label="县支公司代码" prop="branch_code"></el-table-column>
        <el-table-column label="县支公司名称" prop="branch_name"></el-table-column>
        <el-table-column label="成本中心代码" prop="cost_center_code"></el-table-column>
        <el-table-column label="备注" prop="remark"></el-table-column>
        <el-table-column label="操作" width="200px">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-tooltip class="item" effect="dark" content="编辑" placement="top" :enterable="false">
              <el-button
                type="success"
                icon="el-icon-edit"
                size="mini"
                @click="showEditDialog(scope.row)"></el-button>
            </el-tooltip>
            <!-- 删除按钮 -->
            <el-tooltip class="item" effect="dark" content="删除" placement="top" :enterable="false">
              <el-button
                type="danger"
                icon="el-icon-delete"
                size="mini"
                @click="deleteBranch(scope.row)"></el-button>
            </el-tooltip>
          </template>
        </el-table-column>
      </el-table>
      <!-- 分页区 -->
      <el-pagination
        style="text-align: center;margin: 10px"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :page-sizes="[5, 10, 20, 30]"
        :current-page=queryInfo.page_num
        :page-size=queryInfo.page_size
        layout="total, sizes, prev, pager, next, jumper"
        :total=total_num>
      </el-pagination>
    </el-card>
    <!-- 编辑机构对话框 -->
    <el-dialog title="编辑机构" :visible.sync="editBranchDialogVisible" width="40%" @close="editBranchDialogClosed">
      <el-form :model="editBranchForm" :rules="editBranchFormRules" ref="editBranchFormRef" label-width="100px">
        <el-form-item label="机构" prop="province_name">
          <el-select v-model="editBranchForm.province_name" placeholder="请选择机构" class="css-el-select">
            <el-option
              v-for="item in options_province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="利润中心" prop="profit_center">
          <el-select v-model="editBranchForm.profit_center" placeholder="请选择利润中心" class="css-el-select">
            <el-option
              v-for="item in options_profit_center"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县支公司" prop="branch_name">
          <el-select v-model="editBranchForm.branch_name" placeholder="请选择县支公司" class="css-el-select">
            <el-option
              v-for="item in options_branch_name"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本中心" prop="cost_center">
          <el-select v-model="editBranchForm.cost_center_name" placeholder="请选择成本中心" class="css-el-select">
            <el-option
              v-for="item in options_cost_center"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="备注" prop="remark">
          <el-input type="textarea" v-model="editBranchForm.remark"></el-input>
        </el-form-item>
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editBranchDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editBranch('editBranchFormRef')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getBranchList } from '@/api/branch-manage'

  export default {
    name: 'BranchList',
    data() {
      return {
        // 机构
        province_name: '',
        options_province: [{
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
        }],
        // 利润中心
        profit_center: '',
        options_profit_center: [{
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
        }],
        // 县支公司
        branch_name: '',
        options_branch_name: [{
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
        }],
        // 成本中心
        cost_center_name: '',
        options_cost_center: [{
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
        }],
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
        // -----------------
        // 查询条件
        queryInfo: {
          input_val: '', // 工号/姓名
          page_num: 1, // 分页-当前第n页
          page_size: 10 // 分页-每页n条记录
        },
        // 机构列表
        branch_list: [],
        total_num: 40, // 列表总记录数
        // ----- 编辑机构 ----
        editBranchDialogVisible: false,
        editBranchForm: {
          province_name: '', // 机构（省级公司）
          province_code: '',
          profit_center_name: '', // 利润中心（市级公司）
          profit_center_code: '',
          branch_name: '', // 县支公司（县级公司）
          branch_code: '',
          cost_center_name: '', // 成本中心（部门）
          cost_center_code: '',
          remark: '' // 备注
        },
        // 验证规则
        editBranchFormRules: {
          province_name: [
            { required: true, message: '请选择一个机构！', trigger: 'change' }
          ],
          profit_center_name: [
            { required: true, message: '请选择一个利润中心！', trigger: 'change' }
          ],
          branch_name: [
            { required: true, message: '请选择一个县支公司！', trigger: 'change' }
          ],
          cost_center_name: [
            { required: true, message: '请选择一个成本中心！', trigger: 'change' }
          ]
        }
      }
    },
    methods: {
      // 获取机构列表数据
      fetchBranchList() {
        getBranchList().then(response => {
          console.log(response.data)
          this.branch_list = response.data.list
          this.total_num = response.data.total
        })
      },
      // 导出机构列表
      exportBranchList() {
        alert('导出机构列表')
      },
      // 处理批量删除
      handleBatchDelete() {
        alert('处理批量删除')
      },
      // ------------------------------------
      // 打开编辑对话框
      showEditDialog(branch_info) {
        this.editBranchDialogVisible = true
        this.editBranchForm = branch_info
        console.log(branch_info)
      },
      // 删除单个机构
      deleteBranch(branch_info) {
        this.$confirm('此操作将删除该用户 [ ' + branch_info.cost_center_name + '  ] 的记录, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async() => {
          alert('删除成功！')
        }).catch(() => {
          this.$message.info('已取消删除')
        })
      },
      // ------------------------------------
      // 监听 page-size 改变的事件
      handleSizeChange(newSize) {
        // console.log(newSize)
        this.queryInfo.page_size = newSize
        this.fetchBranchList() // 重新发送请求获取最新的数据
      },
      // 监听 current-page 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.page_num = newPage
        this.fetchBranchList() // 重新发送请求获取最新的数据
      },
      // -------------------------------------
      // 对话框关闭事件
      editBranchDialogClosed() {
        this.$refs.editBranchFormRef.resetFields() // 重置表单
      },
      // 确认编辑机构
      editBranch(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('------编辑信息------')
            console.log(this.editBranchForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {
      this.fetchBranchList() // 获取机构列表
    }
  }
</script>

<style lang="scss" scoped>
  .box-card {
    /*margin: 10px;*/
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
</style>

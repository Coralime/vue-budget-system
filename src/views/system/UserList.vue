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
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="queryInfo.input_val" placeholder="请输入查询工号或者姓名"></el-input>
          </div>
        </el-col>
        <!--按钮功能区域-->
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <div style="display: flex;justify-content: center">
              <el-button type="info" style="width: 100%" icon="el-icon-search" @click="fetchUserList">查询</el-button>
              <el-button type="info" style="width: 100%" icon="el-icon-position" @click="exportUserList">导出</el-button>
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
      <!-- 用户列表区 -->
      <el-table :data="user_list" border stripe style="margin: 10px">
        <el-table-column type="index"></el-table-column>
        <el-table-column label="工号" prop="user_code"></el-table-column>
        <el-table-column label="姓名" prop="user_name"></el-table-column>
        <el-table-column label="所属机构" prop="branch_label"></el-table-column>
        <el-table-column label="成本中心" prop="cost_center"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">
            <el-tag v-for="role in scope.row.role_name">{{ role }}</el-tag>
          </template>
        </el-table-column>
        <el-table-column label="生效时间" prop="start_time"></el-table-column>
        <el-table-column label="失效时间" prop="end_time"></el-table-column>
        <el-table-column label="创建人" prop="operater"></el-table-column>
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
                @click="deleteUser(scope.row)"></el-button>
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
    <!-- 编辑用户对话框 -->
    <el-dialog title="编辑用户" :visible.sync="editUserDialogVisible" width="40%" @close="editUserDialogClosed">
      <el-form :model="editUserForm" :rules="editUserFormRules" ref="editUserFormRef" label-width="100px">
        <el-form-item label="工号" prop="user_code">
          <el-input v-model="editUserForm.user_code" disabled></el-input>
        </el-form-item>
        <el-form-item label="姓名" prop="user_name">
          <el-input v-model="editUserForm.user_name"></el-input>
        </el-form-item>
        <el-form-item label="机构" prop="province_name">
          <el-select v-model="editUserForm.province_name" placeholder="请选择机构" class="css-el-select">
            <el-option
              v-for="item in options_province"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="利润中心" prop="profit_center">
          <el-select v-model="editUserForm.profit_center" placeholder="请选择利润中心" class="css-el-select">
            <el-option
              v-for="item in options_profit_center"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="县支公司" prop="branch_name">
          <el-select v-model="editUserForm.branch_name" placeholder="请选择县支公司" class="css-el-select">
            <el-option
              v-for="item in options_branch_name"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成本中心" prop="cost_center">
          <el-select v-model="editUserForm.cost_center" placeholder="请选择成本中心" class="css-el-select">
            <el-option
              v-for="item in options_cost_center"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="生效时间" prop="start_time">
          <el-date-picker
            type="date"
            placeholder="选择生效时间"
            v-model="editUserForm.start_time"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="失效时间" prop="end_time">
          <el-date-picker
            type="date"
            placeholder="选择失效时间"
            v-model="editUserForm.end_time"
            format="yyyy 年 MM 月 dd 日"
            value-format="yyyy-MM-dd"
            style="width: 100%;">
          </el-date-picker>
        </el-form-item>
        <el-form-item label="角色" prop="role_name">
          <el-select
            v-model="editUserForm.role_name"
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
      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="editUserDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="editUser('editUserFormRef')">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import { getUserList } from '@/api/user-manage'

  export default {
    name: 'UserList',
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
        cost_center: '',
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
        // 用户列表
        user_list: [],
        total_num: 40, // 列表总记录数
        // ----- 编辑用户 ----
        editUserDialogVisible: false,
        editUserForm: {
          user_code: '', // 工号
          user_name: '', // 姓名
          province_name: '', // 机构（省级公司）
          province_code: '',
          profit_center: '', // 利润中心（市级公司）
          profit_center_code: '',
          branch_name: '', // 县支公司（县级公司）
          branch_code: '',
          cost_center: '', // 成本中心（部门）
          cost_center_code: '',
          start_time: '', // 生效时间
          end_time: '', // 失效时间
          role_name: [] // 角色名
        },
        // 验证规则
        editUserFormRules: {
          user_code: [
            { required: true, message: '请输入工号！', trigger: 'blur' }
            // { min: 8, max: 8, message: '长度在 8 个字符！', trigger: 'blur' }
          ],
          user_name: [
            { required: true, message: '请输入姓名！', trigger: 'blur' }
            // { min: 2, max: 4, message: '长度在 2-4 个字符！', trigger: 'blur' }
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
    methods: {
      // 获取用户列表数据
      fetchUserList() {
        getUserList().then(response => {
          console.log(response.data)
          this.user_list = response.data.list
          this.total_num = response.data.total
        })
      },
      // 导出用户列表
      exportUserList() {
        alert('导出用户列表')
      },
      // 处理批量删除
      handleBatchDelete() {
        alert('处理批量删除')
      },
      // ------------------------------------
      // 打开编辑对话框
      showEditDialog(user_info) {
        this.editUserDialogVisible = true
        this.editUserForm = user_info
        console.log(user_info)
      },
      // 删除单个用户
      deleteUser(user_info) {
        this.$confirm('此操作将删除该用户 [ ' + user_info.user_name + '  ] 的记录, 是否继续?', '提示', {
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
        this.fetchUserList() // 重新发送请求获取最新的数据
      },
      // 监听 current-page 改变的事件
      handleCurrentChange(newPage) {
        // console.log(newPage)
        this.queryInfo.page_num = newPage
        this.fetchUserList() // 重新发送请求获取最新的数据
      },
      // -------------------------------------
      // 对话框关闭事件
      editUserDialogClosed() {
        this.$refs.editUserFormRef.resetFields() // 重置表单
      },
      // 确认编辑用户
      editUser(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            console.log('------编辑信息------')
            console.log(this.editUserForm)
          } else {
            console.log('error submit!!')
            return false
          }
        })
      }
    },
    created() {
      this.fetchUserList() // 获取用户列表
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

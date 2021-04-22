<template>
  <div class="app-container">
    <el-card class="box-card">
      <h2>角色管理</h2>
      <!--查询区域-->
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-input v-model="query_role" placeholder="请输入角色名查询"></el-input>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple" style="padding: 0 10px">
            <el-button type="info" icon="el-icon-search" style="width: 100%;">查询</el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple" style="padding: 0 10px">
            <el-button type="warning" style="width: 100%;" @click="handleAdd">新增<i
              class="el-icon-circle-plus el-icon--right"></i>
            </el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple" style="padding: 0 10px">
            <el-button type="danger" style="width: 100%;" @click="handleBatchDelete">批量删除<i
              class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
      <!--角色列表区域-->
      <el-table :data="tableData" stripe style="width: 100%;">
        <el-table-column type="selection" width="55"></el-table-column>
        <!--        <el-table-column type="index"></el-table-column>-->
        <el-table-column prop="role_id" label="角色ID" width="100px"></el-table-column>
        <el-table-column prop="role_name" label="角色名"></el-table-column>
        <el-table-column prop="remark" label="备注"></el-table-column>
        <el-table-column prop="creater" label="创建人"></el-table-column>
        <el-table-column prop="create_time" label="创建时间"></el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <!-- 编辑按钮 -->
            <el-button type="success" icon="el-icon-edit" size="mini" @click="handleEdit(scope.row)">编辑
            </el-button>
            <!-- 删除按钮 -->
            <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteUser(scope.row.role_id)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <!--分页组件-->
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="1"
        :page-sizes="[5, 10, 20, 30]"
        :page-size="10"
        layout="total, sizes, prev, pager, next, jumper"
        :total="40">
      </el-pagination>
      <!--新增界面-->
      <el-dialog title="新增角色" width="40%" :visible.sync="addDialogVisible" :close-on-click-modal="false">
        <el-form :model="roleDataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
          <el-form-item label="角色名" prop="role_name">
            <el-input v-model="roleDataForm.role_name"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="roleDataForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :size="size" type="info" @click.native="addDialogVisible = false">取消</el-button>
          <el-button :size="size" type="warning" @click.native="submitForm">确认</el-button>
        </div>
      </el-dialog>
      <!--编辑界面-->
      <el-dialog title="编辑角色" width="40%" :visible.sync="updateDialogVisible" :close-on-click-modal="false">
        <el-form :model="roleDataForm" label-width="80px" :rules="dataFormRules" ref="dataForm" :size="size">
          <el-form-item label="角色ID" prop="role_id">
            <el-input v-model="roleDataForm.role_id" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="角色名" prop="name">
            <el-input v-model="roleDataForm.role_name"></el-input>
          </el-form-item>
          <el-form-item label="备注" prop="remark">
            <el-input v-model="roleDataForm.remark"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button :size="size" type="info" @click.native="updateDialogVisible = false">取消</el-button>
          <el-button :size="size" type="warning" @click.native="submitForm">确认</el-button>
        </div>
      </el-dialog>
      <!--角色菜单-->
    </el-card>
  </div>
</template>

<script>
  import { getRoleList } from '@/api/role'

  export default {
    name: 'RoleManage',
    data() {
      return {
        query_role: '',
        tableData: [],
        size: 'medium',
        // 新增对话框
        addDialogVisible: false, // 新增界面是否显示
        // 编辑对话框
        updateDialogVisible: false, // 编辑界面是否显示
        // 对话框验证条件
        dataFormRules: {
          role_name: [
            { required: true, message: '请输入角色名', trigger: 'blur' }
          ],
          remark: [
            { required: true, message: '请输入角色备注', trigger: 'blur' }
          ]
        },
        // 新增编辑界面数据
        roleDataForm: {
          role_id: '',
          role_name: '',
          remark: ''
        }
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(val)
      },
      handleCurrentChange(val) {
        console.log(val)
      },
      // 显示新增界面
      handleAdd() {
        this.addDialogVisible = true
      },
      // 显示编辑界面
      handleEdit(role) {
        console.log(role)
        this.updateDialogVisible = true
        this.roleDataForm = {
          role_id: role.role_id,
          role_name: role.role_name,
          remark: role.remark
        }
      },
      // 处理批量删除
      handleBatchDelete() {

      },
      // 新增角色提交
      submitForm() {
        this.$refs.dataForm.validate((valid) => {
          if (valid) {
            // 提交到后台
            alert('角色新增成功')
            this.addDialogVisible = false
            this.$refs['dataForm'].resetFields()
          }
        })
      },
      // 获取数据
      fetchData() {
        getRoleList().then(response => {
          console.log(response.data)
          this.tableData = response.data.list // 赋值
        })
      }
    },
    created() {
      this.fetchData()
    }
  }
</script>

<style lang="scss" scoped>
  .grid-content {
    border-radius: 4px;
    min-height: 36px;
  }

  .bg-purple {
    background: #d3dce6;
  }
</style>

<template>
  <div class="app-container">
    <el-card class="box-card">
      <h2>机构列表</h2>
      <!--机构层级-->
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="value1" placeholder="请选择机构">
              <el-option
                v-for="item in options1"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="value2" placeholder="请选择利润中心">
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="value3" placeholder="请选择县支公司">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="grid-content bg-purple">
            <el-select class="css-el-select" v-model="value4" placeholder="请选择成本中心">
              <el-option
                v-for="item in options3"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </div>
        </el-col>
      </el-row>
      <!--按钮区域-->
      <el-row :gutter="20" style="margin: 10px">
        <el-col :span="3">
          <div class="grid-content bg-purple" style="padding: 0 10px">
            <el-button type="warning" style="width: 100%;" @click="handleSelect">查询<i
              class="el-icon-circle-plus el-icon--right"></i>
            </el-button>
          </div>
        </el-col>
        <el-col :span="3">
          <div class="grid-content bg-purple" style="padding: 0 10px">
            <el-button type="info" style="width: 100%;" @click="handleExport">导出<i
              class="el-icon-delete el-icon--right"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'BranchManage'
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

  .css-el-select {
    width: 100%;
  }
</style>

<script setup lang="ts">
import svg from '@/utils/LoadingIcon'
import { getCateDataAPI } from '@/api/Cate'

const loading = ref<boolean>(false)

// 分类列表
const cateList = ref<Cate[]>()

// 获取分类列表数据
const getCateList = async () => {
  loading.value = true

  const { data } = await getCateDataAPI()
  cateList.value = data.result as Cate[]

  loading.value = false
}
getCateList()
</script>

<template>
  <div class="page">
    <Title title="分类管理" icon="category-alt" />

    <el-row justify="center" style="margin-bottom: 10px;">
      <el-button key="primary" type="primary" text>新增一级分类</el-button>
    </el-row>

    <!-- 分类列表 -->
    <el-tree :data="cateList" :props="{ children: 'children', label: 'name' }" v-loading="loading"
      :element-loading-svg="svg" class="cate" :default-expand-all="true">
      <template #default="{ node, data }">
        <el-row justify="space-between" style="width: 100%;">
          <span>{{ node.label }}</span>

          <el-dropdown>
            <span style="outline: none;">
              操作 <box-icon name='chevron-down' />
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="data.children">新增</el-dropdown-item>
                <el-dropdown-item>编辑</el-dropdown-item>
                <el-dropdown-item>删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </el-row>
      </template>
    </el-tree>

    <!-- 新增分类 -->
    <!-- <el-dialog v-model="showModel" title="新增分类导航" width="30%" style="padding-bottom: 0px;" :before-close="close">
      <el-form ref="form" :rules="rules" label-position="top" :model="cateForm" size="large">
        <el-form-item label="名称" prop="name">
          <el-input v-model="cateForm.name" placeholder="大前端" />
        </el-form-item>

        <el-form-item label="标识" prop="mark">
          <el-input v-model="cateForm.mark" placeholder="dqd" />
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <el-input v-model="cateForm.icon" placeholder="🎉" />
        </el-form-item>

        <el-form-item label="链接（选填）" prop="url">
          <el-input v-model="cateForm.url" placeholder="https://liuyuyang.net/" />
        </el-form-item>

        <el-form-item style="margin-bottom: -5px;">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit(form)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog> -->
  </div>
</template>

<style scoped lang="scss">
.cate {
  height: 70vh;
  padding: 0 20px;
  overflow: overlay;

  .image {
    width: 40%;
    height: 100%;
    padding: 50px;
    margin-left: 8%;
  }

  .el-tooltip__trigger {
    display: flex;
    align-items: center;

    box-icon {
      fill: #666;
      width: 20px;
      height: 15px;
    }
  }
}

::v-deep(.el-form-item__content) {
  display: flex;
  justify-content: end;
}
</style>

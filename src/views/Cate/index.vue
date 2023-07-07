<script setup lang="ts">
// 获取分类逻辑
import { getCateData, cateList, loading, svg } from './logic/getCate'
getCateData()

// 新增、编辑分类逻辑
import { cateFormShow, addCate, editCate, cateRef, cateForm, rules, submit, close } from './logic/addCate'

// 删除分类逻辑
import { delCate } from './logic/delCate'
</script>

<template>
  <Title title="分类导航" icon="category-alt" />

  <el-row justify="center" style="margin-bottom: 10px;">
    <el-button key="primary" type="primary" text @click="addCate(undefined)">新增一级分类</el-button>
  </el-row>

  <!-- 分类列表 -->
  <el-tree :data="cateList" :props="{ children: 'children', label: 'name' }" v-loading="loading"
    :element-loading-svg="svg" class="custom-loading-svg cate" :default-expand-all="true">
    <template #default="{ node, data }">
      <span class="custom-tree-node">
        <span class="name">{{ node.label }}</span>

        <span>
          <el-dropdown size="small">
            <span class="el-dropdown-link">
              操作<box-icon name='chevron-down' />
            </span>

            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item v-if="data.children" @click="addCate(data.id)">新增</el-dropdown-item>
                <el-dropdown-item @click="editCate(data, data?.children?.length)">编辑</el-dropdown-item>
                <el-dropdown-item @click="delCate(data.id, data?.children?.length)">删除</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown>
        </span>
      </span>
    </template>
  </el-tree>

  <!-- 新增分类 -->
  <el-dialog v-model="cateFormShow" title="新增分类导航" width="30%" style="padding-bottom: 0px;" :before-close="close">
    <el-form ref="cateRef" :rules="rules" label-position="top" :model="cateForm" size="large">
      <el-form-item label="名称" prop="name">
        <el-input v-model="cateForm.name" placeholder="大前端" />
      </el-form-item>

      <el-form-item label="标识" prop="mark">
        <el-input v-model="cateForm.mark" placeholder="dqd" />
      </el-form-item>

      <el-form-item label="图标" prop="icon">
        <el-input v-model="cateForm.icon" placeholder="🎉" />
      </el-form-item>

      <el-form-item label="链接" prop="url">
        <el-input v-model="cateForm.url" placeholder="https://liuyuyang.net/" />
      </el-form-item>

      <el-form-item style="margin-bottom: -5px;">
        <el-button @click="close">取消</el-button>
        <el-button type="primary" @click="submit(cateRef)">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
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

  .custom-tree-node {
    display: flex;
    justify-content: space-between;
    width: 100%;
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

<script setup lang="ts">
import { ref } from 'vue';
import { getCateAPI } from '@/api/Cate'
import { Cate } from '@/types/Cate'

const handleNodeClick = (data: Cate) => {
  console.log(data)
}

// Loading加载效果
const loading = ref(true)
const svg = `
        <path class="path" d="
          M 30 15
          L 28 17
          M 25.61 25.61
          A 15 15, 0, 0, 1, 15 30
          A 15 15, 0, 1, 1, 27.99 7.5
          L 15 15
        " style="stroke-width: 4px; fill: rgba(0, 0, 0, 0)"/>
      `

const cateForm = ref<Cate>({
  name: "",
  mark: "",
  url: "",
  icon: "",
  children: []
})

const cateList = ref<Cate[]>()

// 获取分类列表
const getCateDate = async () => {
  const { data } = await getCateAPI()
  cateList.value = data

  loading.value = false
}
getCateDate()

// 配置属性名
const defaultProps = {
  children: 'children',
  label: 'name',
}

const cateFormShow = ref(true)
</script>

<template>
  <Title title="分类导航" icon="category-alt" />

  <el-row justify="center" style="width: 660px; margin-bottom: 10px;">
    <el-button key="primary" type="primary" text>新增一级分类</el-button>
  </el-row>

  <div class="cate">
    <el-tree :data="cateList" :props="defaultProps" @node-click="handleNodeClick" v-loading="loading"
      :element-loading-svg="svg" class="custom-loading-svg" style="width: 650px;">
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
                  <el-dropdown-item v-if="data.children">新增</el-dropdown-item>
                  <el-dropdown-item>修改</el-dropdown-item>
                  <el-dropdown-item>删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </span>
      </template>
    </el-tree>

    <img src="@/assets/svg/cate.svg" class="image">
  </div>

  <el-dialog v-model="cateFormShow" title="新增分类导航" width="30%" style="padding-bottom: 0px;">
    <el-form label-position="top" :model="cateForm" size="large">
      <el-form-item label="名称">
        <el-input v-model="cateForm.name" />
      </el-form-item>

      <el-form-item label="标识">
        <el-input v-model="cateForm.mark" />
      </el-form-item>

      <el-form-item label="图标">
        <el-input v-model="cateForm.icon" />
      </el-form-item>

      <el-form-item label="链接">
        <el-input v-model="cateForm.icon" />
      </el-form-item>

      <el-form-item style="margin-bottom: -5px;">
        <el-button @click="cateFormShow = false">取消</el-button>
        <el-button type="primary" @click="cateFormShow = false">确定</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<style scoped lang="scss">
.cate {
  display: flex;

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

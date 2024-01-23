<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';
import { svg, whetherToDelete } from '@/utils'
import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate'

const loading = ref(false)

// 控制新增分类的表单是否显示
const cateModel = ref(false)

// 新增表单框实例
const form = ref<FormInstance>()

// 表单数据
const cate = ref<Cate>({
  name: "",
  mark: "",
  url: "",
  icon: "",
  level: 0
})

// 约束表单数据
const rules = reactive<FormRules<Omit<Cate, "id" | "icon" | "children">>>({
  name: [
    { required: true, message: '分类名称不能为空', trigger: 'blur' },
    { min: 1, max: 10, message: '分类名称限制为 1 ~ 10 个字符', trigger: 'blur' }
  ],
  mark: [
    { required: true, message: '分类标识不能为空' },
    { min: 1, max: 10, message: '分类标识限制为 1 ~ 10 个字符' }
  ],
  url: [
    { required: true, message: '分类链接不能为空' },
    { min: 5, max: 300, message: '分类链接限制为 5 ~ 300个字符' }
  ],
})

// 分类列表
const list = ref<Cate[]>()

// 获取分类列表
const getCateList = async () => {
  loading.value = true

  const { data } = await getCateListAPI()
  list.value = data.result as Cate[]

  loading.value = false
}
getCateList()

// 新增分类
const addCateData = async (id: number) => {
  cateModel.value = true

  // 新增二级分类
  cate.value.level = id
}

// 编辑分类
const editCateData = async (id: number) => {
  cateModel.value = true

  const { data } = await getCateDataAPI(id)
  cate.value = data
}

// 表单校验
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    if (cate.value.id) {
      // 编辑分类
      await editCateDataAPI(cate.value)

      ElNotification({
        title: '成功',
        message: "🎉修改分类成功",
        type: 'success',
      })
      
    } else {
      // 新增分类
      await addCateDataAPI(cate.value)

      ElNotification({
        title: '成功',
        message: "🎉新增分类成功",
        type: 'success',
      })
    }

    // 重置表单数据
    formEl.resetFields()

    cate.value.id = 0
    cate.value.level = 0

    // 关闭新增分类表单框
    cateModel.value = false

    // 获取最新数据
    getCateList()
  })
}

// 删除分类
const delCateData = async (id: number) => {
  async function fn() {
    await delCateDataAPI(id)

    ElNotification({
      title: '成功',
      message: "🎉删除分类成功",
      type: 'success',
    })

    // 删除成功后获取最新数据
    getCateList()
  }

  whetherToDelete(fn, "分类")
}

// 关闭弹框时处理的逻辑
const close = () => {
  // 关闭新增分类弹框
  cateModel.value = false

  // 将表单校验初始化
  form.value?.resetFields()
}
</script>

<template>
  <div class="page">
    <Title title="分类管理" icon="category-alt" />
    {{ cate }}
    <el-row justify="center" style="margin-bottom: 10px;">
      <el-button key="primary" type="primary" text @click="cateModel = true">新增一级分类</el-button>
    </el-row>

    <!-- 分类列表 -->
    <el-tree :data="list" :props="{ children: 'children', label: 'name' }" v-loading="loading" :element-loading-svg="svg"
      class="cate" :default-expand-all="true">
      <template #default="{ node, data }">
        <span class="custom-tree-node">
          <span class="name">{{ node.label }}</span>

          <span>
            <el-dropdown size="small">
              <span>
                操作<box-icon name='chevron-down' />
              </span>

              <template #dropdown>
                <el-dropdown-menu>
                  <el-dropdown-item @click="addCateData(data.id)">新增</el-dropdown-item>
                  <el-dropdown-item @click="editCateData(data.id)">编辑</el-dropdown-item>
                  <el-dropdown-item @click="delCateData(data.id)">删除</el-dropdown-item>
                </el-dropdown-menu>
              </template>
            </el-dropdown>
          </span>
        </span>
      </template>
    </el-tree>

    <!-- 新增分类 -->
    <el-dialog v-model="cateModel" title="新增分类导航" width="30%" style="padding-bottom: 0px;" :before-close="close">
      <el-form ref="form" :rules="rules" label-position="top" :model="cate" size="large">
        <el-form-item label="名称" prop="name">
          <el-input v-model="cate.name" placeholder="大前端" />
        </el-form-item>

        <el-form-item label="标识" prop="mark">
          <el-input v-model="cate.mark" placeholder="dqd" />
        </el-form-item>

        <el-form-item label="图标" prop="icon">
          <el-input v-model="cate.icon" placeholder="🎉" />
        </el-form-item>

        <el-form-item label="链接（选填）" prop="url">
          <el-input v-model="cate.url" placeholder="https://liuyuyang.net/" />
        </el-form-item>

        <el-form-item style="margin-bottom: -5px;">
          <el-button @click="close">取消</el-button>
          <el-button type="primary" @click="submit(form)">确定</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
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

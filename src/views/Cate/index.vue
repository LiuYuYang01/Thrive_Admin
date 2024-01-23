<script setup lang="ts">
import { FormInstance, FormRules } from 'element-plus';
import { svg, whetherToDelete } from '@/utils'
import { addCateDataAPI, delCateDataAPI, editCateDataAPI, getCateDataAPI, getCateListAPI } from '@/api/Cate'

const loading = ref(false)

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

// 控制新增分类的表单是否显示
const cateModel = ref(false)

// 新增表单框实例
const form = ref<FormInstance>()

// 表单数据
const cateForm = ref<Cate>({
  name: "",
  mark: "",
  url: "",
  icon: "",
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
  url: [{ max: 300, message: '分类链接不能为空' }],
})

const addId = ref<number | undefined>(undefined)
const emitId = ref<number>()
const emitLevel = ref<any>()

// 弹出新增分类框，并且根据id决定新增一级还是二级分类
const addCateData = (id: number | undefined) => {
  cateModel.value = true
  addId.value = id
}

// 编辑分类
const editCateData = async (data: Cate | undefined, level: any) => {
  cateModel.value = true

  emitId.value = data?.id
  emitLevel.value = level

  const { name, mark, icon, url } = data as Cate
  cateForm.value = { name, mark, icon, url }
}

// 表单校验
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    if (emitId.value) {
      // 编辑分类
      emitLevel.value = emitLevel.value >= 0 ? 'one' : 'two'

      const { code, message } = await editCateDataAPI(cateForm.value)

      if (code !== 200) return

      ElNotification({
        title: '成功',
        message: message,
        type: 'success',
      })
    } else {
      // 新增分类
      // 通过id来判断新增一级还是二级分类
      // 如果没有id就是新增一级，有就二级
      const { code, message } = addId ? await addCateDataAPI(cateForm.value) : await addCateDataAPI(cateForm.value)

      ElNotification({
        title: '成功',
        message: message,
        type: 'success',
      })
    }

    // 重置表单数据
    formEl.resetFields()

    // 关闭新增分类表单框
    cateModel.value = false

    // 获取最新数据
    getCateList()
  })
}

// 关闭弹框时处理的逻辑
const close = () => {
  // 关闭新增分类弹框
  cateModel.value = false

  // 将表单校验初始化
  form.value?.resetFields()
}

const delCateData = async (id: number) => {
  async function fn() {
    // 根据level决定删除一级还是二级分类
    const { code, message } = await delCateDataAPI(id)

    ElNotification({
      title: '成功',
      message: message,
      type: 'success',
    })

    // 删除成功后获取最新数据
    getCateList()
  }

  whetherToDelete(fn, "分类")
}

onMounted(() => {
  cateModel.value = false
  form.value?.resetFields()
})
</script>

<template>
  <div class="page">
    <Title title="分类管理" icon="category-alt" />

    <el-row justify="center" style="margin-bottom: 10px;">
      <el-button key="primary" type="primary" text @click="addCateData(undefined)">新增一级分类</el-button>
    </el-row>

    <!-- 分类列表 -->
    <el-tree :data="list" :props="{ children: 'children', label: 'name' }" v-loading="loading" :element-loading-svg="svg"
      class="cate" :default-expand-all="true">
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
                  <el-dropdown-item v-if="data.children" @click="addCateData(data.id)">新增</el-dropdown-item>
                  <el-dropdown-item @click="editCateData(data, data?.children?.length)">编辑</el-dropdown-item>
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

<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';
import { getWebDataAPI, editWebDataAPI } from '@/api/System'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

const form = ref<FormInstance>()

const web = ref<Web>({
  title: '',
  subhead: '',
  logo: '',
  description: '',
  keyword: '',
})

// 获取网站信息
const getWebData = async () => {
  loading.value = true

  const { data } = await getWebDataAPI()
  web.value = data

  loading.value = false
}
getWebData()

// 数据校验
const rules = reactive<FormRules<Web>>({
  title: [
    { required: true, message: "网站名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "网站名称限制在1 ~ 10个字符", trigger: "blur" }
  ],
  subhead: [
    { required: true, message: "网站副标题不能为空", trigger: "blur" },
    { min: 1, max: 50, message: "网站副标题限制在1 ~ 50个字符", trigger: "blur" }
  ],
  logo: [
    { required: true, message: "网站LOGO不能为空", trigger: "blur" },
  ],
  description: [
    { required: true, message: "网站描述不能为空", trigger: "blur" },
    { min: 2, max: 300, message: "网站描述限制在2 ~ 300个字符", trigger: "blur" }
  ],
  keyword: [
    { required: true, message: "网站关键词不能为空", trigger: "blur" }
  ]
})

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    loading.value = true
    await editWebDataAPI(web.value)
    loading.value = false

    ElNotification({
      title: '成功',
      message: "🎉编辑网站成功",
      type: 'success'
    })
  })
}
</script>

<template>
  <div class="size">
    <Title title="网站设置" icon="user" />

    <el-form ref="form" label-position="top" :model="web" :rules="rules" size="large" style="min-width: 500px;"
      v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="网站名称" prop="title">
        <el-input v-model="web.title" placeholder="Thrive" />
      </el-form-item>

      <el-form-item label="网站副标题" prop="subhead">
        <el-input v-model="web.subhead" placeholder="花有重开日, 人无再少年" />
      </el-form-item>

      <el-form-item label="网站LOGO" prop="logo">
        <el-input v-model="web.logo" placeholder="https://liuyuyang.net/logo.png" />
      </el-form-item>

      <el-form-item label="网站描述" prop="info">
        <el-input v-model="web.description" placeholder="记录前端、Python、Java点点滴滴" />
      </el-form-item>

      <el-form-item label="网站关键词" prop="keyword">
        <el-input v-model="web.keyword" placeholder="Java,前端,Python" />
        <el-alert title="注意：一定要以英文逗号分割每一个关键词，示列：Java,前端,Python" type="info" show-icon :closable="false"
          style="height: 40px; margin-top: 10px;" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit(form)" style="width: 100%;">编辑网站</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.size {
  width: 480px;
  margin-left: 30px;
}

.title {
  display: flex;
  justify-content: center;
  margin: 10px 0;
  border-bottom: none;
}
</style>

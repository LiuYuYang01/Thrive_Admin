<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const web = ref<SetupWeb>({
  title: '',
  subhead: '',
  logo: '',
  info: '',
  keyword: '',
})

const form = ref<FormInstance>()

// 数据校验
const rules = reactive<FormRules<SetupWeb>>({
  title: [
    { required: true, message: "网站名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "网站名称限制在1 ~ 10个字符", trigger: "blur" }
  ],
  subhead: [
    { required: true, message: "网站副标题不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "网站副标题限制在1 ~ 10个字符", trigger: "blur" }
  ],
  logo: [
    { required: true, message: "网站LOGO不能为空", trigger: "blur" },
  ],
  info: [
    { required: true, message: "网站描述不能为空", trigger: "blur" },
    { min: 6, max: 11, message: "网站描述限制在6 ~ 11个字符", trigger: "blur" }
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

  })
}
</script>

<template>
  <div class="size">
    <Title title="网站设置" icon="user" />

    <el-form ref="form" label-position="top" :model="web" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="网站名称" prop="title">
        <el-input v-model="web.title" placeholder="Thrive" />
      </el-form-item>

      <el-form-item label="网站副标题" prop="title">
        <el-input v-model="web.title" placeholder="花有重开日, 人无再少年" />
      </el-form-item>

      <el-form-item label="网站图标" prop="logo">
        <el-input v-model="web.logo" placeholder="https://liuyuyang.net/logo.png" />
      </el-form-item>

      <el-form-item label="网站描述" prop="info">
        <el-input v-model="web.info" placeholder="记录前端、Python、Java点点滴滴" />
      </el-form-item>

      <el-form-item label="网站关键词" prop="keyword">
        <el-input v-model="web.keyword" placeholder="以英文逗号分隔，如：Java,前端,Python" />
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

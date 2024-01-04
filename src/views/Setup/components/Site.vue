<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const webData = ref<SetupWeb>({
  title: '',
  logo: '',
  info: '',
  keyword: '',
})

const myRef = ref()

// 从pinia中获取用户信息
import { useUserStore } from '@/stores'
const store = useUserStore()

// 获取用户信息
const getUserData = async () => {
  await store.getUser()
  webData.value = store.userInfo as SetupWeb
}
getUserData()

// 数据校验
const rules = reactive<FormRules<SetupWeb>>({
  title: [
    { required: true, message: "网站名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "名称限制在1 ~ 10个字符", trigger: "blur" }
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

    // 编辑用户信息
    store.setUser(webData.value, "edit")
  })
}
</script>

<template>
  <div class="size">
    <Title title="网站设置" icon="user" />

    <el-form ref="myRef" label-position="top" :model="webData" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="站点名称" prop="title">
        <el-input v-model="webData.title" placeholder="你的网站名称" />
      </el-form-item>

      <el-form-item label="站点图标" prop="logo">
        <el-input v-model="webData.logo" placeholder="你的站点LOGO" />
      </el-form-item>

      <el-form-item label="站点描述" prop="info">
        <el-input v-model="webData.info" placeholder="介绍一下自己的网站" />
      </el-form-item>
      
      <el-form-item label="站点关键词" prop="keyword">
        <el-input v-model="webData.keyword" placeholder="以英文逗号分隔，如：Java,前端,Python" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit(myRef)" style="width: 100%;">保存</el-button>
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

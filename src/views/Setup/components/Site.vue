<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const myForm = ref<UserInfo>({
  name: '',
  qq: '',
  avatar: '',
  introduce: '',
  background: '',
})

const myRef = ref()

// 从pinia中获取用户信息
import { useUserStore } from '@/stores'
const store = useUserStore()

// 获取用户信息
const getUserData = async () => {
  await store.getUser()
  myForm.value = store.userInfo as UserInfo
}
getUserData()

// 数据校验
const rules = reactive<FormRules<UserInfo>>({
  name: [
    { required: true, message: "网站名称", trigger: "blur" },
    { min: 1, max: 10, message: "名称限制在1 ~ 10个字符", trigger: "blur" }
  ],
  qq: [
    { required: true, message: "网站描述", trigger: "blur" },
    { min: 6, max: 11, message: "QQ限制在6 ~ 11个字符", trigger: "blur" }
  ],
  avatar: [
    { required: true, message: "头像不能为空", trigger: "blur" },
  ],
  introduce: [
    { required: true, message: "介绍不能为空", trigger: "blur" },
    { max: 50, message: "介绍限制最多50个字符", trigger: "blur" }
  ]
})

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    // 编辑用户信息
    store.setUser(myForm.value, "edit")
  })
}
</script>

<template>
  <div class="size">
    <Title title="网站设置" icon="user" />

    <el-form ref="myRef" label-position="top" :model="myForm" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="站点名称" prop="name">
        <el-input v-model="myForm.name" placeholder="名称" />
      </el-form-item>

      <el-form-item label="站点图标" prop="name">
        <el-input v-model="myForm.name" placeholder="你的站点LOGO" />
      </el-form-item>

      <el-form-item label="站点描述" prop="introduce">
        <el-input v-model="myForm.introduce" placeholder="介绍一下自己的网站" />
      </el-form-item>
      
      <el-form-item label="站点关键词" prop="avatar">
        <el-input v-model="myForm.avatar" placeholder="以英文逗号分隔，如：Java,前端,Python" />
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

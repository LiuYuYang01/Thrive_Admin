<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const myForm = ref<updateUser>({
  username: "",
  oldPassword: "",
  newPassword: ""
})

const myRef = ref()

// 从pinia中获取用户信息
import { useUserStore } from '@/stores'
const store = useUserStore()

// 获取用户信息
const getUserData = async () => {
  await store.getUser()
  myForm.value = store.userInfo as updateUser
}
getUserData()

// 数据校验
const rules = reactive<FormRules<updateUser>>({
  username: [
    { required: true, message: "管理员账号不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "名称限制在6 ~ 16个字符", trigger: "blur" }
  ],
  oldPassword: [
    // 这里写个自定义校验
    { required: true, message: "管理员旧密码不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "密码限制在6 ~ 16个字符", trigger: "blur" }
  ],
  newPassword: [
    { required: true, message: "管理员新密码不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "密码限制在6 ~ 16个字符", trigger: "blur" }
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
  <div class="setup">
    <Title title="系统设置" icon="user" />

    <el-form ref="myRef" label-position="top" :model="myForm" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="管理员账号" prop="name">
        <el-input v-model="myForm.username" placeholder="请输入管理员账号" />
      </el-form-item>

      <el-form-item type="password" label="管理员旧密码" prop="name">
        <el-input v-model="myForm.oldPassword" placeholder="请输入管理员旧密码" />
      </el-form-item>

      <el-form-item label="管理员新密码" prop="introduce">
        <el-input type="password" v-model="myForm.newPassword" placeholder="请输入管理员新密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit(myRef)" style="width: 100%;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.setup {
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

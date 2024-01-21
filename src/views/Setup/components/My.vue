<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const My = ref<UserInfo>({
  name: '',
  email: '',
  avatar: '',
  info: ''
})

const form = ref<FormInstance>()

// 从pinia中获取用户信息
import { useUserStore } from '@/stores'
const store = useUserStore()

// 获取用户信息
const getUserData = async () => {
  await store.getUser()
  My.value = store.user as User
}
getUserData()

// 数据校验
const rules = reactive<FormRules<User>>({
  name: [
    { required: true, message: "名称不能为空", trigger: "blur" },
    { min: 2, max: 10, message: "名称限制在2 ~ 10个字符", trigger: "blur" }
  ],
  email: [
    { required: true, message: "邮箱不能为空", trigger: "blur" },
    { min: 6, max: 50, message: "邮箱限制在6 ~ 50个字符", trigger: "blur" }
  ],
  avatar: [
    { required: true, message: "头像不能为空", trigger: "blur" },
  ],
  info: [
    { required: true, message: "介绍不能为空", trigger: "blur" },
    { max: 50, message: "介绍限制最多50个字符", trigger: "blur" }
  ]
})
</script>

<template>
  <div class="my">
    <Title title="个人设置" icon="user" />

    <el-form ref="form" label-position="top" :model="My" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="My.name" placeholder="请输入名称" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="My.email" placeholder="请输入邮箱" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="My.avatar" placeholder="请输入头像的地址" />
      </el-form-item>

      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="My.info" placeholder="请介绍一下自己" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 100%;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.my {
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

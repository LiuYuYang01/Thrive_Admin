<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const loading = ref<boolean>(false)

const My = ref<UserInfo>({
  name: '',
  email: '',
  avatar: '',
  info: ''
})

const form = ref<FormInstance>()

// 从pinia中获取用户信息
import { useUserStore } from '@/stores'
import { editUserDataAPI, getUserDataAPI } from '@/api/User';
const store = useUserStore()

// 获取用户信息
const getUserInfo = async () => {
  loading.value = true

  const { data } = await getUserDataAPI(store.user?.id)
  My.value = data

  loading.value = false
}
getUserInfo()

// 修改用户信息
const editUserData = async () => {
  await editUserDataAPI(My.value)

  ElNotification({
    title: '成功',
    message: "🎉修改用户信息成功",
    type: 'success'
  })

  getUserInfo()
}

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

    <el-form ref="form" label-position="top" :model="My" :rules="rules" size="large" style="min-width: 500px;"
      v-loading="loading">
      <el-form-item label="名称" prop="name">
        <el-input v-model="My.name" placeholder="宇阳" />
      </el-form-item>

      <el-form-item label="邮箱" prop="email">
        <el-input v-model="My.email" placeholder="liuyuyang1024@yeah.net" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="My.avatar" placeholder="https://liuyuyang.net/logo.png" />
      </el-form-item>

      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="My.info" placeholder="互联网从不缺乏天才, 而努力才是最终的入场劵" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 100%;" @click="editUserData">编辑信息</el-button>
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

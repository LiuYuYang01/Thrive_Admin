<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';
import { User, UserInfo } from '@/types/User';

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
    { required: true, message: "名称不能为空", trigger: "blur" },
    { min: 2, max: 10, message: "名称限制在2 ~ 10个字符", trigger: "blur" }
  ],
  qq: [
    { required: true, message: "QQ不能为空", trigger: "blur" },
    { min: 6, max: 11, message: "QQ限制在6 ~ 11个字符", trigger: "blur" }
  ],
  avatar: [
    { required: true, message: "头像不能为空", trigger: "blur" },
  ],
  background: [
    { required: true, message: "背景不能为空", trigger: "blur" },
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
  <div class="my">
    <Title title="个人设置" icon="user" />

    <el-form ref="myRef" label-position="top" :model="myForm" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="名称" prop="name">
        <el-input v-model="myForm.name" placeholder="名称" />
      </el-form-item>

      <el-form-item label="QQ" prop="qq">
        <el-input v-model="myForm.qq" placeholder="QQ" />
      </el-form-item>

      <el-form-item label="头像" prop="avatar">
        <el-input v-model="myForm.avatar" placeholder="作者头像地址" />
      </el-form-item>

      <el-form-item label="介绍" prop="introduce">
        <el-input v-model="myForm.introduce" placeholder="介绍一下自己" />
      </el-form-item>

      <el-form-item label="背景图" prop="background">
        <el-input v-model="myForm.background" placeholder="背景图地址" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submit(myRef)" style="width: 100%;">保存</el-button>
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

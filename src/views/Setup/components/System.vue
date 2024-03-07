<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';

const my = ref<editUser>({
  username: "",
  oldPassword: "",
  newPassword: ""
})

const form = ref<FormInstance>()

// 数据校验
const rules = reactive<FormRules<editUser>>({
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
</script>

<template>
  <div class="setup">
    <Title title="系统配置" icon="user" />

    <el-form ref="form" label-position="top" :model="my" :rules="rules" size="large" style="min-width: 500px;">
      <el-form-item label="管理员账号" prop="username">
        <el-input v-model="my.username" placeholder="请输入账号" />
      </el-form-item>

      <el-form-item label="管理员旧密码" prop="oldPassword">
        <el-input type="password" v-model="my.oldPassword" placeholder="请输入旧密码" />
      </el-form-item>

      <el-form-item label="管理员新密码" prop="newPassword">
        <el-input type="password" v-model="my.newPassword" placeholder="请输入新密码" />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" style="width: 100%;">保存</el-button>
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

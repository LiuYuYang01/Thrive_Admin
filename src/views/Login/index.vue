<script setup lang="ts">
import { useUserStore } from '@/stores'
import { loginDataAPI } from '@/api/User';
import { User, Lock, View, Hide } from '@element-plus/icons-vue'
import { ElNotification, FormInstance, FormRules } from 'element-plus';

const store = useUserStore()
const route = useRoute()
const router = useRouter()
const form = ref<FormInstance>()

// 是否显示密码
const isPass = ref<string>("password")
// 点击眼睛切换密码显示
const isPassCut = () => isPass.value === "password" ? isPass.value = "text" : isPass.value = "password"

// 登录信息
const login = reactive<Login>({
  username: '',
  password: '',
})

// 登录数据校验
const rules = reactive<FormRules<Login>>({
  username: [
    { required: true, message: "用户不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "用户名限制在6 ~ 16个字符", trigger: "blur" }
  ],
  password: [
    { required: true, message: "密码不能为空", trigger: "blur" },
    { min: 6, max: 16, message: "密码限制在6 ~ 16个字符", trigger: "blur" }
  ]
})

// 提交表单
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    // 校验通过
    const { code, data, message } = await loginDataAPI(login)
    store.token = data.token
    store.user = data.user

    ElNotification({
      title: '成功',
      message: `Hello ${data.user.name} 欢迎回来 🎉`,
      type: 'success',
    })

    // 跳转到上一次的页面
    if (route.query.returnUrl) {
      router.push(route.query.returnUrl as string)
    } else {
      // 登录成功后跳转到首页
      router.push("/home")
    }
  })
}
</script>

<template>
  <div class="container">
    <div class="login">
      <div class="logo">
        <h3>Thrive</h3>
        <p>现代化博客管理系统</p>
      </div>

      <el-form ref="form" :model="login" :rules="rules" label-position="top" size="large" style="padding: 20px 40px;">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="login.username" :prefix-icon="User" placeholder="请输入用户名" />
        </el-form-item>

        <el-form-item label="密码" prop="password">
          <el-input :type="isPass" v-model="login.password" :prefix-icon="Lock" placeholder="请输入密码">

            <!-- 小眼睛图标 -->
            <template #suffix>
              <el-icon class="el-input__icon">
                <a href="javascript:;" style="color: #a8abb2; padding: 0 20px;" @click="isPassCut">
                  <View v-if="isPass === 'password'" />

                  <Hide v-else />
                </a>
              </el-icon>
            </template>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" size="large" @click="submitForm(form)" class="submit">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<style scoped lang="scss">
.container {
  width: 100vw;
  height: 100vh;
  // background-image: linear-gradient(to top, #fbc2eb 0%, #a6c1ee 100%);

  .login {
    overflow: hidden;
    position: absolute;
    left: 50%;
    top: 25%;
    transform: translate(-50%);
    width: 400px;
    height: 400px;
    border-radius: 10px;
    background-color: #fff;
    box-shadow: 4px 6px 200px 200px rgba(121, 122, 243, 0.1);

    .logo {
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      height: 100px;
      color: #fff;
      background-color: $color;

      h3 {
        font-size: 30px;
      }

      p {
        color: #e3e3e3;
        margin-top: 10px;
      }
    }

    .submit {
      width: 100%;
    }
  }
}
</style>

<script setup lang="ts">
import { reactive, ref } from 'vue'

const formLabelAlign = reactive({
  name: '',
  region: '',
  type: '',
})
</script>

<template>
  <div class="container">
    <div class="login">
      <div class="logo">
        <h3>Thrive</h3>
        <p>现代化博客管理系统</p>
      </div>

      <el-form label-position="top" label-width="100px" :model="formLabelAlign"
        style="max-width: 460px;padding: 20px 40px; 0">
        <el-form-item label="用户名" size="large">
          <el-input v-model="formLabelAlign.name" />
        </el-form-item>

        <el-form-item label="密码" size="large">
          <el-input v-model="formLabelAlign.region" />
        </el-form-item>


        <el-form-item>
          <el-button type="primary" size="large" class="submit">登录</el-button>
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
      background-color: #727cf5;

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

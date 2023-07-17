<script setup lang="ts">
import { FormRules } from 'element-plus';
import { My } from '@/types/My';

const myForm = ref<My>({
  name: '',
  qq: '',
  avatar: '',
  introduce: '',
  background: '',
})

const myRef = ref()

// 数据校验
const rules = reactive<FormRules<My>>({
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
    { min: 10, max: 50, message: "介绍限制在10 ~ 50个字符", trigger: "blur" }
  ]
})

const onSubmit = () => {
  console.log("提交");
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
        <el-button type="primary" @click="onSubmit" style="width: 100%;">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<style scoped lang="scss">
.my {
  width: 50%;
  margin-left: 30px;
}

.title {
  display: flex;
  justify-content: center;
  margin-top: 20px;
  border-bottom: none;
}
</style>

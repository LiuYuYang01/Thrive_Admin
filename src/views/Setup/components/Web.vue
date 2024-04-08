<script setup lang="ts">
import { FormInstance, FormRules, ElNotification } from 'element-plus';
import { getWebDataAPI, editWebDataAPI } from '@/api/System'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

const form = ref<FormInstance>()

const web = ref<Web>({
  url: '',
  title: '',
  subhead: '',
  light_logo: '',
  dark_logo: '',
  description: '',
  keyword: '',
  favicon: '',
  footer: '',
  // font: '',
  social: '',
  covers: []
})

const tempCovers = ref<string>("")

// 获取网站信息
const getWebData = async () => {
  loading.value = true

  const { data } = await getWebDataAPI()

  // 社交账号
  data.social = JSON.stringify(data.social)

  // 随机封面
  tempCovers.value = data.covers.join("\n")

  web.value = data

  loading.value = false
}
getWebData()

// 数据校验
const rules = reactive<FormRules<Web>>({
  url: [
    { required: true, message: "网站链接不能为空", trigger: "blur" },
  ],
  favicon: [
    { required: true, message: "网站图标不能为空", trigger: "blur" },
  ],
  title: [
    { required: true, message: "网站名称不能为空", trigger: "blur" },
    { min: 1, max: 10, message: "网站名称限制在1 ~ 10个字符", trigger: "blur" }
  ],
  subhead: [
    { required: true, message: "网站副标题不能为空", trigger: "blur" },
    { min: 1, max: 50, message: "网站副标题限制在1 ~ 50个字符", trigger: "blur" }
  ],
  light_logo: [
    { required: true, message: "网站LOGO不能为空", trigger: "blur" },
  ],
  dark_logo: [
    { required: true, message: "网站LOGO不能为空", trigger: "blur" },
  ],
  description: [
    { required: true, message: "网站描述不能为空", trigger: "blur" },
    { min: 5, max: 300, message: "网站描述限制在5 ~ 300个字符", trigger: "blur" }
  ],
  keyword: [
    { required: true, message: "网站关键词不能为空", trigger: "blur" }
  ],
  covers: [
    { required: true, message: "网站随机封面不能为空", trigger: "blur" },
  ],
  social: [
    { required: true, message: "社交网站不能为空", trigger: "blur" },
  ],
  // font: [
  //   { required: true, message: "网站字体链接不能为空", trigger: "blur" },
  // ],
  footer: [
    { required: true, message: "网站底部信息不能为空", trigger: "blur" },
    { min: 10, max: 300, message: "网站底部信息限制在10 ~ 300个字符", trigger: "blur" }
  ],
})

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    web.value.covers = tempCovers.value.split("\n")

    loading.value = true
    await editWebDataAPI(web.value)
    loading.value = false

    ElNotification({
      title: '成功',
      message: "🎉编辑网站成功",
      type: 'success'
    })
  })
}
</script>

<template>
  <div class="size">
    <Title title="网站配置" icon="user" />

    <el-form ref="form" label-position="top" :model="web" :rules="rules" size="large" style="min-width: 500px;"
      v-loading="loading" :element-loading-svg="svg" element-loading-svg-view-box="-10, -10, 50, 50">
      <el-form-item label="网站名称" prop="title">
        <el-input v-model="web.title" placeholder="Thrive" />
      </el-form-item>

      <el-form-item label="网站副标题" prop="subhead">
        <el-input v-model="web.subhead" placeholder="花有重开日, 人无再少年" />
      </el-form-item>

      <el-form-item label="网站链接" prop="url">
        <el-input v-model="web.url" placeholder="https://liuyuyang.net/" />
      </el-form-item>

      <el-form-item label="网站图标" prop="favicon">
        <el-input v-model="web.favicon" placeholder="https://liuyuyang.net/favicon.ico" />
      </el-form-item>

      <el-form-item label="光亮主题LOGO" prop="light_logo">
        <el-input v-model="web.light_logo" placeholder="https://liuyuyang.net/logo.png" />
      </el-form-item>

      <el-form-item label="暗黑主题LOGO" prop="dark_logo">
        <el-input v-model="web.dark_logo" placeholder="https://liuyuyang.net/logo.png" />
      </el-form-item>

      <el-form-item label="网站描述" prop="description">
        <el-input v-model="web.description" placeholder="记录前端、Python、Java点点滴滴" />
      </el-form-item>

      <el-form-item label="网站关键词" prop="keyword">
        <el-input v-model="web.keyword" placeholder="Java,前端,Python" />

        <el-alert title="注意：一定要以英文逗号分割每一个关键词，示列：Java,前端,Python" type="info" show-icon :closable="false"
          style="height: 40px; margin-top: 10px;" />
      </el-form-item>

      <el-form-item label="随机文章封面" prop="covers">
        <el-input v-model="tempCovers" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea"
          placeholder="Please input" />

        <el-alert title="以换行分隔，每行表示一段文本" type="info" show-icon :closable="false"
          style="height: 40px; margin-top: 10px;" />
      </el-form-item>

      <el-form-item label="社交网站" prop="social">
        <el-input v-model="web.social" :autosize="{ minRows: 2, maxRows: 10 }" type="textarea"
          placeholder="Please input" />
      </el-form-item>

      <el-form-item label="底部信息" prop="footer">
        <el-input v-model="web.footer" placeholder="记录前端、Python、Java点点滴滴" />
      </el-form-item>

      <!-- <el-form-item label="字体链接" prop="font">
        <el-input v-model="web.font" placeholder="https://liuyuyang.net/font.ttf" />
      </el-form-item> -->

      <el-form-item>
        <el-button type="primary" @click="submit(form)" style="width: 100%;">编辑网站</el-button>
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

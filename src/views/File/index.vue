<script setup lang="ts">
import { Vue3ImagePreview } from 'vue3-image-preview';
import { ElNotification } from 'element-plus'
import { Search } from '@element-plus/icons-vue'
import { delFileDataAPI, getFileListAPI } from '@/api/File'
import { baseURL } from '@/utils/request'
import { svg, whetherToDelete } from '@/utils'
import axios from 'axios';

const centerDialogVisible = ref(true)

const loading = ref<boolean>(false)

// 搜索
const search = ref<string>("")
// 文件请求URL
const url = ref<string>(baseURL.replace("api", ""))
// 目录路径
const path = ref<string>("")
// 获取文件结构
const construction = ref<File[]>([])
// 文件列表
const fileList = ref<string[]>([])
// 临时列表，用于搜索网站
const fileListTemp = ref<string[]>()
// 监听搜索数据的变化
watch(search, data => fileListTemp.value = fileList.value.filter(item => item.includes(data)))

// 获取文件列表
const getFileList = async () => {
  loading.value = true

  const { data } = await getFileListAPI()
  construction.value = data

  loading.value = false
}
getFileList()

// 动态拼接资源路径
const getFile = (name: string) => {
  return new URL(`${url.value + path.value + name}`, import.meta.url).href
}

// 进入文件
const access = (data: File) => {
  loading.value = true

  // 拼接文件地址
  path.value += data.name + "/"

  fileList.value = data.list
  fileListTemp.value = data.list

  construction.value = data.children

  setTimeout(() => loading.value = false, 500)
}





// 文件列表
const files = ref()
// 文件对象
const fileInput = ref()

// 是否拖拽
const isDrop = ref<boolean>(false)
// 进入拖拽区
const onDragEnter = (e: Event) => isDrop.value = true
// 离开拖拽区
const onDragLeave = () => isDrop.value = false;
// 获取拖拽上传的文件
const onDrop = (e: any) => {
  e.preventDefault()

  isDrop.value = false

  files.value = e.dataTransfer.files

  upload()
}

// 手动上传
const FileUpload = async (e: any) => {
  files.value = e.target!.files

  upload()
}

// 上传文件
const upload = async () => {
  const formData = new FormData()
  formData.append("target", path.value.split("/")[0])

  for (let i = 0; i < files.value.length; i++) {
    formData.append("file", files.value[i])
  }

  const { data: { code, message } } = await axios.post("http://localhost:5000/api/file", formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  }) as any

  if (code !== 200) return ElNotification({
    title: '文件上传失败',
    message,
    type: 'error',
  })

  ElNotification({
    title: '成功',
    message: "🎉文件上传成功",
    type: 'success',
  })

  path.value = ""
  fileList.value = []
  fileListTemp.value = []

  getFileList()
}

// 选中的文件
const fileSelectList = ref<string[]>([])
// 删除文件
const delFileData = async () => {
  async function fn() {
    const data = fileSelectList.value.map(url => `/${path.value}${url}`)
    console.log(data, 555);

    await delFileDataAPI(data)

    ElNotification({
      title: '成功',
      message: "🎉删除文件成功",
      type: 'success',
    })

    path.value = ""
    fileList.value = []
    fileListTemp.value = []
    fileSelectList.value = []

    getFileList()
  }

  // 确认是否删除
  whetherToDelete(fn, "文件")
}
</script>

<template>
  <div class="page" @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent @dragenter.prevent>
    <div :class="isDrop ? 'drop' : ''" v-if="!isDrop" style="height: 100%;">
      <Title title="文件管理" icon="folder-open" />

      <el-row justify="center" style="margin-bottom: 20px;" v-if="fileList.length">
        <!-- 操作 -->
        <el-col :span="10">
          <input type="file" ref="fileInput" style="display: none" @change="FileUpload" multiple />
          <el-button @click="fileInput.click()">上传图片</el-button>

          <el-button type="danger" @click="delFileData">删除图片</el-button>
        </el-col>

        <!-- 搜索框 -->
        <el-col :span="6">
          <el-input v-model="search" class="w-50 m-2" size="large" placeholder="请输入文件名称进行查询" :prefix-icon="Search" />
        </el-col>
      </el-row>

      <el-scrollbar max-height="90%">
        <div class="construction" v-loading="loading" :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50">
          <!-- 目录列表 -->
          <div class="dir" v-if="construction.length">
            <div class="item" v-for="item in construction" :key="item.name" @click="access(item)">
              <img src="@/assets/svg/file.svg" alt="">
              <p>{{ item.name }}</p>
            </div>
          </div>

          <!-- 文件列表 -->
          <div class="list">
            <Vue3ImagePreview>
              <el-checkbox-group v-model="fileSelectList">
                <div class="item" v-for="url in fileListTemp" :key="url">
                  <div class="preview">
                    <img :src="getFile(url)" alt="">
                  </div>

                  <p>{{ url }}</p>

                  <el-checkbox :label="url" />
                </div>
              </el-checkbox-group>
            </Vue3ImagePreview>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>

  <!-- 遮罩层 -->
  <div class="mark" v-if="isDrop">
    <h3>将图片拖拽到此处即可上传</h3>
  </div>

  <el-dialog v-model="centerDialogVisible" title="提示" width="30%" center>
    <span style="font-size: 30px;">等待开发，敬请期待！</span>

    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="centerDialogVisible = false">好的</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<style scoped lang="scss">
// .page{
//   position: relative;
// }

:deep(.el-scrollbar) {
  height: 82%;
}

.construction {
  .dir {
    display: flex;
    flex-wrap: wrap;

    .item {
      width: 100px;
      text-align: center;
      margin-right: 30px;

      img {
        width: 100%;
        cursor: pointer;
      }
    }
  }

  .list {
    .image-wrapper {
      width: 100%;
    }

    .el-checkbox-group {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;

      .item {
        width: 18%;
        padding: 10px;
        margin-right: 20px;
        margin-bottom: 20px;
        border-radius: $round;
        border: 2px solid #f6f6f6;
        text-align: center;
        transition: border $move;

        &:first-child {
          margin-left: 0;
        }

        &:hover {
          border: 2px solid #727cf5;

          .preview img {
            transform: scale(2);
          }

          p {
            color: $color;
          }
        }

        .preview {
          overflow: hidden;
          display: flex;
          justify-content: center;
          border-radius: $round;
          cursor: pointer;

          img {
            height: 150px;
            border-radius: $round;
            transition: transform 10s;
          }
        }

        p {
          margin-top: 10px;
          transition: $move;
        }
      }
    }
  }
}

.drop * {
  pointer-events: none !important;
}

.mark {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(121, 128, 237, 0.1);
  z-index: 999;
  pointer-events: none;

  h3 {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%);
    font-size: 50px;
  }
}
</style>

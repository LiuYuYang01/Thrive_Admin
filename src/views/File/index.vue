<script setup lang="ts">
import { Vue3ImagePreview } from 'vue3-image-preview';
import { Search } from '@element-plus/icons-vue'
import { getFileListAPI } from '@/api/File'
import { baseURL } from '@/utils/Request'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

// 搜索
const search = ref<string>("")
// 文件请求URL
const url = ref<string>(baseURL.replace("api", ""))
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
  return new URL(`${url.value + name}`, import.meta.url).href
}

// 进入文件
const access = (data: File) => {
  loading.value = true

  // 拼接文件地址
  url.value += data.name + "/"

  fileList.value = data.list
  fileListTemp.value = data.list

  construction.value = data.children

  setTimeout(() => {
    loading.value = false
  }, 500)
}

// 是否拖拽
const isDrop = ref<boolean>(false)

// 获取拖拽上传的文件
const onDrop = (e: Event) => {
  e.preventDefault()

  isDrop.value = false

  const files = e.dataTransfer.files;
  console.log(files, 666);
}

// 进入拖拽区
const onDragEnter = (e: Event) => {
  isDrop.value = true
}

// 离开拖拽区
const onDragLeave = (e: Event) => {
  isDrop.value = false
};
</script>

<template>
  <div class="page" @drop="onDrop" @dragenter="onDragEnter" @dragleave="onDragLeave" @dragover.prevent @dragenter.prevent>
    <div :class="isDrop ? 'drop' : ''" v-if="!isDrop">
      <Title title="文件管理" icon="folder-open" />

      <el-row justify="center" style="margin-bottom: 20px;" v-if="fileList.length">
        <!-- 操作 -->
        <el-col :span="10">
          <el-button>上传图片</el-button>
          <el-button type="danger">删除图片</el-button>
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
              <div class="item" v-for="url in fileListTemp" :key="url">
                <div class="preview">
                  <img :src="getFile(url)" alt="">
                </div>

                <p>{{ url }}</p>
              </div>
            </Vue3ImagePreview>
          </div>
        </div>
      </el-scrollbar>
    </div>
  </div>

  <!-- 遮罩层 -->
  <div class="mark" v-if="isDrop">
  <!-- <div class="mark" v-if="true"> -->
    <h3>将图片拖拽到此处即可上传</h3>
  </div>
</template>

<style scoped lang="scss">
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

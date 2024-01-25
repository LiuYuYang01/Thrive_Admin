<script setup lang="ts">
import { getFileListAPI } from '@/api/File'
import { baseURL } from '@/utils/Request'
import { svg } from '@/utils'

const loading = ref<boolean>(false)

// 文件请求URL
const url = ref<string>(baseURL.replace("api", ""))
// 获取文件结构
const construction = ref<File[]>([])
// 文件列表
const fileList = ref<string[]>([])

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

// 预览图片
const go = (name: string) => {
  // 在新窗口跳转
  open(url.value + name, "_blank")
}

// 缓存，用于回退
const temp1 = ref<File[]>([])
const temp2 = ref<File[]>([])
const temp3 = ref<File[]>([])

// 进入文件
const access = (data: File) => {
  loading.value = true

  // 拼接文件地址
  url.value += data.name + "/"
  console.log(url.value, 222);

  fileList.value = data.list
  construction.value = data.children

  setTimeout(() => {
    loading.value = false
  }, 500)
}
</script>

<template>
  <div class="page">
    <Title title="文件管理" icon="folder-open" />

    <!-- {{ url }} -->
    <!-- <div>{{ construction }}</div>
    <div>{{ temp1 }}</div>
    <div>{{ temp2 }}</div>
    <div>{{ temp3 }}</div> -->

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
          <div class="item" v-for="url in fileList" :key="url">
            <div class="preview" @click="go(url)">
              <img :src="getFile(url)" alt="">
            </div>

            <p>{{ url }}</p>
          </div>

          <!-- <div class="item" v-for="url in 30" :key="url">
            <div class="preview">
              <img src="https://bu.dusays.com/2023/12/16/657d5343a8f99.png" alt="">
            </div>

            <p>图片.jpg</p>
          </div> -->
        </div>
      </div>
    </el-scrollbar>
  </div>
</template>

<style scoped lang="scss">
:deep(.el-scrollbar) {
  height: 94%;
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
      }
    }
  }
}
</style>

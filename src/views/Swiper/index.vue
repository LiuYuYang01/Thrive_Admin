<script setup lang="ts">
import { ElNotification, FormInstance, FormRules } from 'element-plus';
import { addSwiperDataAPI, delSwiperDataAPI, editSwiperDataAPI, getSwiperDataAPI, getSwiperListAPI } from '@/api/Swiper'
import { whetherToDelete } from '@/utils'
import { svg } from '@/utils'

const tab = ref("list")
const loading = ref(false)
const form = ref<FormInstance>()

const swiper = ref<Swiper>({
  title: '',
  description: '',
  url: '',
  image: ''
})

// 数据校验
const rules = reactive<FormRules<Swiper>>({
  title: [
    { required: true, message: "轮播图标题不能为空", trigger: "blur" },
    { min: 3, max: 30, message: "轮播图标题限制在3 ~ 30个字符", trigger: "blur" }
  ],
  description: [
    { required: true, message: "轮播图描述不能为空", trigger: "blur" },
    { min: 3, max: 50, message: "轮播图描述限制在3 ~ 50个字符", trigger: "blur" }
  ],
  url: [
    { required: true, message: "轮播图链接不能为空", trigger: "blur" },
  ],
  image: [
    { required: true, message: "轮播图不能为空", trigger: "blur" },
  ]
})

// 轮播图列表
const paginate = ref<Paginate<Swiper[]>>()

// 获取轮播图列表
const getSwiperList = async (page?: Page) => {
  loading.value = true

  const { data } = await getSwiperListAPI(page)
  paginate.value = data

  loading.value = false
}
getSwiperList()

// 监听分页变化
const pageChange = (page: number) => {
  getSwiperList({ page, size: paginate.value?.size! })
}

// 修改轮播图
const editSwiperData = (data: Swiper) => {
  swiper.value = data

  // 重置表单数据
  form.value?.resetFields()

  tab.value = "operate"
}

// 删除轮播图
const delSwiperData = async (id: number) => {
  async function fn() {
    await delSwiperDataAPI(id)

    ElNotification({
      title: '成功',
      message: "🎉删除轮播图成功",
      type: 'success',
    })

    getSwiperList({ page: paginate.value?.page!, size: paginate.value?.size! })
  }

  whetherToDelete(fn, "轮播图")
}

// 提交表单
const submit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return

  await formEl.validate(async (valid, fields) => {
    // 校验不通过，则后续的业务逻辑不再执行
    if (!valid) return

    // 有ID就是编辑，没有就是新增
    if (swiper.value.id) {
      // 修改轮播图
      await editSwiperDataAPI(swiper.value)

      fn("🎉编辑轮播图成功")
    } else {
      // 新增轮播图
      await addSwiperDataAPI(swiper.value)

      fn("🎉新增轮播图成功")
    }
  })

  // 减少代码冗余
  const fn = (message: string) => {
    ElNotification({
      title: '成功',
      message: message,
      type: 'success',
    })

    // 获取最新数据
    getSwiperList()

    // 回退到列表
    tab.value = "list"

    // 将数据初始化
    swiper.value = {
      title: '',
      description: '',
      url: '',
      image: ''
    }

    // 只能初始化原来的数据，表单额外的数据无法初始化
    // form.value?.resetFields()
  }
}

// 是否查看轮播图
const viewImage = ref<string>("")
const viewImageModel = ref(false)
</script>

<template>
  <div class="page">
    <Title title="轮播图管理" icon="image" />

    <el-tabs v-model="tab" tab-position="left" class="tabs">
      <!-- 轮播图列表 -->
      <el-tab-pane label="轮播图列表" name="list" class="list">
        <el-table :data="paginate?.result" style="width: 100%" v-loading="loading" :element-loading-svg="svg"
          element-loading-svg-view-box="-10, -10, 50, 50">
          <el-table-column prop="id" label="ID" width="80" />

          <el-table-column prop="image" label="图片" width="200">
            <template #default="{ row }">
              <img :src="row.image" title="查看图片" class="image"
                @click="viewImageModel = !viewImageModel; viewImage = row.image">
            </template>
          </el-table-column>

          <el-table-column prop="title" label="标题" width="300" />

          <el-table-column prop="description" label="描述" />

          <el-table-column label="操作" align="center" width="200" #default="{ row }">
            <el-button type="primary" @click="editSwiperData(row)">修改</el-button>

            <el-button type="danger" @click="delSwiperData(row.id)">删除</el-button>
          </el-table-column>
        </el-table>

        <!-- 分页 -->
        <div class="pagination" v-if="paginate?.result?.length">
          <el-pagination background layout="prev, pager, next" :total="paginate?.total" :page-size="paginate?.size"
            @current-change="pageChange" />
        </div>

        <!-- 查看轮播图 -->
        <el-dialog v-model="viewImageModel" title="查看图片" width="30%" center>
          <img :src="viewImage" alt="" style="width: 100%; border-radius: 5px;">
        </el-dialog>
      </el-tab-pane>

      <!-- 操作轮播图 -->
      <el-tab-pane :label="swiper.id ? '编辑轮播图' : '新增轮播图'" name="operate" class="manage">
        <el-form ref="form" label-position="top" :model="swiper" :rules="rules" style="width: 400px; max-width: 460px"
          size="large">
          <el-form-item label="标题" prop="title">
            <el-input v-model="swiper.title" placeholder="要么沉沦 要么巅峰!" />
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="swiper.description" placeholder="Either sink or peak!" />
          </el-form-item>

          <el-form-item label="链接" prop="url">
            <el-input v-model="swiper.url" placeholder="http://liuyuyang.net/" />
          </el-form-item>

          <el-form-item label="图片" prop="image">
            <el-input v-model="swiper.image" placeholder="https://liuyuyang.net/swiper.jpg" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="submit(form)">{{ swiper.id ? '编辑轮播图' :
              '新增轮播图' }}</el-button>
          </el-form-item>
        </el-form>

        <!-- 插画 -->
        <img src="@/assets/svg/image.svg" class="image">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.tabs>.el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 32px;
  font-weight: 600;
}

.list {
  margin-left: 30px;

  .pagination {
    display: flex;
    justify-content: end;
    margin-top: 20px;
  }

  .image {
    height: 100%;
    border-radius: $round;
    background-size: cover;
    cursor: pointer;
  }
}

.manage {
  display: flex;
  justify-content: space-between;
  margin-left: 30px;

  .image {
    width: 350px;
    margin-right: 220px;
    margin-top: 20px;
  }
}
</style>

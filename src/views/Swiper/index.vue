<script setup lang="ts">
const activeName = ref('list')

import { loading, svg, SwiperList, getSwiperData, viewImageShow, image, editSwiperData, delSwiperData } from './logic/getSwiper'
getSwiperData()

import { SwiperForm, SubmitForm, rules, SwiperRef } from './logic/addSwiper'
</script>

<template>
  <div class="swiper">
    <Title title="轮播图管理" icon="image" />

    <el-tabs v-model="activeName" tab-position="left" class="demo-tabs">
      <el-tab-pane label="轮播图列表" name="list" class="list">
        <!-- 轮播图列表 -->
        <el-table :data="SwiperList" style="width: 100%" v-loading="loading" :element-loading-svg="svg"
          class="custom-loading-svg" element-loading-svg-view-box="-10, -10, 50, 50">
          <el-table-column prop="id" label="ID" width="80" />

          <el-table-column prop="image" label="图片" width="200">
            <template #default="{ row }">
              <img :src="row.image" title="查看图片" class="image" @click="viewImageShow = !viewImageShow; image = row.image">
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
        <div class="pagination">
          <el-pagination background layout="prev, pager, next" :total="50" class="mt-4" />
        </div>

        <!-- 查看轮播图 -->
        <el-dialog v-model="viewImageShow" title="查看图片" width="30%" center>
          <img :src="image" alt="" style="width: 100%; border-radius: 5px;">
        </el-dialog>
      </el-tab-pane>

      <el-tab-pane label="新增轮播图" name="operate" class="manage">
        <el-form ref="SwiperRef" label-position="top" :model="SwiperForm" :rules="rules"
          style="width: 400px; max-width: 460px" size="large">
          <el-form-item label="标题" prop="title">
            <el-input v-model="SwiperForm.title" placeholder="要么沉沦 要么巅峰!" />
          </el-form-item>

          <el-form-item label="描述" prop="description">
            <el-input v-model="SwiperForm.description" placeholder="Either sink or peak!" />
          </el-form-item>

          <el-form-item label="链接" prop="url">
            <el-input v-model="SwiperForm.url" placeholder="http://liuyuyang.net/" />
          </el-form-item>

          <el-form-item label="图片" prop="image">
            <el-input v-model="SwiperForm.image" placeholder="http://blog.liuyuyang.net/img/63adb5eb87f9b.jpg" />
          </el-form-item>

          <el-form-item>
            <el-button type="primary" style="width: 100%;" @click="SubmitForm(SwiperRef)">新增轮播图</el-button>
          </el-form-item>
        </el-form>

        <!-- 插画 -->
        <img src="@/assets/svg/image.svg" class="image">
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<style scoped lang="scss">
.demo-tabs>.el-tabs__content {
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
    height: 100px;
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

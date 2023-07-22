<script setup lang="ts">
import { EditPen } from '@element-plus/icons-vue'
import { useUserStore } from '@/stores'
const store = useUserStore()
</script>

<template>
  <div class="headerInfo">
    <!-- 头像 -->
    <img :src="store.user?.avatar || 'https://q1.qlogo.cn/g?b=qq&nk=3311118881&s=640'" class="avatar">

    <!-- 信息 -->
    <div class="info">
      <h3 class="text-gradient">Hello {{ store.userInfo?.name || '未命名' }} ! 欢迎使用 Thrive 后台管理系统</h3>

      <p>
        <el-icon>
          <EditPen />
        </el-icon> {{store.userInfo?.introduce || '互联网从不缺乏天才，而努力才是最终的入场券！'}}
      </p>
    </div>
  </div>
</template>

<style scoped lang="scss">
.headerInfo {
  display: flex;
  align-items: center;
  height: 140px;
  @include container;

  .avatar {
    width: 90px;
    height: 90px;
    border-radius: 50%;
    margin: 0 40px;
    transition: transform $move;

    &:hover {
      transform: scale(1.2);
    }
  }

  .info {
    h3 {
      font-size: 20px;
      font-weight: 900;
      margin-bottom: 15px;
    }

    p {
      font-size: 15px;
      color: #888;
    }
  }
}
</style>

<script setup lang="ts">
const timeline = [
  {
    content: '整体功能开发完毕',
    timestamp: '2024-04-8',
    color: '#0bbd87'
  },
  {
    content: '优化项目代码，减少代码冗余',
    timestamp: '2023-08-12',
  },
  {
    content: '修复已知BUG',
    timestamp: '2023-04-25',
  },
  {
    content: '优化用户交互体验',
    timestamp: '2023-01-18',
  },
  {
    content: '新增3D标签功能',
    timestamp: '2022-04-15',
  }
]
</script>

<template>
  <div class="recording">
    <div class="title"><box-icon name='code-alt' />更新日志</div>

    <el-timeline style="padding: 0 20px;">
      <el-timeline-item v-for="(item, index) in timeline" :key="index" :timestamp="item.timestamp" :color="item.color">
        {{ item.content }}
      </el-timeline-item>
    </el-timeline>
  </div>
</template>

<style scoped lang="scss">
.recording {
  width: 20%;
  @include container;

  .title {
    @include title;
    padding: 15px;
    margin-bottom: 15px;
  }
}
</style>

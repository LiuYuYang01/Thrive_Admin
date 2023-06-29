<script setup lang="ts">

</script>

<template>
  <div class="Sidebar">
    <div class="logo">
      <a href="javascript:;">Thrive</a>
    </div>

    <!-- 导航列表 -->
    <div class="list">
      <ul>
        <li class="item">
          <a href="javascript:;" class="nav">仪表盘</a>
        </li>

        <li class="item">
          <a href="javascript:;" class="nav">创作</a>
        </li>

        <li class="item">
          <a href="javascript:;" class="nav">网站管理</a>
        </li>

        <li class="item">
          <a href="javascript:;" class="nav">系统配置</a>
        </li>

        <li class="item">
          <a href="javascript:;" class="nav">主题设置</a>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Sidebar {
  .logo {
    padding: 20px 0;
    font-size: 25px;
    font-weight: 900;
    text-align: center;

    a {
      color: #fff;
    }
  }

  .item {
    line-height: 50px;
    padding-left: 20px;

    // 鼠标经过导航高亮
    &:hover a {
      color: #fff;
    }

    .nav {
      display: inline-block;
      width: 100%;
      height: 100%;
      color: #dadada;

      // 鼠标点击后高亮
      &:focus {
        color: #fff;
      }
    }
  }
}
</style>

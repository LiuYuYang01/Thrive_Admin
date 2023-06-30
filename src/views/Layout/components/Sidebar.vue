<script setup lang="ts">
const navIndex = 1;

import { routes } from '@/routers/index'
const navList = routes[0].children
</script>

<template>
  <div class="Sidebar">
    <div class="logo">
      <a href="javascript:;">Thrive</a>
    </div>

    <!-- 导航列表 -->
    <div class="list">
      <ul>
        <li class="item" v-for="item in navList" :key="item.path">
          <a href="javascript:;" class="nav nav-selected">
            <box-icon :name="item.meta.icon" class="icon" />
            {{ item.meta.title }}
          </a>
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
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #dadada;

      .icon {
        fill: #fff;
        margin-top: -15px;
        margin-right: 10px;
      }
    }

    // 导航选中效果
    .nav-selected {
      color: #fff;
    }
  }
}
</style>

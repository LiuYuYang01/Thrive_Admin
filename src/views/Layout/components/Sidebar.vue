<script setup lang="ts">
const navIndex = ref<number>(0);

import { routes } from '@/routers/index'
import { ref } from 'vue';
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
        <li class="item" v-for="item, index in navList" :key="item.path" @click="navIndex = index">
          <a href="javascript:;" class="nav" :class="{ nav_active: navIndex === index }">
            <box-icon :name="item.meta.icon" />
            {{ item.meta.title }}
            <box-icon name='chevron-down' style="margin-top: -9px;margin-left: 5px;"/>
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
    &:hover .nav,
    .nav box-icon {
      color: #fff;
      fill: #fff;
    }

    .nav {
      display: flex;
      align-items: center;
      width: 100%;
      height: 100%;
      color: #dadada;

      box-icon {
        fill: #dadada;
        margin-top: -15px;
        margin-right: 10px;
      }
    }

    // 导航选中效果
    .nav_active {
      color: #fff;

      box-icon {
        fill: #fff;
      }
    }
  }
}
</style>

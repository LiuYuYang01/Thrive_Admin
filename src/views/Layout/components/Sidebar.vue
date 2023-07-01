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
            <div>
              <box-icon :name="item.meta.icon" />

              {{ item.meta.title }}
            </div>

            <box-icon name='chevron-down' class="icon" />
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

    // 鼠标经过导航高亮
    &:hover {
      .nav {
        color: #fff;
      }

      .nav box-icon {
        fill: #fff;
      }
    }

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 85%;
      height: 100%;
      padding: 0 20px;
      color: #cedce4;
      font-size: 15px;

      box-icon {
        width: 20px;
        height: 25px;
        fill: #cedce4;
        margin-top: -15px;
        margin-right: 10px;
      }

      .icon {
        margin-top: -9px;
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

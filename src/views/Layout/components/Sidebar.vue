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

          <dl class="children" v-if="item.path === '/home'">
            <dd>发布文章</dd>
            <dd>发布文章</dd>
            <dd>发布文章</dd>
            <dd>发布文章</dd>
            <dd>发布文章</dd>
          </dl>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped lang="scss">
.Sidebar {
  width: 210px;
  height: 100vh;
  margin-right: 20px;
  background-image: linear-gradient(135deg, #8f75da 0%, #727cf5 60%);

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

    .nav {
      display: flex;
      align-items: center;
      justify-content: space-between;
      width: 85%;
      height: 100%;
      padding: 0 20px;
      color: #cedce4;
      font-size: 15px;
      transition: all $move;

      box-icon {
        width: 20px;
        height: 25px;
        fill: #cedce4;
        margin-right: 10px;
        vertical-align: sub;
      }

      .icon {
        margin-top: -9px;
      }
    }

    // 鼠标经过导航高亮
    &:hover {
      .nav {
        color: #fff;
      }

      .nav box-icon {
        fill: #fff;
      }
    }

    // 导航选中效果
    .nav_active {
      color: #fff;

      box-icon {
        fill: #fff;
      }
    }

    .children {
      padding-left: 55px;

      dd {
        height: 45px;
        color: #cedce4;
        font-size: 14px;
        transition: $move;
        cursor: pointer;

        // 鼠标经过导航高亮
        &:hover {
          color: #fff;
        }
      }
    }
  }
}
</style>

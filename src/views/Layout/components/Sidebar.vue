<script setup lang="ts">
import { reactive, ref } from 'vue';

// 获取路由列表
import { routes } from '@/routers/index'
const navList = routes[0].children

import { useRouter } from 'vue-router'
const router = useRouter()

// 导航当前选中
const active = reactive({
  one: 0,
  two: 0
})



// 导航选中及切换效果
const toPath = (index: number, path: string, type?: string) => {
  const list = document.querySelector(".list")
  console.log(list,666);
  

  type === 'two' ? active.two = index : active.one = index

  router.push(path)
}

const show = ref<boolean>(true)
</script>

<template>
  <div class="Sidebar">
    <div class="logo">
      <a href="javascript:;">Thrive</a>
    </div>

    <!-- 导航列表 -->
    <div class="list">
      <ul>
        <li class="item" v-for="one, one_index in navList" :key="one.path" @click.stop="toPath(one_index, one.path)">
          <!-- 一级导航 -->
          <a href="javascript:;" class="nav" :class="{ nav_active: active.one === one_index }">
            <div><box-icon :name="one.meta.icon" />{{ one.meta.title }}</div>

            <box-icon name='chevron-down' class="icon" v-if="one.children" />
          </a>

          <!-- 二级导航 -->
          <template v-if="one.children">
            <el-collapse-transition>
              <dl class="children">
                <dd :class="{ nav_active: active.two === two_index }" v-for="two, two_index in one.children"
                  :key="two.path" @click.stop="toPath(two_index, `${one.path}/${two.path}`, 'two')">
                  {{ two.meta.title }}
                </dd>
              </dl>
            </el-collapse-transition>
          </template>
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
      width: 95%;
      height: 100%;
      padding-left: 20px;
      color: #cedce4;
      font-size: 15px;
      transition: all $move;

      box-icon {
        width: 20px;
        height: 25px;
        fill: #cedce4;
        margin-right: 10px;
        position: relative;
        top: 5px;
      }

      .icon {
        margin-top: -13px;
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
      color: #fff !important;

      box-icon {
        fill: #fff !important;
      }
    }

    .children {
      padding-left: 55px;
      transition: all 0.3s;

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

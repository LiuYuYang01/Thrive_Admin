<script setup lang="ts">
const router = useRouter()

// 当前的路由地址
const path = router.currentRoute.value.path

const active = ref<string>(path)

const list = [
  {
    title: "系统配置",
    description: "系统配置描述信息",
    icon: "shield-quarter",
    path: "/setup/system"
  },
  {
    title: "网站设置",
    description: "网站设置描述信息",
    icon: "globe",
    path: "/setup/web"
  },
  {
    title: "个人设置",
    description: "个人设置描述信息",
    icon: "user",
    path: "/setup/my"
  }
]

// 显示指定路由内容
const toPath = (path: string) => {
  active.value = path
  router.push(path)
}

// 监听路由变化
onBeforeRouteUpdate(to => {
  active.value = to.path
})
</script>

<template>
  <div class="page">
    <Title title="全局配置" icon="shield-quarter" />

    <div class="main">
      <ul class="options">
        <li class="item" :class="{ active: item.path === active }" @click="toPath(item.path)" v-for="item, index in list">
          <h3><box-icon :name="item.icon" />{{ item.title }}</h3>
          <p>{{ item.description }}</p>
        </li>
      </ul>

      <div class="config">
        <RouterView />
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.main {
  display: flex;

  .options {
    width: 210px;
    margin-right: 20px;
    border-right: 1px solid #eee;

    .item {
      position: relative;
      padding: 10px 0;
      padding-left: 20px;
      margin: 5px 0;
      transition: all $move;
      cursor: pointer;

      h3 {
        font-size: 16px;

        @include icon;

        color: #333;

        box-icon {
          color: #333;
        }
      }

      p {
        font-size: 14px;
        margin-top: 10px;
        color: #858585;
      }

      &::before {
        content: "";
        position: absolute;
        top: 50%;
        left: 0;
        transform: translateY(-50%);
        width: 3.5px;
        height: 0%;
        background-color: $color;
        transition: height $move;
      }

      &:hover {
        background-color: #f7f7f8;

        &::before {
          height: 100%;
        }
      }
    }

    .active {
      background-color: #f7f7f8;

      &::before {
        height: 100%;
      }
    }
  }

  .config {
    width: 100%;
  }
}
</style>

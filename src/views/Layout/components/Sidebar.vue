<script setup lang="ts">
// 获取路由列表
import { routes } from '@/routers'
const navList = ref(JSON.parse(sessionStorage.getItem("navList") as string) || routes[0].children)


// 给所有路由设置show属性，默认值为false
navList.value.forEach((item: { meta: any; }) => {
  const show = item.meta.show

  // 如果有show属性就略过
  if (!show) item.meta.show = false
})


const router = useRouter()


const nav_active = JSON.parse(sessionStorage.getItem("nav_active")!)

// 导航当前选中
const active = reactive(nav_active || {
  one: "/home",
  two: ""
})


// 导航选中及切换效果
const toPath = (index: number, path: string, type: "one" | "two" = "one") => {
  if (type === "one") {
    active.one = path
    // active.two = path + "/"

    // 保存当前导航选中项
    sessionStorage.setItem("nav_active", JSON.stringify({ one: path }))

    // 点击展开二级导航，再次点击收起
    navList.value[index].meta.show = !navList.value[index].meta.show
    // 将展开的导航记录在会话存储中，这样页面刷新后之前打开的菜单不会被折叠起来
    sessionStorage.setItem("navList", JSON.stringify(navList.value))


    
    // 如果一级导航中有二级的或者所有hidden属性为true，就不让他跳转路由
    const r = navList.value[index].children

    if (r) {
      // 如果所有二级属性都为：hidden: true，那么允许一级导航跳转
      const f = r?.every((item: any) => item.meta.hidden)

      f ? router.push(path) : 0
    } else {
      router.push(path)
    }
  } else {
    // 二级导航被选中也让一级导航高亮
    const i = path.lastIndexOf("/")

    active.one = path.slice(0, i)
    active.two = path

    // 记录当前导航选中项
    sessionStorage.setItem("nav_active", JSON.stringify({ ...active, two: path }))

    router.push(path)
  }
}

// 导航下拉图标是否显示隐藏
const isIcon = (one: any) => one.children && !one.children?.every((item: any) => item.meta.hidden)
</script>

<template>
  <div class="Sidebar">
    <div class="logo" @click="router.push('/')">
      <a href="javascript:;">Thrive</a>
    </div>

    <!-- 导航列表 -->
    <div class="list">
      <ul>
        <li class="item" v-for="one, one_index in navList" :key="one.path" @click.stop="toPath(one_index, one.path)">
          <!-- 一级导航 -->
          <a href="javascript:;" class="nav" :class="{ nav_active: active.one === one.path }">
            <div><box-icon :name="one.meta.icon" />{{ one.meta.title }}</div>

            <box-icon name='chevron-down' class="icon" v-if="isIcon(one)" />
          </a>

          <!-- 二级导航 -->
          <template v-if="one.children">
            <el-collapse-transition>
              <dl class="children" v-show="one.meta.show">

                <template v-for="two, two_index in one.children">
                  <dd :class="{ nav_active: active.two === `${one.path}/${two.path}` }"
                    @click.stop="toPath(two_index, `${one.path}/${two.path}`, 'two')" v-if="!two.meta.hidden">
                    {{ two.meta.title }}
                  </dd>
                </template>

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
  width: 240px;
  // height: 100vh;
  background-image: linear-gradient(135deg, #8f75da 0%, #727cf5 60%);
  // background-color: #3e4656;
  box-shadow: 15px 2px 18px -3px rgba(121, 122, 243, 0.1);

  .logo {
    font-size: 25px;
    font-weight: 900;
    text-align: center;

    a {
      color: #fff;
      padding: 20px 0;
      width: 100%;
      display: inline-block;
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
        transition: fill;
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

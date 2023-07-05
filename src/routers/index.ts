import { createRouter, createWebHistory } from 'vue-router'
import { useUserStore } from '@/stores'

import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress配置信息
NProgress.configure({
  // 取消圆形加载图标
  showSpinner: false
})

export const routes = [
  {
    path: '/',
    component: () => import('@/views/Layout/index.vue'),
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '仪表盘', icon: "home-smile" },
      },
      {
        path: '/write',
        meta: { title: '创作', icon: "edit-alt", show: true },
        children: [
          {
            path: "",
            component: () => import('@/views/Home/index.vue'),
            meta: { title: '发布文章' }
          },
          {
            path: "b",
            component: () => import('@/views/Home/index.vue'),
            meta: { title: '发布说说' }
          }
        ]
      },
      {
        path: '/manage',
        meta: { title: '管理', icon: "edit-alt" },
        children: [
          {
            path: "swiper",
            component: () => import('@/views/Swiper/index.vue'),
            meta: { title: '轮播图' }
          },
          {
            path: "cate",
            component: () => import('@/views/Cate/index.vue'),
            meta: { title: '分类导航' }
          }
        ]
      },
      {
        path: '/setup',
        component: () => import('@/views/Setup/index.vue'),
        meta: { title: '系统配置', icon: "planet" },
        children: [
          {
            path: "",
            component: () => import('@/views/Setup/components/Setup.vue'),
            meta: { title: '全局配置', hidden: true }
          },
          {
            path: "site",
            component: () => import('@/views/Setup/components/Site.vue'),
            meta: { title: '网站管理', hidden: true }
          },
          {
            path: "my",
            component: () => import('@/views/Setup/components/My.vue'),
            meta: { title: '个人设置', hidden: true }
          }
        ]
      },
      {
        path: '/home/5',
        component: () => import('@/views/Home/index.vue'),
        meta: { title: '主题设置', icon: "palette" }
      }
    ]
  },
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: { title: "登录" }
  }
]

// 路由配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes
})

// 访问权限控制
router.beforeEach(to => {
  const store = useUserStore()

  // 开启进度条
  NProgress.start()

  // 处理页面标题
  document.title = `Thrive - ${to.meta.title || ''}`

  // 白名单：不需要登录就能访问的页面
  const wihteList = ["/login"]

  // 如果没有token就意味着没有登录 并且 在没有登录情况下会自动跳转到登录页
  if (!store.user?.token && !wihteList.includes(to.path)) return "/login"
  // 如果已登录，则跳转到指定的页面

  // 关闭进度条
  NProgress.done()
})

export default router
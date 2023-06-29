import { createRouter, createWebHistory } from 'vue-router'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

// NProgress配置信息
NProgress.configure({
  // 取消圆形加载图标
  showSpinner: false
})

// 路由配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: () => import('@/views/Layout/index.vue'),
      redirect: '/home',
      children: [
        {
          path: '/home',
          component: () => import('@/views/Home/index.vue'),
          meta: { title: '首页' }
        }
      ]
    },
  ]
})

// 访问权限控制
router.beforeEach(to => {
  // 开启进度条
  NProgress.start()

  // 处理页面标题
  document.title = `Thrive - ${to.meta.title || ''}`

  // 关闭进度条
  NProgress.done()
})

export default router
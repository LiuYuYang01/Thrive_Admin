import { createRouter, createWebHistory } from "vue-router";
import { useUserStore } from "@/stores";

// meta字段说明
// title：路由标题
// icon：路由图标
// show：默认是否展开二级导航
export const routes = [
  {
    path: "/",
    component: () => import("@/views/Layout/index.vue"),
    redirect: "/home",
    children: [
      {
        path: "/home",
        component: () => import("@/views/Home/index.vue"),
        meta: { title: "仪表盘", icon: "home-smile" },
      },
      {
        path: "/write",
        meta: { title: "创作", icon: "edit-alt" },
        children: [
          {
            path: "",
            component: () => import("@/views/Write/index.vue"),
            meta: { title: "发布文章" },
          },
          // {
          //   path: "b",
          //   component: () => import("@/views/Home/index.vue"),
          //   meta: { title: "发布说说" },
          // },
        ],
      },
      {
        path: "/manage",
        meta: { title: "管理", icon: "planet", show: true },
        children: [
          {
            path: "article",
            component: () => import("@/views/Article/index.vue"),
            meta: { title: "文章管理" },
          },
          {
            path: "comment",
            component: () => import("@/views/Comment/index.vue"),
            meta: { title: "评论管理" },
          },
          {
            path: "cate",
            component: () => import("@/views/Cate/index.vue"),
            meta: { title: "分类管理" },
          },
          {
            path: "tag",
            component: () => import("@/views/Tag/index.vue"),
            meta: { title: "标签管理" },
          },
          {
            path: "link",
            component: () => import("@/views/Link/index.vue"),
            meta: { title: "网站管理" },
          },
          {
            path: "swiper",
            component: () => import("@/views/Swiper/index.vue"),
            meta: { title: "轮播图管理" },
          },
        ],
      },
      {
        path: "/setup",
        component: () => import("@/views/Setup/index.vue"),
        meta: { title: "配置", icon: "cog" },
        children: [
          {
            path: "system",
            component: () => import("@/views/Setup/components/System.vue"),
            meta: { title: "系统配置" },
          },
          {
            path: "web",
            component: () => import("@/views/Setup/components/Web.vue"),
            meta: { title: "网站配置" },
          },
          {
            path: "layout",
            component: () => import("@/views/Setup/components/Layout.vue"),
            meta: { title: "布局配置" },
          },
          {
            path: "my",
            component: () => import("@/views/Setup/components/My.vue"),
            meta: { title: "个人设置" },
          },
        ],
      },
      {
        path: "/file",
        component: () => import("@/views/File/index.vue"),
        meta: { title: "文件系统", icon: "folder-open" },
      },
      {
        path: "/work",
        component: () => import("@/views/Work/index.vue"),
        meta: { title: "工作室", icon: "desktop" },
      },
      {
        path: "/rss",
        component: () => import("@/views/Rss/index.vue"),
        meta: { title: "订阅中心", icon: "paper-plane" },
      }
    ],
  },
  {
    path: "/login",
    component: () => import("@/views/Login/index.vue"),
    meta: { title: "登录" },
  },
];

// 路由配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: routes,
});

// 访问权限控制
router.beforeEach((to, form) => {
  // 准备进入的路由：to
  // 刚刚离开的路由：form
  const store = useUserStore();

  // 处理页面标题
  document.title = `Thrive - ${to.meta.title || ""}`;

  // 白名单：不需要登录就能访问的页面
  const wihteList = ["/login"];

  // 如果没有token就意味着没有登录 并且 在没有登录情况下会自动跳转到登录页
  if (!store.token && !wihteList.includes(to.path)) return "/login";

  // 如果有token，就不让他跳转到登录页了
  if (store.token && to.path === "/login") return form.path

  // 如果已登录，则跳转到指定的页面
  return true
});

export default router;

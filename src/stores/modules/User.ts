import { defineStore } from "pinia";
import { getUserAPI, editUserAPI } from "@/api/User";
import router from "@/routers";

export const useUserStore = defineStore(
  "user",
  () => {
    const token = ref<string>("")
    const user = ref<User>();

    // 获取用户信息
    const getUser = async () => {
      const { data } = await getUserAPI(1);

      user.value = data as User;
    };

    // 编辑用户信息
    const setUser = async (data: account, type: string) => {
      switch (type) {
        case "login":
          token.value = data.token;
          user.value = data.user;
          break;

        case "edit":
          const { code, message } = await editUserAPI(1, data.user);

          if (code !== 200) return;

          ElNotification({
            title: "成功",
            message: message,
            type: "success",
          });

          user.value = data.user;
          break;
      }
    };

    // 清空用户，退出后使用
    const delUser = () => {
      user.value = undefined;

      // 清空本地的所有数据
      localStorage.clear();
      sessionStorage.clear();

      // 跳转到登录页
      router.push({
        path: "/login",
        query: { returnUrl: router.currentRoute.value.fullPath }, // 记录上一次路由的路径
      });
    };

    return { user, token, getUser, setUser, delUser };
  },
  { persist: true }
);

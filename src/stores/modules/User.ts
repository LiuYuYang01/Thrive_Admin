import { defineStore } from "pinia";

// 导出共享状态管理
export const useUserStore = defineStore("user", () => {
  const token = ref<string>("")
  const user = ref<User>()

  // 退出登录
  const quitLogin = () => {
    user.value = {} as any
    token.value = ""
    localStorage.clear()
    sessionStorage.clear()
    location.href = "/login"
  }

  return { token, user, quitLogin };
}, { persist: true });
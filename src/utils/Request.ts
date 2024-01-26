import axios, { AxiosError, AxiosResponse, InternalAxiosRequestConfig } from "axios";
import { Action, ElMessageBox, ElNotification } from "element-plus";
import { useUserStore } from "@/stores";

// 配置项目API域名
export const baseURL = "http://localhost:5000/api";
// export const baseURL = "http://139.196.43.147:5000/api"

// 创建 axios 实例
export const instance = axios.create({
  // 项目API根路径
  baseURL,
  // 请求超时的时间
  timeout: 5000,
});

// 请求拦截
instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const store = useUserStore();

    // 如果有token就把赋值给请求头
    if (store.token) config.headers["Authorization"] = `Bearer ${store.token}`;

    return config;
  },
  (err: AxiosError) => {
    ElNotification({
      title: "程序异常",
      message: err.message,
      type: "error",
    });

    return Promise.reject(err);
  }
);

// 响应拦截
instance.interceptors.response.use(
  (res: AxiosResponse) => {
    // 如果code为401就证明认证失败
    if (res.data.code === 401) {
      const store = useUserStore();

      return ElMessageBox.alert('🔒️ 登录已过期，是否重新登录?', '暂无权限', {
        confirmButtonText: '去登录',
        showClose: false,
        callback: (action: Action) => {
          // 删除用户信息
          store.quitLogin()
        }
      })
    }

    // 只要code不等于200, 就相当于响应失败
    if (res.data?.code !== 200) {
      // 程序异常：增删改查失败导致状态码不等于200
      ElNotification({
        title: "程序异常",
        message: res.data?.message || "未知错误",
        type: "error",
      });

      return Promise.reject(res.data);
    }

    return res.data;
  },
  (err: AxiosError) => {
    // 服务器异常：网络错误、请求超时、状态码不在200-299之间等等
    ElNotification({
      title: "服务器异常",
      message: err.message,
      type: "error",
    });

    return Promise.reject(err);
  }
);

// 如果是GET传参就自动识别为query，POST为data
const Request = <T>(method: string, url: string, reqParams?: object) => {
  if (!method) method = "GET";

  return instance.request<any, Response<T>>({
    method,
    url,
    [method.toLocaleUpperCase() === "GET" ? "params" : "data"]: reqParams,
  });
};

export default Request;

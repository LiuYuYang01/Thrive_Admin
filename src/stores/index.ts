import { createPinia } from 'pinia'
import persist from 'pinia-plugin-persistedstate'

// 安装Pinia持久化插件
const pinia = createPinia().use(persist)
export default pinia

export * from './modules/User'
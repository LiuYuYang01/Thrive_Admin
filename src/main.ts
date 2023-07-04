import { createApp } from 'vue'
import App from './App.vue'

// 引入图标库
import 'boxicons'
import 'boxicons/dist/boxicons'

// 引入store
import pinia from '@/stores/index'

// 引入路由
import router from './routers'

// 引入Element plus
import 'element-plus/dist/index.css'

// 引入全局样式
import '@/styles/index.scss'

const app = createApp(App)

app.use(pinia)
app.use(router)

app.mount('#app')

import { createApp } from 'vue'
import App from './App.vue'

// 引入图标库
import 'boxicons'
// import 'boxicons/dist/boxicons.js'
import "boxicons/css/boxicons.min.css";

// 引入store
import pinia from '@/stores/index'

// 引入路由
import router from './routers'

// 引入Element plus
import 'element-plus/dist/index.css'

// 引入全局样式
import '@/styles/index.scss'

import VueMarkdownEditor from '@/utils/Edit'

const app = createApp(App)

app.use(VueMarkdownEditor);

app.use(pinia)
app.use(router)

app.mount('#app')

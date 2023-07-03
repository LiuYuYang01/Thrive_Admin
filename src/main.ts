import { createApp } from 'vue'
import App from './App.vue'

import 'boxicons'
import 'boxicons/dist/boxicons'

import moment from 'moment'

import router from './routers'
import '@/styles/index.scss'

const app = createApp(App)

// 将moment.js时间插件挂载到Vue全局
app.config.globalProperties.$moment = moment

app.use(router)

app.mount('#app')

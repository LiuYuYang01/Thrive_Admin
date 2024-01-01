import Request from '@/utils/Request'
import { SystemParame } from '@/types/System'

// 获取系统配置信息
export const getSystemParameAPI = () => Request<SystemParame>("GET", "/system/parame")

// 获取网站配置信息
export const getWebParameAPI = () => Request<SystemParame>("GET", "/system/web")
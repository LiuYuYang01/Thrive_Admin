import Request from '@/utils/Request'
import { SystemParame } from '@/types/System'

// 获取系统配置信息
export const getSystemParameAPI = () => Request<SystemParame>("GET", "/project/system")

// 获取网站配置信息
export const getWebParameAPI = () => Request<SystemParame>("GET", "/project/web")
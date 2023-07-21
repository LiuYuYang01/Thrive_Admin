import Request from '@/utils/Request'
import { SystemParame } from '@/types/System'

// 获取系统配置信息
export const getSystemParameAPI = () => Request<SystemParame>("GET", "/system/parame")
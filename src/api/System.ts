import Request from '@/utils/Request'

// 获取系统配置信息
export const getSystemDataAPI = () => Request<System>("GET", "/project/system")

// 获取网站配置信息
export const getWebDataAPI = () => Request<Web>("GET", "/project/web")

// 修改网站配置信息
export const editWebDataAPI = (data: Web) => Request<Web>("PATCH", "/project/web", data)
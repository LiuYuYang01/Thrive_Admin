import Request from '@/utils/Request'

// 获取系统配置信息
export const getSystemDataAPI = () => Request<System>("GET", "/project/system")

// 获取网站配置信息
export const getWebDataAPI = () => Request<Web>("GET", "/project/web")

// 修改网站配置信息
export const editWebDataAPI = (data: Web) => Request<Web>("PATCH", "/project/web", data)

// 获取布局配置信息
export const getLayoutDataAPI = () => Request<Layout>("GET", "/project/layout")

// 修改布局配置信息
export const editLayoutDataAPI = (data: Web) => Request<Layout>("PATCH", "/project/layout", data)
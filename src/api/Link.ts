import Request from '@/utils/Request'

// 新增网站
export const addLinkDataAPI = (data: Link) => Request<Link>("POST", "/link", data)

// 删除网站
export const delLinkDataAPI = (id: number) => Request<Link>("DELETE", `/link/${id}`)

// 修改网站
export const editLinkDataAPI = (id: number, data: Link) => Request<Link>("PATCH", `/link/${id}`, data)

// 获取网站：传ID代表获取单个，不传代表所有
export const getLinkDataAPI = (id?: number) => id ? Request<Link>("GET", `/link/${id}`) : Request<Paginate<Link[]>>("GET", "/link")
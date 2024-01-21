import Request from '@/utils/Request'

// 新增网站
export const addLinkDataAPI = (data: Link) => Request<Link>("POST", "/link", data)

// 删除网站
export const delLinkDataAPI = (id: number) => Request<Link>("DELETE", `/link/${id}`)

// 修改网站
export const editLinkDataAPI = (data: Link) => Request<Link>("PATCH", "/link", data)

// 获取网站
export const getLinkDataAPI = (id?: number) => Request<Paginate<Link>>("GET", `/link/${id}`)

// 获取网站列表
export const getLinkListAPI = (page?: Page) => {
    if (page) {
        return Request<Paginate<Link[]>>("GET", `/link?page=${page.page}&size=${page.size}`);
    } else {
        return Request<Paginate<Link[]>>("GET", `/link`);
    }
};

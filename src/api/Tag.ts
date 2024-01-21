import Request from '@/utils/Request'

// 新增标签
export const addTagDataAPI = (data: Tag) => Request<Tag>("POST", "/tag", data)

// 删除标签
export const delTagDataAPI = (id: number) => Request<Tag>("DELETE", `/tag/${id}`)

// 修改标签
export const editTagDataAPI = (data: Tag) => Request<Tag>("PATCH", "/tag", data)

// 获取标签
export const getTagDataAPI = (id?: number) => Request<Paginate<Tag>>("GET", `/tag/${id}`)

// 获取标签列表
export const getTagListAPI = (page?: Page) => {
    if (page) {
        return Request<Tag[]>("GET", `/tag?page=${page.page}&size=${page.size}`);
    } else {
        return Request<Tag[]>("GET", `/tag`);
    }
};

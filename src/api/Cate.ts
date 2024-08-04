import Request from '@/utils/request'

// 新增分类
export const addCateDataAPI = (data: Cate) => Request<Cate>("POST", "/cate", data)

// 删除分类
export const delCateDataAPI = (id: number) => Request<Cate>("DELETE", `/cate/${id}`)

// 修改分类
export const editCateDataAPI = (data: Cate) => Request<Cate>("PATCH", "/cate", data)

// 获取分类
export const getCateDataAPI = (id?: number) => Request<Cate>("GET", `/cate/${id}`)

// 获取评论列表
export const getCateListAPI = (page?: Page) => {
    if (page) {
        return Request<Paginate<Cate[]>>("GET", `/cate?page=${page.page}&size=${page.size}`);
    } else {
        return Request<Paginate<Cate[]>>("GET", `/cate`);
    }
};

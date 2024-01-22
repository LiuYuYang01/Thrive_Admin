import Request from '@/utils/Request'

// 新增评论
export const addCommentDataAPI = (data: Comment) => Request<Comment>("POST", "/comment", data)

// 删除评论
export const delCommentDataAPI = (id: number) => Request<Comment>("DELETE", `/comment/${id}`)

// 审核评论
export const auditCommentDataAPI = (id: number) => Request<Comment>("POST", `/comment/${id}`)

// 修改评论
export const editCommentDataAPI = (data: Comment) => Request<Comment>("PATCH", "/comment", data)

// 获取评论
export const getCommentDataAPI = (id?: number) => Request<Paginate<Comment>>("GET", `/comment/${id}`)

// 获取评论列表
export const getCommentListAPI = (page?: Page) => {
    if (page) {
        return Request<Paginate<Comment[]>>("GET", `/comment?page=${page.page}&size=${page.size}`);
    } else {
        return Request<Paginate<Comment[]>>("GET", `/comment`);
    }
};

import { instance } from '@/utils/Request'
import Request from '@/utils/Request'

// 新增文件
// export const addFileDataAPI = (data: File) => Request<File>("POST", "/file", data)

// 删除文件
export const delFileDataAPI = (id: number) => Request<File>("DELETE", `/file/${id}`)

// 修改文件
export const editFileDataAPI = (data: File) => Request<File>("PATCH", "/file", data)

// 获取文件
export const getFileDataAPI = (id?: number) => Request<Paginate<File>>("GET", `/file/${id}`)

// 获取文件列表
export const getFileListAPI = (page?: Page) => {
    if (page) {
        return Request<File[]>("GET", `/file?page=${page.page}&size=${page.size}`);
    } else {
        return Request<File[]>("GET", `/file`);
    }
};

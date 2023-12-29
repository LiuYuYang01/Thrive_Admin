export interface Response<T> {
    code: number,
    message: string
    data: T,
    paginate?: {
        page: number,
        size: number,
        total: number
    }
}
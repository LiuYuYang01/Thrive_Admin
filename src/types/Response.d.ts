interface Response<T> {
    code: number,
    message: string
    data: T
}

interface Paginate<T> {
    next: boolean,
    prev: boolean,
    page: number,
    size: number,
    pages: number,
    total: number,
    result: T
}
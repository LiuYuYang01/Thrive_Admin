interface Article {
    id?: number,
    title: string,
    description: string,
    content: string,
    cover: string,
    cids: number[],
    cate: string,
    tag: string,
    view?: number
    count?: number,
    createtime: Date,
}
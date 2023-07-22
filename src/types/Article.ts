export interface Article {
    id?: number,
    title: string,
    sketch: string,
    content: string,
    cover: string,
    cate: string,
    tag: string,
    view?: number
    count?: number,
    date: Date,
}
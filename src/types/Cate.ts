export interface Cate {
    id?: number,
    name: string,
    mark: string,
    url: string,
    icon: string,
    cid?: string,
    children?: Omit<Cate, "icon" | "cid">[]
}
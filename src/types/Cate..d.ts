interface Cate {
    id?: number,
    name: string,
    mark: string,
    url: string,
    icon: string,
    children?: Omit<Cate>[]
    checked?: boolean;
}
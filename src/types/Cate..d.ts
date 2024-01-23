interface Cate {
    id?: number,
    name: string,
    mark: string,
    url: string,
    icon: string,
    level: number,
    children?: Omit<Cate>[]
    checked?: boolean;
}
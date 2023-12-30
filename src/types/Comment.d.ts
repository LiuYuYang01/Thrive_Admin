interface Comment {
    aid: number,
    avatar: string,
    content: string,
    date: Date,
    email: string,
    id: number,
    name: string,
    rid: number,
    url: string,
    audit: number
}

interface Info {
    tab: string,
    loading: boolean,
    total: number,
    list: Comment[]
}
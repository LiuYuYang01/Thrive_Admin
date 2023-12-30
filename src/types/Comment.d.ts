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
    loading: boolean,
    total: number,
    list: Comment[]
}
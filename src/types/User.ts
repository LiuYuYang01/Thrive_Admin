export interface account {
    username: string,
    password: string,
    token: string,
    userInfo: UserInfo
}

export interface UserInfo {
    id?: number,
    name: string,
    qq: string,
    avatar: string,
    introduce: string,
    background: string,
    role?: string
}

export type User = account & UserInfo
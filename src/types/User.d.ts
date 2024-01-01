interface LoginForm {
    username: string,
    password: string
}

interface account {
    username: string,
    password: string,
    token: string,
    userInfo: UserInfo
}

interface UserInfo {
    id?: number,
    name: string,
    qq: string,
    avatar: string,
    introduce: string,
    background: string,
    role?: string
}

interface updateUser{
    username: string,
    oldPassword: string,
    newPassword: string
}

type User = account & UserInfo
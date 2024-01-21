interface Login {
    username: string,
    password: string
}

interface UserInfo {
    id?: number,
    name: string,
    email: string,
    avatar: string,
    info: string,
    role?: string
}

type User = Login & UserInfo

interface account {
    token: string,
    user: User
}

interface editUser {
    username: string,
    oldPassword: string,
    newPassword: string
}
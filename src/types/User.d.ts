interface LoginForm {
    username: string,
    password: string
}

interface account {
    token: string,
    user: User
}

interface User extends LoginForm{
    id?: number,
    name: string,
    email: string,
    avatar: string,
    info: string,
    role?: string
}

interface updateUser{
    username: string,
    oldPassword: string,
    newPassword: string
}
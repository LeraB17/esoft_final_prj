export interface IUserCreateData {
    nickname: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export interface IUserUpdateData {
    nickname: string;
    email: string;
    avatar: FileList;
    password: string;
    newPassword: string;
}

export interface IUserDeleteData {
    password: string;
}

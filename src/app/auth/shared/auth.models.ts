export interface ILoginCriteria {
    userName: string;
    password: string;
}

export interface IRecoverCriteria {
    userName: string;
}

export interface IAuthInfo {
    userName: string;
    token: string;
}
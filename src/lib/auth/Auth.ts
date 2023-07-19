import {PUBLIC_BACKEND_SERVER} from "$env/static/public";
import {writable} from "svelte/store";

export const authTtl = 1000 * 60 * 180;

export class Email {
    readonly username: string;
    readonly provider: string;
    constructor(rawEmail: any) {
        this.username = rawEmail.username;
        this.provider = rawEmail.provider
    }
    public static toPlainString(email: Email): string {
        return `${email.username}@${email.provider}`;
    }
}

export class UserInfo {
    readonly email: Email;
    readonly createdAt: string;
    readonly nickname: string;

    constructor(json: any) {
        this.email = new Email(json.email);
        this.createdAt = json.createdAt;
        this.nickname = json.nickName.value;
    }
}

export enum Status {
    Normal,
    NoCredential,
    DecryptError,
    NotExists,
    BackendServerError,
    UnknownError,
    NotInitiated
}

export class UserResponse {
    readonly status: Status;
    readonly statusMessage: string;
    readonly userInfo?: UserInfo;
    constructor(response?: Response, json?: any) {
        if (response?.status === 200){
            this.status = Status.Normal;
            this.statusMessage = "정상";
            this.userInfo = new UserInfo(json);
        } else if (response?.status === 400) {
            this.status = Status.BackendServerError;
            this.statusMessage = json.error;
        } else if (response?.status === 401) {
            this.status = Status.DecryptError;
            this.statusMessage = "token validation error";
        } else if (response?.status === 403) {
            this.status = Status.NotExists;
            this.statusMessage = "user not exists";
        } else if (response?.status === 404) {
            this.status = Status.NoCredential;
            this.statusMessage = "no credential info";
        } else if (response === undefined) {
            this.status = Status.NoCredential;
            this.statusMessage = "initiated";
        } else {
            this.status = Status.UnknownError;
            this.statusMessage = "unknown error!";
        }
        console.log(response, this.status, this.statusMessage);
    }
}
const getUserInfo = async() => {
    const response = await fetch(`${PUBLIC_BACKEND_SERVER}/user`, {credentials: 'include'});
    let resJson;
    try {
        resJson = await response.json();
    } catch (error) {
        resJson = {error: `failed to parse json`}
    }
    return new UserResponse(response, resJson);
}

const requestRemoveToken = async() => {
    const response = await fetch(`${PUBLIC_BACKEND_SERVER}/user/logout`, {credentials: 'include'})
    return response.status === 200;
}

const UserStore = () => {
    const { subscribe, set } = writable(new UserResponse(undefined, undefined));
    getUserInfo()
        .then(userResponse => set(userResponse));

    return {
        subscribe,
        refresh: () => {
            getUserInfo()
                .then(userResponse => set(userResponse))
        },
        logout: () => {
            requestRemoveToken()
                .then(isSuccess => {
                    if (isSuccess) set(new UserResponse(undefined, undefined))
                    else alert('로그아웃 실패! 토큰이 존재하지 않습니다.')
                })
        }
    }
}
export const userStore = UserStore();

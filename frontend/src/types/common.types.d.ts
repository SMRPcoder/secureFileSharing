export interface ResponseFromServer{
    message:string;
    status:boolean;
    data?:any;
    token?:string;
}

export interface UserSessionToken {
    id: string;
    username: string;
    firstName: string;
    lastName: string;
    iat: number;
    exp: number;
};
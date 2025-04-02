export interface ResponseFromServer{
    message:string;
    status:boolean;
    data?:any;
    count:number;
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
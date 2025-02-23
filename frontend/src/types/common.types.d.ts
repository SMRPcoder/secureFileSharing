export interface ResponseFromServer{
    message:string;
    status:boolean;
    data?:any;
    token?:string;
}
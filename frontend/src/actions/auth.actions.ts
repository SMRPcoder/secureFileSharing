"use server";
import { RegisterFormType } from "@/yups/auth/register.yup";
import $Axios from "../config/axios.config";
import { HandleError } from "../config/handleError.config";
import { LoginFormType } from "@/yups/auth/login.yup";
import { ResponseFromServer } from "@/types/common.types";
import { cookies } from "next/headers";
import $AuthAxios from "@/config/auth.axios.config";
import * as jwt from "jsonwebtoken";

export const RegisterUser = async (values: RegisterFormType):Promise<ResponseFromServer> => {
    try {
        const response = await $Axios.post<{ message: string; status: boolean; }>("/auth/register", values);
        return response.data as ResponseFromServer;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const LoginUser = async (values: LoginFormType):Promise<ResponseFromServer> => {
    const cookiestore=await cookies();
    try {
        const response = await $Axios.post<{ message: string; status: boolean; }>("/auth/login", values);
        const loginrespData= response.data as ResponseFromServer;
        if(loginrespData.status){
            cookiestore.set("token",loginrespData.token!);
        }
        return loginrespData;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const rejectInviteAction=async (id:string)=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.post<ResponseFromServer>("/invites/reject", {id});
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const deleteInvitation=async (id:string)=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.delete<ResponseFromServer>(`/invites/delete/${id}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const setPayload=async ()=>{
    const cookieStore = await cookies();
    const tokenValue=cookieStore.get("token");
    if(tokenValue){
        const payload=jwt.verify(tokenValue.value,process.env.JWT_SECRET!);
        cookieStore.set("ud_id",JSON.stringify(payload));
    }
}

export const logoutAction=async ()=>{
    const cookieStore = await cookies();
    const allCookies=cookieStore.getAll();
    for(let c of allCookies){
        cookieStore.delete(c.name);
    }
    return true;
}
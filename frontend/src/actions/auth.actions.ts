"use server";
import { RegisterFormType } from "@/yups/auth/register.yup";
import $Axios from "../config/axios.config";
import { HandleError } from "../config/handleError.config";
import { LoginFormType } from "@/yups/auth/login.yup";
import { ResponseFromServer } from "@/types/common.types";
import { cookies } from "next/headers";


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
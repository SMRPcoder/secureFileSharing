"use server";

import $AuthAxios from "@/config/auth.axios.config";
import { HandleError } from "@/config/handleError.config";
import { ResponseFromServer } from "@/types/common.types";
import { SendInviteFormType } from "@/yups/contacts/sentInvite.yup";
import { cookies } from "next/headers";

const getUserList=async ()=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get<ResponseFromServer>("/user/list");
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

const sendInvite = async (values: SendInviteFormType) => {
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.post<ResponseFromServer>("/invites/sent", values);
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

const addContactAction=async (id:string)=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.post<ResponseFromServer>("/contacts/add", {id});
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const viewAllContactAction=async ()=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get<ResponseFromServer>("/contacts/viewAll");
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    } 
}


export {getUserList,sendInvite,addContactAction};
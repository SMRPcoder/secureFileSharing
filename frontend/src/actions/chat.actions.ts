"use server";

import $AuthAxios from "@/config/auth.axios.config";
import { HandleError } from "@/config/handleError.config";
import { ResponseFromServer } from "@/types/common.types";
import { cookies } from "next/headers";


export const GetAllFilesAction = async (contactId: string) => {
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get<ResponseFromServer>(`/user/viewAllFiles/${contactId}`);
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const downloadFileAction = async (id: string) => {
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get(`/user/downloadFile/${id}`, {
            responseType: "arraybuffer", // Important: Receive response as a Blob
        });
        const base64String = Buffer.from(response.data, "binary").toString("base64");

        return base64String;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const SendFileAction=async (values:FormData)=>{
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AuthAxios(cookieStore);
        const response = await AuthAxiosInstance.post<ResponseFromServer>(`/user/uploadFile`,values);
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}
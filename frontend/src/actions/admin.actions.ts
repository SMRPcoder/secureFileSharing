"use server";

import $AdminAuthAxios from "@/config/admin.axios.config";
import { HandleError } from "@/config/handleError.config";
import { ResponseFromServer } from "@/types/common.types";
import { cookies } from "next/headers";

export const ViewAllUsersAction = async (page: number) => {
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AdminAuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get<ResponseFromServer>(`/admin/viewAllusers`, {
            params: {
                page
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}

export const ViewAllFilesAction = async (page: number) => {
    const cookieStore = await cookies();
    try {
        const AuthAxiosInstance = $AdminAuthAxios(cookieStore);
        const response = await AuthAxiosInstance.get<ResponseFromServer>(`/admin/viewAllfiles`, {
            params: {
                page
            }
        });
        return response.data;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}
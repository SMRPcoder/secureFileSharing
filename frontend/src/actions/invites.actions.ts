"use server";

import $AuthAxios from "@/config/auth.axios.config";
import { HandleError } from "@/config/handleError.config";
import { ResponseFromServer } from "@/types/common.types";
import { cookies } from "next/headers";


export const viewAllInvites = async () => {
    const cookieStore = await cookies();
    try {
        const axiosInstance=$AuthAxios(cookieStore);
        const allInvites=await axiosInstance.get("/invites/viewAll");
        return allInvites.data as ResponseFromServer;
    } catch (error) {
        console.log(error);
        return HandleError(error);
    }
}
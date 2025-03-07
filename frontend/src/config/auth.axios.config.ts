"use server";
import axios from "axios";
import { ReadonlyRequestCookies } from "next/dist/server/web/spec-extension/adapters/request-cookies";


const $AuthAxios = (cookieStore: ReadonlyRequestCookies) => {

    const token=cookieStore.get("token");
    if(token){
        return axios.create({
            baseURL: "http://localhost:3000",
            headers: {
                Authorization: `Bearer ${token.value}`
            }
        })
    }else{
        throw new Error("UnAuthorized!");
    }
    
};

export default $AuthAxios;
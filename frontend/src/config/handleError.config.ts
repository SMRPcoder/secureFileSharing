import { AxiosError } from "axios";
import type {ResponseFromServer} from "@/types/common.types";


export const HandleError=(error:any):ResponseFromServer=>{
    if (error instanceof AxiosError) {
        if (error.response) {
            const statusCode = error.response.status;
            
            if (statusCode === 400) {
                console.log("Bad Request: The server could not understand the request.");
                return error.response.data as ResponseFromServer;
            } else if (statusCode === 409) {
                console.log("Conflict: There is a conflict with the current state of the resource.");
                return error.response.data as ResponseFromServer;
            } else if (statusCode === 401) {
                console.log("UnAuthorized!!.");
                return error.response.data as ResponseFromServer;
            }else {
                console.log(`Error: Received status code ${statusCode}`);
                return {message:`Error Happend of statuscode: ${statusCode}`, status:false} as ResponseFromServer;
            }
        } else {
            console.log("No response received from the server.");
            return {message:`No response received from the server.`, status:false} as ResponseFromServer;
        }
    } else {
        console.log("An unexpected error occurred:", error.message);
        return {message:`An unexpected error occurred.`, status:false} as ResponseFromServer;
    }
}
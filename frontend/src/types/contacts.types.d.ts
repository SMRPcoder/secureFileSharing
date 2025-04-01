import { string } from "yup";

export interface ContactsType {
    id: string;
    userId: string;
    contactPersonId: string;
    createdAt: string;
    updatedAt: string;
    contact: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
    };
};


export interface ChatFileType {
    id: string;
    filePath: string;
    userId: string;
    sentTo: string;
    contactId: string;
    publicKey:string;
    privateKey:string;
    privateKeyIv:string;
    fileType:string;
}
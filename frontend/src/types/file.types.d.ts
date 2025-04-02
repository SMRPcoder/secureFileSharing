export interface IFileType{
    id: string;
    filePath: string;
    userId: string;
    sentTo: string;
    contactId: string;
    publicKey: string;
    privateKey: string;
    privateKeyIv: string;
    fileType: string;
    createdAt: string;
    updatedAt: string;
    file_sender: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
    file_receiver: {
        id: string;
        firstName: string;
        lastName: string;
        username: string;
        isActive: boolean;
        createdAt: string;
        updatedAt: string;
    };
}[];
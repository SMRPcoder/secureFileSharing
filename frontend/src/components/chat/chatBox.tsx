"use client";
import React, { ChangeEvent, useEffect, useRef, useState } from 'react'
import { FaCircleUser } from 'react-icons/fa6'
import { IoIosSend } from 'react-icons/io'
import DownloadCard from '../contacts/downloadCard'
import { ChatFileType, ContactsType } from '@/types/contacts.types'
import { GetAllFilesAction, SendFileAction } from '@/actions/chat.actions';
import Cookie from "js-cookie";
import { UserSessionToken } from '@/types/common.types'
import { BACKEND_STATIC_URL } from '@/constants';
import { GiFiles } from "react-icons/gi";
import { Notify } from 'notiflix';

export default function ChatBox({ selectedContact }: { selectedContact: ContactsType }) {
    const [chatFiles, setChatFiles] = useState<ChatFileType[]>([]);
    const [formValues, setFormValues] = useState<FormData | null>(null);
    const [chatRefresh, setChatRefresh] = useState<string>("");
    const userIdString = Cookie.get("ud_id");
    const fileInputRef = useRef<HTMLInputElement>(null);
    let userId: string;
    if (userIdString) {
        const UserJson: UserSessionToken = JSON.parse(userIdString);
        userId = UserJson.id;
    }

    // Utility: Convert ArrayBuffer to Base64
    function arrayBufferToBase64(buffer: ArrayBuffer) {
        const bytes = new Uint8Array(buffer);
        let binary = "";
        bytes.forEach((b) => (binary += String.fromCharCode(b)));
        return btoa(binary); // Encode as Base64
    }

    async function encryptFile(file: File) {
        const keyPair = await window.crypto.subtle.generateKey(
            {
                name: "ECDH",
                namedCurve: "P-256",
            },
            true,
            ["deriveKey"]
        );

        const publicKey = keyPair.publicKey;
        const privateKey = keyPair.privateKey;

        // Export public key to send along with file (for decryption later)
        const PublicKey = await window.crypto.subtle.exportKey("spki", publicKey);
        const exportedPublicKey = arrayBufferToBase64(PublicKey);
        const encryptedPrivateKey = await encryptPrivateKey(privateKey, selectedContact.contact.id);
        // Encrypt the file (ECC alone doesn't do direct encryption, so we use a derived AES key)
        const derivedKey = await deriveAESKey(privateKey, publicKey);
        const encryptedData = await encryptWithAES(derivedKey, file);
        Notify.info("File is Ready to Send!");
        return { encryptedData, exportedPublicKey, encryptedPrivateKey };
    }

    async function encryptPrivateKey(privateKey: CryptoKey, password: string) {
        const keyBuffer = await window.crypto.subtle.exportKey("pkcs8", privateKey);
        const passwordKey = await getPasswordKey(password);
        const iv = window.crypto.getRandomValues(new Uint8Array(12));

        const encryptedKey = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            passwordKey,
            keyBuffer
        );
        Notify.info("Private Key Encrypted!");
        return {
            encryptedKey: arrayBufferToBase64(encryptedKey),
            iv: arrayBufferToBase64(iv.buffer),
        };
    }

    // Generate AES key from password
    async function getPasswordKey(password: string) {
        const encoder = new TextEncoder();
        const keyMaterial = await window.crypto.subtle.importKey(
            "raw",
            encoder.encode(password),
            { name: "PBKDF2" },
            false,
            ["deriveKey"]
        );
        Notify.info("Prepared Password Key For PrivateKey Decrypt!");
        return window.crypto.subtle.deriveKey(
            {
                name: "PBKDF2",
                salt: new Uint8Array(16), // Use a random salt in production
                iterations: 100000,
                hash: "SHA-256"
            },
            keyMaterial,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async function deriveAESKey(privateKey: CryptoKey, publicKey: CryptoKey) {
        Notify.info("Derive AES Encryption for File!");
        return window.crypto.subtle.deriveKey(
            { name: "ECDH", public: publicKey },
            privateKey,
            { name: "AES-GCM", length: 256 },
            true,
            ["encrypt", "decrypt"]
        );
    }

    async function encryptWithAES(key: CryptoKey, file: File) {
        const iv = window.crypto.getRandomValues(new Uint8Array(12));
        const fileBuffer = await file.arrayBuffer();
        Notify.info("Encrypted File!");
        const encryptedBuffer = await window.crypto.subtle.encrypt(
            { name: "AES-GCM", iv },
            key,
            fileBuffer
        );

        return new Blob([iv, encryptedBuffer], { type: file.type });
    }

    const handleChangeFile = async (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const sentValues = new FormData();
            const { encryptedData, exportedPublicKey, encryptedPrivateKey } = await encryptFile(file);
            sentValues.append("file", encryptedData);
            sentValues.append("publicKey", exportedPublicKey);
            sentValues.append("privateKey", encryptedPrivateKey.encryptedKey);
            sentValues.append("privateKeyIv", encryptedPrivateKey.iv);
            sentValues.append("fileType",file.type);
            sentValues.append("contactId", selectedContact.id);
            sentValues.append("sentTo", selectedContact.contact.id);
            setFormValues(sentValues);
        }
    }

    const handleClearFile = () => {
        if (fileInputRef.current) {
            fileInputRef.current.value = ""; // Clear the file input
        }
    };

    const handleSent = async () => {
        if (formValues) {
            const SentResponse = await SendFileAction(formValues);
            if (SentResponse.status) {
                Notify.success(SentResponse.message);
                setChatRefresh(`${Date.now()}`);
                handleClearFile();
            } else {
                Notify.failure(SentResponse.message);
            }
        }
    }


    useEffect(() => {
        async function getAllFiles() {
            const allFilesResponse = await GetAllFilesAction(selectedContact.id);
            if (allFilesResponse.status) {
                setChatFiles(allFilesResponse.data);
            } else {
                setChatFiles([]);
            }
        }
        getAllFiles();
    }, [selectedContact, chatRefresh]);
    return (
        <div>
            {/* <!-- Chat Header --> */}
            <div className="bg-gray-300 p-4 text-gray-700 flex items-center gap-2">
                <FaCircleUser size={40} />
                <div className="text-2xl font-semibold">{selectedContact.contact.firstName}
                    <h4 className='text-sm italic font-thin' >offline</h4>
                </div>
            </div>

            {/* <!-- Chat Messages --> */}
            <div className="h-screen overflow-y-auto p-4 pb-36">
                <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-900 p-4 rounded-lg mb-4">
                    <p className="font-semibold">📌 Important Note</p>
                    <p className="text-sm">
                        Each file in this chat is <span className="font-bold">one-time view or download only</span>.
                        Please do not skip or cancel the download when prompted.
                    </p>
                </div>
                {(chatFiles.length == 0) && (
                    <div className='flex flex-col items-center gap-3 justify-center'>
                        <p className='font-bold italic text-[#4f46e5]'>Start Sending Files....</p>
                        <GiFiles color='#4f46e5' size={200} />
                    </div>
                )}
                {chatFiles && chatFiles.map((chatfile, index) => (
                    chatfile.userId == userId ? (
                        <div key={index} className="flex justify-end mb-4 cursor-pointer">
                            <div className="flex flex-col items-end max-w-96 text-white rounded-lg p-3">
                                <p className='italic font-thin text-sm text-black mx-5' >(you)</p>
                                {/* <p>Hi Alice! I'm good, just finished a great book. How about you?</p> */}
                                <DownloadCard
                                    selectedContact={selectedContact}
                                    downloadUrl={chatfile.filePath.replace("public", BACKEND_STATIC_URL)}
                                    fileData={{
                                        id: chatfile.id,
                                        setChatRefresh
                                    }}
                                    chatFile={chatfile}
                                    fileName={`new_file_${Date.now()}`} />
                            </div>
                            <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
                                <FaCircleUser className='w-8 h-8 rounded-full' />

                                {/* <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" /> */}
                            </div>
                        </div>
                    )
                        :
                        (
                            <div key={index} className="flex mb-4 cursor-pointer">
                                <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                                    <FaCircleUser className='w-8 h-8 rounded-full' />
                                    {/* <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
                                </div>
                                <div className="flex flex-col max-w-96 bg-white rounded-lg p-3">
                                    <p className='italic font-thin text-sm text-black' >{selectedContact.contact.firstName}</p>
                                    {/* <p className="text-gray-700">Hey Bob, how's it going?</p> */}
                                    <DownloadCard
                                        selectedContact={selectedContact}
                                        chatFile={chatfile}
                                        downloadUrl={chatfile.filePath.replace("public", BACKEND_STATIC_URL)}
                                        fileName={`new_file_${Date.now()}`}
                                        isTarget={true}
                                        fileData={{
                                            id: chatfile.id,
                                            setChatRefresh
                                        }}
                                    />
                                </div>
                            </div>
                        )
                ))}
            </div>

            {/* <!-- Chat Input --> */}
            <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
                <div className="flex items-center">
                    <input onChange={handleChangeFile} ref={fileInputRef} type="file" placeholder="Type a message..." className="w-full p-2 text-black rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                    <button onClick={handleSent} className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
                        <IoIosSend size={20} />
                    </button>
                </div>
            </div>
        </div>
    )
}

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

    const handleChangeFile = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files![0];
        if (file) {
            const sentValues = new FormData();
            sentValues.append("file", file);
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
            console.log(allFilesResponse);
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
                                <DownloadCard downloadUrl={chatfile.filePath.replace("public", BACKEND_STATIC_URL)} fileName={`new_file_${Date.now()}`} />
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
                                        downloadUrl={chatfile.filePath.replace("public", BACKEND_STATIC_URL)}
                                        fileName="New File"
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

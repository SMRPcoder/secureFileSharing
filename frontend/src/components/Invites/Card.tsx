"use client";
import { addContactAction, rejectInviteAction } from '@/actions/contact.actions';
import { Notify } from 'notiflix';
import React from 'react';
import { FaCheckCircle } from "react-icons/fa";
import { FaBan } from "react-icons/fa";
import { useRouter } from 'next/navigation';

export default function InvitesCard({ name, email,id }: { name: string; email: string; id:string; }) {
    const router=useRouter();
    const handleAddContact=(id:string)=>async ()=>{
        const addResponse=await addContactAction(id);
        if(addResponse.status){
            Notify.success(addResponse.message);
            router.refresh();
        }else{
            Notify.failure(addResponse.message);
        }
    }

    const handleRejectInvite=(id:string)=>async ()=>{
        const addResponse=await rejectInviteAction(id);
        if(addResponse.status){
            Notify.success(addResponse.message);
            router.refresh();
        }else{
            Notify.failure(addResponse.message);
        }
    }
    return (
        <>
            <div className="flex items-center p-3 bg-white rounded-md shadow-lg">
                <section className="flex justify-center items-center w-14 h-14 rounded-full shadow-md bg-gradient-to-r from-[#F9C97C] to-[#A2E9C1] hover:from-[#C9A9E9] hover:to-[#7EE7FC] hover:cursor-pointer hover:scale-110 duration-300">
                    <svg viewBox="0 0 15 15" className="w-7 fill-gray-700">
                        <path d="M7.5 0.875C5.49797 0.875 3.875 2.49797 3.875 4.5C3.875 6.15288 4.98124 7.54738 6.49373 7.98351C5.2997 8.12901 4.27557 8.55134 3.50407 9.31167C2.52216 10.2794 2.02502 11.72 2.02502 13.5999C2.02502 13.8623 2.23769 14.0749 2.50002 14.0749C2.76236 14.0749 2.97502 13.8623 2.97502 13.5999C2.97502 11.8799 3.42786 10.7206 4.17091 9.9883C4.91536 9.25463 6.02674 8.87499 7.49995 8.87499C8.97317 8.87499 10.0846 9.25463 10.8291 9.98831C11.5721 10.7206 12.025 11.8799 12.025 13.5999C12.025 13.8623 12.2376 14.0749 12.5 14.0749C12.7623 14.075 12.975 13.8623 12.975 13.6C12.975 11.72 12.4778 10.2794 11.4959 9.31166C10.7244 8.55135 9.70025 8.12903 8.50625 7.98352C10.0187 7.5474 11.125 6.15289 11.125 4.5C11.125 2.49797 9.50203 0.875 7.5 0.875ZM4.825 4.5C4.825 3.02264 6.02264 1.825 7.5 1.825C8.97736 1.825 10.175 3.02264 10.175 4.5C10.175 5.97736 8.97736 7.175 7.5 7.175C6.02264 7.175 4.825 5.97736 4.825 4.5Z">
                        </path>
                    </svg>
                </section>
                <section className="block border-l border-gray-300 m-3 overflow-hidden">
                    <div className="pl-3">
                        <h3 className="text-gray-600 font-semibold text-sm">{name}</h3>
                        <h3 className="bg-clip-text text-transparent whitespace-nowrap overflow-hidden text-ellipsis bg-gradient-to-l from-[#005BC4] to-[#27272A] text-lg font-bold">
                            {email}
                        </h3>
                    </div>
                    <div className="flex gap-3 pt-2 pl-3">
                        <FaCheckCircle onClick={handleAddContact(id)} className='p-0.5 w-5 h-5 hover:scale-125 duration-200 hover:cursor-pointer stroke-2 text-gray-400 hover:text-green-500' />
                        <FaBan onClick={handleRejectInvite(id)} className='p-0.5 w-5 h-5 hover:scale-125 duration-200 hover:cursor-pointer border-0 stroke-2 text-gray-400 hover:text-red-500' />
                    </div>
                </section>
            </div>
        </>
    )
}

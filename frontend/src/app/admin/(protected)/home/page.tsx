"use client";
import { ViewAllUsersAction } from '@/actions/admin.actions';
import React, { useEffect, useState } from 'react';
import { FaSearch } from "react-icons/fa";
import ViewUserTable from './_components/ViewUserTable';
import { IUserType } from '@/types/users.types';
import { Notify } from 'notiflix';

export default function Home() {

    const [userData,setUserData]=useState<IUserType[]>([]);
    const [dataCount,setDataCount]=useState<number>(0);
    const [page,setPage]=useState(1);

    useEffect(()=>{
        async function getAllUsers(){
            const userDataResponse=await ViewAllUsersAction(page);
            if(userDataResponse.status){
                setUserData(userDataResponse.data);
                setDataCount(userDataResponse.count);
            }else{
                Notify.failure(userDataResponse.message);
            }
        }
        getAllUsers();
    },[page])
    return (
        <div>

            <div className="max-w-[90%] h-full mt-10 mx-auto">
{/* 
                <div className="w-full flex justify-between items-center mb-3 mt-1 pl-3">
                    <div>
                        <h3 className="text-lg font-semibold text-slate-800">Projects with Invoices</h3>
                        <p className="text-slate-500">Overview of the current activities.</p>
                    </div>
                    <div className="ml-3">
                        <div className="w-full max-w-sm min-w-[200px] relative">
                            <div className="relative">
                                <input
                                    className="bg-white w-full pr-11 h-10 pl-3 py-2 bg-transparent placeholder:text-slate-400 text-slate-700 text-sm border border-slate-200 rounded transition duration-200 ease focus:outline-none focus:border-slate-400 hover:border-slate-400 shadow-sm focus:shadow-md"
                                    placeholder="Search for invoice..."
                                />
                                <button
                                    className="absolute h-8 w-8 right-1 top-1 my-auto px-2 flex items-center bg-white rounded "
                                    type="button"
                                >
                                    <FaSearch/>
                                </button>
                            </div>
                        </div>
                    </div>
                </div> */}

                <div className="relative flex flex-col w-full h-full overflow-scroll text-gray-700 bg-white shadow-md rounded-lg bg-clip-border">
                    <ViewUserTable userData={userData} dataCount={dataCount} currentPage={page} setPage={setPage} />
                </div>
            </div>
        </div>
    )
}

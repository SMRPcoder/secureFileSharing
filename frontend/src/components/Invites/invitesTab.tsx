"use client";
import Link from 'next/link';
import React, { useState } from 'react'

export default function InvitesTab() {
    const [currentTab,setCurrentTab]=useState<"received"|"sent">("received");
    const activeClass="inline-block w-full p-4 text-gray-900 bg-gray-100 border-r border-gray-200 dark:border-gray-700 rounded-s-lg focus:ring-4 focus:ring-blue-300 active focus:outline-none dark:bg-gray-700 dark:text-white";
    const normalClass="inline-block w-full p-4 bg-white border-r border-gray-200 dark:border-gray-700 hover:text-gray-700 hover:bg-gray-50 focus:ring-4 focus:ring-blue-300 focus:outline-none dark:hover:text-white dark:bg-gray-800 dark:hover:bg-gray-700"
    return (
        <>
            <div className="sm:hidden">
                <label htmlFor="tabs" className="sr-only">Invites</label>
                <select onChange={(e)=>setCurrentTab(e.currentTarget.value as "received"|"sent")} id="tabs" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500">
                    <option value="received" >Received</option>
                    <option value="sent" >Sent</option>
                </select>
            </div>
            <ul className="hidden text-sm font-medium text-center text-gray-500 rounded-lg shadow-sm sm:flex dark:divide-gray-700 dark:text-gray-400">
                <li className="w-full focus-within:z-10">
                    <Link href="?inviteType=received" onClick={()=>setCurrentTab("received")} className={currentTab=="received"?activeClass:normalClass}>Received</Link>
                </li>
                <li className="w-full focus-within:z-10">
                    <Link href="?inviteType=sent" onClick={()=>setCurrentTab("sent")} className={currentTab=="sent"?activeClass:normalClass}>Sent</Link>
                </li>
            </ul>

        </>
    )
}

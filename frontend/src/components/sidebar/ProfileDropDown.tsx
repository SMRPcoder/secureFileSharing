"use client";
import { logoutAction } from '@/actions/auth.actions';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { CgProfile } from 'react-icons/cg';
import Cookies from 'js-cookie';

export default function ProfileDropDown() {

    const [isDrop, setDrop] = useState(false);
    const [userName, setUserName] = useState("");
    const router = useRouter();

    const handleLogout = async () => {
        const isLoggedOut = await logoutAction();
        if (isLoggedOut) {
            router.push("/login")
        }
    }
    useEffect(() => {
        if (Cookies) {
            const userDataStr = Cookies.get("ud_id");
            if (userDataStr) {
                const userData = JSON.parse(userDataStr);
                setUserName(userData.firstName + (userData.lastName??""))
            }
        }
    }, [])
    return (
        <>


            <div className="relative font-[sans-serif] w-max mx-auto">
                {/* <button type="button" id="dropdownToggle"
        className="px-5 py-2.5 border border-gray-300 text-gray-800 text-sm outline-none bg-white hover:bg-gray-50">
        Dropdown menu
        <svg xmlns="http://www.w3.org/2000/svg" className="w-3 fill-gray-500 inline ml-3" viewBox="0 0 24 24">
          <path fill-rule="evenodd"
            d="M11.99997 18.1669a2.38 2.38 0 0 1-1.68266-.69733l-9.52-9.52a2.38 2.38 0 1 1 3.36532-3.36532l7.83734 7.83734 7.83734-7.83734a2.38 2.38 0 1 1 3.36532 3.36532l-9.52 9.52a2.38 2.38 0 0 1-1.68266.69734z"
            clip-rule="evenodd" data-original="#000000" />
        </svg>
      </button> */}
                <div className='flex justify-center items-center gap-3' >
                    <p className='text-black font-bold text-sm'>
                        {userName}
                    </p>
                    <button onClick={() => { setDrop(!isDrop); }} className='px-2 py-2 text-sm rounded-full font-bold text-gray-500 border-2 bg-transparent hover:bg-gray-50 transition-all ease-in-out duration-300'>
                        <CgProfile size={35} />
                    </button>
                </div>

                {isDrop && (
                    <ul id="dropdownMenu" className='absolute shadow-[0_8px_19px_-7px_rgba(6,81,237,0.2)] bg-white py-2 z-[1000] min-w-full w-max divide-y max-h-96 overflow-auto'>
                        <li onClick={handleLogout} className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>
                            logout
                        </li>
                        {/* <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>Cloth set</li>
                        <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>Sales details</li>
                        <li className='py-3 px-5 hover:bg-gray-50 text-gray-800 text-sm cursor-pointer'>Marketing</li> */}
                    </ul>
                )}

            </div>
        </>
    )
}

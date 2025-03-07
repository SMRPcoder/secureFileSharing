import React, { ReactNode } from 'react';
import { IoCloseSharp } from "react-icons/io5";

export default function Modal({ headerTitle, isOpen, setIsOpen, children }: { headerTitle: string, isOpen: boolean, setIsOpen: React.Dispatch<React.SetStateAction<boolean>>, children: ReactNode }) {
    return (
        <>
            <div id="authentication-modal" tabIndex={-1} aria-hidden="true" className={`${isOpen?"":"hidden"} ease-in overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full`}>
                <div className="relative inset-0 m-auto h-full flex items-center p-4 w-full max-w-md">
                    {/* <!-- Modal content --> */}
                    <div className="relative bg-white rounded-lg shadow-sm dark:bg-gray-700">
                        {/* <!-- Modal header --> */}
                        <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 border-gray-200">
                            <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                                {headerTitle}
                            </h3>
                            <button onClick={()=>setIsOpen(false)} type="button" className="end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="authentication-modal">
                               <IoCloseSharp/>
                                <span className="sr-only">Close modal</span>
                            </button>
                        </div>
                        {/* <!-- Modal body --> */}
                        <div className="p-4 md:p-5">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

import React from 'react';
import { TbMessage2Heart } from "react-icons/tb";

export default function NoChats() {
    return (
        <div>
            <div
                className="mt-8 group relative cursor-pointer overflow-hidden bg-white rounded-2xl px-6 pt-12 pb-10 shadow-2xl ring-1 ring-gray-900/5 transition-all duration-500 transform hover:scale-105 hover:shadow-3xl sm:mx-auto sm:max-w-sm sm:px-12"
            >
                <span
                    className="absolute top-0 left-0 z-0 h-32 w-32 rounded-full bg-gradient-to-r from-purple-500 to-blue-500 opacity-75 transition-all duration-500 transform group-hover:scale-[20]"
                ></span>
                <div className="relative z-10 mx-auto max-w-md">
                    <span
                        className="grid h-24 w-24 place-items-center rounded-full bg-gradient-to-r from-purple-500 to-blue-500 transition-all duration-500 transform group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-yellow-500"
                    >
                        <TbMessage2Heart className="h-12 w-12 text-white transition-all" />
                    </span>
                    <div
                        className="space-y-6 pt-6 text-lg leading-8 text-gray-700 transition-all duration-500 group-hover:text-white"
                    >
                        <p className="font-medium">
                            Elevate your experience with smoother and secure file Transfer,
                            Perfect for prototyping and sharing ideas in style.
                        </p>
                    </div>
                    <div className="pt-6 text-lg font-semibold leading-7">
                        <p>
                            <span className="text-purple-500 transition-all duration-500 group-hover:text-white">
                                Start Share Files →
                            </span>
                        </p>
                    </div>
                </div>
            </div>

        </div>
    )
}

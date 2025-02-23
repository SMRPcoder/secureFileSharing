import RegisterForm from '@/components/auth/Register';
import React from 'react';


export default function Register() {
    return (
        <div>
            <div className="font-[sans-serif] max-w-7xl mx-auto h-screen">
                <div className="grid md:grid-cols-2 items-center gap-8 h-full">
                    <RegisterForm/>

                    <div className="h-full md:py-6 flex items-center relative max-md:before:hidden before:absolute before:bg-gradient-to-r before:from-gray-50 before:via-[#E4FE66] before:to-[#55F5A3] before:h-full before:w-3/4 before:right-0 before:z-0">
                        <img src="https://readymadeui.com/photo.webp" className="rounded-md lg:w-4/5 md:w-11/12 z-50 relative" alt="Dining Experience" />
                    </div>
                </div>
            </div>
        </div>
    )
}

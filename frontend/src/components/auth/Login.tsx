"use client";
import { LoginUser } from '@/actions/auth.actions';
import LoginFormSchema, { LoginFormType } from '@/yups/auth/login.yup'
import { yupResolver } from '@hookform/resolvers/yup'
import Link from 'next/link'
import { Notify } from 'notiflix';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';
import { LuEyeClosed } from "react-icons/lu";
import { LuEye } from "react-icons/lu";

export default function LoginForm() {
    const {register,handleSubmit,formState:{errors}}=useForm<LoginFormType>({
        resolver:yupResolver(LoginFormSchema)
    });
    const router=useRouter();
    const [passwordShow,setPasswordShow]=useState<boolean>(false);

    const loginFormSubmit=async (values:LoginFormType)=>{
        console.log(values);
        try {
            const resp=await LoginUser(values);
            if(resp.status){
                Notify.success(resp.message);
                router.push("/home")
            }else{
                Notify.failure(resp.message);
            }
        } catch (error) {
            console.log(error);
            Notify.failure("Error Happend!");
        }
    }

    const passwordToggle=()=>{
        setPasswordShow(!passwordShow);
    }


    return (
        <>
            <form onSubmit={handleSubmit(loginFormSubmit)} className="space-y-4">
                <div className="mb-8">
                    <h3 className="text-gray-800 text-3xl font-bold">Sign in</h3>
                    <p className="text-gray-500 text-sm mt-4 leading-relaxed">Sign in to your account and explore a world of possibilities. Your journey begins here.</p>
                </div>

                <div>
                    <label className="text-gray-800 text-sm mb-2 block">User name</label>
                    <div className="relative flex items-center">
                        <input {...register("username")} type="text" required className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter user name" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 24 24">
                            <circle cx="10" cy="7" r="6" data-original="#000000"></circle>
                            <path d="M14 15H6a5 5 0 0 0-5 5 3 3 0 0 0 3 3h12a3 3 0 0 0 3-3 5 5 0 0 0-5-5zm8-4h-2.59l.3-.29a1 1 0 0 0-1.42-1.42l-2 2a1 1 0 0 0 0 1.42l2 2a1 1 0 0 0 1.42 0 1 1 0 0 0 0-1.42l-.3-.29H22a1 1 0 0 0 0-2z" data-original="#000000"></path>
                        </svg>
                    </div>
                    {errors.username?<span className='text-red-500' >{errors.username.message}</span>:""}
                </div>
                <div>
                    <label className="text-gray-800 text-sm mb-2 block">Password</label>
                    <div className="relative flex items-center">
                        <input {...register("password")} type={passwordShow?"text":"password"} required className="w-full text-sm text-gray-800 border border-gray-300 pl-4 pr-10 py-3 rounded-lg outline-blue-600" placeholder="Enter password" />  
                        {passwordShow?(
                            <LuEye onClick={passwordToggle} className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-500' />
                        ):(
                        <LuEyeClosed onClick={passwordToggle} className='w-[18px] h-[18px] absolute right-4 cursor-pointer text-gray-500' />
                        )}
                    </div>
                    {errors.password?<span className='text-red-500' >{errors.password.message}</span>:""}
                </div>

                <div className="flex flex-wrap items-center justify-between gap-4">
                    {/* <div className="flex items-center">
                        <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 shrink-0 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" />
                        <label htmlFor="remember-me" className="ml-3 block text-sm text-gray-800">
                            Remember me
                        </label>
                    </div> */}

                    <div className="text-sm">
                        <a href="#" className="text-blue-600 hover:underline font-semibold">
                            Forgot your password?
                        </a>
                    </div>
                </div>

                <div className="!mt-8">
                    <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide rounded-lg text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign in
                    </button>
                </div>

                <p className="text-sm !mt-8 text-center text-gray-500">Don't have an account 
                    <Link href="/register" className="text-blue-600 font-semibold hover:underline ml-1 whitespace-nowrap">Register here</Link>
                    </p>
            </form>
        </>
    )
}

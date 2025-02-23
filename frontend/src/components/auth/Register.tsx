"use client";
import Link from 'next/link';
import React from 'react';
import { IoPersonCircleSharp } from "react-icons/io5";
import {useForm} from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import RegisterFormSchema, { RegisterFormType } from '@/yups/auth/register.yup';
import { RegisterUser } from '@/actions/auth.actions';
import { Notify } from 'notiflix';

export default function RegisterForm() {

    const {register,handleSubmit,formState:{errors,isSubmitting,isLoading}}=useForm<RegisterFormType>({
        resolver:yupResolver(RegisterFormSchema)
    });

    const registerFormSubmit=async (values:RegisterFormType)=>{
        try {
            const resp=await RegisterUser(values);
            if(resp.status){
                Notify.success(resp.message);
            }else{
                Notify.failure(resp.message);
            }
        } catch (error) {
            console.log(error);
            Notify.failure("Error Happend!");
        }
    }
    return (
        <>
            <form onSubmit={handleSubmit(registerFormSubmit)} className="max-w-lg max-md:mx-auto w-full p-6">
                <div className="mb-6">
                    <h3 className="text-gray-800 text-4xl font-bold">Sign Up</h3>
                    <p className="text-gray-500 text-sm mt-6">Immerse yourself in a hassle-free SignUp journey. Effortlessly add your New account.</p>
                </div>
                <div>
                    <label className="text-gray-800 text-[15px] mb-2 block">First Name</label>
                    <div className="relative flex items-center">
                        <input {...register("firstName")} type="text" required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter first name" />
                        <IoPersonCircleSharp color='#bbb' className="w-[18px] h-[18px] absolute right-4" />
                    </div>
                    {errors.firstName?<span className='text-red-500' >{errors.firstName.message}</span>:""}
                </div>
                <div className="mt-4">
                    <label className="text-gray-800 text-[15px] mb-2 block">Last Name</label>
                    <div className="relative flex items-center">
                        <input {...register("lastName")} type="text" required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter last name" />
                        <IoPersonCircleSharp color='#bbb' className="w-[18px] h-[18px] absolute right-4" />
                    </div>
                    {errors.lastName?<span className='text-red-500' >{errors.lastName.message}</span>:""}
                </div>


                <div className="mt-4">
                    <label className="text-gray-800 text-[15px] mb-2 block">Email</label>
                    <div className="relative flex items-center">
                        <input {...register("username")} type="text" required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter email" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4" viewBox="0 0 682.667 682.667">
                            <defs>
                                <clipPath id="a" clipPathUnits="userSpaceOnUse">
                                    <path d="M0 512h512V0H0Z" data-original="#000000"></path>
                                </clipPath>
                            </defs>
                            <g clipPath="url(#a)" transform="matrix(1.33 0 0 -1.33 0 682.667)">
                                <path fill="none" strokeMiterlimit="10" strokeWidth="40" d="M452 444H60c-22.091 0-40-17.909-40-40v-39.446l212.127-157.782c14.17-10.54 33.576-10.54 47.746 0L492 364.554V404c0 22.091-17.909 40-40 40Z" data-original="#000000"></path>
                                <path d="M472 274.9V107.999c0-11.027-8.972-20-20-20H60c-11.028 0-20 8.973-20 20V274.9L0 304.652V107.999c0-33.084 26.916-60 60-60h392c33.084 0 60 26.916 60 60v196.653Z" data-original="#000000"></path>
                            </g>
                        </svg>
                    </div>
                    {errors.username?<span className='text-red-500' >{errors.username.message}</span>:""}

                </div>

                <div className="mt-4">
                    <label className="text-gray-800 text-[15px] mb-2 block">Password</label>
                    <div className="relative flex items-center">
                        <input {...register("password")} type="password" required className="w-full text-sm text-gray-800 bg-gray-100 focus:bg-transparent pl-4 pr-10 py-3 rounded-md border border-gray-100 focus:border-blue-600 outline-none transition-all" placeholder="Enter password" />
                        <svg xmlns="http://www.w3.org/2000/svg" fill="#bbb" stroke="#bbb" className="w-[18px] h-[18px] absolute right-4 cursor-pointer" viewBox="0 0 128 128">
                            <path d="M64 104C22.127 104 1.367 67.496.504 65.943a4 4 0 0 1 0-3.887C1.367 60.504 22.127 24 64 24s62.633 36.504 63.496 38.057a4 4 0 0 1 0 3.887C126.633 67.496 105.873 104 64 104zM8.707 63.994C13.465 71.205 32.146 96 64 96c31.955 0 50.553-24.775 55.293-31.994C114.535 56.795 95.854 32 64 32 32.045 32 13.447 56.775 8.707 63.994zM64 88c-13.234 0-24-10.766-24-24s10.766-24 24-24 24 10.766 24 24-10.766 24-24 24zm0-40c-8.822 0-16 7.178-16 16s7.178 16 16 16 16-7.178 16-16-7.178-16-16-16z" data-original="#000000"></path>
                        </svg>
                    </div>
                    {errors.password?<span className='text-red-500' >{errors.password.message}</span>:""}

                </div>

                <div className="mt-8">
                    <button type="submit" className="w-full shadow-xl py-2.5 px-4 text-sm tracking-wide font-semibold rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none">
                        Sign Up
                    </button>
                </div>
                <p className="text-sm mt-8 text-center text-gray-500">Already have an account? 
                    <Link href="/" className="text-blue-600 font-semibold tracking-wide hover:underline ml-1">Login here</Link>
                    </p>
            </form>
        </>
    )
}

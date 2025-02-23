"use server";
import React, { ReactNode } from 'react';
import { cookies } from 'next/headers';
import * as jwt from "jsonwebtoken";
import { redirect } from 'next/navigation';
import Header from '@/components/sidebar/Header';
import HeaderComponent from '@/components/sidebar/HeaderComponent';

export default async function HomeLayout({children}:{children:ReactNode}) {
    const cookiestore=await cookies();
    const tokenValue=cookiestore.get("token");
    if(tokenValue){
        const payload=jwt.verify(tokenValue.value,process.env.JWT_SECRET!);
        if(!payload){
            redirect("/404");
        }
    }else{
        redirect("/404");
    }
  return (
    <>
    <HeaderComponent/>
    {children}
    </>
  )
}

"use server";
import React, { ReactNode } from 'react';
import { cookies } from 'next/headers';
import * as jwt from "jsonwebtoken";
import { redirect } from 'next/navigation';

export default async function HomeLayout({children}:{children:ReactNode}) {
    const cookiestore=await cookies();
    const tokenValue=cookiestore.get("admin-token");
    if(tokenValue){
        const payload=jwt.verify(tokenValue.value,process.env.JWT_SECRET!);
        if(payload){
            redirect("/admin/home");
        }
    }
  return (
    <>
    {children}
    </>
  )
}

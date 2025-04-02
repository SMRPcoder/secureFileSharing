"use client";
import { setAdminPayload } from '@/actions/auth.actions';
import AdminHeaderComponent from '@/components/sidebar/AdminHeaderComponent';
import React, { useEffect } from 'react'

export default function layout({children}:{children:React.ReactNode}) {

    useEffect(()=>{
        async function set_token_payload(){
          await setAdminPayload();
        };
        set_token_payload();
      },[])
  return (
    <div>
        <AdminHeaderComponent/>
        {children}
    </div>
  )
}

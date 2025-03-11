"use client";
import { setPayload } from '@/actions/auth.actions'
import HomePage from '@/components/Home/HomePage'
import React, { useEffect } from 'react'

export default function Home() {
  useEffect(()=>{
    async function set_token_payload(){
      await setPayload();
    };
    set_token_payload();
  },[])
  return (
    <div>
        <HomePage/>
    </div>
  )
}

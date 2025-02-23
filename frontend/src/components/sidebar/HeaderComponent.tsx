"use client";
import React, { useState } from 'react'
import Header from './Header'
import Sidebar from './Sidebar'

export default function HeaderComponent() {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <>
    <Header isOpen={isOpen} setIsOpen={setIsOpen} />
    {isOpen&&(
    <Sidebar/>
    )}
    </>
  )
}

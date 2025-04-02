"use client";
import React, { useState } from 'react';
import Sidebar from './Sidebar'
import AdminHeader from './AdminHeader';

export default function AdminHeaderComponent() {
    const [isOpen,setIsOpen]=useState(false);
  return (
    <>
    <AdminHeader isOpen={isOpen} setIsOpen={setIsOpen} />
    {isOpen&&(
    <Sidebar/>
    )}
    </>
  )
}

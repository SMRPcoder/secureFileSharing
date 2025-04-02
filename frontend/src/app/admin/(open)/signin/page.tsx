"use client";
import LoginForm from "./_components/SigninForm";
import Image from "next/image";

export default function Home() {
  return (
    <div className="font-[sans-serif]">
    <div className="min-h-screen flex fle-col items-center justify-center py-6 px-4">
      <div className="grid md:grid-cols-2 items-center gap-6 max-w-6xl w-full">
        <div className="border border-gray-300 rounded-lg p-6 max-w-md shadow-[0_2px_22px_-4px_rgba(93,96,127,0.2)] max-md:mx-auto">
          <LoginForm/>
        </div>
        <div className="max-md:mt-8">
          <img src="https://readymadeui.com/login-image.webp" className="w-full aspect-[71/50] max-md:w-4/5 mx-auto block object-cover" alt="Dining Experience" />
        </div>
      </div>
    </div>
  </div>
  );
}

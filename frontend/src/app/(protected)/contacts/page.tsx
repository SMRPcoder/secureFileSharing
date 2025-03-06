import React from 'react';
import { HiPlus } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";

const ChatComponent = () => {
  // Sample data (replace with state or API data)

  return (
    <>
      {/* <!-- component --> */}
      <div className="flex h-[85vh] overflow-hidden">
        {/* <!-- Sidebar --> */}
        <div className="w-1/4 bg-white border-r border-gray-300">
          {/* <!-- Sidebar Header --> */}
          <div className="p-4 border-b border-gray-300 flex justify-between items-center bg-indigo-600 text-white">
            <h1 className="text-2xl font-semibold">Contacts</h1>
            <div className="relative">
              <button id="menuButton" className="focus:outline-none">
                <HiPlus size={25} />
              </button>
              {/* <!-- Menu Dropdown --> */}
              <div id="menuDropdown" className="absolute right-0 mt-2 w-48 bg-white border border-gray-300 rounded-md shadow-lg hidden">
                <ul className="py-2 px-3">
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 1</a></li>
                  <li><a href="#" className="block px-4 py-2 text-gray-800 hover:text-gray-400">Option 2</a></li>
                  {/* <!-- Add more menu options here --> */}
                </ul>
              </div>
            </div>
          </div>

          {/* <!-- Contact List --> */}
          <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
            <div className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
              <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
              <FaCircleUser className='w-12 h-12 rounded-full' />
                {/* <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" /> */}
              </div>
              <div className="flex-1">
                <h2 className="text-lg font-semibold text-black">Alice</h2>
                <p className="text-gray-600 text-sm font-thin italic">offline</p>
              </div>
            </div>


          </div>
        </div>

        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
          {/* <!-- Chat Header --> */}
          <div className="bg-gray-300 p-4 text-gray-700 flex items-center gap-2">
            <FaCircleUser size={40}/>
            <div className="text-2xl font-semibold">Alice
            <h4 className='text-sm italic font-thin' >offline</h4>
            </div>
          </div>

          {/* <!-- Chat Messages --> */}
          <div className="h-screen overflow-y-auto p-4 pb-36">
            {/* <!-- Incoming Message --> */}
            <div className="flex mb-4 cursor-pointer">
              <div className="w-9 h-9 rounded-full flex items-center justify-center mr-2">
                <FaCircleUser className='w-8 h-8 rounded-full' />
                {/* <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-8 h-8 rounded-full" /> */}
              </div>
              <div className="flex max-w-96 bg-white rounded-lg p-3 gap-3">
                <p className="text-gray-700">Hey Bob, how's it going?</p>
              </div>
            </div>

            {/* <!-- Outgoing Message --> */}
            <div className="flex justify-end mb-4 cursor-pointer">
              <div className="flex max-w-96 bg-indigo-500 text-white rounded-lg p-3 gap-3">
                <p>Hi Alice! I'm good, just finished a great book. How about you?</p>
              </div>
              <div className="w-9 h-9 rounded-full flex items-center justify-center ml-2">
              <FaCircleUser className='w-8 h-8 rounded-full' />

                {/* <img src="https://placehold.co/200x/b7a8ff/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="My Avatar" className="w-8 h-8 rounded-full" /> */}
              </div>
            </div>
          </div>

          {/* <!-- Chat Input --> */}
          <div className="bg-white border-t border-gray-300 p-4 absolute bottom-0 w-3/4">
            <div className="flex items-center">
              <input type="file" placeholder="Type a message..." className="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
              <button className="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">
              <IoIosSend size={20}/>
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatComponent;
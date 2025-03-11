"use client";
import React, { useEffect, useState } from 'react';
import { HiPlus } from "react-icons/hi";
import { FaCircleUser } from "react-icons/fa6";
import { IoIosSend } from "react-icons/io";
import Modal from '@/components/modals/Modal';
import ContactAddForm from '@/components/contacts/contactAddForm';
import { getUserList, viewAllContactAction } from '@/actions/contact.actions';
import { Notify } from 'notiflix';
import NoData from '@/components/common/NoData';
import NoChats from '@/components/common/NoChats';
import DownloadCard from '@/components/contacts/downloadCard';
import { ContactsType } from '@/types/contacts.types';
import ChatBox from '@/components/chat/chatBox';

interface UserListType {
  id: string; username: string;
}


const ChatComponent = () => {
  // Sample data (replace with state or API data)
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [userList, setUserList] = useState<{ id: string; username: string; }[]>([]);
  const [allContacts, setAllContacts] = useState<ContactsType[]>([]);
  const [selectedContact, setSelectedContact] = useState<ContactsType | null>(null);

  useEffect(() => {
    async function ToGetList() {
      if (userList.length == 0) {
        const UserListResponse = await getUserList();
        // console.log(UserListResponse);
        if (UserListResponse.status) {
          setUserList(UserListResponse.data as UserListType[])
        } else {
          Notify.failure(UserListResponse.message);
        }
      }
    }
    ToGetList();
  }, [isOpen]);

  useEffect(() => {
    async function GetAllContacts() {
      const allContactsResponse = await viewAllContactAction();
      if (allContactsResponse.status) {
        console.log(allContactsResponse.data);
        setAllContacts(allContactsResponse.data as ContactsType[]);
      } else {
        Notify.failure(allContactsResponse.message);
      }
    }
    GetAllContacts();
  }, []);

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
              <button onClick={() => setIsOpen(true)} id="menuButton" className="focus:outline-none">
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
          {allContacts.length > 0 ? (
            <>
              <div className="overflow-y-auto h-screen p-3 mb-9 pb-20">
                {allContacts.map((contactMember, index) => (
                  <div onClick={() => setSelectedContact(contactMember)} key={index} className="flex items-center mb-4 cursor-pointer hover:bg-gray-100 p-2 rounded-md">
                    <div className="w-12 h-12 bg-gray-300 rounded-full mr-3">
                      <FaCircleUser className='w-12 h-12 rounded-full' />
                      {/* <img src="https://placehold.co/200x/ffa8e4/ffffff.svg?text=ʕ•́ᴥ•̀ʔ&font=Lato" alt="User Avatar" className="w-12 h-12 rounded-full" /> */}
                    </div>
                    <div className="flex-1">
                      <h2 className="text-lg font-semibold text-black">{contactMember.contact.firstName + contactMember.contact.lastName}</h2>
                      <p className="text-gray-600 text-sm font-thin italic">offline</p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          ) : (
            <></>
          )}

        </div>

        {/* <!-- Main Chat Area --> */}
        <div className="flex-1">
          {selectedContact ? (
           <ChatBox selectedContact={selectedContact} />
          ) : (
            <NoChats />
          )}

        </div>
      </div>
      <Modal headerTitle='Add Contacts' isOpen={isOpen} setIsOpen={setIsOpen} >
        <ContactAddForm userList={userList} />
      </Modal>
    </>
  );
};

export default ChatComponent;
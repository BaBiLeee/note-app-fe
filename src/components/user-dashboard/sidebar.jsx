'use client';
import React from 'react';
import { ImExit } from 'react-icons/im';
import { IoBookOutline } from 'react-icons/io5';
import { PiExam } from 'react-icons/pi';
import { FaRegUser } from "react-icons/fa";
import Cookies from 'js-cookie';
const SidebarUser = ({ selectedTab, setSelectedTab }) => {
  const tabs = [
    { icon: FaRegUser, label: 'Information' },
    { icon: IoBookOutline, label: 'Note' },
    { icon: PiExam, label: 'Shared with me' },
    { icon: PiExam, label: 'Shared by me' },
  ];
  const handleClick = () => {
    Cookies.remove('token')
  }
  return (
    <div className="col-span-1 flex flex-col items-center bg-white shadow-lg rounded-xl p-4 h-full">
      <img
        className="rounded-full w-[150px] border-gray-900 border-2 border-spacing-2 border-dotted"
        src="https://picsum.photos/200"
        alt="avatar"
      />
      <div className="font-bold text-2xl mt-4">Le Truong</div>
      <hr className="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
      
      <div className="flex flex-col items-center w-full">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(item.label)}
            className={`w-full p-3 my-2 flex items-center cursor-pointer rounded-lg transition-colors duration-200 ease-in-out ${
              selectedTab === item.label
                ? 'bg-indigo-100 text-indigo-800 border-l-4 border-indigo-500 font-semibold shadow-lg'
                : 'text-gray-600 hover:bg-gray-100'
            }`}
          >
            <item.icon className="mr-3" />
            {item.label}
          </div>
        ))}
      </div>
      
      <div className="text-gray-700 font-semibold my-2 cursor-pointer hover:text-gray-900 mt-4">
        <a href="/login" onClick = {() => handleClick()}>
          <ImExit className="inline mr-2" />
          Exit
        </a>
      </div>
    </div>
  );
};

export default SidebarUser;

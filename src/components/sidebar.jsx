'use client';
import React, { useState } from 'react';
import { ImExit } from 'react-icons/im';
import { IoBookOutline } from 'react-icons/io5';
import { PiExam } from 'react-icons/pi';
import { FaRegUser } from "react-icons/fa";

const Sidebar = ({ selectedTab, setSelectedTab }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const handleLogout = () => {
    window.location.href = '/login';
  };

  const tabs = [
    { icon: FaRegUser, label: 'User' },
    { icon: IoBookOutline, label: 'Note' },
    { icon: PiExam, label: 'Group' },
  ];

  return (
    <div
      onMouseEnter={() => setIsExpanded(true)}
      onMouseLeave={() => setIsExpanded(false)}
      className={`fixed h-full flex flex-col justify-between items-start z-10 shadow-md bg-[#a8cef6] ${
        isExpanded ? 'w-40' : 'w-20'
      } transition-all duration-100 rounded-r-xl`}
    >
      <div className="pl-[10px] pt-10 space-y-2">
        {tabs.map((item, index) => (
          <div
            key={index}
            onClick={() => setSelectedTab(item.label)} // Gọi hàm setSelectedTab khi nhấn vào tab
            className={`flex items-center space-x-2 cursor-pointer w-full ${
              selectedTab === item.label
                ? 'bg-indigo-50 text-indigo-700 border-l-4 border-indigo-700'
                : 'text-[#477C9E] border-transparent'
            } ${isExpanded ? 'w-44' : 'w-20'}
             hover:text-indigo-700 hover:bg-indigo-50 hover:border-l-4 transition-all duration-100 p-2 py-3 rounded-r-lg`}
          >
            <item.icon size={32} />
            <span
              className={`transition-all duration-100 font-bold ${
                isExpanded ? 'opacity-100 max-w-xs' : 'opacity-0 max-w-0'
              } overflow-hidden`}
            >
              {item.label}
            </span>
          </div>
        ))}
      </div>
      <div className="pl-[10px] pb-4">
        <div
          onClick={handleLogout}
          className={`cursor-pointer ${
            selectedTab === 'Logout'
              ? 'bg-indigo-100 text-indigo-700 border-l-4 border-indigo-700'
              : 'text-[#477C9E] border-transparent'
          } hover:text-indigo-700 hover:bg-indigo-50 hover:border-l-4 transition-all duration-200 p-3 rounded-lg`}
        >
          <ImExit size={32} />
        </div>
      </div>
    </div>
  );
};

export default Sidebar;

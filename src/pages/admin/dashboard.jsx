'use client';
import React, { useState } from 'react';
import UserDashboard from '../../components/admin-dashboard/user';
import Sidebar from '../../components/admin-dashboard/sidebar';
import NoteDashboard from '../../components/admin-dashboard/note';

const DashBoard = () => {
  const [selectedTab, setSelectedTab] = useState('User');

  return (
    <div className="flex">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="ml-20 p-4 flex-1">
        {selectedTab === 'User' && <UserDashboard />}
        {selectedTab === 'Note' && <NoteDashboard />}
      </div>
    </div>
  );
};

export default DashBoard;

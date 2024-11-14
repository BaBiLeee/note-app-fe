'use client';
import React, { useState } from 'react';
import Sidebar from '../../components/sidebar';
import UserDashboard from '../../components/user-dashboard';
import NoteDashboard from '../../components/note-dashboard';
import GroupDashboard from '../../components/group-dashboard';

const DashBoard = () => {
  const [selectedTab, setSelectedTab] = useState('User');

  return (
    <div className="flex">
      <Sidebar selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
      <div className="ml-20 p-4 flex-1">
        {selectedTab === 'User' && <UserDashboard />}
        {selectedTab === 'Note' && <NoteDashboard />}
        {selectedTab === 'Group' && <GroupDashboard />}
      </div>
    </div>
  );
};

export default DashBoard;

import React from 'react';
import { Outlet } from 'react-router-dom';
import TapBar from './TapBar';

const MainContent = ({ setSidebarOpen }) => {
  return (
    <div className="">
      <TapBar setSidebarOpen={setSidebarOpen} />

      <main className="py-10">
        {/* px-4 sm:px-6 lg:px-8 */}
        <div className="">
          {/* Content */}
          <Outlet />
        </div>
      </main>
    </div>
  );
};

export default MainContent;

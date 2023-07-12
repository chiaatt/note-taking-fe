import { useState } from 'react';
import MainContent from './MainContent';
import Sidebar from './Sidebar';

export default function Dashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div>
      {/* <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      /> */}
      <MainContent setSidebarOpen={setSidebarOpen} />
    </div>
  );
}

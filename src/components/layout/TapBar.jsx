import React, { useEffect, useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';

const TapBar = ({ setSidebarOpen }) => {
   const navigate = useNavigate();

   const [user, setUser] = useState();

   useEffect(() => {
    if (localStorage) {
      const token = localStorage.getItem("auth_token");
      setUser(token);
    }
   }, [user])

  return (
    <div className="sticky top-0 z-40 flex h-16 shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:px-8">
      <button type="button" className="-m-2.5 p-2.5 text-gray-700 lg:hidden" onClick={() => setSidebarOpen(true)}>
        <span className="sr-only">Open sidebar</span>
        <Bars3Icon className="h-6 w-6" aria-hidden="true" />
      </button>

      {/* Separator */}
      <div className="h-6 w-px bg-gray-200 lg:hidden" aria-hidden="true" />

      <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6">
        {/*  Left side  */}
        
        <div className="flex items-center gap-x-4 lg:gap-x-6"></div>
        {/* right side */}
      </div>
      {!user && <button type="button" className="btn btn-primary"
          aria-expanded="true"
          aria-haspopup="true" onClick={() => navigate("/login")}>
          Login
      </button>}
      {user && <button type="button" className="btn btn-primary"
          aria-expanded="true"
          aria-haspopup="true" 
          onClick={() => { 
              localStorage.removeItem("auth_token");
              setUser(); 
              navigate("/");
            }}>
          Logout
      </button>
    }

    </div>
  );
};

export default TapBar;

import React, { useEffect, useState } from 'react';

import { Bars3Icon } from '@heroicons/react/24/outline';
import { useNavigate } from 'react-router-dom';
import { NavLink } from 'react-router-dom';

const TapBar = ({ setSidebarOpen }) => {
  const navigate = useNavigate();

  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkUserToken = () => {
    const userToken = localStorage.getItem('auth_token');

    if (!userToken || userToken === 'undefined' || userToken === 'null' || userToken === null) {
      setIsLoggedIn(false);
    } else {
      setIsLoggedIn(true);
    }
  }

  useEffect(() => {
    checkUserToken();
  }, [isLoggedIn]);

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

        <div className="flex items-center gap-x-4 lg:gap-x-6">
          <ul> 
            <li>
             <NavLink to={'notes'} className={'inline-block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold '}>Notes</NavLink>
           </li>
          </ul>
          <ul> 
            <li>
              <NavLink to={'notes/new'} className={' inline-block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}>New Note</NavLink>
            </li>
          </ul>
          <ul>
            <li>
              <NavLink to={'notes/search'} className={'inline-block text-gray-700 hover:text-indigo-600 hover:bg-gray-50 group gap-x-3 rounded-md p-2 text-sm leading-6 font-semibold'}>Filter</NavLink>
            </li>
          </ul>
        </div>
        {/* right side */}
      </div>
      {!isLoggedIn && <button type="button" className="btn btn-primary"
        aria-expanded="true"
        aria-haspopup="true" onClick={() => navigate("/login")}>
        Login
      </button>}
      {isLoggedIn && <button type="button" className="btn btn-primary"
        aria-expanded="true"
        aria-haspopup="true"
        onClick={() => {
          localStorage.removeItem("auth_token");
          setIsLoggedIn(false);
          navigate("/login");
        }}>
        Logout
      </button>
      }

    </div>
  );
};

export default TapBar;

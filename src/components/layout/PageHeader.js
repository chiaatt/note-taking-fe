import React from 'react';
import { Link } from 'react-router-dom'; 

const PageHeader = ({ title, buttonName, buttonPath, handleClick, children, ...props }) => {
  const classNames = `py-3 px-5 leading-5 text-gray-700 dark:text-gray-300 hover:text-indigo-500 rounded-t
    sm:w-auto w-100 sm:basis-auto basis-full font-bold`;

  return (
    <nav className="mx-auto dark:bg-opacity-70 dark:bg-slate-900 mb-6 dark:shadow-lg dark:shadow-theme_background">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-base font-semibold leading-6 text-gray-900">{title || ''}</h1>
        </div>

        {children && children}
        {buttonName && (
          <>
            {handleClick && (
              <button 
                className="btn-primary"  
                aria-expanded="true"
                aria-haspopup="true"
                onClick={handleClick}
              >
                {(buttonName && buttonName) || 'Dropdown'}
              </button>
            )}

            {buttonPath && (
              <Link to={buttonPath} className="btn-main">
                <button 
                  className="btn btn-primary"  
                  aria-expanded="true"
                  aria-haspopup="true"
                >
                  {(buttonName && buttonName) || 'Dropdown'}
                </button>
              </Link>
            )}
          </>
        )}
 
      </div>
    </nav>
  );
};

export default PageHeader;

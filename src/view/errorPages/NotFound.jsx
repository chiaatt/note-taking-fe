import React from 'react';
import { Link } from 'react-router-dom'; 

const NotFound = () => { 
  return (
    <div className="not-found flex flex-col justify-center items-center text-center mt-24">
      <p className="mt-3 mb-6 md:text-5xl text-3xl font-bold">Page Not Found!</p>
      <p className="text-slate-400">
        Whoops, this is embarassing. <br /> Looks like the page you were looking for wasn't found.
      </p>

      <Link
        to="/"
        className=" mt-6 inline-flex items-center px-2.5 py-1.5 border border-transparent text-xs font-medium rounded-md text-indigo-700 bg-indigo-100 hover:bg-indigo-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      >
        Back to Home
      </Link>
    </div>
  );
};

export default NotFound;

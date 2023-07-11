import React from 'react';

const MainContainer = ({ children }) => {
  return (
    <div className="mx-auto max-w-7xl flex-wrap items-center gap-6 px-4 sm:px-6">
      {children}
    </div>
  );
};

export default MainContainer;

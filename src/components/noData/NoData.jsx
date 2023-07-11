import React from 'react';
import { Link } from 'react-router-dom';

const NoData = ({ createNewPath }) => {
  return (
    <tr className="table-tr-odd">
      <th className="py-3" colSpan={3}>
        <div className="flex flex-col flex-wrap justify-center items-center gap-2">
          <p className="text-center text-base">It looks like you don't have any data yet.</p>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-600 pt-3 mt-2">
          <div className="flex justify-center">
            <span className="inline-flex rounded-md">
              <span className="inline-flex rounded-md shadow-sm">
                <Link to={createNewPath ? createNewPath : ''} className="btn-main !text-sm">
                  Create New
                </Link>
              </span>
            </span>
          </div>
        </div>
      </th>
    </tr>
  );
};

export default NoData;

import NoData from 'components/noData/NoData';
import React, { useState } from 'react';
import { BiEditAlt, BiTrash } from 'react-icons/bi';

const Table = ({ list, titleList, onUpdateClick, onDeleteClick }) => {
  const [colSpan] = useState(Object.keys(list?.length > 0 && list[0]).length + 1);
  const renderTableTitles = () => {
    return (
      <tr>
        {titleList.map((item) => {
          return <th> {item} </th>;
        })}
      </tr>
    );
  };

  const renderTableRows = () => {
    return list?.map((row, index) => {
      const filteredByKey = Object.fromEntries(Object.entries(row).filter(([key, value]) => key !== 'relatedId'));

      let columns = Object.values(filteredByKey);
      return (
        <tr key={index}>
          {columns.map((column, columnIndex) => {
            return (
              columnIndex !== 0 && (
                <td key={columnIndex}>
                  <b className="inline md:hidden">{titleList[columnIndex - 1]} </b>
                  {column}
                </td>
              )
            );
          })}
          {onDeleteClick && onUpdateClick && 
            <td className="text-right" width={'100'}>
              <span className="flex text-xl ">
                <button className="btn btn-basic !text-green-700 mr-3 md:mr-3" onClick={() => onUpdateClick(row)}>
                  <BiEditAlt className="" />
                </button>

                <button
                  className="btn btn-basic !text-red-700"
                  onClick={() =>
                    onDeleteClick(row)
                  }
                >
                  <BiTrash />
                </button>
              </span>
            </td>
          }
        </tr>
      );
    });
  };

  return (
    <table>
      <thead>{titleList ? renderTableTitles() : <NoData colSpan={colSpan} />}</thead>
      <tbody>{list ? renderTableRows() : <NoData colSpan={colSpan} />}</tbody>
    </table>
  );
};

export default Table;

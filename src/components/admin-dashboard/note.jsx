import React from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import { useGetNoteDataQuery } from "../../api/note/noteApi";
import Cookies from "js-cookie";
  
const NoteDashboard = () => {
  const token = Cookies.get('token');
  const {data} = useGetNoteDataQuery({accessToken: token})
  console.log(data);
  return (
    <div className="h-screen flex flex-col items-center w-full">
      <div className="w-5/6 flex flex-col">
        <input
          placeholder="Search note by title..."
          className="border border-gray-200 p-2 rounded-md w-60 mb-10"
          // onKeyDown={handleKeyPress}
        />
        <table className="min-w-full bg-white border border-gray-200 rounded-lg">
          <thead>
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                owner id
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                title
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Created at
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Updated at
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {data?.data.map((note, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-gray-900">
                  {note.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  {note.user}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {note.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {note.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {note.created_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {note.updated_at}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex space-x-2 items-end">
                    <TiPencil size={20} />
                    <a
                      // onClick={() => handleClick(user.id)}
                      className="text-indigo-600 hover:text-indigo-900 cursor-pointer"
                    >
                      Edit
                    </a>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="flex justify-center items-center my-5">
          <button
            // disabled={currentPage === 1}
            // onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            className="mx-2"
          >
            <IoIosArrowDropleft
              size={30}
              className="cursor-pointer rounded-full hover:bg-gray-200"
            />
          </button>

          {/* <div className="flex space-x-2">
            {paginationNumbers().map((page, index) =>
              typeof page === "number" ? (
                <button
                  key={index}
                  onClick={() => setCurrentPage(page)}
                  className={`px-3 py-1 ${
                    currentPage === page ? "text-purple-900 underline" : ""
                  }`}
                >
                  {page}
                </button>
              ) : (
                <span key={index} className="px-3 py-1">
                  ...
                </span>
              )
            )}
          </div> */}

          {/* <button
            disabled={currentPage === totalPages}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            className="mx-2"
          >
            <IoIosArrowDropright
              size={30}
              className="cursor-pointer rounded-full hover:bg-gray-200"
            />
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default NoteDashboard;

import React from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
const currentData = [
    {
      id: 1,
      ownerId: "https://via.placeholder.com/80", // Đường dẫn hình ảnh
      groupId: 1001,
      type: "Personal",
      title: "My First Note",
      createdAt: "2024-01-01 10:00:00",
      updatedAt: "2024-01-02 15:00:00",
    },
    {
      id: 2,
      ownerId: "https://via.placeholder.com/80",
      groupId: 1002,
      type: "Work",
      title: "Project Plan",
      createdAt: "2024-01-05 09:30:00",
      updatedAt: "2024-01-06 14:45:00",
    },
    {
      id: 3,
      ownerId: "https://via.placeholder.com/80",
      groupId: 1003,
      type: "Study",
      title: "Django Tutorial",
      createdAt: "2024-01-10 12:15:00",
      updatedAt: "2024-01-11 17:30:00",
    },
    {
      id: 4,
      ownerId: "https://via.placeholder.com/80",
      groupId: 1004,
      type: "Personal",
      title: "Shopping List",
      createdAt: "2024-01-12 08:00:00",
      updatedAt: "2024-01-13 16:20:00",
    },
    {
      id: 5,
      ownerId: "https://via.placeholder.com/80",
      groupId: 1005,
      type: "Work",
      title: "Meeting Notes",
      createdAt: "2024-01-15 11:00:00",
      updatedAt: "2024-01-16 18:30:00",
    },
  ];
  

const NoteDashboard = () => {
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
                owner
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Group id
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
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentData.map((note, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-gray-900">
                  {note.id}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img src={note.ownerId} alt="img" className="w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${note.groupId}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {note.type}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {note.title}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {note.createdAt}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {note.updatedAt}
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

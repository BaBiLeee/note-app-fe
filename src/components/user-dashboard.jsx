import React from "react";
import { IoIosArrowDropleft } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
const currentData = [
  {
    username: "johndoe",
    coverImage: "https://via.placeholder.com/80",
    price: 49.99,
    language: "English",
    category: {
      categoryName: "Technology"
    },
    status: true,
  },
  {
    username: "janedoe",
    coverImage: "https://via.placeholder.com/80",
    price: 59.99,
    language: "French",
    category: {
      categoryName: "Health"
    },
    status: false,
  },
  {
    username: "alexsmith",
    coverImage: "https://via.placeholder.com/80",
    price: 39.99,
    language: "Spanish",
    category: {
      categoryName: "Finance"
    },
    status: true,
  },
  {
    username: "emilywhite",
    coverImage: "https://via.placeholder.com/80",
    price: 29.99,
    language: "German",
    category: {
      categoryName: "Education"
    },
    status: false,
  },
  {
    username: "mikejohnson",
    coverImage: "https://via.placeholder.com/80",
    price: 19.99,
    language: "Japanese",
    category: {
      categoryName: "Design"
    },
    status: true,
  },
];

const UserDashboard = () => {
  return (
    <div className="h-screen flex flex-col items-center w-full">
      <div className="w-5/6 flex flex-col">
        <button className="font-bold text-white text-sm bg-blue-600 py-2 w-36 rounded-lg hover:bg-blue-700 mb-2">
          <a href="/instructor/create-course">Create New user</a>
        </button>
        <input
          placeholder="Search user by name..."
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
                Username
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Full name
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                email
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                active
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white">
            {currentData.map((user, index) => (
              <tr
                key={index}
                className="cursor-pointer hover:-translate-y-2 transition duration-150 hover:bg-gray-100"
              >
                <td className="px-6 py-4 whitespace-nowrap text-xl font-bold text-gray-900">
                  {user.username}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                  <img src={user.coverImage} alt="img" className="w-20" />
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  ${user.price}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.language}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {user.category.categoryName}
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      user.status === true
                        ? "bg-green-500 text-white"
                        : "bg-gray-800 text-white"
                    }`}
                  >
                    {user.status === true ? "Active" : "Inactive"}
                  </span>
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

export default UserDashboard;

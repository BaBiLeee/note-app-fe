import React, { useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import { useGetNoteDataQuery } from "../../api/note/noteApi";
import Cookies from "js-cookie";

const NoteDashboard = () => {
  const token = Cookies.get("token");
  const { data, isLoading } = useGetNoteDataQuery({ accessToken: token });
  
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  // Filter notes based on the search term
  const filteredNotes = data?.data.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil((filteredNotes?.length || 0) / itemsPerPage);

  // Paginate notes
  const paginatedNotes = filteredNotes?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="h-screen flex flex-col items-center w-full bg-gray-50">
      <div className="w-5/6 flex flex-col mt-10">
        {/* Search bar */}
        <div className="relative mb-10 w-60">
          <input
            type="text"
            placeholder="Search note by title..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="absolute left-3 top-3 w-5 h-5 text-gray-400"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M15.75 15.75L20.25 20.25"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10.5 4.5a6 6 0 100 12 6 6 0 000-12z"
            />
          </svg>
        </div>

        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-500 text-sm">Loading notes...</span>
            </div>
          ) : filteredNotes?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No notes found.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {["ID", "Owner ID", "Type", "Title", "Created At", "Updated At", "Action"].map((header) => (
                    <th
                      key={header}
                      className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {paginatedNotes?.map((note, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-50 ${index % 2 === 0 ? "bg-white" : "bg-gray-50"}`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">{note.id}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{note.user}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{note.type}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{note.title}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{note.created_at}</td>
                    <td className="px-6 py-4 text-sm text-gray-600">{note.updated_at}</td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <TiPencil size={20} className="text-blue-500" />
                        <button className="text-blue-600 hover:underline">Edit</button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center space-x-3 my-5">
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
          >
            <IoIosArrowDropleft size={20} />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-md ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-100 text-gray-700 hover:bg-gray-200"
              }`}
              onClick={() => setCurrentPage(index + 1)}
            >
              {index + 1}
            </button>
          ))}
          <button
            className="p-2 rounded-md bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300"
            onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
            disabled={currentPage === totalPages}
          >
            <IoIosArrowDropright size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default NoteDashboard;

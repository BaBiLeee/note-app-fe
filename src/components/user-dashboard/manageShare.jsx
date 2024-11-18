import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import { useDeleteNoteMutation, useGetNoteDataQuery, useUpdateNoteMutation } from "../../api/note/noteApi";
import Cookies from "js-cookie";
import { FaSave, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
const noteTypes = ["Personal", "Work", "Project", "Reminder"];
const ManageShare = () => {
  const accessToken = Cookies.get("token");
  const [deleteNote] = useDeleteNoteMutation();
  const { data, isLoading } = useGetNoteDataQuery({ accessToken: accessToken });
  const [updateNote] = useUpdateNoteMutation();
  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [localData, setLocalData] = useState([]); // Dữ liệu người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo xóa thành công
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo xóa thành công
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Điều khiển hiển thị hộp xác nhận
  const [selectedNoteId, setSelectedNoteId] = useState(null); // Lưu id người dùng cần xóa
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedNote, setSelectedNote] = useState(null);
  const itemsPerPage = 6;
  useEffect(() => {
    if (data?.data) setLocalData(data.data);
  }, [data]);

  // Filter notes based on the search term
  const filteredNotes = localData.filter((note) =>
    note.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil((filteredNotes?.length || 0) / itemsPerPage);

  // Paginate notes
  const paginatedNotes = filteredNotes?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleUpdateNote = async () => {
    if (!selectedNote) return;

    try {
      // Lấy dữ liệu mới nhất từ selectedNote
      const updatedData = { ...selectedNote };
      const updatedNote = await updateNote({
        accessToken,
        noteId: selectedNote.id,
        data: updatedData, // Sử dụng bản sao để đảm bảo dữ liệu chính xác
      }).unwrap();

      toast.success("Note updated successfully!");
      window.location.reload();
      setShowDetailModal(false);
    } catch (error) {
      toast.error("Failed to update note. Please try again.");
      console.error("Error updating note:", error);
    }
  };

const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowDetailModal(true);
  };

  const handleDeleteNote = async (id) => {
    try {
      const response = await deleteNote({ id, accessToken: accessToken });

      // Kiểm tra phản hồi API
      if (response.error) {
        throw new Error(
          response.error.data.message || "Failed to delete note."
        );
      }

      // Xóa thành công
      setLocalData((prevData) => prevData.filter((note) => note.id !== id));
      setShowDeleteConfirm(false); // Tắt modal
      setSuccessMessage("Note deleted successfully!"); // Hiển thị thông báo thành công
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting note:", error);
      setErrorMessage(error.message || "Failed to connect to the server."); // Thông báo lỗi
      setTimeout(() => setErrorMessage(""), 3000); // Xóa thông báo lỗi sau 3 giây
    }
  };

  return (
    <div className="h-screen flex flex-col items-center w-full bg-gray-50">
      <div className="w-5/6 flex flex-col mt-10">
        {/* Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-500 text-sm">
                Loading notes...
              </span>
            </div>
          ) : filteredNotes?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No notes found.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Note ID",
                    "Permission",
                    "Shared By ID",
                    "Shared User ID",
                    "Shared at",
                    "Action",
                  ].map((header) => (
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
                    className={`cursor-pointer hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {note.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {note.user}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {note.type}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {note.title}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {note.created_at}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {note.updated_at}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <TiPencil size={20} className="text-blue-500" />
                        <button className="text-blue-600 hover:underline" onClick={() => handleNoteClick(note)}>
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedNoteId(note.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>

        {/* Pagination */}
        <div className="flex justify-center items-center my-5 space-x-2">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className={`${
              currentPage === 1 ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <IoIosArrowDropleft
              size={30}
              className="cursor-pointer rounded-full hover:bg-gray-200"
            />
          </button>
          <div className="flex items-center space-x-1">
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`${
                      currentPage === page
                        ? "bg-blue-500 text-white"
                        : "bg-gray-200 text-gray-800"
                    } px-3 py-1 rounded-full hover:bg-blue-400 hover:text-white`}
                  >
                    {page}
                  </button>
                )
              )}
            </div>
          <button
            className={`${
              currentPage === totalPages
                ? "cursor-not-allowed opacity-50"
                : ""
            }`}
            onClick={() =>
              setCurrentPage((prev) => Math.min(prev + 1, totalPages))
            }
            disabled={currentPage === totalPages}
          >
            <IoIosArrowDropright
              size={30}
              className="cursor-pointer rounded-full hover:bg-gray-200"
            />
          </button>
        </div>
      </div>
      {/* Delete Confirmation Modal */}
      {showDeleteConfirm && (
        <div className="fixed inset-0 z-50 bg-gray-800 bg-opacity-50 flex justify-center items-center">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <p className="text-lg font-semibold">Confirm Delete</p>
            <p className="text-gray-600">Are you sure you want to delete?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteNote(selectedNoteId)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showDetailModal && selectedNote && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-6">
              <h2 className="text-lg font-bold mb-4">Edit Note</h2>
              <input
                name="title"
                value={selectedNote.title}
                onChange={handleDetailInputChange}
                placeholder="Title"
                className="w-full p-2 mb-3 border rounded"
              />
              <textarea
                name="content"
                value={selectedNote.content}
                onChange={handleDetailInputChange}
                placeholder="Content"
                className="w-full h-72 p-2 mb-3 border rounded"
              ></textarea>
              <select
                name="type"
                value={selectedNote.type}
                onChange={handleDetailInputChange}
                className="w-full p-2 mb-3 border rounded"
              >
                {noteTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
              <select
                name="color"
                value={selectedNote.color}
                onChange={handleDetailInputChange}
                className="w-full p-2 mb-3 border rounded"
              >
                <option value="bg-yellow-200">Yellow</option>
                <option value="bg-green-200">Green</option>
                <option value="bg-blue-200">Blue</option>
                <option value="bg-red-200">Red</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleUpdateNote}
                  className="px-1 py-2  text-blue-800 rounded hover:text-black"
                >
                  <FaSave />
                </button>
                <button
                  onClick={() => setShowDetailModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
    </div>
  );
};

export default ManageShare;

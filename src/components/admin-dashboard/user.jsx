import React, { useState, useEffect } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import {
  useGetAuthDataQuery,
  useDeleteUserMutation,
  useUpdateUserProfileMutation,
  useUpdateStatusMutation,
} from "../../api/user/userApi";
import Cookies from "js-cookie";
import { FaSave } from "react-icons/fa";
import { toast } from "react-toastify";

const UserDashboard = () => {
  const accessToken = Cookies.get("token");
  const { data, isLoading } = useGetAuthDataQuery({ accessToken: accessToken });
  const [updateUser] = useUpdateUserProfileMutation();
  const [deleteUser] = useDeleteUserMutation();
  const [updateStatus] = useUpdateStatusMutation();
  const [selectedUser, setSelectedUser] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);

  const [localData, setLocalData] = useState([]); // Dữ liệu người dùng
  const [searchTerm, setSearchTerm] = useState(""); // Giá trị tìm kiếm
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo xóa thành công
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo xóa thành công
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Điều khiển hiển thị hộp xác nhận
  const [selectedUserId, setSelectedUserId] = useState(null); // Lưu id người dùng cần xóa

  const rowsPerPage = 6; // Số dòng mỗi trang

  // Cập nhật dữ liệu local khi `data` thay đổi
  useEffect(() => {
    if (data?.data) setLocalData(data.data);
  }, [data]);

  // Lọc danh sách người dùng dựa trên tìm kiếm
  const filteredUsers = localData.filter((user) =>
    user.fullname.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Tính tổng số trang
  const totalPages = Math.ceil(filteredUsers.length / rowsPerPage);

  // Lấy dữ liệu cho trang hiện tại
  const currentUsers = filteredUsers.slice(
    (currentPage - 1) * rowsPerPage,
    currentPage * rowsPerPage
  );
  const handleUserClick = (user) => {
    setSelectedUser(user);
    setShowDetailModal(true);
  };
  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedUser((prev) => ({ ...prev, [name]: value }));
  };
  const handleUpdateUser = async () => {
    if (!selectedUser) return;

    try {
      // Lấy dữ liệu mới nhất từ selectedNote
      const updatedData = { ...selectedUser };
      const updatedUser = await updateUser({
        accessToken,
        id: selectedUser.id,
        data: updatedData, // Sử dụng bản sao để đảm bảo dữ liệu chính xác
      }).unwrap();

      toast.success("User updated successfully!");
      window.location.reload();
      setShowDetailModal(false);
    } catch (error) {
      toast.error("Failed to update user. Please try again.");
      console.error("Error updating user:", error);
    }
  };

  const handleStatus = async (id) => {
    const response = await updateStatus({ id, accessToken: accessToken });

    // Kiểm tra phản hồi API
    if (response.error) {
      throw new Error(response.error.data.message || "Failed to update user.");
    }
  };

  const handleDeleteUser = async (id) => {
    try {
      const response = await deleteUser({ id, accessToken: accessToken });

      // Kiểm tra phản hồi API
      if (response.error) {
        throw new Error(
          response.error.data.message || "Failed to delete user."
        );
      }

      // Xóa thành công
      setLocalData((prevData) => prevData.filter((user) => user.id !== id));
      setShowDeleteConfirm(false); // Tắt modal
      setSuccessMessage("User deleted successfully!"); // Hiển thị thông báo thành công
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting user:", error);
      setErrorMessage(error.message || "Failed to connect to the server."); // Thông báo lỗi
      setTimeout(() => setErrorMessage(""), 3000); // Xóa thông báo lỗi sau 3 giây
    }
  };

  return (
    <div className="h-screen flex flex-col items-center w-full bg-gray-50">
      <div className="w-5/6 flex flex-col mt-10">
        {/* Search Input */}
        <div className="relative mb-10 w-60">
          <input
            type="text"
            placeholder="Search user by name..."
            className="border border-gray-300 p-2 pl-10 rounded-md w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1); // Reset về trang đầu khi tìm kiếm
            }}
          />
        </div>

        {/* Success Message */}
        {successMessage && (
          <div className="mb-5 text-green-600 text-sm">{successMessage}</div>
        )}
        {/* Error Message */}
        {errorMessage && (
          <div className="mb-5 text-red-600 text-sm">{errorMessage}</div>
        )}

        {/* User Table */}
        <div className="bg-white border border-gray-200 rounded-lg shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="flex justify-center items-center h-32">
              <div className="w-8 h-8 border-4 border-blue-400 border-dashed rounded-full animate-spin"></div>
              <span className="ml-3 text-gray-500 text-sm">
                Loading users...
              </span>
            </div>
          ) : currentUsers.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No users found.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {["ID", "Full Name", "Email", "Status", "Actions"].map(
                    (header) => (
                      <th
                        key={header}
                        className="px-6 py-3 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider"
                      >
                        {header}
                      </th>
                    )
                  )}
                </tr>
              </thead>
              <tbody>
                {currentUsers.map((user, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {user.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.fullname}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {user.email}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                          user.status
                            ? "bg-green-500 text-white"
                            : "bg-gray-800 text-white"
                        }`}
                        onClick={() => handleStatus(user.id)}
                      >
                        {user.status ? "Active" : "Inactive"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <TiPencil size={20} className="text-blue-500" />
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleUserClick(user)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedUserId(user.id);
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
        {filteredUsers.length > rowsPerPage && (
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

            {/* Pagination Buttons */}
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
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
              className={`${
                currentPage === totalPages
                  ? "cursor-not-allowed opacity-50"
                  : ""
              }`}
            >
              <IoIosArrowDropright
                size={30}
                className="cursor-pointer rounded-full hover:bg-gray-200"
              />
            </button>
          </div>
        )}
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
                onClick={() => handleDeleteUser(selectedUserId)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {showDetailModal && selectedUser && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
          <div className="bg-white rounded-lg p-6">
            <h2 className="text-lg font-bold mb-4">Edit User</h2>
            <input
              name="email"
              value={selectedUser.email}
              onChange={handleDetailInputChange}
              placeholder="Email"
              className="w-full p-2 mb-3 border rounded"
            />
            <input
              name="fullname"
              value={selectedUser.fullname}
              onChange={handleDetailInputChange}
              placeholder="FullName"
              className="w-full p-2 mb-3 border rounded"
            />
            <div className="flex justify-end gap-4">
              <button
                onClick={handleUpdateUser}
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

export default UserDashboard;

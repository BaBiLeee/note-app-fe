import React, { useEffect, useState } from "react";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";
import { TiPencil } from "react-icons/ti";
import {
  useDeleteNoteMutation,
  useDeleteShareMutation,
  useGetNoteDataQuery,
  useManageShareQuery,
  useUpdateNoteMutation,
  useUpdateShareMutation,
} from "../../api/note/noteApi";
import Cookies from "js-cookie";
import { FaSave, FaShare } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { toast } from "react-toastify";
import { formatDateTime } from "../fomat-time";

const permissionsMap = {
  view: 1,
  change: 2,
  share: 4,
};

const ManageShare = () => {
  const accessToken = Cookies.get("token");
  const id = Cookies.get("id");
  const [deleteShare] = useDeleteShareMutation();
  const [updateShare] = useUpdateShareMutation();
  const { data, isLoading } = useManageShareQuery({
    accessToken: accessToken,
    id: id,
  });
  // const getPermissionNames = (permissionValue) => {
  //   const permissions = [];

  //   if (permissionValue & PERMISSIONS.view) {
  //     permissions.push("view");
  //   }
  //   if (permissionValue & PERMISSIONS.change) {
  //     permissions.push("change");
  //   }
  //   if (permissionValue & PERMISSIONS.share) {
  //     permissions.push("share");
  //   }

  //   return permissions.join(", "); // Kết hợp thành chuỗi
  // };

  // Search state
  const [searchTerm, setSearchTerm] = useState("");
  // Pagination state
  const [localData, setLocalData] = useState([]); // Dữ liệu người dùng
  const [currentPage, setCurrentPage] = useState(1); // Trang hiện tại
  const [successMessage, setSuccessMessage] = useState(""); // Thông báo xóa thành công
  const [errorMessage, setErrorMessage] = useState(""); // Thông báo xóa thành công
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false); // Điều khiển hiển thị hộp xác nhận
  const [selectedShareId, setSelectedShareId] = useState(null); // Lưu id người dùng cần xóa
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedShare, setSelectedShare] = useState(null);
  const itemsPerPage = 6;
  useEffect(() => {
    if (data?.data) setLocalData(data.data);
  }, [data]);

  // Filter notes based on the search term
  const filteredShares = localData.filter((share) =>
    share.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calculate total pages
  const totalPages = Math.ceil((filteredShares?.length || 0) / itemsPerPage);

  // Paginate notes
  const paginatedShares = filteredShares?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );
  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedShare((prev) => ({ ...prev, [name]: value }));
  };

  const handlePermission = async () => {
    try {
      await updateShare({
        accessToken,
        user_id: selectedShare.shared_user,
        note_id: selectedShare.note,
        permission: selectedShare.permission,
      }).unwrap();

      toast.success("Permission updated successfully!");
      setShowDetailModal(false);
      window.location.reload();
    } catch (error) {
      toast.error("Failed to update permission. Please try again.");
    }
  };

  const handleShareClick = (share) => {
    setSelectedShare(share);
    setShowDetailModal(true);
  };

  const handleDeleteShare = async (id) => {
    try {
      const response = await deleteShare({ id, accessToken: accessToken });

      // Kiểm tra phản hồi API
      if (response.error) {
        throw new Error(
          response.error.data.message || "Failed to delete share."
        );
      }

      // Xóa thành công
      setLocalData((prevData) => prevData.filter((share) => share.id !== id));
      setShowDeleteConfirm(false); // Tắt modal
      setSuccessMessage("Share deleted successfully!"); // Hiển thị thông báo thành công
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error deleting share:", error);
      setErrorMessage(error.message || "Failed to connect to the server."); // Thông báo lỗi
      setTimeout(() => setErrorMessage(""), 3000); // Xóa thông báo lỗi sau 3 giây
    }
  };
  const handleCheckboxChange = (permissionName) => {
    const permissionValue = permissionsMap[permissionName];
    const currentPermission = selectedShare.permission || 0;

    const updatedPermission =
      currentPermission & permissionValue
        ? currentPermission - permissionValue
        : currentPermission + permissionValue;

    setSelectedShare((prev) => ({
      ...prev,
      permission: updatedPermission,
    }));
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
                Loading share...
              </span>
            </div>
          ) : filteredShares?.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-gray-500 text-lg">No share found.</p>
            </div>
          ) : (
            <table className="min-w-full bg-white">
              <thead className="bg-gray-100">
                <tr>
                  {[
                    "ID",
                    "Note ID",
                    "Owner ID",
                    "Permission",
                    "Shared by ID",
                    "Shared user ID",
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
                {paginatedShares?.map((share, index) => (
                  <tr
                    key={index}
                    className={`cursor-pointer hover:bg-gray-50 ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-50"
                    }`}
                  >
                    <td className="px-6 py-4 text-sm font-medium text-gray-800">
                      {share.id}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {share.note}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {share.owner}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                    {Object.keys(permissionsMap)
                        .filter((key) => share.permission & permissionsMap[key])
                        .join(", ")}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {share.shared_by}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {share.shared_user}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600">
                      {formatDateTime(share.shared_at)}
                    </td>
                    <td className="px-6 py-4 text-sm">
                      <div className="flex items-center space-x-2">
                        <TiPencil size={20} className="text-blue-500" />
                        <button
                          className="text-blue-600 hover:underline"
                          onClick={() => handleShareClick(share)}
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => {
                            setSelectedShareId(share.id);
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
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
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
            ))}
          </div>
          <button
            className={`${
              currentPage === totalPages ? "cursor-not-allowed opacity-50" : ""
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
            <p className="text-gray-600">
              Are you sure you want to stop sharing with this user?
            </p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDeleteConfirm(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteShare(selectedShareId)}
                className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
      {showDetailModal && selectedShare && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-semibold mb-4">Edit Permissions</h2>
            <div className="space-y-2">
              {Object.keys(permissionsMap).map((key) => (
                <label key={key} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    checked={
                      selectedShare.permission & permissionsMap[key]
                        ? true
                        : false
                    }
                    onChange={() => handleCheckboxChange(key)}
                    className="form-checkbox"
                  />
                  <span>{key}</span>
                </label>
              ))}
            </div>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                onClick={() => setShowDetailModal(false)}
                className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handlePermission}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageShare;

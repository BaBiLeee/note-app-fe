import React, { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { CgAdd } from "react-icons/cg";
import {
  useCreateNoteMutation,
  useDeleteNoteMutation,
  useShareNoteMutation,
  useUpdateNoteMutation,
} from "../../api/note/noteApi";
import Cookies from "js-cookie";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useGetUserListQuery } from "../../api/user/userApi";
import { FaSave, FaShare } from "react-icons/fa";
import { MdDelete, MdOutlineCreateNewFolder } from "react-icons/md";

const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const NoteUser = ({ notes, setNotes, userList }) => {
  const accessToken = Cookies.get("token");
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    color: "bg-yellow-200",
    type: "Personal",
  });
  const [permissions, setPermissions] = useState({
    view: false,
    change: false,
    shareWithOthers: false,
  });
  const [createNote] = useCreateNoteMutation();
  const [updateNote] = useUpdateNoteMutation();
  const [deleteNote] = useDeleteNoteMutation();
  const [shareNote] = useShareNoteMutation();
  const [selectedUserId, setSelectedUserId] = useState("");
  // State for selected note and detail modal visibility
  const [selectedNote, setSelectedNote] = useState(null);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [shareData, setShareData] = useState({ userId: "", permission: 0 });

  const onDragEnd = async (result) => {
    const { source, destination, draggableId } = result;

    // Nếu không có điểm đích hoặc vị trí không thay đổi, không làm gì cả
    if (
      !destination ||
      (source.droppableId === destination.droppableId &&
        source.index === destination.index)
    ) {
      return;
    }

    // Tìm `note` đang được kéo
    const movedNote = notes[source.droppableId][source.index];

    try {
      // Gọi API để cập nhật `type`
      await updateNote({
        accessToken,
        noteId: draggableId,
        data: { ...movedNote, type: destination.droppableId },
      }).unwrap();

      // Cập nhật giao diện sau khi cập nhật thành công
      setNotes((prevNotes) => {
        const updatedNotes = { ...prevNotes };
        // Loại bỏ `note` khỏi `source`
        updatedNotes[source.droppableId].splice(source.index, 1);
        // Thêm `note` vào `destination`
        updatedNotes[destination.droppableId] = [
          ...updatedNotes[destination.droppableId],
          { ...movedNote, type: destination.droppableId },
        ];
        return updatedNotes;
      });

      toast.success("Note updated successfully!");
    } catch (error) {
      toast.error("Failed to update note. Please try again.");
      console.error("Error updating note type:", error);
    }
  };

  // Open modal for creating a new note
  const handleOpenModal = () => setShowModal(true);

  // Close modal and reset form
  const handleCloseModal = () => {
    setShowModal(false);
    setFormData({
      title: "",
      content: "",
      color: "bg-yellow-200",
      type: "Personal",
    });
  };

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Create a new note
  const handleCreateNote = async () => {
    try {
      const newNote = await createNote({
        accessToken,
        data: formData,
      }).unwrap();

      toast.success("Note created successfully!");
      window.location.reload();
      handleCloseModal();
    } catch (error) {
      toast.error("Failed to create note. Please try again.");
      console.error("Error creating note:", error);
    }
  };

  // Open detail modal for the selected note
  const handleNoteClick = (note) => {
    setSelectedNote(note);
    setShowDetailModal(true);
  };

  // Handle save/update note
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

      // Cập nhật lại state notes
      setNotes((prevNotes) => ({
        ...prevNotes,
        [selectedNote.type]: prevNotes[selectedNote.type].map((note) =>
          note.id === updatedNote.id ? updatedNote : note
        ),
      }));

      toast.success("Note updated successfully!");
      window.location.reload();
      setShowDetailModal(false);
    } catch (error) {
      toast.error("Failed to update note. Please try again.");
      console.error("Error updating note:", error);
    }
  };

  // Handle input change in the detail modal
  const handleDetailInputChange = (e) => {
    const { name, value } = e.target;
    setSelectedNote((prev) => ({ ...prev, [name]: value }));
  };

  const handleDeleteNote = async () => {
    if (!selectedNote) return;

    try {
      // Lấy dữ liệu mới nhất từ selectedNote
      const updatedData = { ...selectedNote };
      const updatedNote = await deleteNote({
        accessToken,
        noteId: selectedNote.id,
      }).unwrap();
      toast.success("Note delete successfully!");
      window.location.reload();
      setShowDetailModal(false);
    } catch (error) {
      toast.error("Failed to delete note. Please try again.");
      console.error("Error updating note:", error);
    }
  };
  const handleShare = async () => {
    const permissionValue = calculatePermissions();

    if (!selectedUserId) {
      toast.error("Please select a user to share the note.");
      return;
    }
    try {
      await shareNote({
        accessToken,
        noteId: selectedNote.id,
        data: {
          shared_user_id: selectedUserId,
          permission: permissionValue,
        },
      }).unwrap();

      toast.success("Note shared successfully!");
      setShowShareModal(false);
    } catch (error) {
      toast.error("Failed to share note. Please try again.");
      console.error("Error sharing note:", error);
    }
  };
  const togglePermission = (value) => {
    setShareData((prev) => ({
      ...prev,
      permission: prev.permission ^ value, // Toggle permission using XOR
    }));
  };
  const handlePermissionChange = (key) => {
    setPermissions((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Calculate total permissions
  const calculatePermissions = () => {
    let total = 0;
    if (permissions.view) total += 1;
    if (permissions.change) total += 2;
    if (permissions.shareWithOthers) total += 4;
    return total;
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="col-span-4 grid grid-cols-4 gap-6 px-4">
        {/* Button to open create note modal */}
        <button
          onClick={handleOpenModal}
          className="fixed bottom-10 right-12 z-10 p-3 rounded-full bg-gray-500 text-white hover:bg-blue-600 hover:scale-105 transition-all duration-500 ease-in-out"
        >
          <CgAdd size={30} />
        </button>

        {/* Modal for creating a new note */}
        {showModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-6 ">
              <h2 className="text-lg font-bold mb-4">Create Note</h2>
              <input
                name="title"
                value={formData.title}
                onChange={handleInputChange}
                placeholder="Title"
                className="w-full p-2 mb-3 border rounded"
              />
              <textarea
                name="content"
                value={formData.content}
                onChange={handleInputChange}
                placeholder="Content"
                className="w-full h-72 p-2 mb-3 border rounded"
              ></textarea>
              <select
                name="type"
                value={formData.type}
                onChange={handleInputChange}
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
                value={formData.color}
                onChange={handleInputChange}
                className="w-full p-2 mb-3 border rounded"
              >
                <option value="bg-yellow-200">Yellow</option>
                <option value="bg-green-200">Green</option>
                <option value="bg-blue-200">Blue</option>
                <option value="bg-red-200">Red</option>
              </select>
              <div className="flex justify-end gap-4">
                <button
                  onClick={handleCreateNote}
                  className="px-4 py-2 text-blue-500 rounded hover:text-blue-600"
                >
                  <MdOutlineCreateNewFolder />
                </button>
                <button
                  onClick={handleCloseModal}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Modal for viewing and editing note details */}
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
                  onClick={() => setShowShareModal(true)}
                  className="px-1 py-2 text-green-300 rounded hover:text-green-800"
                >
                  <FaShare />
                </button>
                <button
                  onClick={handleDeleteNote}
                  className="px-1 py-2  text-red-800 rounded hover:text-black"
                >
                  <MdDelete />
                </button>
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

        {/* Share Note Modal */}
        {showShareModal && (
          <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-20">
            <div className="bg-white rounded-lg p-6 w-96">
              <h2 className="text-lg font-bold mb-4">Share Note</h2>
              {/* Select User */}
              <label className="block text-sm font-medium mb-2">
                Select User:
              </label>
              {
                <select
                  className="w-full p-2 mb-4 border rounded"
                  value={selectedUserId}
                  onChange={(e) => setSelectedUserId(e.target.value)}
                >
                  <option value="">-- Select a user --</option>
                  {userList?.data.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.fullname}
                    </option>
                  ))}
                </select>
              }

              {/* Permissions */}
              <fieldset className="mb-4">
                <legend className="text-sm font-medium mb-2">
                  Permissions:
                </legend>
                <label className="block">
                  <input
                    type="checkbox"
                    checked={permissions.view}
                    onChange={() => handlePermissionChange("view")}
                  />
                  <span className="ml-2">View</span>
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    checked={permissions.change}
                    onChange={() => handlePermissionChange("change")}
                  />
                  <span className="ml-2">Change</span>
                </label>
                <label className="block">
                  <input
                    type="checkbox"
                    checked={permissions.shareWithOthers}
                    onChange={() => handlePermissionChange("shareWithOthers")}
                  />
                  <span className="ml-2">Share with Others</span>
                </label>
              </fieldset>

              {/* Submit Button */}
              <div className="flex justify-end gap-4">
              <button
                  onClick={handleShare}
                  className="px-1 py-2 text-green-300 rounded hover:text-green-800"
                >
                  <FaShare />
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="px-4 py-2 bg-gray-300 rounded"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Notes section */}
        {noteTypes.map((type) => (
          <Droppable key={type} droppableId={type}>
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex flex-col"
              >
                <h2 className="font-bold text-lg text-gray-800 col-span-1 flex flex-col items-center bg-white shadow-lg rounded-xl p-4 mb-4">
                  {type}
                </h2>
                {notes[type]?.map((note, index) => (
                  <Draggable
                    key={note.id}
                    draggableId={note.id.toString()}
                    index={index}
                  >
                    {(provided) => (
                      <div
                      className={`relative ${note?.color} p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl  transition-transform duration-200 ease-in-out mb-4`}
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        onClick={() => handleNoteClick(note)}
                      >
                        <AiFillPushpin
                        size={24}
                        className="absolute -right-3 -top-3 text-gray-600"
                      />
                        <h3 className="font-bold">{note.title}</h3>
                        <p className="text-gray-700 text-xl">{note.content}</p>
                      </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </div>
    </DragDropContext>
  );
};

export default NoteUser;

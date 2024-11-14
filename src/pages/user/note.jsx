import React, { useState, useEffect } from "react";
import Modal from "../../components/modal";
import useModal from "../../hooks/useModal";
import { useGetNoteDataQuery } from "../../api/note/noteApi";
import { DragDropContext } from "react-beautiful-dnd";
import SidebarUser from "../../components/user-dashboard/sidebar";
import NoteUser from "../../components/user-dashboard/note";
import SharedNoteUser from "../../components/user-dashboard/shared-note";
import Cookies from "js-cookie";
import Infor from "../../components/user-dashboard/information";

const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const Note = () => {
  const [selectedTab, setSelectedTab] = useState("Note");
  const token = Cookies.get("token");
  const { data } = useGetNoteDataQuery({ accessToken: token });
  const { isShowing, toggle } = useModal();

  const [notes, setNotes] = useState(
    noteTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {})
  );

  useEffect(() => {
    if (data?.data) {
      const categorizedNotes = noteTypes.reduce((acc, type) => {
        acc[type] = data.data.filter((note) => note.type === type);
        return acc;
      }, {});
      setNotes(categorizedNotes);
    }
  }, [data]);

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;
  
    const sourceType = source.droppableId;
    const destinationType = destination.droppableId;
  
    // Tạo bản sao của các ghi chú ở source và destination
    const sourceNotes = Array.from(notes[sourceType]);
    const destNotes = Array.from(notes[destinationType]);
  
    // Loại bỏ ghi chú đã kéo ra khỏi mảng source
    const [movedNote] = sourceNotes.splice(source.index, 1);
  
    // Tạo một đối tượng ghi chú mới với type đã được cập nhật
    const updatedNote = { ...movedNote, type: destinationType };
  
    // Thêm ghi chú vào mảng đích
    destNotes.splice(destination.index, 0, updatedNote);
  
    // Cập nhật state notes
    setNotes((prevNotes) => ({
      ...prevNotes,
      [sourceType]: sourceNotes,
      [destinationType]: destNotes,
    }));
  };
  

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-5 h-screen bg-gray-50 p-6">
        <SidebarUser selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="col-span-4">
          {selectedTab === "Information" && <Infor/>}
          {selectedTab === "Note" && <NoteUser notes={notes} />}
          {selectedTab === "Shared with me" && <SharedNoteUser />}
        </div>
      </div>
    </DragDropContext>
  );
};

export default Note;

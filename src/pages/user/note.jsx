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
import { useGetUserListQuery } from "../../api/user/userApi";
import SharedNote from "../../components/user-dashboard/shared";

const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const Note = () => {
  const [selectedTab, setSelectedTab] = useState("Note");
  const token = Cookies.get("token");
  const { data } = useGetNoteDataQuery({ accessToken: token });
  const { data: userList= []} = useGetUserListQuery();
  console.log(userList);
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

  return (

      <div className="grid grid-cols-5 h-screen bg-gray-50 p-6">
        <SidebarUser selectedTab={selectedTab} setSelectedTab={setSelectedTab} />
        <div className="col-span-4">
          {selectedTab === "Information" && <Infor />}
          {selectedTab === "Note" && (
            <NoteUser notes={notes} setNotes={setNotes} userList={userList}/>
          )}
          {selectedTab === "Shared with me" && <SharedNoteUser userList={userList}/>}
          {selectedTab === "Shared by me" && <SharedNote />}

        </div>
      </div>

  );
};

export default Note;

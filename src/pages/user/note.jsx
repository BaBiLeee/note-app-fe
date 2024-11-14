import React, { useState } from "react";
import Header from "../../components/header";
import { AiFillPushpin } from "react-icons/ai";
import { useGetNoteDataQuery } from "../../api/note/noteApi";
import { getToken } from "../../api/feature/token";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";

const initialData = [
  { id: "1", title: "Note 1", content: "This is a personal note.", color: "bg-yellow-200", type: "Personal" },
  { id: "2", title: "Note 2", content: "This is a work-related note.", color: "bg-pink-200", type: "Work" },
  { id: "3", title: "Note 3", content: "This is a project-related note.", color: "bg-red-200", type: "Project" },
  { id: "4", title: "Note 4", content: "This is a reminder note.", color: "bg-green-200", type: "Reminder" },
  // Add more notes as needed
];

const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const Note = () => {
  const token = getToken();
  const { data } = useGetNoteDataQuery({ accessToken: token });
  console.log(data?.data);

  const [notes, setNotes] = useState(
    noteTypes.reduce((acc, type) => {
      acc[type] = initialData.filter((note) => note.type === type);
      return acc;
    }, {})
  );

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) return;

    const sourceType = source.droppableId;
    const destinationType = destination.droppableId;

    // Clone the items in source and destination
    const sourceNotes = Array.from(notes[sourceType]);
    const destNotes = Array.from(notes[destinationType]);

    // Remove the dragged item from the source array
    const [movedNote] = sourceNotes.splice(source.index, 1);

    // Add the item to the destination array
    destNotes.splice(destination.index, 0, movedNote);

    // Update the type for the note when moved to a new column
    movedNote.type = destinationType;

    setNotes((prevNotes) => ({
      ...prevNotes,
      [sourceType]: sourceNotes,
      [destinationType]: destNotes,
    }));
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="grid grid-cols-5 h-screen bg-gray-50 p-6">
        {/* Sidebar */}
        <div className="col-span-1 flex flex-col items-center bg-white shadow-lg rounded-xl p-4">
          <img
            className="rounded-full w-[150px] border-gray-900 border-2 border-spacing-2 border-dotted"
            src="https://picsum.photos/200"
            alt="avatar"
          />
          <div className="font-bold text-2xl mt-4">Le Truong</div>
          <hr className="w-full h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
          <div className="text-gray-700 font-semibold my-2 cursor-pointer hover:text-gray-900">Notify</div>
          <div className="text-gray-700 font-semibold my-2 cursor-pointer hover:text-gray-900">Note</div>
          <div className="text-gray-700 font-semibold my-2 cursor-pointer hover:text-gray-900">Shared with me</div>
          <div className="text-gray-700 font-semibold my-2 cursor-pointer hover:text-gray-900">Exit</div>
        </div>

        {/* Main Content */}
        <div className="col-span-4 grid grid-cols-4 gap-6 p-4">
          {noteTypes.map((type) => (
            <Droppable key={type} droppableId={type}>
              {(provided) => (
                <div
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-4"
                >
                  <h2 className="font-bold text-lg text-gray-800">{type}</h2>
                  {notes[type].map((note, index) => (
                    <Draggable key={note.id} draggableId={note.id} index={index}>
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className={`relative ${note.color} p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl hover:scale-105 transition-transform duration-200 ease-in-out`}
                        >
                          <AiFillPushpin size={24} className="absolute -right-3 -top-3 text-gray-600" />
                          <div className="font-bold text-gray-800 mb-2">{note.title}</div>
                          <div className="text-gray-500 text-sm mb-2">7/11/2024</div>
                          <div className="text-gray-700 line-clamp-6 font-notefont text-lg">
                            {note.content}
                          </div>
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
      </div>
    </DragDropContext>
  );
};

export default Note;

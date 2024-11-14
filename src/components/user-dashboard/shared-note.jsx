import React, { useState } from "react";
import { AiFillPushpin } from "react-icons/ai";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
import Cookies from "js-cookie";
import { CgAdd } from "react-icons/cg";
const initialData = [
  {
    id: "1",
    title: "Note 1",
    content: "This is a personal note.",
    color: "bg-yellow-200",
    type: "Personal",
  },
  {
    id: "2",
    title: "Note 2",
    content: "This is a work-related note.",
    color: "bg-pink-200",
    type: "Work",
  },
  {
    id: "3",
    title: "Note 3",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    color: "bg-green-200",
    type: "Work",
  },
  {
    id: "4",
    title: "Note 4",
    content: "This is a project-related note.",
    color: "bg-red-200",
    type: "Project",
  },
  {
    id: "5",
    title: "Note 5",
    content: "This is a project-related note.",
    color: "bg-blue-200",
    type: "Project",
  },
  {
    id: "6",
    title: "Note 6",
    content:
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
    color: "bg-green-200",
    type: "Reminder",
  },
  // Add more notes as needed
];
const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const SharedNoteUser = () => {
  const token = Cookies.get('token');

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
    <div className="col-span-4 grid grid-cols-4 gap-6 p-4">
        <button
        className={`fixed bottom-10 right-12 z-10 p-3 rounded-full 
            bg-gray-500 text-white hover:bg-blue-600 hover:scale-105
             transition-all duration-500 ease-in-out`}
      >
        <CgAdd size={30}/>
      </button>
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
                      className={`relative ${note.color} p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl  transition-transform duration-200 ease-in-out`}
                    >
                      <AiFillPushpin
                        size={24}
                        className="absolute -right-3 -top-3 text-gray-600"
                      />
                      <div className="font-bold text-gray-800 mb-2">
                        {note.title}
                      </div>
                      <div className="text-gray-500 text-sm mb-2">
                        7/11/2024
                      </div>
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
  );
};

export default SharedNoteUser;

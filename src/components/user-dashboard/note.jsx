import React from "react";
import { AiFillPushpin } from "react-icons/ai";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { CgAdd } from "react-icons/cg";

const noteTypes = ["Personal", "Work", "Project", "Reminder"];

const NoteUser = ({ notes }) => {
  return (
    <div className="col-span-4 grid grid-cols-4 gap-6 px-4">
      <button
        className={`fixed bottom-10 right-12 z-10 p-3 rounded-full 
            bg-gray-500 text-white hover:bg-blue-600 hover:scale-105
             transition-all duration-500 ease-in-out`}
      >
        <CgAdd size={30} />
      </button>
      {noteTypes.map((type) => (
        <Droppable key={type} droppableId={type}>
          {(provided) => (
            <div
              ref={provided.innerRef}
              {...provided.droppableProps}
              className="flex flex-col gap-4"
            >
              <h2 className="font-bold text-lg text-gray-800 col-span-1 flex flex-col items-center bg-white shadow-lg rounded-xl p-4">
                {type}
              </h2>
              {notes[type]?.map((note, index) => (
                <Draggable
                  key={note.id.toString()}
                  draggableId={note.id.toString()}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                      className={`relative ${note.color} p-6 rounded-lg shadow-md border border-gray-200 hover:shadow-xl transition-transform duration-200 ease-in-out`}
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

export default NoteUser;

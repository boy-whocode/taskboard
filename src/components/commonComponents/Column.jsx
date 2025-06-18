'use client'
import { Draggable, Droppable } from "@hello-pangea/dnd";
import { useState } from "react";
import DeleteTaskPopup from "../popups/deleteTask";


const Column = ({ col, tasks=[], id }) => {
  const fieldTask =()=> tasks.filter(task => col.taskIds.includes(task.id));
  const [selectedTask, setSelectedTask] = useState(null);
  const [popupFor, setPopupFor] = useState("");

  const handleDeleteTask = (task) => {
    setSelectedTask(task);
    setPopupFor("deleteTask");
  };
  const handleClosePopup = () => {
    setPopupFor("");
    setSelectedTask(null);
  };
  return (
    <>
    <Droppable droppableId={id}>
      {(provided) => (
        <div className="list__Container">
          <h2 className="list__title">{col.title}</h2>
          <div
            className="list_innerContainer"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {fieldTask().map((item, index) => (
              <Draggable draggableId={item.id} index={index} key={item.id}>
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    style={{
                      backgroundColor: "#eee",
                      borderRadius: 4,
                      padding: "4px 8px",
                      transition: "background-color .8s ease-out",
                      marginTop: 8,
                      position: "relative",
                      ...provided.draggableProps.style,
                    }}
                  >
                    <button className="task__delete"
                    onClick={() => handleDeleteTask(item)}
                    >x</button>
                    <p>{item.title}</p>
                    {item.description}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        </div>
      )}
    </Droppable>
    {{
      deleteTask: <DeleteTaskPopup task={selectedTask} onClose={handleClosePopup} />,
      ipdateTask: <p>Add New Column Popup</p>,
    }[popupFor]}
    </>
  );
}
export default Column;
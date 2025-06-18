"use client";
import React from "react";
import Column from "./Column";
import { DragDropContext } from "@hello-pangea/dnd";
import { socket } from "@/lib/socket";

const Board = ({ columns, tasks, setBoardData, mode }) => {
  const updateBoard = async (updatedBoardData) => {
    try {
      const response = await fetch("/api/board", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBoardData),
      });

      if (!response.ok) throw new Error("Failed to save board");
    } catch (err) {
      console.error("Board update failed:", err);
    }
  };
  const onDragEnd = async (result) => {
    const { source, destination } = result;
    if (!destination) return;
    const newColumns = JSON.parse(JSON.stringify(columns));
    const sourceColumn = newColumns.find(
      (col) => col.id === source.droppableId
    );
    const destColumn = newColumns.find(
      (col) => col.id === destination.droppableId
    );
    if (!sourceColumn || !destColumn) return;
    const taskId = sourceColumn.taskIds[source.index];
    sourceColumn.taskIds?.splice(source.index, 1);
    destColumn.taskIds?.splice(destination.index, 0, taskId);
    const updatedBoard = { columns: newColumns, tasks };
    setBoardData(updatedBoard);
    await updateBoard(updatedBoard);
    if (mode === "realtime") {
      socket.emit("update");
    }
  };
  return (
    <div>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="board">
          {Object.values(columns)?.map((col) => (
              <Column col={col} tasks={tasks} key={col.id} id={col.id} />
            ))}
        </div>
      </DragDropContext>
    </div>
  );
};

export default Board;

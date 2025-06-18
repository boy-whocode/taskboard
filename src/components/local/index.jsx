'use client';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBoard } from "@/redux/slice/boardSlice";
import dynamic from "next/dynamic";
import AddNewColumnPopup from "../popups/addNewColumn";
import AddNewTaskPopup from "../popups/addNewTask";
import Button from "../commonComponents/Button";
const Board = dynamic(() => import("../commonComponents/Board"))
const Local = () => {
  const { columns, tasks, loading } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState({
    columns: [...columns],
    tasks: [...tasks],
    columnId: "",
  });
  const [popupFor, setPopupFor] = useState("");
  useEffect(() => {
    dispatch(fetchBoard())
  }, []);
  useEffect(() => {
    setBoardData({
      columns: [...columns],
      tasks: [...tasks],
    });
  }, [columns, tasks]);

  const handleClosePopup = () => {
    setPopupFor("");
  };
  return (
    <div>
      <h1>Local Component</h1>
      <div className="flex gap-2 py-2 justify-center w-full">
        <Button onClick={() => setPopupFor("addNewColumn")}>
          Add New Column
        </Button>
        <Button onClick={() => setPopupFor("addNewTask")}>Add New Task</Button>
      </div>
      {loading ? (
        <p className="loading">...loading</p>
      ) : (
        <Board
          mode="local"
          columns={boardData.columns}
          tasks={boardData.tasks}
          setBoardData={setBoardData}
        />
      )}
      {
        {
          addNewColumn: <AddNewColumnPopup onClose={handleClosePopup} />,
          addNewTask: <AddNewTaskPopup onClose={handleClosePopup} />,
        }[popupFor]
      }
    </div>
  );
}

export default Local;
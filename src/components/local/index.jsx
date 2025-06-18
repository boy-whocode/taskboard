'use client';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { fetchBoard } from "@/redux/slice/boardSlice";
import dynamic from "next/dynamic";
const Board = dynamic(() => import("../commonComponents/Board"))
const Local = () => {
  const { columns, tasks, loading } = useSelector((state) => state.board);
  const dispatch = useDispatch();
  const [boardData, setBoardData] = useState({
    columns: [...columns],
    tasks: [...tasks],
  });
  useEffect(() => {
    dispatch(fetchBoard())
  }, []);
  useEffect(() => {
    setBoardData({
      columns: [...columns],
      tasks: [...tasks],
    });
  }, [columns, tasks]);
  return (
    <div>
      <h1>Local Component</h1>
      {loading?<p className="loading">...loading</p>:<Board mode="local" columns={boardData.columns} tasks={boardData.tasks} setBoardData={setBoardData}/>}
    </div>
  );
}

export default Local;
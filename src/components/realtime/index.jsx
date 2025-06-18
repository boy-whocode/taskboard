'use client';
import { useDispatch, useSelector } from "react-redux";
import Board from "../commonComponents/Board";
import { useEffect, useState } from "react";
import { fetchBoard } from "@/redux/slice/boardSlice";
import { socket } from "@/lib/socket";

const RealTime = () => {
  const dispatch = useDispatch();
  const { columns, tasks, loading } = useSelector((state) => state.board);
  const [boardData, setBoardData] = useState({
      columns: [...columns],
      tasks: [...tasks],
    });
  useEffect(() => {
    dispatch(fetchBoard());
    socket.on("update", () => {
      dispatch(fetchBoard());
    });

    return () => {
      socket.off("update");
    };
  }, []);
  useEffect(() => {
    setBoardData({
      columns: [...columns],
      tasks: [...tasks],
    });
  }, [columns, tasks]);
  return (
    <div className="realtime">
      <h1>Real-time Data</h1>
      {loading ? (
        <p>...loading</p>
      ) : (
        <Board
          mode="realtime"
          columns={boardData.columns}
          tasks={boardData.tasks}
          setBoardData={setBoardData}
        />
      )}
    </div>
  );
}

export default RealTime;
import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

const filePath = path.join(process.cwd(),"src", "data", "board.json");


export async function POST(req) {
  const data = await req.json();
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
  return NextResponse.json({ success: true, data:data });
}

export async function DELETE(req) {
  const { id } = await req.json();
  const fileData = fs.readFileSync(filePath, "utf-8");
  const boardData = JSON.parse(fileData);
  const updatedColumns = boardData.columns.map((column) => {
    return {
      ...column,
      taskIds: column.taskIds.filter((task) => task !== id),
    };
  });
  const updatedTask = boardData.tasks.filter((task) => task.id !== id);
  boardData.columns = updatedColumns;
  boardData.tasks = updatedTask
  fs.writeFileSync(filePath, JSON.stringify(boardData, null, 2));
  return NextResponse.json({ success: true, data: boardData });
}
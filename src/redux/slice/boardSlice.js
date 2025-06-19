import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { act } from "react";

export const fetchBoard = createAsyncThunk("fetchBoard", async () => {
  const res = await fetch("/api/board");
  return res.json();
});

export const addNewColumn = createAsyncThunk("addNewColumn", async (newColumn) => {
  const res = await fetch("/api/board/column", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newColumn),
  });
  return res.json();
});

export const addNewTask = createAsyncThunk("addNewTask", async (newTask) => {
  const res = await fetch("/api/board/task", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTask),
  });
  return res.json();
});

export const deleteTask = createAsyncThunk("deleteTask", async (taskId) => {
  const res = await fetch("/api/board/task", {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ id: taskId }),
  });
  fetchBoard()
  return res.json();
});
const boardSlice = createSlice({
  name: "board",
  initialState: { columns: [], tasks: [], loading: true },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBoard.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchBoard.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.tasks = action.payload.tasks;
        state.loading = false;
      })
      .addCase(addNewColumn.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewColumn.fulfilled, (state, action) => {
        state.columns = [...action.payload.data.columns];
        state.tasks = [...action.payload.data.tasks];
        state.loading = false;
      })
      .addCase(addNewTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(addNewTask.fulfilled, (state, action) => {
        console.log("addNewTask", action.payload);
        state.columns = [...action.payload.data.columns];
        state.tasks = [...action.payload.data.tasks];
        state.loading = false;
      })
      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.columns = action.payload.columns;
        state.tasks = action.payload.tasks;
        state.loading = false;
      })
  },
});

export default boardSlice.reducer;
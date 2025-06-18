import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchBoard = createAsyncThunk("fetchBoard", async () => {
  const res = await fetch("/api/board");
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
  },
});

export default boardSlice.reducer;
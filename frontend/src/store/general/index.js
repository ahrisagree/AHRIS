import { createSlice } from "@reduxjs/toolkit";
import { getDataThunk } from "../../thunk";

const formSlice = createSlice({
  name: 'general',
  initialState: {
    firstTime: true
  },
  reducers: {
    setFirstTime(state, action) {
      state.firstTime = action.payload;
    }
  },
  extraReducers: {
    [getDataThunk.pending]: state => {
      state.loading = true;
    },
    [getDataThunk.fulfilled]: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    [getDataThunk.rejected]: state => {
      state.loading = false;
    },
  }
})

// Extract the action creators object and the reducer
const { actions, reducer } = formSlice;
// Extract and export each action creator by name
export const { setFirstTime } = actions;
// Export the reducer, either as a default or named export
export default reducer;
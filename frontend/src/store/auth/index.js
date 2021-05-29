import { createSlice } from "@reduxjs/toolkit";
import { setupAuthToken } from "api/setup";
import { loginThunk, logoutThunk } from "thunk/auth";

const formSlice = createSlice({
  name: 'auth',
  initialState: {
    token: null,
    user: null,
    loading: false,
    error: {},
    tokenError: null,
  },
  reducers: {
    setTokenError(state, action) {
      state.tokenError = action.payload;
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = {};
    }
  },
  extraReducers: {
    [loginThunk.pending]: state => {
      state.loading = true;
      state.tokenError = null;
      state.error = {};
    },
    [loginThunk.fulfilled]: (state, action) => {
      state.loading = false;
      const { data } = action.payload;
      state.token = data.token;
      state.user = data.user;
      setupAuthToken(data.token);
    },
    [loginThunk.rejected]: (state, error) => {
      state.loading = false;
      state.error = error.payload?.data || {};
    },
    [logoutThunk.pending]: state => {
      state.token = null;
      state.user = null;
      state.loading = false;
      state.error = {};
    },
    [logoutThunk.fulfilled]: () => setupAuthToken(null),
    [logoutThunk.rejected]: () => setupAuthToken(null),
  }
})

// Extract the action creators object and the reducer
const { reducer, actions } = formSlice;
export const { setTokenError } = actions;
// Export the reducer, either as a default or named export
export default reducer;
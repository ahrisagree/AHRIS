import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginAPI, logoutAPI } from "../api/auth";

export const loginThunk = createAsyncThunk(
  'auth/login', async (data, thunkAPI) => {
    try {
      const formData = new FormData();
      formData.append('email', data.email);
      formData.append('password', data.password);
      const response = await loginAPI(formData);
      return response;
    } catch (err) {
      return thunkAPI.rejectWithValue(err.response);
    }
  }
);

export const logoutThunk = createAsyncThunk(
  'auth/logout', async () => {
    const response = await logoutAPI();
    return response;
  }
);
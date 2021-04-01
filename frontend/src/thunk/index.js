import { createAsyncThunk } from "@reduxjs/toolkit";
import { getData } from "../api";

export const getDataThunk = createAsyncThunk(
  'sample/getData', async () => {
    const response = await getData();
    return response;
  }
)
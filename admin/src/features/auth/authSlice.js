import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

const userDefaultState = {
  _id: null,
  firstName: null,
  lastName: null,
  email: null,
  mobile: null,
  token: null,
};

const initialState = {
  user: userDefaultState,
  isError: false,
  isLoading: false,
  isSuccess: false,
  message: "",
};

export const login = createAsyncThunk(
  "/admin-login",
  async (user, thunkAPI) => {
    try {
      return await authService.login(user);
    } catch (error) {
      return thunkAPI.rejectWithValue(error);
    }
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},

  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.isSuccess = false;
        state.user = action.payload;
      });
  },
});

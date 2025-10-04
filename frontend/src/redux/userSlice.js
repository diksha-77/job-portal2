import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../utils/axios.js';

export const loginUser = createAsyncThunk('user/loginUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/login', data, { withCredentials: true });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

export const registerUser = createAsyncThunk('user/registerUser', async (data, { rejectWithValue }) => {
  try {
    const response = await axios.post('/user/register', data, { withCredentials: true });
    return response.data.user;
  } catch (error) {
    return rejectWithValue(error.response.data.message);
  }
});

const userSlice = createSlice({
  name: 'user',
  initialState: { user: null, loading: false, error: null },
  reducers: {
    logout: (state) => { state.user = null; }
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(loginUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(loginUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; })
      .addCase(registerUser.pending, (state) => { state.loading = true; state.error = null; })
      .addCase(registerUser.fulfilled, (state, action) => { state.loading = false; state.user = action.payload; })
      .addCase(registerUser.rejected, (state, action) => { state.loading = false; state.error = action.payload; });
  },
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;

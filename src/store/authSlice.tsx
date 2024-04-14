import { createSlice, PayloadAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

interface AuthState {
  isLoggedIn: boolean;
  accessToken: string | null;
  refreshToken: string | null;
}

//tokens from local storage
const initialAccessToken = localStorage.getItem('accessToken');
const initialRefreshToken = localStorage.getItem('refreshToken');
const initialState: AuthState = {
  isLoggedIn: !!initialAccessToken,
  accessToken: initialAccessToken,
  refreshToken: initialRefreshToken,
};

//accesstoken expiration
const accessTokenExpired = (token: string | null): boolean => {
  if (!token) return true;
  const decodedToken: any = jwtDecode(token);
  return decodedToken.exp < Date.now() / 1000;
};

export const refreshAccessToken = createAsyncThunk<string, string>(
  'auth/refreshAccessToken',
  async (refreshToken) => {
    try {
      const response = await axios.post('/api/token/refresh/', { refresh: refreshToken });
      return response.data.access;
    } catch (error) {
      throw error;
    }
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ accessToken: string; refreshToken: string }>) {
      state.isLoggedIn = true;
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      //store tokens in local storage
      localStorage.setItem('accessToken', action.payload.accessToken);
      localStorage.setItem('refreshToken', action.payload.refreshToken);
    },
    logout(state) {
      state.isLoggedIn = false;
      state.accessToken = null;
      state.refreshToken = null;
      //remove tokens from local storage
      localStorage.removeItem('accessToken');
      localStorage.removeItem('refreshToken');
    },
  },
  extraReducers: (builder) => {
    builder.addCase(refreshAccessToken.rejected, (state, action) => {
      console.error('Failed to refresh access token:', action.error.message);
    });
  },
});



export const { login, logout } = authSlice.actions;

export const selectIsLoggedIn = (state: { auth: AuthState }) => state.auth.isLoggedIn;
export const selectAccessToken = (state: { auth: AuthState }) => state.auth.accessToken;
export const selectRefreshToken = (state: { auth: AuthState }) => state.auth.refreshToken;

export default authSlice.reducer;

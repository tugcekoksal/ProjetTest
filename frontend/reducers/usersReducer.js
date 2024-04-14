import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isAuthenticated: false,
  username: null,
  tokens: {
    accessToken: null,
    refreshToken: null,
   
  },
  error: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    loginSuccess: (state, action) => {
      state.isAuthenticated = true;
      state.tokens.accessToken = action.payload.accessToken;
      state.tokens.refreshToken = action.payload.refreshToken;
      state.username = action.payload.username;
      state.error = null;
    },
    logout: (state) => {
      state.isAuthenticated = false;
      state.tokens = { accessToken: null, refreshToken: null };
      state.username = null;
    },
    authError: (state, action) => {
      state.error = action.payload;
    }
  }
});

export const { loginSuccess, logout, authError } = userSlice.actions;
export default userSlice.reducer;

import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type UserRole = 'admin' | 'teacher' | 'student';

interface AuthState {
  isAuthenticated: boolean;
  user: { id: string; name: string; email: string; role: UserRole; avatar: string } | null;
}

const initialState: AuthState = { isAuthenticated: false, user: null };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login(state, action: PayloadAction<{ email: string; role: UserRole }>) {
      state.isAuthenticated = true;
      state.user = {
        id: '1',
        name: action.payload.role === 'admin' ? 'Dr. Admin' : action.payload.role === 'teacher' ? 'Prof. Smith' : 'Alex Johnson',
        email: action.payload.email,
        role: action.payload.role,
        avatar: '',
      };
    },
    logout(state) {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

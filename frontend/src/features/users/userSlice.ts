import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../api/axiosApi';

interface User {
    _id: string;
    email: string;
    displayName: string;
    avatar: string | null;
    role: string;
    token: string;
}

interface UserState {
    user: User | null;
    loading: boolean;
}

const initialState: UserState = {
    user: null,
    loading: false
};

export const register = createAsyncThunk(
    'users/register',
    async (userData: { email: string; password: string; displayName: string }) => {
        const response = await axiosApi.post('/users', userData);
        return response.data;
    }
);

export const login = createAsyncThunk(
    'users/login',
    async (userData: { email: string; password: string }) => {
        const response = await axiosApi.post('/users/sessions', userData);
        return response.data;
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        logout: (state) => {
            state.user = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(register.pending, (state) => {
                state.loading = true;
            })
            .addCase(register.rejected, (state) => {
                state.loading = false;
            })

            .addCase(login.fulfilled, (state, action) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
            })
            .addCase(login.rejected, (state) => {
                state.loading = false;
            });
    }
});

export const { logout } = userSlice.actions;
export default userSlice.reducer;